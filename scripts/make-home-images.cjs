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

(async () => {
  for (const [name, file] of Object.entries(figures)) {
    await sharp(path.join(src, file)).resize(900, 900).webp({ quality: 82 }).toFile(path.join(out, name + ".webp"));
  }
  // 小车图的源文件已不在资料夹中，没有时保留现有的 daba-car.webp。
  const car = path.join(src, "ChatGPT 图像 2026年10月20日 01_27_21.png");
  if (fs.existsSync(car)) await sharp(car).resize(1200).webp({ quality: 82 }).toFile(path.join(out, "daba-car.webp"));

  // 首屏转盘：熬夜款 24 帧透明渲染。所有帧按同一个外框裁切，转动时人物不会跳位。
  const ttSrc = path.join(src, "渲染/公仔转盘/05_熬夜款");
  const ttOut = path.join(out, "turntable-sleep");
  fs.mkdirSync(ttOut, { recursive: true });
  const frames = fs.readdirSync(ttSrc).filter(f => /^f_\d+\.png$/.test(f)).sort();
  // 渲染图整张画布带一层 alpha ≤ 约 70 的雾，去掉它：alpha 80 以下归零，其余线性拉回 0～255，边缘仍保持柔和。
  const cleaned = {};
  for (const f of frames) {
    const { data, info } = await sharp(path.join(ttSrc, f)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let i = 3; i < data.length; i += 4) data[i] = Math.max(0, Math.min(255, Math.round((data[i] - 80) * 255 / 175)));
    cleaned[f] = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
  }
  let box = { left: Infinity, top: Infinity, right: 0, bottom: 0 };
  for (const f of frames) {
    const { data, info } = await sharp(cleaned[f]).extractChannel(3).raw().toBuffer({ resolveWithObject: true });
    for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
      if (data[y * info.width + x] > 8) {
        if (x < box.left) box.left = x; if (x > box.right) box.right = x;
        if (y < box.top) box.top = y; if (y > box.bottom) box.bottom = y;
      }
    }
  }
  const pad = 12;
  const full = await sharp(path.join(ttSrc, frames[0])).metadata();
  const left = Math.max(0, box.left - pad), top = Math.max(0, box.top - pad);
  const region = { left, top, width: Math.min(full.width, box.right + pad + 1) - left, height: Math.min(full.height, box.bottom + pad + 1) - top };
  console.log("turntable crop", JSON.stringify(region));
  for (const [i, f] of frames.entries()) {
    await sharp(cleaned[f]).extract(region).resize({ height: 880 }).webp({ quality: 80, alphaQuality: 90 }).toFile(path.join(ttOut, `f_${String(i).padStart(2, "0")}.webp`));
  }
  const ttFiles = fs.readdirSync(ttOut);
  const ttMeta = await sharp(path.join(ttOut, ttFiles[0])).metadata();
  console.log("turntable-sleep", ttFiles.length + " frames", ttMeta.width + "x" + ttMeta.height,
    Math.round(ttFiles.reduce((n, f) => n + fs.statSync(path.join(ttOut, f)).size, 0) / 1024) + " KB total");

  for (const f of fs.readdirSync(out)) console.log(f, Math.round(fs.statSync(path.join(out, f)).size / 1024) + " KB");
})().catch(error => { console.error(error); process.exitCode = 1; });
