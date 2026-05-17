import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { deflateSync } from 'node:zlib';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const outDir = join(root, 'tmp', 'characters-perfect-pixel-128');
const width = 128;
const height = 256;

await mkdir(outDir, { recursive: true });

function rgba(hex) {
  if (hex === 'transparent') return [0, 0, 0, 0];
  const value = hex.replace('#', '');
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
    255
  ];
}

function rect(pixels, color, x, y, w, h) {
  const [r, g, b, a] = rgba(color);
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

const c = {
  line: '#1b1a1d',
  hair0: '#4a2b21',
  hair1: '#6a402d',
  hair2: '#8b593f',
  ribbon0: '#2f8b84',
  ribbon1: '#54b1aa',
  skin0: '#e0a778',
  skin1: '#f4c89c',
  skin2: '#be7657',
  eye0: '#1a413c',
  eye1: '#53b0a7',
  cape0: '#1d4d54',
  cape1: '#2f6f73',
  cape2: '#73b1a8',
  cloth0: '#efe2c1',
  cloth1: '#d5c39b',
  leather0: '#4d3524',
  leather1: '#7b5536',
  gold0: '#cfa857',
  gold1: '#f4d279',
  book0: '#6e4b34',
  book1: '#ebd7ac',
  boot0: '#5b3b27',
  boot1: '#7a5538',
  shadow: '#00000033'
};

const p = Buffer.alloc(width * height * 4);

// Shadow.
rect(p, c.shadow, 30, 226, 64, 8);
rect(p, c.line, 38, 222, 52, 4);

// Flowing cape silhouette.
rect(p, c.line, 20, 92, 74, 12);
rect(p, c.line, 18, 104, 84, 48);
rect(p, c.line, 12, 146, 34, 40);
rect(p, c.line, 72, 144, 36, 44);
rect(p, c.cape0, 22, 96, 70, 52);
rect(p, c.cape1, 18, 108, 80, 34);
rect(p, c.cape0, 14, 148, 28, 34);
rect(p, c.cape0, 74, 146, 30, 36);
rect(p, c.cape2, 34, 104, 20, 6);
rect(p, c.cape2, 60, 112, 18, 6);

// Large chibi head and ponytail.
rect(p, c.line, 34, 24, 54, 56);
rect(p, c.hair0, 38, 28, 46, 22);
rect(p, c.hair1, 34, 46, 16, 30);
rect(p, c.hair1, 72, 48, 14, 24);
rect(p, c.hair2, 50, 32, 26, 8);
rect(p, c.hair0, 58, 14, 10, 18);
rect(p, c.hair1, 66, 10, 12, 12);
rect(p, c.hair2, 73, 18, 9, 10);
rect(p, c.ribbon0, 50, 18, 10, 8);
rect(p, c.ribbon1, 44, 24, 12, 8);
rect(p, c.ribbon1, 38, 30, 8, 18);
rect(p, c.ribbon0, 44, 44, 8, 20);

// Face.
rect(p, c.skin0, 42, 44, 36, 30);
rect(p, c.skin1, 46, 48, 28, 18);
rect(p, c.skin2, 44, 70, 32, 4);
rect(p, c.hair0, 39, 40, 10, 20);
rect(p, c.hair0, 70, 42, 10, 18);
rect(p, c.line, 48, 53, 10, 8);
rect(p, c.line, 63, 55, 10, 8);
rect(p, c.eye1, 50, 55, 6, 4);
rect(p, c.eye1, 65, 57, 6, 4);
rect(p, '#ffffff', 52, 54, 2, 2);
rect(p, '#ffffff', 67, 56, 2, 2);
rect(p, c.eye0, 54, 56, 2, 3);
rect(p, c.eye0, 69, 58, 2, 3);
rect(p, c.skin2, 58, 67, 5, 2);
rect(p, '#d9877a', 56, 63, 3, 2);
rect(p, '#d9877a', 68, 64, 3, 2);

// Neck and brooch.
rect(p, c.skin0, 54, 78, 12, 8);
rect(p, c.gold0, 56, 88, 12, 10);
rect(p, c.gold1, 59, 90, 6, 6);

// Tunic and front cloth.
rect(p, c.cloth0, 42, 96, 36, 48);
rect(p, c.cloth1, 46, 98, 28, 42);
rect(p, c.cape1, 38, 92, 46, 14);
rect(p, c.cape2, 44, 100, 34, 5);
rect(p, c.cape1, 52, 98, 10, 44);
rect(p, c.line, 40, 140, 44, 6);
rect(p, c.leather1, 42, 142, 40, 7);
rect(p, c.gold0, 56, 140, 11, 11);
rect(p, c.leather0, 58, 143, 7, 6);
rect(p, c.cape1, 46, 146, 22, 24);
rect(p, c.cape2, 49, 150, 16, 18);

// Right arm on waist.
rect(p, c.line, 68, 104, 18, 36);
rect(p, c.cloth0, 70, 106, 14, 12);
rect(p, c.skin0, 72, 118, 10, 16);
rect(p, c.skin1, 70, 132, 14, 8);
rect(p, c.line, 66, 136, 18, 6);

// Left arm raised with ledger.
rect(p, c.line, 22, 98, 18, 30);
rect(p, c.cloth0, 24, 100, 14, 10);
rect(p, c.skin0, 22, 110, 12, 16);
rect(p, c.skin1, 24, 124, 10, 7);
rect(p, c.book0, 8, 94, 16, 24);
rect(p, c.book1, 10, 96, 12, 20);
rect(p, c.book0, 12, 100, 9, 2);
rect(p, c.book0, 12, 106, 8, 2);
rect(p, c.ribbon0, 18, 90, 5, 8);

// Side satchel and trim.
rect(p, c.leather0, 74, 146, 10, 30);
rect(p, c.leather1, 72, 150, 14, 22);
rect(p, c.gold0, 75, 154, 8, 8);
rect(p, c.leather1, 36, 132, 4, 36);

// Shorts.
rect(p, c.leather0, 46, 170, 30, 18);
rect(p, c.leather1, 52, 172, 12, 10);

// Legs in a stepping pose.
rect(p, c.skin0, 48, 188, 12, 28);
rect(p, c.skin1, 50, 188, 8, 18);
rect(p, c.skin0, 66, 184, 12, 24);
rect(p, c.skin1, 68, 184, 8, 16);

// Boots and cuffs.
rect(p, c.cape2, 46, 208, 15, 5);
rect(p, c.cape2, 66, 200, 15, 5);
rect(p, c.boot0, 42, 214, 24, 24);
rect(p, c.boot1, 46, 216, 16, 8);
rect(p, c.boot0, 64, 206, 25, 28);
rect(p, c.boot1, 68, 208, 16, 8);
rect(p, c.line, 40, 234, 26, 5);
rect(p, c.line, 64, 230, 27, 5);

await writeFile(join(outDir, 'aida-q-dynamic.png'), pngFromRgba(p));

console.log(`Wrote native perfect-pixel Aida trial to ${join(outDir, 'aida-q-dynamic.png')}`);
