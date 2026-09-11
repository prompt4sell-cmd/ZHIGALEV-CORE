import { createInitialGameState, type GameState } from '../domain/gameState.ts';

export const SAVE_KEY = 'dead-signal:v1';

export type StorageLike = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

function isValidGameState(value: unknown): value is GameState {
  if (!value || typeof value !== 'object') return false;
  const state = value as Partial<GameState> & { resources?: Record<string, unknown> };
  const resources = state.resources;

  return (
    state.version === 1 &&
    !!resources &&
    typeof resources.metal === 'number' &&
    typeof resources.food === 'number' &&
    typeof resources.power === 'number' &&
    typeof resources.people === 'number' &&
    Array.isArray(state.buildings)
  );
}

export function loadGame(storage: StorageLike): GameState {
  const raw = storage.getItem(SAVE_KEY);
  if (!raw) return createInitialGameState();

  try {
    const parsed: unknown = JSON.parse(raw);
    return isValidGameState(parsed) ? parsed : createInitialGameState();
  } catch {
    return createInitialGameState();
  }
}

export function saveGame(storage: StorageLike, state: GameState): void {
  storage.setItem(SAVE_KEY, JSON.stringify(state));
}

export function resetGame(storage: StorageLike): GameState {
  storage.removeItem(SAVE_KEY);
  return createInitialGameState();
}
