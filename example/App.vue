<template>
  <v-clappr
    el="player"
    :source="source"
    :options="options"
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
</template>
<script>
  import { VClappr } from '../src';

  export default {
    name: 'App',
    components: {
      VClappr,
    },
    data() {
      return {
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
      };
    },
    methods: {
      onInit(clappr) {
        this.clappr = clappr;
      },
      onReady(e) {
        console.log('onReady Event: ', e);
      },
      onResize(e) {
        console.log('onResize Event: ', e);
      },
      onPlay(e) {
        console.log('onPlay Event: ', e);
      },
      onPause(e) {
        console.log('onPause Event: ', e);
      },
      onStop(e) {
        console.log('onStop Event: ', e);
      },
      onEnded(e) {
        console.log('onEnded Event: ', e);
      },
      onSeek(e) {
        console.log('onSeek Event: ', e);
      },
      onError(e) {
        console.log('onError Event: ', e);
      },
      onTimeUpdated(e) {
        console.log('onTimeUpdate Event: ', e);
      },
      onVolumeUpdated(e) {
        console.log('onVolumeUpdate Event: ', e);
      },
      onSubtitleAvailable(e) {
        console.log('onSubtitleAvailable Event: ', e);
      },
    },
  };
</script>
