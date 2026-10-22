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
for (const file of ["daba-ip-24-actions-transparent.png", "daba-ip-24-actions-transparent.webp", "daba-laptop-transparent.png", "daba-laptop-transparent.webp", "daba-wave-01.webp"]) assert.ok(fs.existsSync(path.join(root, "public/illustrations", file)), file);
const pages = {
  "index.html": ["wave", "surprised"],
  "about/index.html": ["backpack", "bus", "phone", "stretch", "petCat"],
  "contact/index.html": ["write", "tablet", "point"],
  "articles/index.html": ["read"],
  "articles/workbuddy-vs-codex/index.html": ["laptop", "sketch", "thumbsUp"],
  "404.html": ["telescope"],
};
const all = [];
for (const [file, expected] of Object.entries(pages)) {
  const html = fs.readFileSync(path.join(root, "out", file), "utf8");
  const actual = [...html.matchAll(/data-pose="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(actual, expected, file + ": incorrect contextual poses");
  assert.equal(new Set(actual).size, actual.length, file + ": repeated pose");
  if (actual.some(pose => pose !== "wave" && pose !== "laptop")) assert.ok(html.includes("/illustrations/daba-ip-24-actions-transparent.webp"), file + ": transparent sheet missing");
  assert.ok(!html.includes('href="/illustrations/daba-ip-24-actions.png"'), file + ": opaque sheet still rendered");
  assert.ok(!html.includes('src="/illustrations/daba-laptop.png"'), file + ": old laptop still rendered");
  all.push(...actual);
}
assert.equal(new Set(all).size, all.length, "Each placement must have a distinct pose");
console.log("PASS: 24 source actions, " + Object.keys(pages).length + " pages and " + all.length + " distinct contextual placements.");
