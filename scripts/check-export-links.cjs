const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const out = path.resolve(__dirname, "../out");
let pages = 0;
let links = 0;
function walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) walk(file);
    else if (item.name.endsWith(".html")) {
      const html = fs.readFileSync(file, "utf8");
      // public/projects 可承载独立 HTML 网站；站点自身页面继续检查统一的无障碍入口。
      const isProject = file.startsWith(path.join(out, "projects") + path.sep);
      if (!isProject) assert.match(html, /id="main-content"/, file + ": accessible main missing");
      for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
        const url = match[1].split(/[?#]/)[0];
        const target = path.join(out, decodeURIComponent(url));
        assert.ok(fs.existsSync(target) || fs.existsSync(target + ".html"), file + ": broken link " + url);
        if (fs.existsSync(target) && fs.statSync(target).isDirectory()) assert.ok(fs.existsSync(path.join(target, "index.html")), "Missing page: " + url);
        links++;
      }
      pages++;
    }
  }
}
walk(out);
console.log("PASS: " + pages + " exported pages and " + links + " local links/assets.");
