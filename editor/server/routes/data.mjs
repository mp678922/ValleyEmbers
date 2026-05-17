import { createBackup } from '../services/backup.mjs';
import { readJsonFile, writeJsonFile } from '../services/data-store.mjs';
import { buildRecordDiff } from '../services/diff.mjs';
import { normalizeRecords } from '../services/normalizer.mjs';
import { getSchema } from '../services/schema-registry.mjs';
import { mergeSubmittedRecords } from '../services/serializer.mjs';

const DATA_PATHS = {
  items: ['docs', 'data', 'items', 'items.json'],
  facilities: ['docs', 'data', 'facilities', 'facilities.json']
};

export async function handleGetData(entity, response) {
  const schema = getSchema(entity);
  const dataPath = DATA_PATHS[entity];

  if (!schema || !dataPath) {
    writeJson(response, 404, { error: '找不到指定資料表。' });
    return;
  }

  const { data } = await readJsonFile(...dataPath);

  writeJson(response, 200, {
    schema,
    records: normalizeRecords(schema, data)
  });
}

export async function handleSaveData(entity, request, response) {
  const schema = getSchema(entity);
  const dataPath = DATA_PATHS[entity];

  if (!schema || !dataPath) {
    writeJson(response, 404, { error: '找不到指定資料表。' });
    return;
  }

  const body = await readRequestBody(request);

  if (!body || !Array.isArray(body.records)) {
    writeJson(response, 400, { error: '請提供 records 陣列。' });
    return;
  }

  const { filePath, data: sourceRecords, text: originalText } = await readJsonFile(...dataPath);

  let nextRecords;
  try {
    nextRecords = mergeSubmittedRecords(schema, sourceRecords, body.records);
  } catch (error) {
    writeJson(response, 400, { error: error.message });
    return;
  }

  const backupPath = await createBackup(filePath, originalText);
  await writeJsonFile(filePath, nextRecords);

  writeJson(response, 200, {
    ok: true,
    backupPath,
    diff: buildRecordDiff(sourceRecords, nextRecords),
    records: normalizeRecords(schema, nextRecords)
  });
}

async function readRequestBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const text = Buffer.concat(chunks).toString('utf8');
  if (!text) {
    return null;
  }

  return JSON.parse(text);
}

function writeJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
}
