const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const frames = require("../components/daba-poses.json");
require("./check-c-style.cjs");
assert.match(fs.readFileSync(path.join(root, "components/DabaIllustration.tsx"), "utf8"), /clipPath=\{/);
assert.equal(Object.keys(frames).length, 24);
assert.equal(new Set(Object.values(frames).map(p => p.number)).size, 24);
for (const [name, frame] of Object.entries(frames)) {
  assert.ok(frame.x >= 0 && frame.y >= 0 && frame.x + frame.w <= 1536 && frame.y + frame.h <= 1024, name + ": crop outside sheet");
  assert.ok(frame.label.length > 5, name + ": meaningful label missing");
}
for (const file of ["daba-ip-24-actions.png", "daba-laptop.png"]) assert.ok(fs.existsSync(path.join(root, "public/illustrations", file)), file);
const pages = {
  "index.html": ["wave"],
  "about/index.html": ["backpack", "bus", "phone", "stretch", "petCat"],
  "contact/index.html": ["write", "tablet", "point"],
  "articles/index.html": ["read"],
  "articles/workbuddy-vs-codex/index.html": ["laptop", "sketch", "thumbsUp"],
  "404.html": ["telescope"],
  "design-options/index.html": ["idle"],
  "design-options/station/index.html": ["walking"],
  "design-options/editorial/index.html": ["sleep"],
  "design-options/signal/index.html": ["running"],
  "design-options/ip-lab/index.html": ["thinking"],
  "design-options/ip-lab/pop/index.html": ["jump"],
  "design-options/ip-lab/os/index.html": ["tieShoes"],
  "design-options/ip-lab/cinema/index.html": ["lookout"],
};
const all = [];
for (const [file, expected] of Object.entries(pages)) {
  const html = fs.readFileSync(path.join(root, "out", file), "utf8");
  const actual = [...html.matchAll(/data-pose="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(actual, expected, file + ": incorrect contextual poses");
  assert.equal(new Set(actual).size, actual.length, file + ": repeated pose");
  all.push(...actual);
}
assert.equal(new Set(all).size, all.length, "Each placement must have a distinct pose");
console.log("PASS: 24 source actions, " + Object.keys(pages).length + " pages and " + all.length + " distinct contextual placements.");
