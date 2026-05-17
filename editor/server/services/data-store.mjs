import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = resolve(fileURLToPath(new URL('../../../', import.meta.url)));

export function resolveWorkspacePath(...segments) {
  return resolve(workspaceRoot, ...segments);
}

export async function readJsonFile(...segments) {
  const filePath = resolveWorkspacePath(...segments);
  const text = await readFile(filePath, 'utf8');
  return {
    filePath,
    data: JSON.parse(text),
    text
  };
}

export async function writeJsonFile(filePath, value) {
  await mkdir(dirname(filePath), { recursive: true });
  const text = `${JSON.stringify(value, null, 2)}\n`;
  await writeFile(filePath, text, 'utf8');
  return text;
}
