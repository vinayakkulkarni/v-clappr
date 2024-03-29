<template>
  <div :id="el" />
</template>
<script lang="ts">
  import { ref, onMounted, defineComponent, onBeforeUnmount } from 'vue';
  import type { Ref } from 'vue';
  // import * as DashShakaPlayback from 'dash-shaka-playback';
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

  type Options = {
    width?: number;
    height?: number;
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
      hlsjsConfig?: unknown;
      shakaConfiguration?: unknown;
    };
  };
  type VClapprProps = {
    el: string;
    source: string;
    options?: Options;
  };

  export default defineComponent({
    name: 'VClappr',
    props: {
      el: {
        type: String,
        required: true,
        default: 'player',
      },
      source: {
        type: String,
        required: true,
        default: '',
      },
      options: {
        type: Object,
        required: false,
        default: () => ({
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
            shakaConfiguration: {},
          },
          poster: 'https://picsum.photos/3840/2160',
        }),
      },
    },
    emits: [
      'init',
      'ready',
      'resize',
      'play',
      'pause',
      'stop',
      'ended',
      'seek',
      'error',
      'time-updated',
      'volume-updated',
      'subtitle-available',
    ],
    setup(props: VClapprProps, { emit }) {
      const player: Ref<Player | null> = ref(null);

      onMounted(async () => {
        await initPlayer();
      });

      onBeforeUnmount(() => {
        player.value?.destroy();
        player.value = null;
      });

      const initPlayer = () => {
        // Return a new promise
        return new Promise((resolve, reject) => {
          if (props.el) {
            // const DashShakaPlayback = require('dash-shaka-playback');
            // New Player instance
            player.value = new Player({
              parentId: `#${props.el}`,
              source: props.source,
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
              ...props.options,
            });
            resolve('Player created!');
          } else {
            reject('Root element not found');
          }
        });
      };
    },
  });
</script>
