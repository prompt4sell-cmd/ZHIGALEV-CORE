import type { GameState } from './gameState.ts';
import type { ResourceCost } from './resources.ts';
import { canAfford, spendResources } from './resources.ts';

export type BuildingDefinition = {
  id: string;
  name: string;
  cost: ResourceCost;
  unique: boolean;
  audioLayerId?: string;
};

export const BUILDINGS: Record<string, BuildingDefinition> = {
  generator: {
    id: 'generator',
    name: 'Generator',
    cost: { metal: 50 },
    unique: true,
    audioLayerId: 'generator-drone',
  },
};

export type BuildResult =
  | { ok: true; state: GameState }
  | {
      ok: false;
      state: GameState;
      reason: 'unknown-building' | 'already-built' | 'insufficient-resources';
    };

function createInstanceId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `building-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function buildBuilding(state: GameState, definitionId: string): BuildResult {
  const definition = BUILDINGS[definitionId];
  if (!definition) {
    return { ok: false, state, reason: 'unknown-building' };
  }

  if (
    definition.unique &&
    state.buildings.some(building => building.definitionId === definitionId)
  ) {
    return { ok: false, state, reason: 'already-built' };
  }

  if (!canAfford(state.resources, definition.cost)) {
    return { ok: false, state, reason: 'insufficient-resources' };
  }

  return {
    ok: true,
    state: {
      ...state,
      resources: spendResources(state.resources, definition.cost),
      buildings: [
        ...state.buildings,
        { id: createInstanceId(), definitionId, level: 1 },
      ],
    },
  };
}
