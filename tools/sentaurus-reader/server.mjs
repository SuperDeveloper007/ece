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
  server.once("error", (error) => {
    if (error.code === "EADDRINUSE") {
      listen(port + 1);
      return;
    }
    throw error;
  });

  server.listen(port, "127.0.0.1", async () => {
    const pdfJsPath = await existingPdfJsRoot();
    try {
      await readFile(join(pdfJsPath, "build/pdf.mjs"));
    } catch {
      console.warn("PDF.js was not found. Install pdfjs-dist or use the Codex bundled runtime.");
    }
    console.log(`Sentaurus reader: http://127.0.0.1:${port}`);
  });
}

listen(preferredPort);

