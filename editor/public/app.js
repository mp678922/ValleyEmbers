const entities = {
  facilities: {
    label: '設施',
    title: '設施編輯器',
    addLabel: '新增設施',
    deleteLabel: '刪除設施',
    savedMessage: '已儲存 facilities.json，未知欄位已保留，並建立備份。'
  },
  items: {
    label: '道具',
    title: '道具編輯器',
    addLabel: '新增道具',
    deleteLabel: '刪除道具',
    savedMessage: '已儲存 items.json，未知欄位已保留，並建立備份。'
  }
};

const state = {
  entity: 'facilities',
  schema: null,
  records: [],
  selectedIndex: -1,
  filterText: '',
  sortKey: 'name',
  sortDirection: 'asc',
  modalOpen: false,
  message: '',
  messageTone: 'info',
  saveResult: '尚未儲存。'
};

const elements = {
  appTitle: document.querySelector('#app-title'),
  appSubtitle: document.querySelector('#app-subtitle'),
  entityTabs: {
    facilities: document.querySelector('#entity-facilities'),
    items: document.querySelector('#entity-items')
  },
  ruleStrip: document.querySelector('#rule-strip'),
  reloadButton: document.querySelector('#reload-button'),
  addButton: document.querySelector('#add-button'),
  saveButton: document.querySelector('#save-button'),
  listSummary: document.querySelector('#list-summary'),
  filterInput: document.querySelector('#filter-input'),
  overviewHead: document.querySelector('#overview-head'),
  overviewBody: document.querySelector('#overview-body'),
  editorTitle: document.querySelector('#editor-title'),
  editorSubtitle: document.querySelector('#editor-subtitle'),
  deleteButton: document.querySelector('#delete-button'),
  closeEditorButton: document.querySelector('#close-editor-button'),
  editorModal: document.querySelector('#editor-modal'),
  modalBackdrop: document.querySelector('#modal-backdrop'),
  messageBanner: document.querySelector('#message-banner'),
  fieldForm: document.querySelector('#field-form'),
  missingFields: document.querySelector('#missing-fields'),
  fieldIssues: document.querySelector('#field-issues'),
  unknownFields: document.querySelector('#unknown-fields'),
  saveResult: document.querySelector('#save-result'),
  fieldTemplate: document.querySelector('#field-template')
};

function createEmptyRecord() {
  const formValues = Object.fromEntries(
    state.schema.fields.map((field) => [field.key, defaultFormValue(field)])
  );

  return {
    clientId: crypto.randomUUID(),
    originalId: null,
    isNew: true,
    formValues,
    dirty: {},
    missingFields: state.schema.fields.map((field) => field.key),
    fieldIssues: [],
    unknownEntries: [],
    warnings: []
  };
}

function defaultFormValue(field) {
  if (field.type === 'boolean') {
    return field.defaultValue ? 'true' : 'false';
  }

  if (field.type === 'json-object' || field.type === 'json-string-array') {
    return JSON.stringify(field.defaultValue, null, 2);
  }

  return field.defaultValue === undefined ? '' : String(field.defaultValue);
}

async function fetchData() {
  const response = await fetch(`/api/data/${state.entity}`);
  if (!response.ok) {
    throw new Error(`無法載入${entities[state.entity].label}資料。`);
  }

  const payload = await response.json();
  state.schema = payload.schema;
  state.records = payload.records.map((record) => ({
    clientId: crypto.randomUUID(),
    isNew: false,
    dirty: {},
    ...record
  }));
  state.selectedIndex = -1;
  state.modalOpen = false;
  state.message = '';
  state.saveResult = '尚未儲存。';
  setInitialSort();
  render();
}

function setInitialSort() {
  const columns = getOverviewColumns();
  state.sortKey = columns.some((column) => column.key === 'name') ? 'name' : columns[0]?.key || 'id';
  state.sortDirection = 'asc';
}

function render() {
  renderChrome();
  renderRules();
  renderOverview();
  renderEditor();
  renderMessage();
  elements.saveResult.textContent = state.saveResult;
}

function renderChrome() {
  const config = entities[state.entity];
  elements.appTitle.textContent = config.title;
  elements.appSubtitle.textContent = `${config.label}資料。固定 schema、容錯讀取、局部合併儲存。`;
  elements.addButton.textContent = config.addLabel;
  elements.deleteButton.textContent = config.deleteLabel;
  for (const [entity, button] of Object.entries(elements.entityTabs)) {
    button.classList.toggle('active', entity === state.entity);
  }
}

function renderRules() {
  if (!state.schema) {
    elements.ruleStrip.textContent = '';
    return;
  }

  elements.ruleStrip.replaceChildren(
    ...state.schema.rules.map((rule) => {
      const item = document.createElement('span');
      item.className = 'rule-pill';
      item.textContent = rule;
      return item;
    })
  );
}

function getOverviewColumns() {
  return state.schema?.overviewColumns?.length
    ? state.schema.overviewColumns
    : [
        { key: 'id', label: 'ID', type: 'string' },
        { key: 'name', label: '名稱', type: 'string' },
        { key: 'status', label: '狀態', type: 'status' }
      ];
}

function getFilteredSortedRecords() {
  const normalizedFilter = state.filterText.trim().toLowerCase();
  const records = state.records
    .map((record, index) => ({ record, index }))
    .filter(({ record }) => {
      if (!normalizedFilter) {
        return true;
      }

      const haystack = Object.values(record.formValues).join(' ').toLowerCase();
      return haystack.includes(normalizedFilter);
    });

  records.sort((left, right) => compareRecords(left.record, right.record, state.sortKey, state.sortDirection, left.index, right.index));
  return records;
}

function compareRecords(left, right, sortKey, sortDirection, leftIndex, rightIndex) {
  const multiplier = sortDirection === 'asc' ? 1 : -1;
  const leftValue = getSortValue(left, sortKey);
  const rightValue = getSortValue(right, sortKey);

  if (leftValue < rightValue) return -1 * multiplier;
  if (leftValue > rightValue) return 1 * multiplier;
  return leftIndex - rightIndex;
}

function getSortValue(record, sortKey) {
  if (sortKey === 'status') {
    return getStatusText(record);
  }

  const field = state.schema.fields.find((entry) => entry.key === sortKey);
  const rawValue = record.formValues[sortKey] || '';

  if (field?.type === 'number') {
    return Number(rawValue || 0);
  }

  if (field?.type === 'boolean') {
    return rawValue === 'true' ? 1 : 0;
  }

  return rawValue.toLowerCase();
}

function renderOverview() {
  const rows = getFilteredSortedRecords();
  elements.listSummary.textContent = `目前顯示 ${rows.length} / ${state.records.length} 筆${entities[state.entity].label}資料`;
  renderOverviewHead();

  elements.overviewBody.replaceChildren(
    ...rows.map(({ record }) => createOverviewRow(record))
  );
}

function renderOverviewHead() {
  const tr = document.createElement('tr');
  for (const column of getOverviewColumns()) {
    const th = document.createElement('th');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'sort-button';
    button.classList.toggle('active', state.sortKey === column.key);
    button.textContent = getSortLabel(column);
    button.addEventListener('click', () => changeSort(column.key, column.type));
    th.append(button);
    tr.append(th);
  }

  const action = document.createElement('th');
  action.textContent = '操作';
  tr.append(action);
  elements.overviewHead.replaceChildren(tr);
}

function getSortLabel(column) {
  const suffix = state.sortKey === column.key
    ? state.sortDirection === 'asc' ? ' ↑' : ' ↓'
    : '';
  return `${column.label}${suffix}`;
}

function createOverviewRow(record) {
  const tr = document.createElement('tr');
  const selectedRecord = state.records[state.selectedIndex] || null;
  if (selectedRecord && selectedRecord.clientId === record.clientId && state.modalOpen) {
    tr.classList.add('selected-row');
  }

  for (const column of getOverviewColumns()) {
    const td = document.createElement('td');
    td.textContent = formatOverviewValue(record, column);
    tr.append(td);
  }

  const actionCell = document.createElement('td');
  const actionButton = document.createElement('button');
  actionButton.type = 'button';
  actionButton.className = 'inline-button';
  actionButton.textContent = '編輯';
  actionButton.addEventListener('click', () => openEditorForRecord(record));
  actionCell.append(actionButton);
  tr.append(actionCell);

  tr.addEventListener('dblclick', () => openEditorForRecord(record));
  return tr;
}

function formatOverviewValue(record, column) {
  if (column.type === 'status') {
    return getStatusText(record);
  }

  const value = record.formValues[column.key];
  if (!value) {
    return '(空)';
  }

  const field = state.schema.fields.find((entry) => entry.key === column.key);
  if (field?.type === 'boolean') {
    return value === 'true' ? '是' : '否';
  }

  if (field?.type === 'json-string-array') {
    try {
      return JSON.parse(value).join(', ') || '(空)';
    } catch {
      return value;
    }
  }

  return value;
}

function getStatusText(record) {
  const flags = [];
  if (record.isNew) flags.push('新項目');
  if (record.unknownEntries.length) flags.push(`未知 ${record.unknownEntries.length}`);
  if (record.missingFields.length) flags.push(`缺 ${record.missingFields.length}`);
  if (Object.values(record.dirty).some(Boolean)) flags.push('已改');
  return flags.join(' / ') || '正常';
}

function openEditorForRecord(targetRecord) {
  const index = state.records.findIndex((record) => record.clientId === targetRecord.clientId);
  if (index < 0) return;
  state.selectedIndex = index;
  state.modalOpen = true;
  render();
}

function closeEditor() {
  state.modalOpen = false;
  state.selectedIndex = -1;
  render();
}

function renderEditor() {
  const record = state.records[state.selectedIndex] || null;
  elements.deleteButton.disabled = !record;
  elements.editorModal.hidden = !state.modalOpen;

  if (!record || !state.modalOpen) {
    elements.editorTitle.textContent = '未選擇資料';
    elements.editorSubtitle.textContent = '';
    elements.fieldForm.replaceChildren();
    renderMeta([], [], []);
    return;
  }

  renderEditorHeaderOnly(record);
  const fields = state.schema.fields.map((field) => createFieldRow(record, field));
  elements.fieldForm.replaceChildren(...fields);
  renderMeta(record.missingFields, record.fieldIssues, record.unknownEntries);
}

function createFieldRow(record, field) {
  const fragment = elements.fieldTemplate.content.cloneNode(true);
  const row = fragment.querySelector('.field-row');
  const label = fragment.querySelector('.field-label');
  const help = fragment.querySelector('.field-help');
  const wrap = fragment.querySelector('.field-input-wrap');

  label.textContent = field.label;
  help.textContent = field.help || '';

  let input;
  if (field.type === 'multiline-string' || field.type === 'json-object' || field.type === 'json-string-array') {
    input = document.createElement('textarea');
    input.rows = field.type === 'multiline-string' ? 3 : 7;
  } else if (field.type === 'boolean') {
    input = document.createElement('select');
    for (const optionValue of ['true', 'false']) {
      const option = document.createElement('option');
      option.value = optionValue;
      option.textContent = optionValue;
      input.append(option);
    }
  } else {
    input = document.createElement('input');
    input.type = 'text';
  }

  input.value = record.formValues[field.key] ?? '';
  input.dataset.fieldKey = field.key;
  input.addEventListener('input', (event) => {
    record.formValues[field.key] = event.target.value;
    record.dirty[field.key] = true;
    renderOverview();
    if (field.key === 'name' || field.key === 'id') {
      renderEditorHeaderOnly(record);
    }
  });

  if (field.key === 'category' && state.schema.categoryOptions?.length) {
    appendDatalist(wrap, input, `category-options-${record.clientId}`, state.schema.categoryOptions);
  } else {
    wrap.append(input);
  }

  if (record.missingFields.includes(field.key)) {
    row.classList.add('missing');
  }
  if (record.fieldIssues.some((issue) => issue.key === field.key)) {
    row.classList.add('issue');
  }

  return fragment;
}

function appendDatalist(wrap, input, dataListId, options) {
  const dataList = document.createElement('datalist');
  dataList.id = dataListId;
  for (const value of options) {
    const option = document.createElement('option');
    option.value = value;
    dataList.append(option);
  }
  input.setAttribute('list', dataListId);
  wrap.append(input, dataList);
}

function renderEditorHeaderOnly(record) {
  elements.editorTitle.textContent = record.formValues.name || '(未命名)';
  elements.editorSubtitle.textContent = record.formValues.id || '(尚未設定 id)';
}

function renderMeta(missingFields, fieldIssues, unknownEntries) {
  renderPills(elements.missingFields, missingFields.length ? missingFields : null);
  renderWarnings(elements.fieldIssues, fieldIssues.length ? fieldIssues.map((issue) => `${issue.key}: ${issue.message}`) : null);
  renderUnknown(unknownEntries);
}

function renderPills(container, values) {
  container.replaceChildren();
  if (!values?.length) {
    container.textContent = '無';
    container.classList.add('empty-text');
    return;
  }
  container.classList.remove('empty-text');
  container.append(...values.map((value) => {
    const span = document.createElement('span');
    span.className = 'pill';
    span.textContent = value;
    return span;
  }));
}

function renderWarnings(container, values) {
  container.replaceChildren();
  if (!values?.length) {
    container.textContent = '無';
    container.classList.add('empty-text');
    return;
  }
  container.classList.remove('empty-text');
  container.append(...values.map((value) => {
    const div = document.createElement('div');
    div.className = 'warning-item';
    div.textContent = value;
    return div;
  }));
}

function renderUnknown(unknownEntries) {
  elements.unknownFields.replaceChildren();
  if (!unknownEntries.length) {
    elements.unknownFields.textContent = '無';
    elements.unknownFields.classList.add('empty-text');
    return;
  }

  elements.unknownFields.classList.remove('empty-text');
  elements.unknownFields.append(...unknownEntries.map((entry) => {
    const article = document.createElement('article');
    article.className = 'unknown-item';

    const heading = document.createElement('strong');
    heading.textContent = entry.key;

    const pre = document.createElement('pre');
    pre.textContent = entry.value;

    article.append(heading, pre);
    return article;
  }));
}

function renderMessage() {
  if (!state.message) {
    elements.messageBanner.hidden = true;
    elements.messageBanner.textContent = '';
    elements.messageBanner.className = 'message-banner';
    return;
  }

  elements.messageBanner.hidden = false;
  elements.messageBanner.textContent = state.message;
  elements.messageBanner.className = `message-banner ${state.messageTone}`;
}

function setMessage(message, tone = 'info') {
  state.message = message;
  state.messageTone = tone;
  renderMessage();
}

async function saveData() {
  const payload = {
    records: state.records.map((record) => ({
      originalId: record.originalId,
      isNew: record.isNew,
      formValues: record.formValues,
      dirty: record.dirty
    }))
  };

  const response = await fetch(`/api/data/${state.entity}/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload)
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || '儲存失敗。');
  }

  state.records = result.records.map((record) => ({
    clientId: crypto.randomUUID(),
    isNew: false,
    dirty: {},
    ...record
  }));

  if (state.records.length && state.selectedIndex >= 0) {
    state.selectedIndex = Math.min(state.selectedIndex, state.records.length - 1);
  } else {
    state.selectedIndex = -1;
    state.modalOpen = false;
  }

  state.saveResult = JSON.stringify({
    backupPath: result.backupPath,
    diff: result.diff
  }, null, 2);

  setMessage(entities[state.entity].savedMessage, 'success');
  render();
}

function addRecord() {
  const record = createEmptyRecord();
  state.records.unshift(record);
  state.selectedIndex = 0;
  state.modalOpen = true;
  setMessage(`已建立新${entities[state.entity].label}草稿。`, 'info');
  render();
}

function deleteSelectedRecord() {
  if (state.selectedIndex < 0) return;

  state.records.splice(state.selectedIndex, 1);
  if (state.records.length) {
    state.selectedIndex = Math.min(state.selectedIndex, state.records.length - 1);
    state.modalOpen = true;
  } else {
    state.selectedIndex = -1;
    state.modalOpen = false;
  }
  setMessage(`已從 editor 清單移除${entities[state.entity].label}；儲存後才會寫回檔案。`, 'info');
  render();
}

function changeSort(sortKey, type) {
  if (state.sortKey === sortKey) {
    state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    state.sortKey = sortKey;
    state.sortDirection = type === 'number' ? 'desc' : 'asc';
  }
  renderOverview();
}

function switchEntity(entity) {
  if (state.entity === entity) return;
  state.entity = entity;
  state.filterText = '';
  elements.filterInput.value = '';
  fetchData().catch((error) => setMessage(error.message, 'error'));
}

for (const [entity, button] of Object.entries(elements.entityTabs)) {
  button.addEventListener('click', () => switchEntity(entity));
}

elements.reloadButton.addEventListener('click', () => {
  fetchData().catch((error) => setMessage(error.message, 'error'));
});

elements.filterInput.addEventListener('input', (event) => {
  state.filterText = event.target.value;
  renderOverview();
});

elements.addButton.addEventListener('click', addRecord);
elements.deleteButton.addEventListener('click', deleteSelectedRecord);
elements.closeEditorButton.addEventListener('click', closeEditor);
elements.modalBackdrop.addEventListener('click', closeEditor);
elements.saveButton.addEventListener('click', () => {
  saveData().catch((error) => setMessage(error.message, 'error'));
});

fetchData().catch((error) => {
  setMessage(error.message, 'error');
});
