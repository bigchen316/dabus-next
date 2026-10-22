// 从页面实际使用的 PNG 生成同尺寸、保留透明通道的 WebP；原 PNG 保留作回退与源素材。
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");
const root = path.resolve(__dirname, "../public");
const files = [
  "illustrations/daba-wave-01.png",
  "illustrations/daba-ip-24-actions-transparent.png",
  "illustrations/daba-laptop-transparent.png",
];

(async () => {
  for (const file of files) {
    const source = path.join(root, file);
    const target = source.replace(/\.png$/, ".webp");
    await sharp(source).webp({ quality: 86, alphaQuality: 100, effort: 6 }).toFile(target);
    const kb = f => Math.round(fs.statSync(f).size / 1024);
    console.log(`${file}: ${kb(source)} KB -> ${kb(target)} KB`);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
