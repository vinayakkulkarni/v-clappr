import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';
import { nextTick } from 'vue';

type Listener = (...args: unknown[]) => void;

const playerMocks = vi.hoisted(() => {
  const instances: Array<{
    options: Record<string, unknown>;
    resize: ReturnType<typeof vi.fn>;
    destroy: ReturnType<typeof vi.fn>;
  }> = [];
  class Player {
    options: Record<string, unknown>;
    resize = vi.fn();
    destroy = vi.fn();
    constructor(options: Record<string, unknown>) {
      this.options = options;
      instances.push(this);
    }
  }
  return { instances, Player };
});

vi.mock('@clappr/core', () => ({ Player: playerMocks.Player }));
vi.mock('@clappr/hlsjs-playback', () => ({ default: 'HlsjsPlayback' }));
vi.mock('@clappr/plugins', () => ({
  ClickToPause: 'ClickToPause',
  ClosedCaptions: 'ClosedCaptions',
  DVRControls: 'DVRControls',
  EndVideo: 'EndVideo',
  ErrorScreen: 'ErrorScreen',
  Favicon: 'Favicon',
  GoogleAnalytics: 'GoogleAnalytics',
  MediaControl: 'MediaControl',
  Poster: 'Poster',
  SeekTime: 'SeekTime',
  SpinnerThreeBounce: 'SpinnerThreeBounce',
  Stats: 'Stats',
  WaterMark: 'WaterMark',
}));

const { default: VClappr } = await import('./VClappr.vue');

const lastPlayer = () => {
  const player = playerMocks.instances.at(-1);
  if (!player) throw new Error('Player was not created');
  return player;
};

describe('VClappr', () => {
  beforeEach(() => {
    playerMocks.instances.length = 0;
  });

  it('renders the mount element with the given id', () => {
    const wrapper = mount(VClappr, {
      props: { el: 'stage', source: 'https://example.com/a.m3u8' },
    });
    expect(wrapper.find('#stage').exists()).toBe(true);
  });

  it('creates a player with the source, parent and unique plugins', async () => {
    const wrapper = mount(VClappr, {
      props: { el: 'stage', source: 'https://example.com/a.m3u8' },
    });
    await nextTick();
    const { options } = lastPlayer();
    expect(options.parentId).toBe('#stage');
    expect(options.source).toBe('https://example.com/a.m3u8');
    const plugins = options.plugins as string[];
    expect(new Set(plugins).size).toBe(plugins.length);
    expect(plugins).toContain('HlsjsPlayback');
    expect(wrapper.emitted('init')).toHaveLength(1);
  });

  it('resizes to CSS lengths that the constructor types cannot take', async () => {
    mount(VClappr, {
      props: {
        el: 'stage',
        source: 'https://example.com/a.mp4',
        options: { width: '100%', height: 360 },
      },
    });
    await nextTick();
    const player = lastPlayer();
    expect(player.options.width).toBeUndefined();
    expect(player.options.height).toBe(360);
    expect(player.resize).toHaveBeenCalledWith({ width: '100%', height: 360 });
  });

  it('passes numeric sizes straight to the constructor', async () => {
    mount(VClappr, {
      props: {
        el: 'stage',
        source: 'https://example.com/a.mp4',
        options: { width: 640, height: 360 },
      },
    });
    await nextTick();
    const player = lastPlayer();
    expect(player.options).toMatchObject({ width: 640, height: 360 });
    expect(player.resize).not.toHaveBeenCalled();
  });

  it('re-emits player events', async () => {
    const wrapper = mount(VClappr, {
      props: { el: 'stage', source: 'https://example.com/a.mp4' },
    });
    await nextTick();
    const events = lastPlayer().options.events as Record<string, Listener>;
    events.onPlay?.();
    events.onTimeUpdate?.({ current: 1, total: 10 });
    events.onError?.(new Error('boom'));
    expect(wrapper.emitted('play')).toEqual([[true]]);
    expect(wrapper.emitted('time-updated')).toEqual([
      [{ current: 1, total: 10 }],
    ]);
    expect(wrapper.emitted('error')?.[0]?.[0]).toBeInstanceOf(Error);
  });

  it('destroys the player on unmount', async () => {
    const wrapper = mount(VClappr, {
      props: { el: 'stage', source: 'https://example.com/a.mp4' },
    });
    await nextTick();
    const player = lastPlayer();
    wrapper.unmount();
    expect(player.destroy).toHaveBeenCalledOnce();
  });
});
