import { describe, expect, it } from 'vitest';
import { createViewModel } from './viewModel';
import { createInitialGameState } from '../domain/gameState';

describe('createViewModel', () => {
  it('exposes the Generator build action for a fresh state', () => {
    const vm = createViewModel(createInitialGameState());
    expect(vm.generatorBuilt).toBe(false);
    expect(vm.buildLabel).toBe('Build Generator — 50 Metal');
    expect(vm.buildDisabled).toBe(false);
  });

  it('disables duplicate Generator construction after it is built', () => {
    const state = {
      ...createInitialGameState(),
      resources: { metal: 70, food: 80, power: 40, people: 12 },
      buildings: [{ id: 'g-1', definitionId: 'generator', level: 1 }],
    };
    const vm = createViewModel(state);
    expect(vm.generatorBuilt).toBe(true);
    expect(vm.buildLabel).toBe('Generator Constructed');
    expect(vm.buildDisabled).toBe(true);
  });

  it('keeps resources in canonical display order', () => {
    const vm = createViewModel(createInitialGameState());
    expect(vm.resourceRows.map(row => row.id)).toEqual(['metal', 'food', 'power', 'people']);
  });
});
