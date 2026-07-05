import { createServer } from "node:http";
import { readFile, stat, mkdir, writeFile, readdir } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";
import { extname, join, normalize, resolve, basename } from "node:path";
import process from "node:process";

const root = process.cwd();
const publicRoot = resolve(root, "tools/sentaurus-reader/public");
const docsRoot = resolve(root, "docs");
const uploadRoot = resolve(root, "uploads");
const pdfJsRoot = resolve(
  root,
  "node_modules/pdfjs-dist",
);
const defaultAiBaseUrl = "https://api.openai.com/v1";
const bundledPdfJsRoot = resolve(
  process.env.HOME || "",
  ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/pdfjs-dist@5.6.205/node_modules/pdfjs-dist",
);

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".pdf", "application/pdf"],
  [".wasm", "application/wasm"],
  [".bcmap", "application/octet-stream"],
  [".ttf", "font/ttf"],
  [".pfb", "application/octet-stream"],
]);

async function loadLocalEnv() {
  const envPath = resolve(root, ".env.local");

  try {
    const content = await readFile(envPath, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex <= 0) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      let value = trimmed.slice(separatorIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn(`Could not load .env.local: ${error.message}`);
    }
  }
}

await loadLocalEnv();

async function ensureUploadDir() {
  if (!existsSync(uploadRoot)) {
    await mkdir(uploadRoot, { recursive: true });
  }
}

function isInside(parent, child) {
  const relative = normalize(child).slice(parent.length);
  return child === parent || (relative.startsWith("/") && !relative.includes(".."));
}

async function existingPdfJsRoot() {
  try {
    await stat(pdfJsRoot);
    return pdfJsRoot;
  } catch {
    return bundledPdfJsRoot;
  }
}

async function sendFile(response, filePath) {
  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.writeHead(200, {
      "Content-Type": contentTypes.get(extname(filePath)) || "application/octet-stream",
      "Content-Length": fileStat.size,
      "Cache-Control": "no-cache",
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}

function sendJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

function compactText(value, maxLength = 4000) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function getAiConfig() {
  const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY || "";
  const baseUrl = (process.env.AI_BASE_URL || process.env.OPENAI_BASE_URL || defaultAiBaseUrl).replace(/\/+$/, "");
  const model = process.env.AI_MODEL || process.env.OPENAI_MODEL || "gpt-4o-mini";
  return {
    apiKey,
    baseUrl,
    model,
    configured: Boolean(apiKey || baseUrl !== defaultAiBaseUrl),
  };
}

async function readJsonBody(request, maxBytes = 1024 * 1024) {
  return new Promise((resolveBody, reject) => {
    const chunks = [];
    let size = 0;

    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > maxBytes) {
        reject(new Error("Request body is too large"));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });

    request.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolveBody(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Invalid JSON request body"));
      }
    });
    request.on("error", reject);
  });
}

function buildAiUserPrompt(body) {
  const glossary = Array.isArray(body.glossary)
    ? body.glossary
        .slice(0, 10)
        .map((item) => `- ${compactText(item.term, 80)} / ${compactText(item.zh, 80)}：${compactText(item.explanation, 280)}`)
        .join("\n")
    : "";

  return `用户问题：
${compactText(body.question, 3000)}

当前 PDF 信息：
- 页码：${compactText(body.pageNumber, 20) || "未知"}
- 选中文本：${compactText(body.selectedText, 2000) || "无"}
- 选区上下文：${compactText(body.context, 2500) || "无"}
- 当前页文本片段：${compactText(body.pageText, 5000) || "无"}

本地术语库命中：
${glossary || "无"}

请用中文回答，并把重点放在 Sentaurus Visual / TCAD 语境中的知识解释、操作含义和可能的使用场景。`;
}

async function handleAiQuery(request, response) {
  const config = getAiConfig();
  const body = await readJsonBody(request);
  const question = compactText(body.question, 3000);

  if (!question) {
    sendJson(response, 400, { success: false, error: "问题不能为空" });
    return;
  }

  if (!config.configured) {
    sendJson(response, 503, {
      success: false,
      error: "AI 服务未配置。请设置 OPENAI_API_KEY，或设置 AI_BASE_URL 指向兼容 OpenAI Chat Completions 的本地/私有服务。",
    });
    return;
  }

  const history = Array.isArray(body.history)
    ? body.history
        .filter((item) => item && ["user", "assistant"].includes(item.role) && item.content)
        .slice(-6)
        .map((item) => ({ role: item.role, content: compactText(item.content, 2000) }))
    : [];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  try {
    const headers = { "Content-Type": "application/json" };
    if (config.apiKey) {
      headers.Authorization = `Bearer ${config.apiKey}`;
    }

    const upstream = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: config.model,
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "你是熟悉 Sentaurus Visual、TCAD 和半导体器件仿真的中文学习助手。优先依据用户提供的 PDF 选区、页面上下文和术语库回答；如果上下文不足，要明确说明不确定，并给出可验证的查询方向。",
          },
          ...history,
          { role: "user", content: buildAiUserPrompt({ ...body, question }) },
        ],
      }),
      signal: controller.signal,
    });

    const rawText = await upstream.text();
    let data = null;
    try {
      data = rawText ? JSON.parse(rawText) : null;
    } catch {
      data = null;
    }

    if (!upstream.ok) {
      const message = data?.error?.message || rawText || `AI 服务返回 ${upstream.status}`;
      sendJson(response, upstream.status, { success: false, error: message });
      return;
    }

    const answer = data?.choices?.[0]?.message?.content || data?.output_text || "";
    sendJson(response, 200, {
      success: true,
      answer: answer.trim() || "AI 服务没有返回内容。",
      model: data?.model || config.model,
      usage: data?.usage || null,
    });
  } catch (error) {
    const message = error.name === "AbortError" ? "AI 请求超时，请稍后重试。" : error.message;
    sendJson(response, 502, { success: false, error: message });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function parseMultipartForm(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => {
      try {
        const buffer = Buffer.concat(chunks);
        const contentType = request.headers["content-type"];
        const boundaryMatch = contentType.match(/boundary=([^;]+)/);
        
        if (!boundaryMatch) {
          reject(new Error("No boundary found in Content-Type"));
          return;
        }
        
        const boundary = boundaryMatch[1];
        const boundaryBuffer = Buffer.from(`--${boundary}`);
        const parts = [];
        let start = 0;
        
        while (true) {
          const boundaryIndex = buffer.indexOf(boundaryBuffer, start);
          if (boundaryIndex === -1) break;
          
          const nextBoundaryIndex = buffer.indexOf(boundaryBuffer, boundaryIndex + boundaryBuffer.length);
          if (nextBoundaryIndex === -1) break;
          
          const partData = buffer.slice(boundaryIndex + boundaryBuffer.length, nextBoundaryIndex - 2);
          const headersEnd = partData.indexOf("\r\n\r\n");
          
          if (headersEnd !== -1) {
            const headers = partData.slice(0, headersEnd).toString("utf8");
            const content = partData.slice(headersEnd + 4);
            
            const nameMatch = headers.match(/name="([^"]+)"/);
            const filenameMatch = headers.match(/filename="([^"]+)"/);
            const contentTypeMatch = headers.match(/Content-Type:\s*([^\r\n]+)/);
            
            if (nameMatch) {
              parts.push({
                name: nameMatch[1],
                filename: filenameMatch ? filenameMatch[1] : null,
                contentType: contentTypeMatch ? contentTypeMatch[1].trim() : null,
                data: content,
              });
            }
          }
          
          start = nextBoundaryIndex;
        }
        
        resolve(parts);
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });
}

async function route(request, response) {
  const url = new URL(request.url || "/", "http://localhost");
  const path = decodeURIComponent(url.pathname);

  if (path === "/") {
    await sendFile(response, join(publicRoot, "index.html"));
    return;
  }

  if (path.startsWith("/app/")) {
    const filePath = resolve(publicRoot, path.replace(/^\/app\//, ""));
    if (!isInside(publicRoot, filePath)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }
    await sendFile(response, filePath);
    return;
  }

  if (path.startsWith("/docs/")) {
    const filePath = resolve(docsRoot, path.replace(/^\/docs\//, ""));
    if (!isInside(docsRoot, filePath)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }
    await sendFile(response, filePath);
    return;
  }

  if (path.startsWith("/pdfjs/")) {
    const rootPath = await existingPdfJsRoot();
    const filePath = resolve(rootPath, path.replace(/^\/pdfjs\//, ""));
    if (!isInside(rootPath, filePath)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }
    await sendFile(response, filePath);
    return;
  }

  if (path === "/health") {
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ ok: true }));
    return;
  }

  if (path === "/api/ai/status" && request.method === "GET") {
    const config = getAiConfig();
    sendJson(response, 200, {
      configured: config.configured,
      model: config.model,
      baseUrl: config.configured ? config.baseUrl : "",
    });
    return;
  }

  if (path === "/api/ai/query" && request.method === "POST") {
    try {
      await handleAiQuery(request, response);
    } catch (error) {
      sendJson(response, 400, { success: false, error: error.message });
    }
    return;
  }

  if (path === "/api/upload" && request.method === "POST") {
    try {
      await ensureUploadDir();
      const parts = await parseMultipartForm(request);
      const uploadedFiles = [];

      for (const part of parts) {
        if (part.filename && part.data) {
          const filename = basename(part.filename);
          const filePath = join(uploadRoot, filename);
          await writeFile(filePath, part.data);
          uploadedFiles.push({ filename, path: `/uploads/${filename}` });
        }
      }

      response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ success: true, files: uploadedFiles }));
    } catch (error) {
      response.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ success: false, error: error.message }));
    }
    return;
  }

  if (path === "/api/files" && request.method === "GET") {
    try {
      await ensureUploadDir();
      const entries = await readdir(uploadRoot, { withFileTypes: true });
      const files = entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".pdf"))
        .map((entry) => ({
          name: entry.name,
          path: `/uploads/${entry.name}`,
        }));

      response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ files }));
    } catch (error) {
      response.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ error: error.message }));
    }
    return;
  }

  if (path.startsWith("/uploads/")) {
    const filePath = resolve(uploadRoot, path.replace(/^\/uploads\//, ""));
    if (!isInside(uploadRoot, filePath)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }
    await sendFile(response, filePath);
    return;
  }

  response.writeHead(404);
  response.end("Not found");
}

const preferredPort = Number.parseInt(process.env.PORT || "5177", 10);
const server = createServer((request, response) => {
  route(request, response).catch((error) => {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(error.stack || String(error));
  });
});

function listen(port) {
  const onError = (error) => {
    server.off("listening", onListening);
    if (error.code === "EADDRINUSE") {
      listen(port + 1);
      return;
    }
    throw error;
  };

  const onListening = async () => {
    server.off("error", onError);
    const pdfJsPath = await existingPdfJsRoot();
    try {
      await readFile(join(pdfJsPath, "build/pdf.mjs"));
    } catch {
      console.warn("PDF.js was not found. Install pdfjs-dist or use the Codex bundled runtime.");
    }
    console.log(`Sentaurus reader: http://127.0.0.1:${port}`);
  };

  server.once("error", onError);
  server.once("listening", onListening);
  server.listen(port, "127.0.0.1");
}

listen(preferredPort);
