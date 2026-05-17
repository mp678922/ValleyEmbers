import { mkdir, writeFile } from 'node:fs/promises';
import { basename, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = resolve(fileURLToPath(new URL('../../../', import.meta.url)));

function makeTimestamp() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    '-',
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds())
  ].join('');
}

export async function createBackup(filePath, originalText) {
  const backupDir = resolve(workspaceRoot, 'editor', 'backups');
  await mkdir(backupDir, { recursive: true });
  const extension = extname(filePath) || '.json';
  const baseName = basename(filePath, extension);
  const backupPath = resolve(backupDir, `${baseName}-${makeTimestamp()}${extension}`);
  await writeFile(backupPath, originalText, 'utf8');
  return backupPath;
}
