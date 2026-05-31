import { copyFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logo = join(root, "public/logo.png");
const appDir = join(root, "src/app");

copyFileSync(logo, join(appDir, "icon.png"));
copyFileSync(logo, join(appDir, "apple-icon.png"));

const sizes = [16, 32, 48];
const pngBuffers = await Promise.all(
  sizes.map((size) =>
    sharp(logo)
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer(),
  ),
);

const headerSize = 6 + sizes.length * 16;
let offset = headerSize;
const entries = pngBuffers.map((buffer, index) => {
  const entry = { width: sizes[index], height: sizes[index], buffer, offset };
  offset += buffer.length;
  return entry;
});

const ico = Buffer.alloc(offset);
ico.writeUInt16LE(0, 0);
ico.writeUInt16LE(1, 2);
ico.writeUInt16LE(sizes.length, 4);

entries.forEach((entry, index) => {
  const base = 6 + index * 16;
  ico.writeUInt8(entry.width >= 256 ? 0 : entry.width, base);
  ico.writeUInt8(entry.height >= 256 ? 0 : entry.height, base + 1);
  ico.writeUInt8(0, base + 2);
  ico.writeUInt8(0, base + 3);
  ico.writeUInt16LE(1, base + 4);
  ico.writeUInt16LE(32, base + 6);
  ico.writeUInt32LE(entry.buffer.length, base + 8);
  ico.writeUInt32LE(entry.offset, base + 12);
  entry.buffer.copy(ico, entry.offset);
});

writeFileSync(join(appDir, "favicon.ico"), ico);
writeFileSync(join(root, "public/favicon.ico"), ico);
