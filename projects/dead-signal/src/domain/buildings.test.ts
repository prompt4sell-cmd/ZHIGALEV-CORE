import test from 'node:test';
import assert from 'node:assert/strict';
import { buildBuilding } from './buildings.ts';
import { createInitialGameState } from './gameState.ts';

test('builds the generator and deducts 50 metal', () => {
  const result = buildBuilding(createInitialGameState(), 'generator');
  assert.equal(result.ok, true);
  assert.equal(result.state.resources.metal, 70);
  assert.equal(result.state.buildings.length, 1);
  assert.equal(result.state.buildings[0]?.definitionId, 'generator');
});

test('does not build a duplicate generator', () => {
  const first = buildBuilding(createInitialGameState(), 'generator');
  const second = buildBuilding(first.state, 'generator');
  assert.equal(second.ok, false);
  if (!second.ok) assert.equal(second.reason, 'already-built');
  assert.deepEqual(second.state, first.state);
});

test('does not deduct resources when generator is unaffordable', () => {
  const poorState = {
    ...createInitialGameState(),
    resources: { metal: 10, food: 80, power: 40, people: 12 },
  };
  const result = buildBuilding(poorState, 'generator');
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.reason, 'insufficient-resources');
  assert.equal(result.state.resources.metal, 10);
});
