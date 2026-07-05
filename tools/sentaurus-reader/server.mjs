import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import process from "node:process";

const root = process.cwd();
const publicRoot = resolve(root, "tools/sentaurus-reader/public");
const docsRoot = resolve(root, "docs");
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

