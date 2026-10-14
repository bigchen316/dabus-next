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
assert.match(read("app/page.tsx"), /和大巴，一起探索 AI/);
assert.match(css, /height:calc\(100svh - var\(--nav-height\)\)/);
for (const file of ["app/page.tsx", "app/about/page.tsx", "app/contact/page.tsx", "app/articles/page.tsx", "app/articles/workbuddy-vs-codex/page.tsx"]) {
  assert.match(read(file), /DabaIllustration/, file + ": shared illustration missing");
}
assert.match(read("components/DabaIllustration.tsx"), /\/illustrations\/daba-c-bus.png/);
const image = fs.readFileSync(path.join(root, "public/illustrations/daba-c-bus.png"));
assert.equal(image.subarray(1, 4).toString(), "PNG");
assert.ok([4, 6].includes(image[25]), "PNG must support alpha transparency");
assert.match(read("components/Nav.tsx"), /\/articles\//);
assert.match(read("components/DesignConcept.tsx"), /DesignArchive/);
assert.match(read("components/IPLab.tsx"), /DesignArchive/);
console.log("PASS: shared C style, five content pages, archive routes, static UI and alpha asset.");
