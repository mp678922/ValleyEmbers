import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { deflateSync } from 'node:zlib';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const outDir = join(root, 'public', 'assets', 'characters');
const villagerPath = join(root, 'docs', 'data', 'villagers', 'villagers.json');

const width = 128;
const height = 256;

const villagers = JSON.parse(await readFile(villagerPath, 'utf8'));
await mkdir(outDir, { recursive: true });

const palettes = {
  player: { hair: '#2b211b', skin: '#d99a6c', shirt: '#5d665f', pants: '#3b4251', accent: '#b9a66a', tool: 'pack' },
  aida: { hair: '#4a2a20', skin: '#e0a778', shirt: '#355f73', pants: '#2f4657', accent: '#d3b35c', tool: 'ledger' },
  mira: { hair: '#6f5035', skin: '#e4b184', shirt: '#4f7d68', pants: '#3f5548', accent: '#d8e1a3', tool: 'herb' },
  nuosi: { hair: '#7b3f27', skin: '#dfa06f', shirt: '#8a5a36', pants: '#4c443c', accent: '#c9b07a', tool: 'hammer' },
  sela: { hair: '#20242a', skin: '#d69b70', shirt: '#4f6341', pants: '#343b35', accent: '#9b7042', tool: 'bow' },
  tori: { hair: '#b66b32', skin: '#e5ad78', shirt: '#bd7b44', pants: '#59663f', accent: '#f0d36c', tool: 'basket' },
  elaine: { hair: '#332538', skin: '#dca580', shirt: '#594875', pants: '#3a3147', accent: '#b8a5d9', tool: 'book' }
};

const characters = [
  { id: 'player', name: '主角', role: '外來者', palette: palettes.player },
  ...villagers.map((villager) => ({
    id: villager.id,
    name: villager.name,
    role: villager.role,
    palette: palettes[villager.id]
  }))
];

function rgba(hex) {
  const value = hex.replace('#', '');
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
    value.length === 8 ? Number.parseInt(value.slice(6, 8), 16) : 255
  ];
}

function rect(pixels, hex, x, y, w, h) {
  const [r, g, b, a] = rgba(hex);
  for (let py = y; py < y + h; py += 1) {
    if (py < 0 || py >= height) continue;
    for (let px = x; px < x + w; px += 1) {
      if (px < 0 || px >= width) continue;
      const i = (py * width + px) * 4;
      pixels[i] = r;
      pixels[i + 1] = g;
      pixels[i + 2] = b;
      pixels[i + 3] = a;
    }
  }
}

function crc32(buffer) {
  let crc = ~0;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return ~crc >>> 0;
}

function chunk(type, data) {
  const name = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, checksum]);
}

function pngFromRgba(pixels) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const rowStart = y * (width * 4 + 1);
    raw[rowStart] = 0;
    pixels.copy(raw, rowStart + 1, y * width * 4, (y + 1) * width * 4);
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

function drawSprite(character) {
  const pixels = Buffer.alloc(width * height * 4);
  const p = character.palette;

  rect(pixels, p.hair, 42, 34, 44, 24);
  rect(pixels, p.hair, 38, 54, 52, 30);
  rect(pixels, p.skin, 44, 46, 40, 42);
  rect(pixels, '#b97858', 44, 82, 40, 6);
  rect(pixels, p.hair, 38, 42, 12, 26);
  rect(pixels, p.hair, 78, 42, 12, 26);

  rect(pixels, '#33251f', 52, 64, 6, 6);
  rect(pixels, '#33251f', 70, 64, 6, 6);
  rect(pixels, '#8f5f4d', 60, 76, 12, 4);

  rect(pixels, p.skin, 56, 88, 16, 10);
  rect(pixels, p.shirt, 40, 96, 48, 58);
  rect(pixels, '#23262b', 40, 150, 48, 6);
  rect(pixels, p.accent, 56, 96, 16, 58);
  rect(pixels, p.shirt, 30, 100, 14, 56);
  rect(pixels, p.shirt, 84, 100, 14, 56);
  rect(pixels, p.skin, 28, 152, 16, 16);
  rect(pixels, p.skin, 84, 152, 16, 16);

  rect(pixels, p.pants, 44, 156, 18, 56);
  rect(pixels, p.pants, 66, 156, 18, 56);
  rect(pixels, '#24272c', 40, 210, 24, 12);
  rect(pixels, '#24272c', 66, 210, 24, 12);

  if (p.tool === 'pack') {
    rect(pixels, '#6a4f37', 88, 116, 14, 34);
    rect(pixels, '#b9a66a', 88, 116, 14, 6);
  } else if (p.tool === 'ledger') {
    rect(pixels, '#e4d5a8', 22, 132, 16, 22);
    rect(pixels, '#6d4c3d', 24, 136, 12, 3);
    rect(pixels, '#6d4c3d', 24, 144, 10, 3);
  } else if (p.tool === 'herb') {
    rect(pixels, '#557a3d', 24, 132, 4, 28);
    rect(pixels, '#79a957', 16, 130, 12, 8);
    rect(pixels, '#79a957', 28, 140, 12, 8);
  } else if (p.tool === 'hammer') {
    rect(pixels, '#8b6f4e', 92, 130, 6, 38);
    rect(pixels, '#6a6f75', 82, 124, 24, 10);
  } else if (p.tool === 'bow') {
    rect(pixels, '#8f6841', 94, 104, 4, 70);
    rect(pixels, '#d9c59b', 90, 112, 2, 52);
    rect(pixels, '#d9c59b', 98, 112, 2, 52);
  } else if (p.tool === 'basket') {
    rect(pixels, '#a66d3f', 88, 134, 22, 22);
    rect(pixels, '#d1a15d', 92, 128, 14, 6);
    rect(pixels, '#6e4b2e', 90, 144, 18, 3);
  } else if (p.tool === 'book') {
    rect(pixels, '#7e73a6', 90, 134, 16, 18);
    rect(pixels, '#d8c56d', 94, 138, 8, 10);
    rect(pixels, '#9ad7d2', 96, 140, 4, 4);
  }

  rect(pixels, '#1b1d22', 42, 222, 46, 4);
  rect(pixels, '#00000033', 36, 226, 56, 6);

  return pngFromRgba(pixels);
}

const manifest = [];
for (const character of characters) {
  const fileName = `${character.id}.png`;
  await writeFile(join(outDir, fileName), drawSprite(character));
  manifest.push({
    id: character.id,
    name: character.name,
    role: character.role,
    image: `assets/characters/${fileName}`,
    width,
    height
  });
}

await writeFile(join(outDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`Generated ${manifest.length} character sprites in ${outDir}`);
