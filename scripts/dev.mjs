import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { build } from './build.mjs';

const preview = process.argv.includes('--preview');
const root = resolve('build');
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.json': 'application/json' };
if (!preview) await build();
let pending = Promise.resolve();
let timer;
if (!preview) watch('src', { recursive: true }, () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    pending = pending.then(() => build()).catch(error => console.error(error));
  }, 150);
});
const server = createServer(async (req, res) => {
  await pending;
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = resolve(root, `.${path.endsWith('/') ? `${path}index.html` : path}`);
    if (!file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    if (extname(file) === '.php') {
      res.writeHead(501, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ status: 'NO', mes: 'Sending messages requires a PHP server with email delivery configured.' }));
      return;
    }
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
    if (!(await stat(file)).isFile()) { res.writeHead(404).end(); return; }
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(404).end('Not found'); }
});
server.on('error', error => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Порт ${port} уже зайнятий. Зупиніть попередній сервер (Ctrl+C) або запустіть на іншому порту:\nPORT=${port + 1} npm run ${preview ? 'preview' : 'dev'}`);
  } else {
    console.error(`Не вдалося запустити сервер: ${error.message}`);
  }
  process.exit(1);
});
server.listen(port, '127.0.0.1', () => {
  console.log(`Portfolio: http://127.0.0.1:${port} (${preview ? 'preview' : 'watching src; refresh after edits'})`);
});
