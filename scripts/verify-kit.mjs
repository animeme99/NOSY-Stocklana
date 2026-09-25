import { readFile, readdir, lstat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = name => readFile(path.join(root, name));
const manifest = JSON.parse(await read('submission/manifest.json'));
async function inventory(dir = '') {
  const result = [];
  for (const entry of await readdir(path.join(root, dir), { withFileTypes: true })) {
    if (!dir && entry.name === '.git') continue;
    const relative = path.posix.join(dir, entry.name);
    const stat = await lstat(path.join(root, relative));
    assert(!stat.isSymbolicLink(), `Symlink excluded: ${relative}`);
    if (stat.isDirectory()) result.push(...await inventory(relative));
    else { assert(stat.isFile(), `Unsupported entry: ${relative}`); result.push(relative); }
  }
  return result.sort();
}
const actual = await inventory();
assert.deepEqual(actual, [...manifest.files.map(item => item.path), 'submission/manifest.json'].sort(), 'Public inventory changed');
for (const item of manifest.files) {
  const bytes = await read(item.path);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), item.sha256, `Hash changed: ${item.path}`);
  if (item.path.endsWith('.jpg')) assert.equal(bytes.subarray(0, 3).toString('hex'), 'ffd8ff', item.path);
  if (item.path.endsWith('.webp')) {
    assert.equal(bytes.subarray(0, 4).toString(), 'RIFF', item.path);
    assert.equal(bytes.subarray(8, 12).toString(), 'WEBP', item.path);
  }
  if (item.path.endsWith('.md')) {
    const content = bytes.toString('utf8');
    const links = [...content.matchAll(/\]\(([^)]+)\)|(?:src|href)="([^"]+)"/g)];
    for (const match of links) {
      const link = match[1] ?? match[2];
      if (/^(https?:|#|mailto:)/.test(link)) continue;
      const target = path.resolve(root, path.dirname(item.path), link.split('#')[0]);
      const relative = path.relative(root, target);
      assert(relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative), `Link outside kit: ${link}`);
      assert((await lstat(target)).isFile(), `Missing local link: ${item.path} -> ${link}`);
    }
  }
}
const info = JSON.parse(await read('submission/project-info.json'));
assert(info.projectName.trim().length > 0);
assert(info.shortDescription.length > 0 && info.shortDescription.length <= 280);
assert(info.fullDescription.length > 0 && info.fullDescription.length <= 5000);
assert.equal(info.repository, 'https://github.com/animeme99/NOSY-Stocklana');
console.log(`Verified ${actual.length} public files, ${manifest.files.length} SHA-256 hashes, local links and image signatures.`);
console.log(`Project Info: short ${info.shortDescription.length}/280; full ${info.fullDescription.length}/5000 characters.`);
console.log('Scope: public judging kit only. Full application and live data are not validated by this check.');
