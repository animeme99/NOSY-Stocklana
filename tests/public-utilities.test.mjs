import test from 'node:test';
import assert from 'node:assert/strict';
import identity from '../src/identity.cjs';
import format from '../src/format.cjs';

// These tests are authored for the public kit; they are not the full product suite.
test('normalizes whitespace around a syntactically valid address', () => {
  const address = 'So11111111111111111111111111111111111111112';
  assert.equal(identity.normalizeAddress(`  ${address}\n`), address);
});
test('rejects forbidden Base58 characters and invalid lengths', () => {
  for (const input of ['0'.repeat(32), 'O'.repeat(32), '1'.repeat(31), '1'.repeat(45)]) {
    assert.equal(identity.normalizeAddress(input), null);
  }
});
test('does not coerce objects into address input', () => {
  for (const input of [null, undefined, 123, { toString: () => '1'.repeat(32) }]) {
    assert.equal(identity.isAddress(input), false);
  }
});
test('checks signature syntax without claiming on-chain verification', () => {
  assert.equal(identity.normalizeSignature(` ${'1'.repeat(64)} `), '1'.repeat(64));
  assert.equal(identity.normalizeSignature('1'.repeat(63)), null);
  assert.equal(identity.normalizeSignature('1'.repeat(89)), null);
  assert.equal(identity.normalizeSignature('0'.repeat(64)), null);
});
test('escapes user-controlled HTML metacharacters', () => {
  assert.equal(format.escape('<img src="x" onerror=\'x\'>&'), '&lt;img src=&quot;x&quot; onerror=&#39;x&#39;&gt;&amp;');
});
test('keeps missing money distinct from actual zero', () => {
  assert.equal(format.money(null), '—');
  assert.equal(format.money(undefined), '—');
  assert.equal(format.money('not-money'), '—');
  assert.equal(format.money('0'), '0');
});
test('formats noncompact integer money beyond Number safe integer precision', () => {
  assert.equal(format.money('900719925474099312340000000000000000'), '900,719,925,474,099,312.34');
});
test('retains negative and positive signs in money display', () => {
  assert.equal(format.money('-123450000000000000000'), '−123.45');
  assert.equal(format.money('123450000000000000000', true), '+123.45');
});
test('truncates sub-cent amounts according to the existing display contract', () => {
  assert.equal(format.money('1999000000000000000'), '1.99');
});
test('keeps unknown percentages distinct from zero', () => {
  assert.equal(format.percent(null), '—');
  assert.equal(format.percent(Infinity), '—');
  assert.equal(format.percent(0), '0.0%');
  assert.equal(format.percent(-12.5), '−12.5%');
});
test('formats elapsed time against an explicit clock', () => {
  assert.equal(format.ago(1000, 1060), '1m ago');
  assert.equal(format.ago(1000, 4600), '1h ago');
  assert.equal(format.ago(1000, 900), 'just now');
});
test('labels common research windows', () => {
  assert.equal(format.windowLabel(900), '15m');
  assert.equal(format.windowLabel(3600), '1h');
  assert.equal(format.windowLabel(86400), '1d');
});
