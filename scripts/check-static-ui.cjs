const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const repo = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(repo, file), 'utf8');
const css = read('app/globals.css');

assert.doesNotMatch(css, /@(?:-\w+-)?keyframes\b/i, 'Keyframe animation must not return.');
assert.doesNotMatch(css, /(?:^|[;{\s])(?:-\w+-)?(?:animation|transition)(?:-[\w-]+)?\s*:/i, 'Animation/transition declarations must be removed.');
assert.doesNotMatch(css, /:hover\b|scroll-behavior\s*:\s*smooth/i, 'Hover effects and smooth scrolling must be removed.');
assert.match(css, /a:focus-visible/, 'Keyboard focus must stay visible.');
assert.doesNotMatch(css, /\.reveal\.is-ready|\.page-jump|\.route-journey/, 'Hidden reveal content and motion layers must not remain.');

const sourceFiles = [];
function collect(dir) {
  for (const item of fs.readdirSync(path.join(repo, dir), { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) collect(file);
    else if (/\.(?:tsx|ts)$/.test(file)) sourceFiles.push(file);
  }
}
collect('app');
collect('components');
for (const file of sourceFiles) {
  assert.doesNotMatch(read(file), /\bon(?:Click|Pointer\w*|Mouse\w*|Focus|Blur)\s*=|\b(?:setTimeout|setInterval|requestAnimationFrame|IntersectionObserver)\b|scroll-behavior="smooth"/, `${file}: decorative interaction or animation runtime remains.`);
}
for (const file of ['ArrivalTransition', 'PageTransition', 'BlackCat']) {
  assert.equal(fs.existsSync(path.join(repo, `components/${file}.tsx`)), false, `${file} must be removed.`);
}
assert.doesNotMatch(read('app/page.tsx'), /靠近唤醒|点击起跳|\banimated\b/, 'Interaction hint must not remain.');
assert.match(read('components/Nav.tsx'), /href: "\/about\/"/, 'Normal page navigation must remain.');
assert.match(read('app/contact/page.tsx'), /mailto:/, 'Email link must remain.');
console.log(`PASS: CSS, ${sourceFiles.length} source files, links and focus checked.`);
