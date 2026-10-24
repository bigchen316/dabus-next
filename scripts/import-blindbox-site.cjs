// 将用户本机已完成的开盒网页接入首页；不修改源文件，不重新制作公仔。
const fs = require("node:fs");
const path = require("node:path");
const { createHash } = require("node:crypto");

module.exports = function importBlindboxSite(ipRoot) {
  const sourceDir = path.join(ipRoot, "网页源文件/成品_双击index打开");
  const targetDir = path.resolve(__dirname, "../public/projects/cyber-blindbox");
  let html = fs.readFileSync(path.join(sourceDir, "index.html"), "utf8");
  const sourceHash = createHash("sha256").update(html).digest("hex");
  fs.mkdirSync(path.join(targetDir, "assets"), { recursive: true });

  // 把重复的内联图片拆成可缓存文件，首页不再下载 11 MB 的 HTML。
  const assets = new Set();
  html = html.replace(/data:image\/(png|webp|jpeg);base64,([A-Za-z0-9+/=]+)/g, (_, kind, encoded) => {
    const bytes = Buffer.from(encoded, "base64");
    const name = createHash("sha256").update(bytes).digest("hex").slice(0, 20) + "." + (kind === "jpeg" ? "jpg" : kind);
    if (!assets.has(name)) fs.writeFileSync(path.join(targetDir, "assets", name), bytes);
    assets.add(name);
    return "assets/" + name;
  });

  function replaceOnce(before, after) {
    if (!html.includes(before)) throw new Error("Blindbox source changed: " + before.slice(0, 65));
    html = html.replace(before, after);
  }

  replaceOnce('<!doctype html><html><head><meta charset=utf-8></head><body><title>大巴盲盒开场</title>',
    '<!doctype html><html lang="zh-CN" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>大巴赛博盲盒 · 在线开盒</title>');
  // 沿用系统中文字体，开盒不依赖外网字体服务。
  html = html.replace(/<link[^>]+https:\/\/fonts\.[^>]+>\s*/g, "");
  replaceOnce('</style>', '</style><link rel="stylesheet" href="frame.css"><script>if(new URLSearchParams(location.search).get("embed")==="card")document.documentElement.dataset.embed="card";</script></head><body>');
  html = html.replace(/<nav class="nav"[\s\S]*?<\/nav>/, '<a class="back-home" href="/#products">← 返回大巴主页</a>');
  const collect = html.match(/<div class="collect">[\s\S]*?(?=\s*<\/section>)/)?.[0];
  if (!collect) throw new Error("Blindbox collection markup missing");
  html = html.replace(/<section class="copy"[\s\S]*?<\/section>/,
    '<section class="copy" aria-label="盲盒介绍"><span class="eyebrow">VOL.01 · STARRY NIGHT</span><h1 class="name">大巴赛博<br>盲盒</h1><p class="tagline">下班后，我在偷偷变强。</p><p>7 款常规公仔 + 1 款隐藏款。点盒子开一款，集齐全部 8 款，召唤超能大巴。</p>' + collect + '</section>');
  html = html.replace(/<p class="demo-note">[\s\S]*?<\/p>/, '<p class="save-note">收集进度保存在当前浏览器。隐藏款概率为 1/12。</p>');
  replaceOnce('aria-label="大巴盲盒，拖动旋转查看，点击或按回车撕膜拆开"', 'aria-label="大巴盲盒，拖动旋转查看，点击或按回车开盒"');
  replaceOnce("$('boxArt').src=IMGS.base;", "$('boxArt').src=IMGS.base; figure.src=IMGS.base; $('cardImg').src=IMGS.base;");
  replaceOnce("photobox2.style.setProperty('--mix','0');", "photobox2.src=photobox.src; photobox2.style.setProperty('--mix','0');");
  replaceOnce('got=JSON.parse(localStorage.getItem(\'daba-collect\')||\'{}\')||{};', 'const saved=JSON.parse(localStorage.getItem(\'daba-collect\')||\'{}\'); got=Object.fromEntries(LIST.filter(it=>saved && typeof saved===\'object\' && saved[it.k]===1).map(it=>[it.k,1]));');
  // 仅在操作时绘制；保留原有开盒、收集及彩蛋规则。
  replaceOnce('raf=requestAnimationFrame(tick);', 'if(dragging || spinTo!==null || auto || Math.abs(vy)>0.05) raf=requestAnimationFrame(tick); else raf=0;');
  replaceOnce("apply(); if(!reduce) raf=requestAnimationFrame(tick);", "apply();");
  replaceOnce("holder.setPointerCapture(e.pointerId); holder.classList.add('dragging');", "holder.setPointerCapture(e.pointerId); holder.classList.add('dragging'); if(!reduce && !raf) raf=requestAnimationFrame(tick);");
  replaceOnce("spinBtn.addEventListener('click',()=>{", "spinBtn.addEventListener('click',()=>{ if(!reduce && !raf) raf=requestAnimationFrame(tick);");
  replaceOnce("stopRim(); card.classList.remove('zoom','egg'); stopHolo();", "holder.tabIndex=0; holder.removeAttribute('aria-hidden'); stopRim(); card.classList.remove('zoom','egg'); stopHolo();");
  replaceOnce("phase='done'; hero.classList.remove('busy');", "holder.tabIndex=-1; holder.setAttribute('aria-hidden','true'); phase='done'; hero.classList.remove('busy');");
  replaceOnce("startHolo();\n    say", "/* 闪卡尚未启用，不启动隐藏卡片的动画循环。 */\n    say");
  replaceOnce("forceEgg=false; againBtn.hidden=true;", "forceEgg=false; if(reduce){ spinK=null; hero.classList.remove('spinready','spinning'); figure.src=HERO_IMG; figure.alt='超能大巴'; result.textContent='集齐全部8款，超能大巴出现了！'; eggUnlocked(); return; } againBtn.hidden=true;");
  // 原成品的 WebGL 锡箔袋属于旧版撕袋过程；当前炸盒流程用不到，按需初始化。
  html = html.replace(/<script>\s*\/\/ 真3D锡箔袋[\s\S]*?<\/script>/, '<script>window.GLBAG=null;</script>');

  fs.cpSync(path.join(sourceDir, "figs"), path.join(targetDir, "figs"), { recursive: true });
  for (const name of ["frame.css", "frame.js"]) fs.copyFileSync(path.join(__dirname, "blindbox", name), path.join(targetDir, name));
  html += '\n<script src="frame.js"></script></body></html>\n';
  fs.writeFileSync(path.join(targetDir, "index.html"), html);
  fs.writeFileSync(path.join(targetDir, "source.json"), JSON.stringify({ source: "网页源文件/成品_双击index打开/index.html", sha256: sourceHash, assets: assets.size, rules: "7 regular + 1 hidden (1/12), collect all 8 to unlock Super Daba" }, null, 2) + "\n");
  console.log("cyber-blindbox", assets.size, "cached images; HTML", Math.round(Buffer.byteLength(html) / 1024), "KB");
};
