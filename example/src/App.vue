<template>
  <main class="w-screen h-screen bg-gradient-49">
    <v-github-icon url="https://github.com/vinayakkulkarni/v-clappr" />
    <v-clappr
      el="player"
      :source="state.source"
      :options="state.options"
      class="mx-auto w-1/2 h-full"
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
    <div class="absolute bottom-4 right-4">
      <a
        href="https://app.netlify.com/sites/v-clappr/deploys"
        aria-label="View deploys on Netlify"
        target="_blank"
        rel="noopener noreferrer"
        class="gray-400"
      >
        <img
          src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg"
          alt="Deploys by Netlify"
        />
      </a>
    </div>
  </main>
</template>
<script lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { defineComponent, reactive } from 'vue';
  import { VGithubIcon } from 'v-github-icon';
  import { VClappr } from 'v-clappr';

  export default defineComponent({
    name: 'ExampleApp',
    components: {
      VClappr,
      VGithubIcon,
    },
    setup() {
      const state = reactive({
        clappr: null,
        source: 'https://download.samplelib.com/mp4/sample-30s.mp4',
        poster: 'http://clappr.io/poster.png',
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

<style>
  @import 'v-github-icon/dist/v-github-icon.css';
</style>
