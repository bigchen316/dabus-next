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
  await sharp(path.join(src, "ChatGPT 图像 2026年10月20日 01_27_21.png")).resize(1200).webp({ quality: 82 }).toFile(path.join(out, "daba-car.webp"));

  // 规范第 8 页：深色或彩色底上的人物加约 1.5% 人物高度的纸白贴纸边。
  const cut = path.join(src, "blender素材/公仔_基础款_透明.png");
  const { width, height } = await sharp(cut).metadata();
  const pad = Math.round(height * 0.015);
  // 原透明图边缘有一圈低透明度的浅色雾边，先清掉，否则贴纸边外会像光晕。
  const rgb = await sharp(cut).removeAlpha().toBuffer();
  const hardAlpha = await sharp(cut).extractChannel(3).threshold(96).toBuffer();
  const clean = await sharp(rgb).joinChannel(hardAlpha).png().toBuffer();
  const padded = await sharp(clean).extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  // sharp 管线内操作顺序固定，模糊和二值化分两步才能得到干净的外扩硬边。
  const blurred = await sharp(padded).extractChannel(3).blur(pad / 2).png().toBuffer();
  const alpha = await sharp(blurred).threshold(40).toBuffer();
  const white = await sharp({ create: { width: width + pad * 2, height: height + pad * 2, channels: 3, background: "#FEFCF6" } }).joinChannel(alpha).png().toBuffer();
  await sharp(white).composite([{ input: padded }]).webp({ quality: 86, alphaQuality: 100 }).toFile(path.join(out, "hero-sticker.webp"));

  for (const f of fs.readdirSync(out)) console.log(f, Math.round(fs.statSync(path.join(out, f)).size / 1024) + " KB");
})().catch(error => { console.error(error); process.exitCode = 1; });
