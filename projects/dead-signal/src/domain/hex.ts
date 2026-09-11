export type HexCoord = { q: number; r: number };

export const HEX_DIRECTIONS = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 },
] as const;

export function hexNeighbor(coord: HexCoord, directionIndex: number): HexCoord {
  if (!Number.isInteger(directionIndex) || directionIndex < 0 || directionIndex >= HEX_DIRECTIONS.length) {
    throw new RangeError('directionIndex must be an integer from 0 through 5');
  }

  const direction = HEX_DIRECTIONS[directionIndex];
  return { q: coord.q + direction.q, r: coord.r + direction.r };
}

export type PrototypeHex = HexCoord & {
  terrain: 'shelter' | 'ruins' | 'forest' | 'road' | 'industrial' | 'unknown' | 'contaminated';
  label: 'Shelter' | 'Ruins' | 'Forest' | 'Road' | 'Industrial' | 'Unknown' | 'Contaminated';
};

export const prototypeHexes: PrototypeHex[] = [
  { q: 0, r: 0, terrain: 'shelter', label: 'Shelter' },
  { q: 1, r: 0, terrain: 'ruins', label: 'Ruins' },
  { q: 1, r: -1, terrain: 'forest', label: 'Forest' },
  { q: 0, r: -1, terrain: 'road', label: 'Road' },
  { q: -1, r: 0, terrain: 'industrial', label: 'Industrial' },
  { q: -1, r: 1, terrain: 'unknown', label: 'Unknown' },
  { q: 0, r: 1, terrain: 'contaminated', label: 'Contaminated' },
];
