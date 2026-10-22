const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const sharp = require("sharp");
const root = path.resolve(__dirname, "..");
const assets = [
  ["daba-ip-24-actions-transparent.png", 1536, 1024],
  ["daba-laptop-transparent.png", 1536, 1024],
];

async function check() {
  assert.doesNotMatch(fs.readFileSync(path.join(root, "app/globals.css"), "utf8"), /mix-blend-mode/);
  for (const [file, width, height] of assets) {
    const target = path.join(root, "public/illustrations", file);
    const metadata = await sharp(target).metadata();
    assert.ok(metadata.hasAlpha, file + ": real alpha channel required");
    const { data, info } = await sharp(target).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    assert.equal(info.width, width, file + ": unexpected width");
    assert.equal(info.height, height, file + ": unexpected height");
    let transparent = 0;
    let paleInterior = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] === 0) transparent++;
      if (data[i + 3] >= 240 && data[i] > 230 && data[i + 1] > 230 && data[i + 2] > 215) paleInterior++;
    }
    assert.ok(transparent > width * height * .45, file + ": opaque paper backing remains");
    assert.ok(paleInterior > 1000, file + ": pale face/shoes/props were erased");
    for (const [x, y] of [[0, 0], [width - 8, 0], [0, height - 8], [width - 8, height - 8]]) {
      for (let dx = 0; dx < 8; dx++) for (let dy = 0; dy < 8; dy++) {
        // Allow one 8-bit alpha step (<0.4%) from cutout quantization, not a visible backing.
        assert.ok(data[((y + dy) * width + x + dx) * 4 + 3] <= 1, file + ": canvas corner not transparent");
      }
    }
    console.log("PASS: " + file + " has real transparent backing and intact pale interiors.");
  }
}
check().catch(error => { console.error(error); process.exitCode = 1; });
