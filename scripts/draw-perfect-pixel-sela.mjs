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

function mirrorRect(pixels, color, x, y, w, h) {
  rect(pixels, color, x, y, w, h);
  rect(pixels, color, width - x - w, y, w, h);
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
  line: '#17191d',
  hair0: '#171a1c',
  hair1: '#272b2d',
  hair2: '#3d3a35',
  skin0: '#f2b184',
  skin1: '#ffd0a7',
  skin2: '#c5795a',
  eye0: '#102014',
  eye1: '#4c8b4d',
  cloak0: '#152614',
  cloak1: '#2e4a27',
  cloak2: '#5f7a39',
  leather0: '#3b2517',
  leather1: '#7b4b25',
  gold: '#caa45a',
  boot: '#2a1b13',
  white: '#f1ead2'
};

const p = Buffer.alloc(width * height * 4);

// Bow and quiver behind body.
rect(p, c.leather1, 94, 54, 5, 112);
rect(p, c.leather1, 98, 62, 4, 8);
rect(p, c.leather1, 90, 78, 4, 9);
rect(p, c.leather0, 34, 78, 11, 50);
rect(p, c.gold, 30, 82, 4, 38);
rect(p, c.white, 25, 80, 8, 18);
rect(p, c.white, 27, 99, 8, 18);

// Cloak silhouette.
rect(p, c.line, 30, 87, 68, 10);
rect(p, c.line, 24, 96, 80, 80);
rect(p, c.line, 18, 154, 24, 56);
rect(p, c.line, 86, 154, 24, 56);
rect(p, c.cloak0, 29, 96, 70, 76);
rect(p, c.cloak1, 25, 112, 78, 52);
rect(p, c.cloak0, 22, 164, 18, 44);
rect(p, c.cloak0, 88, 164, 18, 44);
rect(p, c.cloak2, 38, 105, 12, 6);
rect(p, c.cloak2, 78, 105, 12, 6);
rect(p, c.gold, 55, 104, 18, 7);

// Head and hair.
rect(p, c.line, 39, 25, 50, 58);
rect(p, c.hair0, 42, 28, 44, 34);
rect(p, c.hair1, 36, 45, 14, 35);
rect(p, c.hair1, 78, 45, 14, 35);
rect(p, c.hair2, 52, 31, 30, 8);
rect(p, c.hair0, 58, 17, 11, 14);
rect(p, c.hair1, 64, 11, 15, 9);
rect(p, c.hair0, 72, 18, 8, 10);

rect(p, c.skin0, 45, 51, 38, 35);
rect(p, c.skin1, 50, 55, 28, 20);
rect(p, c.skin2, 45, 79, 38, 5);
rect(p, c.hair0, 42, 47, 10, 22);
rect(p, c.hair0, 75, 47, 10, 22);
rect(p, c.hair1, 55, 43, 8, 22);
rect(p, c.hair1, 65, 41, 8, 25);

// Face.
rect(p, c.line, 50, 63, 13, 9);
rect(p, c.line, 66, 63, 13, 9);
rect(p, c.eye1, 53, 65, 6, 5);
rect(p, c.eye1, 69, 65, 6, 5);
rect(p, '#ffffff', 55, 64, 2, 2);
rect(p, '#ffffff', 71, 64, 2, 2);
rect(p, c.eye0, 58, 66, 2, 4);
rect(p, c.eye0, 74, 66, 2, 4);
rect(p, c.skin2, 62, 77, 6, 2);

// Leaf hairpin.
rect(p, '#6e9a3d', 82, 44, 8, 6);
rect(p, '#9abd54', 87, 39, 7, 6);
rect(p, c.line, 81, 49, 10, 3);

// Body and belt.
rect(p, c.skin0, 57, 86, 14, 8);
rect(p, c.cloak1, 44, 94, 40, 48);
rect(p, c.cloak2, 53, 101, 22, 32);
rect(p, c.line, 41, 137, 46, 6);
rect(p, c.leather1, 43, 139, 42, 7);
rect(p, c.gold, 58, 136, 13, 12);
rect(p, c.line, 60, 138, 9, 8);

// Arms.
mirrorRect(p, c.line, 28, 112, 10, 44);
mirrorRect(p, c.skin0, 30, 118, 8, 30);
mirrorRect(p, c.leather0, 29, 142, 11, 10);
mirrorRect(p, c.skin1, 31, 152, 8, 7);

// Shorts, legs, boots.
rect(p, c.leather0, 46, 146, 36, 24);
rect(p, c.skin0, 48, 170, 13, 36);
rect(p, c.skin0, 68, 170, 13, 36);
rect(p, c.cloak2, 47, 188, 14, 5);
rect(p, c.cloak2, 68, 188, 14, 5);
rect(p, c.boot, 42, 204, 23, 30);
rect(p, c.boot, 65, 204, 23, 30);
rect(p, c.leather1, 45, 208, 17, 7);
rect(p, c.leather1, 68, 208, 17, 7);
rect(p, c.line, 40, 229, 25, 7);
rect(p, c.line, 65, 229, 25, 7);

// Decorative charm.
rect(p, c.gold, 81, 138, 10, 14);
rect(p, c.leather1, 84, 133, 4, 8);
rect(p, c.line, 84, 144, 4, 3);

await writeFile(join(outDir, 'sela.png'), pngFromRgba(p));

const manifest = [{
  id: 'sela',
  image: 'tmp/characters-perfect-pixel-128/sela.png',
  width,
  height,
  paletteSize: Object.keys(c).length + 2,
  nativePixelArt: true
}];

await writeFile(join(outDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`Wrote native perfect-pixel sample to ${join(outDir, 'sela.png')}`);
