import type { ResourceState } from './resources.ts';

export type BuildingInstance = {
  id: string;
  definitionId: string;
  level: number;
};

export type GameState = {
  version: 1;
  resources: ResourceState;
  buildings: BuildingInstance[];
};

export function createInitialGameState(): GameState {
  return {
    version: 1,
    resources: { metal: 120, food: 80, power: 40, people: 12 },
    buildings: [],
  };
}
