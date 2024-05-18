<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
  import { Player } from '@clappr/core';
  import {
    ClickToPause,
    ClosedCaptions,
    DVRControls,
    EndVideo,
    ErrorScreen,
    Favicon,
    GoogleAnalytics,
    MediaControl,
    Poster,
    SeekTime,
    SpinnerThreeBounce,
    Stats,
    WaterMark,
  } from '@clappr/plugins';
  import HlsjsPlayback from '@clappr/hlsjs-playback';
  import type { PropType, Ref } from 'vue';

  type Options = {
    width?: number | string;
    height?: number | string;
    poster?: string;
    mute?: boolean;
    autoPlay?: boolean;
    loop?: boolean;
    language?: string;
    playbackNotSupportedMessage?: string;
    autoSeekFromUrl?: boolean;
    includeResetStyle?: boolean;
    playback?: {
      preload?: string;
      disableContextMenu?: boolean;
      controls?: boolean;
      crossOrigin?: string | null;
      playInline?: boolean;
      minimumDvrSize?: null | unknown;
      externalTracks?: string[] | null;
      hlsjsConfig?: Record<string, unknown>;
      dashShakaConfig?: Record<string, unknown>;
    };
  };

  const emit = defineEmits<{
    init: [e: Player];
    ready: [e: Player];
    resize: [e: { width: number; height: number }];
    play: [e: boolean];
    pause: [e: boolean];
    stop: [e: boolean];
    ended: [e: boolean];
    seek: [e: number];
    error: [e: Error];
    'time-updated': [{ current: number; total: number }];
    'volume-updated': [e: number];
    'subtitle-available': [e: boolean];
  }>();

  const el = defineModel('el', {
    type: String,
    required: true,
    default: 'player',
  });
  const source = defineModel('source', {
    type: String,
    required: true,
  });
  const options = defineModel('options', {
    type: Object as PropType<Options>,
    required: false,
    default: {
      width: '100%',
      height: '100%',
      autoPlay: false,
      mute: false,
      loop: false,
      language: 'en-US',
      playbackNotSupportedMessage: 'Playback not supported',
      autoSeekFromUrl: true,
      includeResetStyle: true,
      playback: {
        preload: 'metadata',
        disableContextMenu: true,
        controls: false,
        crossOrigin: null,
        playInline: false,
        minimumDvrSize: null,
        externalTracks: [],
        hlsjsConfig: {},
        dashShakaConfig: {},
      },
      poster: 'https://picsum.photos/3840/2160',
    },
  });

  const player: Ref<Player | null> = ref(null);

  onMounted(async () => {
    await initPlayer();
  });

  onBeforeUnmount(() => {
    player.value?.destroy();
    player.value = null;
  });

  watch(player, () => {
    if (player.value) emit('init', player.value);
  });

  const initPlayer = async (): Promise<string> => {
    // Return a new promise
    return new Promise((resolve, reject) => {
      if (el.value) {
        // New Player instance
        player.value = new Player({
          parentId: `#${el.value}`,
          source: source.value,
          plugins: [
            MediaControl,
            ClosedCaptions,
            EndVideo,
            SpinnerThreeBounce,
            WaterMark,
            Stats,
            ClickToPause,
            DVRControls,
            ErrorScreen,
            Favicon,
            GoogleAnalytics,
            Poster,
            SeekTime,
            SpinnerThreeBounce,
            Stats,
            WaterMark,
            HlsjsPlayback,
            // DashShakaPlayback,
          ],
          events: {
            onReady: (e: Player) => {
              emit('ready', e);
            },
            onResize: (e: { width: number; height: number }) => {
              emit('resize', e);
            },
            onPlay: () => {
              emit('play', true);
            },
            onPause: () => {
              emit('pause', true);
            },
            onStop: (e: boolean) => {
              emit('stop', e);
            },
            onEnded: () => {
              emit('ended', true);
            },
            onSeek: (e: number) => {
              emit('seek', e);
            },
            onError: (e: Error) => {
              emit('error', e);
            },
            onTimeUpdate: (e: { current: number; total: number }) => {
              emit('time-updated', e);
            },
            onVolumeUpdate: (e: number) => {
              emit('volume-updated', e);
            },
            onSubtitleAvailable: (e: boolean) => {
              emit('subtitle-available', e);
            },
          },
          ...options.value,
        });
        resolve('Player created!');
      } else {
        reject(new Error('Root element not found'));
      }
    });
  };
</script>

<template>
  <div :id="el" />
</template>
