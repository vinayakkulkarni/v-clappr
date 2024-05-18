<script setup lang="ts">
  import { reactive } from 'vue';
  import { VGithubIcon } from 'v-github-icon';
  import { VClappr } from 'v-clappr';
  import type { Player } from '@clappr/core';

  const state = reactive({
    clappr: null as Player | null,
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
  const onInit = (player: Player) => {
    console.log('onInit Event: ', player);
    state.clappr = player;
  };
  const onResize = (e: { width: number; height: number }) => {
    console.log('onResize Event: ', e);
  };
  const onPlay = (e: boolean) => {
    console.log('onPlay Event: ', e);
  };
  const onPause = (e: boolean) => {
    console.log('onPause Event: ', e);
  };
  const onStop = (e: boolean) => {
    console.log('onStop Event: ', e);
  };
  const onEnded = (e: boolean) => {
    console.log('onEnded Event: ', e);
  };
  const onSeek = (e: number) => {
    console.log('onSeek Event: ', e);
  };
  const onError = (e: Error) => {
    console.log('onError Event: ', e);
  };
  const onTimeUpdated = (e: { current: number; total: number }) => {
    console.log('onTimeUpdate Event: ', e);
  };
  const onVolumeUpdated = (e: number) => {
    console.log('onVolumeUpdate Event: ', e);
  };
  const onSubtitleAvailable = (e: boolean) => {
    console.log('onSubtitleAvailable Event: ', e);
  };
</script>

<template>
  <main class="w-screen h-screen bg-gradient-49">
    <v-github-icon url="https://github.com/vinayakkulkarni/v-clappr" />
    <v-clappr
      el="player"
      :source="state.source"
      :options="state.options"
      class="mx-auto w-1/2 h-full"
      @init="onInit"
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

<style scoped>
  @import 'v-github-icon/dist/v-github-icon.css';
</style>
