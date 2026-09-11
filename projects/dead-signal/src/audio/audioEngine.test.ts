import test from 'node:test';
import assert from 'node:assert/strict';
import { createAudioEngine } from './audioEngine.ts';

type Call = { name: string; value?: unknown };

function fakeAdapter(options?: { rejectPlay?: boolean }) {
  const calls: Call[] = [];
  return {
    calls,
    adapter: {
      async playLoop(_src: string, volume: number) {
        calls.push({ name: 'playLoop', value: volume });
        if (options?.rejectPlay) throw new Error('blocked');
      },
      stop() {
        calls.push({ name: 'stop' });
      },
      setVolume(volume: number) {
        calls.push({ name: 'setVolume', value: volume });
      },
    },
  };
}

test('starts generator layer when activated', async () => {
  const fake = fakeAdapter();
  const engine = createAudioEngine(fake.adapter);
  await engine.setActive(true);
  assert.equal(fake.calls.filter(call => call.name === 'playLoop').length, 1);
});

test('mutes by setting effective volume to zero', () => {
  const fake = fakeAdapter();
  const engine = createAudioEngine(fake.adapter);
  engine.setMuted(true);
  assert.deepEqual(fake.calls.at(-1), { name: 'setVolume', value: 0 });
});

test('maps user volume to effective adapter volume', () => {
  const fake = fakeAdapter();
  const engine = createAudioEngine(fake.adapter);
  engine.setVolume(0.5);
  assert.deepEqual(fake.calls.at(-1), { name: 'setVolume', value: 0.5 });
});

test('playback failure is non-blocking and recorded', async () => {
  const fake = fakeAdapter({ rejectPlay: true });
  const engine = createAudioEngine(fake.adapter);
  await assert.doesNotReject(() => engine.setActive(true));
  assert.equal(engine.getState().status, 'blocked');
});
