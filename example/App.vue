<template>
  <div id="app">
    <v-clappr
      el="player"
      :source="source"
      :options="options"
      @init="oninit"
      @ready="onready"
      @play="onplay"
      @pause="onpause"
      @stop="onstop"
      @ended="onended"
      @fullscreen="onfullscreen"
      @resize="onresize"
      @seek="onseek"
      @timeupdate="ontimeupdate"
      @volumeupdate="onvolumeupdate"
      @error="onerror"
    />
  </div>
</template>

<script>
import VClappr from '../src';

export default {
  components: {
    VClappr,
  },
  data: () => ({
    source:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    options: {
      width: 720,
      height: 480,
      poster:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
      mute: false,
      autoplay: false,
      loop: false,
      disable_keyboard_shortcuts: false,
      disable_context_menu: true,
      mediacontrol: { seekbar: '#E113D3', buttons: '#66B2FF' },
      ga: {},
      watermark: {},
    },
    localclappr: null,
  }),
  methods: {
    oninit(clappr) {
      this.localclappr = clappr;
    },
    onready(event) {
      console.log('inside hook: onready', event);
    },
    onplay(event) {
      console.log('inside hook: onplay', event);
    },
    onpause(event) {
      console.log('inside hook: onpause', event);
    },
    onstop(event) {
      console.log('inside hook: onstop', event);
    },
    onended(event) {
      console.log('inside hook: onended', event);
    },
    onfullscreen(isBool) {
      console.log('player fullscreen?', isBool);
    },
    onresize(resize) {
      console.log('Resized object', resize);
    },
    onseek(time) {
      console.log('on seek, time in seconds:', time);
    },
    ontimeupdate(progress) {
      console.log('Progress of played video:', progress);
    },
    onvolumeupdate(volume) {
      console.log('Volume updated, current volume:', volume);
    },
    onerror(e) {
      console.log('le error:', e);
    },
  },
};
</script>

<style></style>
