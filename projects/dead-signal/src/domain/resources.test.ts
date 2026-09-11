import test from 'node:test';
import assert from 'node:assert/strict';
import { canAfford, spendResources } from './resources.ts';

const resources = { metal: 120, food: 80, power: 40, people: 12 };

test('allows a cost the player can afford', () => {
  assert.equal(canAfford(resources, { metal: 50 }), true);
});

test('blocks a cost the player cannot afford', () => {
  assert.equal(canAfford(resources, { metal: 121 }), false);
});

test('spends only specified resources without mutating input', () => {
  const next = spendResources(resources, { metal: 50 });
  assert.deepEqual(next, { metal: 70, food: 80, power: 40, people: 12 });
  assert.equal(resources.metal, 120);
});
