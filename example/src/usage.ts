export const usage = `<script setup lang="ts">
  import { VClappr } from 'v-clappr';
</script>

<template>
  <v-clappr
    el="player"
    source="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
    @time-updated="({ current }) => console.log(current)"
  />
</template>`;
