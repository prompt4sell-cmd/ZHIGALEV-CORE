import { AUDIO_LAYERS } from './audioManifest.ts';

export type AudioAdapter = {
  playLoop(src: string, volume: number): Promise<void> | void;
  stop(): void;
  setVolume(volume: number): void;
};

export type AudioLayerState = {
  active: boolean;
  muted: boolean;
  volume: number;
  status: 'idle' | 'playing' | 'blocked';
};

export function createAudioEngine(adapter: AudioAdapter) {
  const definition = AUDIO_LAYERS['generator-drone'];
  let state: AudioLayerState = {
    active: false,
    muted: false,
    volume: definition.defaultVolume,
    status: 'idle',
  };

  const effectiveVolume = () => (state.muted ? 0 : state.volume);

  return {
    getState(): AudioLayerState {
      return { ...state };
    },

    async setActive(active: boolean): Promise<void> {
      state = { ...state, active };
      if (!active) {
        adapter.stop();
        state = { ...state, status: 'idle' };
        return;
      }

      try {
        await adapter.playLoop(definition.src, effectiveVolume());
        state = { ...state, status: 'playing' };
      } catch {
        state = { ...state, status: 'blocked' };
      }
    },

    setMuted(muted: boolean): void {
      state = { ...state, muted };
      adapter.setVolume(effectiveVolume());
    },

    setVolume(volume: number): void {
      const clamped = Math.min(1, Math.max(0, volume));
      state = { ...state, volume: clamped };
      adapter.setVolume(effectiveVolume());
    },
  };
}
