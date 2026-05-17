function cloneDefault(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => cloneDefault(entry));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneDefault(entry)]));
  }

  return value;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isExpectedType(field, value) {
  switch (field.type) {
    case 'string':
    case 'multiline-string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && Number.isFinite(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'json-object':
      return isPlainObject(value);
    case 'json-string-array':
      return Array.isArray(value) && value.every((entry) => typeof entry === 'string');
    default:
      return true;
  }
}

function serializeFieldValue(field, value) {
  if (value === undefined) {
    value = cloneDefault(field.defaultValue);
  }

  switch (field.type) {
    case 'string':
    case 'multiline-string':
      return typeof value === 'string' ? value : JSON.stringify(value);
    case 'number':
      return typeof value === 'number' ? String(value) : JSON.stringify(value);
    case 'boolean':
      if (value === true) return 'true';
      if (value === false) return 'false';
      return JSON.stringify(value);
    case 'json-object':
    case 'json-string-array':
      return JSON.stringify(value, null, 2);
    default:
      return JSON.stringify(value);
  }
}

export function normalizeRecords(schema, records) {
  const knownKeys = new Set(schema.fields.map((field) => field.key));

  return records.map((rawRecord) => {
    const formValues = {};
    const missingFields = [];
    const fieldIssues = [];

    for (const field of schema.fields) {
      const hasOwnValue = Object.prototype.hasOwnProperty.call(rawRecord, field.key);
      const rawValue = hasOwnValue ? rawRecord[field.key] : cloneDefault(field.defaultValue);

      formValues[field.key] = serializeFieldValue(field, rawValue);

      if (!hasOwnValue) {
        missingFields.push(field.key);
      } else if (!isExpectedType(field, rawValue)) {
        fieldIssues.push({
          key: field.key,
          message: `欄位型別與 editor schema 不一致，若不編輯此欄位，儲存時仍會保留原始值。`
        });
      }
    }

    const unknownEntries = Object.keys(rawRecord)
      .filter((key) => !knownKeys.has(key))
      .map((key) => ({
        key,
        value: JSON.stringify(rawRecord[key], null, 2)
      }));

    const warnings = [];
    if (
      Object.prototype.hasOwnProperty.call(rawRecord, 'category') &&
      typeof rawRecord.category === 'string' &&
      !schema.categoryOptions.includes(rawRecord.category)
    ) {
      warnings.push('目前資料使用 editor 未列出的分類，儲存時會保留原值。');
    }

    return {
      originalId: typeof rawRecord.id === 'string' ? rawRecord.id : null,
      formValues,
      missingFields,
      fieldIssues,
      unknownEntries,
      warnings
    };
  });
}
