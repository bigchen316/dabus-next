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

// 偶尔闪烁层：每颗星平时不可见，各自隔 4.5～9 秒闪一次带光晕的十字星光（约 1.2 秒），节奏互不相同。
// 只在 CSS 的 prefers-reduced-motion: no-preference 下加载。
function twinkle(file, size, count) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = +(40 + rand() * (size - 80)).toFixed(1), y = +(40 + rand() * (size - 80)).toFixed(1);
    const s = +(9 + rand() * 7).toFixed(1);
    const dur = (4.5 + rand() * 4.5).toFixed(1), delay = (-rand() * 9).toFixed(1);
    const fill = rand() < 0.35 ? "#ffe08a" : "#ffffff";
    const ray = `M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z`;
    stars.push(`<g class="t" style="animation-duration:${dur}s;animation-delay:${delay}s" fill="${fill}"><circle cx="${x}" cy="${y}" r="${(s * 0.9).toFixed(1)}" fill-opacity=".22"/><path d="${ray}"/><circle cx="${x}" cy="${y}" r="${(s / 4).toFixed(2)}"/></g>`);
  }
  const style = "<style>.t{opacity:0;transform-box:fill-box;transform-origin:center;animation:f linear infinite}@keyframes f{0%,82%,100%{opacity:0;transform:scale(.3)}89%{opacity:1;transform:scale(1)}}</style>";
  fs.writeFileSync(path.join(out, file), `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">${style}${stars.join("")}</svg>\n`);
  console.log(file, count + " twinkles", Math.round(fs.statSync(path.join(out, file)).size / 1024) + " KB");
}

twinkle("stars-twinkle.svg", 900, 24);
