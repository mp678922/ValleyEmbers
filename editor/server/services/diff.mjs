function stableStringify(value) {
  return JSON.stringify(value, Object.keys(value || {}).sort());
}

export function buildRecordDiff(previousRecords, nextRecords) {
  const previousById = new Map(previousRecords.map((record) => [record.id, record]));
  const nextById = new Map(nextRecords.map((record) => [record.id, record]));

  const added = [];
  const removed = [];
  const updated = [];

  for (const [id, nextItem] of nextById.entries()) {
    const previousItem = previousById.get(id);
    if (!previousItem) {
      added.push(id);
      continue;
    }

    const changedKeys = [];
    const keys = new Set([...Object.keys(previousItem), ...Object.keys(nextItem)]);
    for (const key of keys) {
      if (stableStringify(previousItem[key]) !== stableStringify(nextItem[key])) {
        changedKeys.push(key);
      }
    }

    if (changedKeys.length) {
      updated.push({ id, changedKeys });
    }
  }

  for (const [id] of previousById.entries()) {
    if (!nextById.has(id)) {
      removed.push(id);
    }
  }

  return {
    added,
    removed,
    updated,
    summary: {
      added: added.length,
      removed: removed.length,
      updated: updated.length
    }
  };
}
