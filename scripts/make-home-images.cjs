// 从 E:\个人IP形象文件 导出首页用的 3D 形象 WebP。星空素材见 make-starfield.cjs。
// 用法：node scripts/make-home-images.cjs "E:\个人IP形象文件"
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");
const src = process.argv[2];
const out = path.resolve(__dirname, "../public/home");
fs.mkdirSync(out, { recursive: true });

const figures = {
  "fig-basketball": "混元3D上传/02_篮球款.png",
  "fig-ai": "混元3D上传/03_AI学习款.png",
  "fig-study": "混元3D上传/04_学霸款.png",
  "fig-sleep": "混元3D上传/05_熬夜款.png",
  "fig-coffee": "混元3D上传/06_咖啡款.png",
  "fig-newyear": "混元3D上传/07_新年款.png",
  "fig-super": "混元3D上传/09_彩蛋_超能大巴.png",
};

async function exportTurntable(model, name, label, centerFrames = false) {
  const ttSrc = path.join(src, "渲染/公仔转盘", model);
  const ttOut = path.join(out, name);
  const frames = fs.readdirSync(ttSrc).filter(f => /^f_\d+\.png$/.test(f)).sort();
  if (frames.length !== 24) throw new Error(`${model}: expected 24 frames, found ${frames.length}`);
  fs.mkdirSync(ttOut, { recursive: true });

  const images = [];
  const union = { left: Infinity, top: Infinity, right: 0, bottom: 0 };
  for (const file of frames) {
    const { data, info } = await sharp(path.join(ttSrc, file)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const box = { left: Infinity, top: Infinity, right: 0, bottom: 0 };
    // 去掉渲染画布的低 alpha 雾，同时保留柔和的模型边缘。
    for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4 + 3;
      data[i] = Math.max(0, Math.min(255, Math.round((data[i] - 80) * 255 / 175)));
      if (data[i] > 8) {
        box.left = Math.min(box.left, x); box.right = Math.max(box.right, x);
        box.top = Math.min(box.top, y); box.bottom = Math.max(box.bottom, y);
      }
    }
    if (!Number.isFinite(box.left)) throw new Error(`${model}/${file}: empty frame`);
    union.left = Math.min(union.left, box.left); union.right = Math.max(union.right, box.right);
    union.top = Math.min(union.top, box.top); union.bottom = Math.max(union.bottom, box.bottom);
    const cleaned = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
    images.push({ cleaned, box, width: info.width, height: info.height });
  }

  const regionFor = (box, image) => {
    const left = Math.max(0, box.left - 12), top = Math.max(0, box.top - 12);
    return { left, top, width: Math.min(image.width, box.right + 13) - left, height: Math.min(image.height, box.bottom + 13) - top };
  };
  const regions = images.map(image => regionFor(centerFrames ? image.box : union, image));
  const width = Math.max(...regions.map(region => region.width));
  const height = Math.max(...regions.map(region => region.height));
  for (const [i, image] of images.entries()) {
    const region = regions[i];
    let normalized;
    if (centerFrames) {
      const crop = await sharp(image.cleaned).extract(region).png().toBuffer();
      // 各帧共用同一画布，每帧的可见轮廓中心都对齐画布中心。
      const centered = await sharp({ create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
        .composite([{ input: crop, left: Math.floor((width - region.width) / 2), top: Math.floor((height - region.height) / 2) }]).png().toBuffer();
      normalized = sharp(centered);
    } else {
      normalized = sharp(image.cleaned).extract(region);
    }
    await normalized.resize({ height: 880 }).webp({ quality: 80, alphaQuality: 90 }).toFile(path.join(ttOut, `f_${String(i).padStart(2, "0")}.webp`));
  }
  const meta = await sharp(path.join(ttOut, "f_00.webp")).metadata();
  fs.writeFileSync(path.join(ttOut, "metadata.json"), JSON.stringify({ label, model, frames: frames.length, width: meta.width, height: meta.height, alignment: centerFrames ? "center" : "shared-crop" }, null, 2) + "\n");
  console.log(name, `${frames.length} frames`, `${meta.width}x${meta.height}`, centerFrames ? "centered" : "shared crop");
}

(async () => {
  for (const [name, file] of Object.entries(figures)) {
    await sharp(path.join(src, file)).resize(900, 900).webp({ quality: 82 }).toFile(path.join(out, name + ".webp"));
  }
  // 产品板块：盲盒包装图和全款公仔排列图，取自 daba-cyber-blindbox 仓库。
  const productImages = path.join(src, "GitHub上传/daba-cyber-blindbox/docs/images");
  await sharp(path.join(productImages, "box.jpg")).resize(720).webp({ quality: 82 }).toFile(path.join(out, "product-box.webp"));
  await sharp(path.join(productImages, "lineup.jpg")).webp({ quality: 80 }).toFile(path.join(out, "product-lineup.webp"));

  // 首屏沿用用户选择的基础款；旧熬夜款也继续由同一脚本生成。
  await exportTurntable("01_基础款", "turntable-base", "基础款", true);
  await exportTurntable("05_熬夜款", "turntable-sleep", "熬夜款");

  for (const f of fs.readdirSync(out)) console.log(f, Math.round(fs.statSync(path.join(out, f)).size / 1024) + " KB");
})().catch(error => { console.error(error); process.exitCode = 1; });
