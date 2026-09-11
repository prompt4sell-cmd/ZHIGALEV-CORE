import test from 'node:test';
import assert from 'node:assert/strict';
import { hexNeighbor, prototypeHexes } from './hex.ts';

test('returns the east axial neighbor', () => {
  assert.deepEqual(hexNeighbor({ q: 0, r: 0 }, 0), { q: 1, r: 0 });
});

test('returns the north-west axial neighbor', () => {
  assert.deepEqual(hexNeighbor({ q: 0, r: 0 }, 2), { q: 0, r: -1 });
});

test('rejects invalid direction indexes', () => {
  assert.throws(() => hexNeighbor({ q: 0, r: 0 }, 6), RangeError);
});

test('prototype preview contains center plus six neighbors', () => {
  assert.equal(prototypeHexes.length, 7);
  assert.equal(prototypeHexes.filter(cell => cell.label === 'Shelter').length, 1);
});
