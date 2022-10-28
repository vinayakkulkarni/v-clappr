<template>
  <div>
    <v-clappr
      el="player"
      :source="state.source"
      :options="state.options"
      class="w-full h-full"
      @init="onInit"
      @ready="onReady"
      @resize="onResize"
      @play="onPlay"
      @pause="onPause"
      @stop="onStop"
      @ended="onEnded"
      @seek="onSeek"
      @error="onError"
      @time-updated="onTimeUpdated"
      @volume-updated="onVolumeUpdated"
      @subtitle-available="onSubtitleAvailable"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { VClappr } from '../../';

  export default defineComponent({
    name: 'ExampleApp',
    components: {
      VClappr,
    },
    setup() {
      const state = reactive({
        clappr: null,
        source:
          'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
        options: {
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
        },
      });
      const onInit = (clappr: any) => {
        state.clappr = clappr;
      };
      const onReady = (e: any) => {
        console.log('onReady Event: ', e);
      };
      const onResize = (e: any) => {
        console.log('onResize Event: ', e);
      };
      const onPlay = (e: any) => {
        console.log('onPlay Event: ', e);
      };
      const onPause = (e: any) => {
        console.log('onPause Event: ', e);
      };
      const onStop = (e: any) => {
        console.log('onStop Event: ', e);
      };
      const onEnded = (e: any) => {
        console.log('onEnded Event: ', e);
      };
      const onSeek = (e: any) => {
        console.log('onSeek Event: ', e);
      };
      const onError = (e: any) => {
        console.log('onError Event: ', e);
      };
      const onTimeUpdated = (e: any) => {
        console.log('onTimeUpdate Event: ', e);
      };
      const onVolumeUpdated = (e: any) => {
        console.log('onVolumeUpdate Event: ', e);
      };
      const onSubtitleAvailable = (e: any) => {
        console.log('onSubtitleAvailable Event: ', e);
      };

      return {
        state,
        onInit,
        onReady,
        onResize,
        onPlay,
        onPause,
        onStop,
        onEnded,
        onSeek,
        onError,
        onTimeUpdated,
        onVolumeUpdated,
        onSubtitleAvailable,
      };
    },
  });
</script>
