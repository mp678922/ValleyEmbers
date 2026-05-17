function cloneValue(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => cloneValue(entry));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneValue(entry)]));
  }

  return value;
}

function parseJson(text, errorPrefix) {
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`${errorPrefix} 的 JSON 格式不正確。`);
  }
}

function parseFieldValue(field, formValue, fallbackRawValue, dirty, isNew) {
  if (!dirty && !isNew) {
    return { shouldWrite: false, value: fallbackRawValue };
  }

  const text = typeof formValue === 'string' ? formValue : '';

  switch (field.type) {
    case 'string':
    case 'multiline-string': {
      const value = text;
      if (field.required && !value.trim()) {
        throw new Error(`${field.label} 不可空白。`);
      }
      return { shouldWrite: true, value };
    }
    case 'number': {
      const trimmed = text.trim();
      if (!trimmed) {
        if (field.required && field.defaultValue === undefined) {
          throw new Error(`${field.label} 不可空白。`);
        }
        return { shouldWrite: true, value: cloneValue(field.defaultValue) };
      }
      const value = Number(trimmed);
      if (!Number.isFinite(value)) {
        throw new Error(`${field.label} 必須是數字。`);
      }
      return { shouldWrite: true, value };
    }
    case 'boolean': {
      if (text === 'true') {
        return { shouldWrite: true, value: true };
      }
      if (text === 'false') {
        return { shouldWrite: true, value: false };
      }
      throw new Error(`${field.label} 必須是 true 或 false。`);
    }
    case 'json-object': {
      const trimmed = text.trim();
      if (!trimmed) {
        return { shouldWrite: true, value: cloneValue(field.defaultValue) };
      }
      const value = parseJson(trimmed, field.label);
      if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error(`${field.label} 必須是 JSON 物件。`);
      }
      return { shouldWrite: true, value };
    }
    case 'json-string-array': {
      const trimmed = text.trim();
      if (!trimmed) {
        return { shouldWrite: true, value: cloneValue(field.defaultValue) };
      }
      const value = parseJson(trimmed, field.label);
      if (!Array.isArray(value) || value.some((entry) => typeof entry !== 'string')) {
        throw new Error(`${field.label} 必須是字串陣列。`);
      }
      return { shouldWrite: true, value };
    }
    default:
      return { shouldWrite: true, value: text };
  }
}

function ensureUniqueIds(schema, records) {
  const seen = new Set();
  const entityLabel = schema.title || schema.entity || '資料';
  for (const record of records) {
    if (!record.id || typeof record.id !== 'string') {
      throw new Error(`每筆${entityLabel}都必須有有效的 id。`);
    }
    if (seen.has(record.id)) {
      throw new Error(`${entityLabel} id 重複：${record.id}`);
    }
    seen.add(record.id);
  }
}

export function mergeSubmittedRecords(schema, sourceRecords, submittedRecords) {
  const sourceById = new Map(sourceRecords.map((record) => [record.id, record]));
  const nextRecords = [];

  for (const submittedRecord of submittedRecords) {
    const isNew = Boolean(submittedRecord.isNew);
    const originalId = submittedRecord.originalId || null;
    const baseRecord = isNew ? {} : sourceById.get(originalId);

    if (!isNew && !baseRecord) {
      throw new Error(`找不到原始資料：${originalId}`);
    }

    const nextRecord = cloneValue(baseRecord || {});

    for (const field of schema.fields) {
      const dirty = Boolean(submittedRecord.dirty?.[field.key]);
      const fallbackRawValue = Object.prototype.hasOwnProperty.call(nextRecord, field.key)
        ? nextRecord[field.key]
        : cloneValue(field.defaultValue);

      const parsed = parseFieldValue(
        field,
        submittedRecord.formValues?.[field.key],
        fallbackRawValue,
        dirty,
        isNew
      );

      if (parsed.shouldWrite) {
        nextRecord[field.key] = parsed.value;
      }
    }

    nextRecords.push(nextRecord);
  }

  ensureUniqueIds(schema, nextRecords);
  return nextRecords;
}
