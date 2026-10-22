const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
require("./check-static-ui.cjs");
const css = read("app/globals.css");
assert.match(css, /--surface:#f5f5f7/);
assert.doesNotMatch(css, /box-shadow\s*:|linear-gradient|backdrop-filter/);
assert.doesNotMatch(read("app/layout.tsx"), /fonts\.googleapis/);
assert.match(read("app/page.tsx"), /大巴<\/span><span>上车，/);
assert.match(read("app/page.tsx"), /\/home\/hero-sticker\.webp/, "Homepage figure must use the paper-white sticker cutout on the dark sky.");
for (const file of ["hero-sticker.webp", "stars-far.svg", "stars-near.svg", "stars-glint.svg"]) assert.ok(fs.existsSync(path.join(root, "public/home", file)), file + " missing");
for (const file of ["app/about/page.tsx", "app/contact/page.tsx", "app/articles/page.tsx", "app/articles/workbuddy-vs-codex/page.tsx"]) {
  assert.match(read(file), /DabaIllustration/, file + ": shared illustration missing");
}
assert.match(read("components/Nav.tsx"), /\/articles\//);
console.log("PASS: shared style, starry homepage assets, four illustrated content pages and static UI.");
