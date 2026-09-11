import type { GameState } from '../domain/gameState';
import type { ResourceId } from '../domain/resources';

const RESOURCE_ORDER: ResourceId[] = ['metal', 'food', 'power', 'people'];
const RESOURCE_LABELS: Record<ResourceId, string> = {
  metal: 'Metal',
  food: 'Food',
  power: 'Power',
  people: 'People',
};

export function createViewModel(state: GameState) {
  const generatorBuilt = state.buildings.some(building => building.definitionId === 'generator');

  return {
    resources: { ...state.resources },
    resourceRows: RESOURCE_ORDER.map(id => ({
      id,
      label: RESOURCE_LABELS[id],
      value: state.resources[id],
    })),
    generatorBuilt,
    buildLabel: generatorBuilt ? 'Generator Constructed' : 'Build Generator — 50 Metal',
    buildDisabled: generatorBuilt,
  };
}
