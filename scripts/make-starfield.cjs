// 生成首页星空的三层可平铺 SVG（固定随机种子，重复运行结果一致）。
// 第一层静态铺底；第二、三层是较亮的星，由 CSS 错开节奏做轻微闪烁。
const fs = require("node:fs");
const path = require("node:path");
const out = path.resolve(__dirname, "../public/home");
fs.mkdirSync(out, { recursive: true });

let seed = 20261022;
const rand = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);

function layer(file, size, count, rMin, rMax, oMin, oMax, warmShare) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = (rand() * size).toFixed(1), y = (rand() * size).toFixed(1);
    const r = (rMin + rand() * (rMax - rMin)).toFixed(2);
    const o = (oMin + rand() * (oMax - oMin)).toFixed(2);
    const fill = rand() < warmShare ? "#ffe08a" : "#ffffff";
    stars.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" fill-opacity="${o}"/>`);
  }
  fs.writeFileSync(path.join(out, file), `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">${stars.join("")}</svg>\n`);
  console.log(file, count + " stars", Math.round(fs.statSync(path.join(out, file)).size / 1024) + " KB");
}

layer("stars-far.svg", 520, 140, 0.4, 1.0, 0.25, 0.7, 0.08);
layer("stars-near.svg", 760, 34, 0.9, 1.7, 0.7, 1, 0.25);
layer("stars-glint.svg", 980, 22, 1.0, 1.9, 0.75, 1, 0.3);
