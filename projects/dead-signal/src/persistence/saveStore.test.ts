import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialGameState } from '../domain/gameState.ts';
import { loadGame, resetGame, saveGame } from './saveStore.ts';

type StorageLike = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

function memoryStorage(): StorageLike {
  const values = new Map<string, string>();
  return {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: key => values.delete(key),
  };
}

test('round-trips game state', () => {
  const storage = memoryStorage();
  const state = createInitialGameState();
  saveGame(storage, state);
  assert.deepEqual(loadGame(storage), state);
});

test('falls back to initial state on corrupt JSON', () => {
  const storage = memoryStorage();
  storage.setItem('dead-signal:v1', '{broken');
  assert.deepEqual(loadGame(storage), createInitialGameState());
});

test('falls back to initial state on invalid shape', () => {
  const storage = memoryStorage();
  storage.setItem('dead-signal:v1', JSON.stringify({ version: 1, resources: { metal: 'x' }, buildings: [] }));
  assert.deepEqual(loadGame(storage), createInitialGameState());
});

test('reset removes save and returns clean state', () => {
  const storage = memoryStorage();
  saveGame(storage, createInitialGameState());
  assert.deepEqual(resetGame(storage), createInitialGameState());
  assert.equal(storage.getItem('dead-signal:v1'), null);
});
