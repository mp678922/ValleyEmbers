import { createReadStream, existsSync, mkdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { handleGetData, handleSaveData } from './routes/data.mjs';
import { handleGetItems, handleSaveItems } from './routes/items.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const editorRoot = resolve(__dirname, '..');
const workspaceRoot = resolve(editorRoot, '..');
const publicDir = join(editorRoot, 'public');
const tmpDir = join(workspaceRoot, 'tmp');
const port = Number(process.env.EDITOR_PORT || 3100);

mkdirSync(tmpDir, { recursive: true });

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8'
};

function resolveRequestPath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split('?')[0]);
  const relativePath = decodedPath === '/' ? '/index.html' : decodedPath;
  const filePath = normalize(join(publicDir, relativePath));

  if (!filePath.startsWith(publicDir)) {
    return null;
  }

  if (existsSync(filePath) && statSync(filePath).isFile()) {
    return filePath;
  }

  return null;
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
}

const server = createServer(async (request, response) => {
  try {
    const method = request.method || 'GET';
    const url = request.url || '/';

    if (method === 'GET' && url === '/api/health') {
      sendJson(response, 200, { ok: true });
      return;
    }

    if (method === 'GET' && url === '/api/items') {
      await handleGetItems(response);
      return;
    }

    if (method === 'POST' && url === '/api/items/save') {
      await handleSaveItems(request, response);
      return;
    }

    const dataGetMatch = url.match(/^\/api\/data\/([a-z]+)$/);
    if (method === 'GET' && dataGetMatch) {
      await handleGetData(dataGetMatch[1], response);
      return;
    }

    const dataSaveMatch = url.match(/^\/api\/data\/([a-z]+)\/save$/);
    if (method === 'POST' && dataSaveMatch) {
      await handleSaveData(dataSaveMatch[1], request, response);
      return;
    }

    const filePath = resolveRequestPath(url);
    if (!filePath) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }

    const contentType = contentTypes[extname(filePath)] || 'application/octet-stream';
    response.writeHead(200, { 'Content-Type': contentType });
    createReadStream(filePath).pipe(response);
  } catch (error) {
    sendJson(response, 500, {
      error: error instanceof Error ? error.message : 'Unknown server error'
    });
  }
});

server.listen(port, () => {
  console.log(`ValleyEmbers editor is running at http://localhost:${port}`);
});
