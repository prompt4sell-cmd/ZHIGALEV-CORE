export type AudioLayerDefinition = {
  id: string;
  src: string;
  defaultVolume: number;
  fadeMs: number;
};

export const AUDIO_LAYERS: Record<string, AudioLayerDefinition> = {
  'generator-drone': {
    id: 'generator-drone',
    src: '/audio/generator-drone.wav',
    defaultVolume: 0.35,
    fadeMs: 500,
  },
};
