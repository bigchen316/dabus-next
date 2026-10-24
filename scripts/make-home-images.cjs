// 从 E:\个人IP形象文件 导出首页用的 3D 形象 WebP。星空素材见 make-starfield.cjs。
// 用法：node scripts/make-home-images.cjs "E:\个人IP形象文件"
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");
const os = require("node:os");
const { createHash } = require("node:crypto");
const { spawnSync } = require("node:child_process");
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

function headAxisSource() {
  const model = path.join(src, "blender素材/3D模型/01_基础款.glb");
  const renderer = path.join(__dirname, "render-home-turntable.py");
  const key = createHash("sha256").update(fs.readFileSync(model)).update(fs.readFileSync(renderer)).digest("hex").slice(0, 20);
  const cache = path.join(os.tmpdir(), "dabus-head-axis", key);
  if (!fs.existsSync(path.join(cache, "axis.json")) || Array.from({ length: 24 }, (_, i) => `f_${String(i).padStart(2, "0")}.png`).some(file => !fs.existsSync(path.join(cache, file)))) {
    const blender = process.env.BLENDER_PATH || "C:/Program Files/Blender Foundation/Blender 5.2/blender.exe";
    if (!fs.existsSync(blender)) throw new Error("Set BLENDER_PATH to the local Blender executable to generate the head-axis turntable.");
    console.log("Rendering base figure around the head axis; subsequent exports reuse this cache.");
    const result = spawnSync(blender, ["--background", "--python", renderer, "--", "--model", model, "--out", cache], { stdio: "inherit" });
    if (result.error || result.status !== 0) throw result.error || new Error(`Blender exited with ${result.status}`);
  }
  return cache;
}

async function exportTurntable(model, name, label, axisSource) {
  const ttSrc = axisSource || path.join(src, "渲染/公仔转盘", model);
  const axis = axisSource ? JSON.parse(fs.readFileSync(path.join(ttSrc, "axis.json"), "utf8")) : null;
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
  const regions = images.map(image => {
    const region = regionFor(union, image);
    if (!axis) return region;
    // 所有角度保留同一相机画布，以穿过头部中心的固定竖线为轴，禁止逐帧追着外轮廓居中。
    const halfWidth = Math.ceil(Math.max(axis.axisX - region.left, region.left + region.width - axis.axisX));
    const left = axis.axisX - halfWidth;
    if (left < 0 || axis.axisX + halfWidth > image.width) throw new Error("Head-axis crop exceeds the rendered canvas.");
    return { ...region, left, width: halfWidth * 2 };
  });
  for (const [i, image] of images.entries()) {
    const region = regions[i];
    const normalized = sharp(image.cleaned).extract(region);
    await normalized.resize({ height: 880 }).webp({ quality: 80, alphaQuality: 90 }).toFile(path.join(ttOut, `f_${String(i).padStart(2, "0")}.webp`));
  }
  const meta = await sharp(path.join(ttOut, "f_00.webp")).metadata();
  fs.writeFileSync(path.join(ttOut, "metadata.json"), JSON.stringify({ label, model, frames: frames.length, width: meta.width, height: meta.height, alignment: axis ? "head-axis" : "shared-crop", ...(axis ? { axisX: 0.5 } : {}) }, null, 2) + "\n");
  console.log(name, `${frames.length} frames`, `${meta.width}x${meta.height}`, axis ? "head axis" : "shared crop");
}

(async () => {
  for (const [name, file] of Object.entries(figures)) {
    await sharp(path.join(src, file)).resize(900, 900).webp({ quality: 82 }).toFile(path.join(out, name + ".webp"));
  }
  // 产品板块：盲盒包装图和全款公仔排列图，取自 daba-cyber-blindbox 仓库。
  const productImages = path.join(src, "GitHub上传/daba-cyber-blindbox/docs/images");
  await sharp(path.join(productImages, "box.jpg")).resize(720).webp({ quality: 82 }).toFile(path.join(out, "product-box.webp"));
  await sharp(path.join(productImages, "lineup.jpg")).webp({ quality: 80 }).toFile(path.join(out, "product-lineup.webp"));

  // 首屏转盘用基础款。
  await exportTurntable("01_基础款", "turntable-base", "基础款", headAxisSource());

  require("./import-blindbox-site.cjs")(src);

  for (const f of fs.readdirSync(out)) console.log(f, Math.round(fs.statSync(path.join(out, f)).size / 1024) + " KB");
})().catch(error => { console.error(error); process.exitCode = 1; });
