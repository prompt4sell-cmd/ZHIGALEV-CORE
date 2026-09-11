export type ResourceId = 'metal' | 'food' | 'power' | 'people';
export type ResourceState = Record<ResourceId, number>;
export type ResourceCost = Partial<Record<ResourceId, number>>;

export function canAfford(resources: ResourceState, cost: ResourceCost): boolean {
  return Object.entries(cost).every(([id, amount]) =>
    resources[id as ResourceId] >= (amount ?? 0),
  );
}

export function spendResources(resources: ResourceState, cost: ResourceCost): ResourceState {
  if (!canAfford(resources, cost)) return resources;

  return Object.fromEntries(
    Object.entries(resources).map(([id, amount]) => [
      id,
      amount - (cost[id as ResourceId] ?? 0),
    ]),
  ) as ResourceState;
}
