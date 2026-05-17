export const itemSchema = {
  entity: 'items',
  version: 'items@v1',
  title: '道具編輯器',
  rules: [
    'Editor schema is manually maintained and must not auto-sync to data shape changes.',
    'Do not update editor fields or categories unless the user explicitly asks to update the editor.',
    'Unknown properties from data files must be preserved during save.',
    'Missing known properties may be displayed with defaults, but must not be written back unless the user edits them.',
    'When an old editor opens newer data, extra properties must be preserved and surfaced as unknown properties.',
    'When a newer editor opens older data, missing properties must be tolerated and surfaced as missing fields.',
    'Saving must use field-level merge, not full-object replacement.'
  ],
  categoryOptions: [
    'consumable',
    'equipment',
    'tool',
    'material',
    'resource',
    'currency',
    'key_material',
    'quest_item',
    'clue'
  ],
  overviewColumns: [
    { key: 'id', label: 'ID', type: 'string' },
    { key: 'name', label: '名稱', type: 'string' },
    { key: 'category', label: '分類', type: 'string' },
    { key: 'weight', label: '重量', type: 'number' },
    { key: 'stackable', label: '堆疊', type: 'boolean' },
    { key: 'maxStack', label: '最大堆疊', type: 'number' },
    { key: 'status', label: '狀態', type: 'status' }
  ],
  fields: [
    { key: 'id', label: 'ID', type: 'string', required: true, defaultValue: '', help: '唯一識別碼。' },
    { key: 'name', label: '名稱', type: 'string', required: true, defaultValue: '', help: '顯示名稱。' },
    { key: 'category', label: '分類', type: 'string', required: true, defaultValue: 'consumable', help: '暫時只提供建議值，不限制未知分類。' },
    { key: 'description', label: '描述', type: 'multiline-string', required: false, defaultValue: '', help: '道具敘述。' },
    { key: 'stackable', label: '可堆疊', type: 'boolean', required: true, defaultValue: true, help: 'true 或 false。' },
    { key: 'maxStack', label: '最大堆疊', type: 'number', required: true, defaultValue: 99, help: '可為整數。' },
    { key: 'weight', label: '重量', type: 'number', required: true, defaultValue: 0, help: '允許小數。' },
    { key: 'effects', label: '效果', type: 'json-object', required: false, defaultValue: {}, help: 'JSON 物件。' },
    { key: 'timeCostSeconds', label: '耗時秒數', type: 'number', required: true, defaultValue: 0, help: '互動耗時。' },
    { key: 'source', label: '來源', type: 'json-string-array', required: false, defaultValue: [], help: 'JSON 字串陣列。' },
    { key: 'relatedVillagers', label: '關聯角色', type: 'json-string-array', required: false, defaultValue: [], help: 'JSON 字串陣列。' },
    { key: 'tags', label: '標籤', type: 'json-string-array', required: false, defaultValue: [], help: 'JSON 字串陣列。' }
  ]
};

export const facilitySchema = {
  entity: 'facilities',
  version: 'facilities@v1',
  title: '設施編輯器',
  rules: itemSchema.rules,
  categoryOptions: [
    'facility'
  ],
  overviewColumns: [
    { key: 'id', label: 'ID', type: 'string' },
    { key: 'name', label: '名稱', type: 'string' },
    { key: 'facilityType', label: '設施類型', type: 'string' },
    { key: 'locationIds', label: '地點', type: 'json-string-array' },
    { key: 'status', label: '狀態', type: 'status' }
  ],
  fields: [
    { key: 'id', label: 'ID', type: 'string', required: true, defaultValue: '', help: '唯一識別碼。' },
    { key: 'name', label: '名稱', type: 'string', required: true, defaultValue: '', help: '顯示名稱。' },
    { key: 'category', label: '分類', type: 'string', required: true, defaultValue: 'facility', help: '設施資料目前固定為 facility。' },
    {
      key: 'facilityType',
      label: '設施類型',
      type: 'string',
      required: true,
      defaultValue: 'information',
      help: '例如 small_storage、container、information、upgradeable、crafting、special_access。'
    },
    { key: 'description', label: '描述', type: 'multiline-string', required: false, defaultValue: '', help: '設施敘述。' },
    { key: 'locationIds', label: '地點 ID', type: 'json-string-array', required: true, defaultValue: [], help: 'JSON 字串陣列，對應 locations.json 的 id 或探索 scene id。' },
    { key: 'parentFacilities', label: '上層設施', type: 'json-string-array', required: false, defaultValue: [], help: 'JSON 字串陣列。沒有上層可留空陣列。' },
    { key: 'baseActions', label: '基礎互動', type: 'json-string-array', required: false, defaultValue: [], help: 'JSON 字串陣列，例如 inspect、withdraw。' },
    { key: 'smallStorage', label: '小倉庫規則', type: 'json-object', required: false, defaultValue: {}, help: 'JSON 物件。小倉庫設施用，保存取出/補貨規則。' },
    { key: 'storage', label: '倉庫規則', type: 'json-object', required: false, defaultValue: {}, help: 'JSON 物件。一般可存放倉庫用。' },
    { key: 'upgrade', label: '升級規則', type: 'json-object', required: false, defaultValue: {}, help: 'JSON 物件。可升級設施用。' },
    { key: 'recovery', label: '恢復規則', type: 'json-object', required: false, defaultValue: {}, help: 'JSON 物件。恢復設施用。' },
    { key: 'crafting', label: '製作規則', type: 'json-object', required: false, defaultValue: {}, help: 'JSON 物件。製作設施用。' },
    { key: 'access', label: '入口規則', type: 'json-object', required: false, defaultValue: {}, help: 'JSON 物件。特殊入口設施用。' },
    { key: 'dailyMessages', label: '每日留言', type: 'json-object', required: false, defaultValue: {}, help: 'JSON 物件。看板等資訊設施用。' },
    { key: 'functionality', label: '功能描述', type: 'json-object', required: false, defaultValue: {}, help: 'JSON 物件。' },
    { key: 'tags', label: '標籤', type: 'json-string-array', required: false, defaultValue: [], help: 'JSON 字串陣列。' }
  ]
};

export function getSchema(entity) {
  if (entity === 'items') {
    return itemSchema;
  }

  if (entity === 'facilities') {
    return facilitySchema;
  }

  return null;
}
