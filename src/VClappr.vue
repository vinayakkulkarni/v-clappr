<template>
  <div :id="el"></div>
</template>

<script>
import { Player, Events } from 'clappr';

export default {
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
        poster: '',
        mute: false,
        autoplay: true,
        loop: false,
        disable_context_menu: false,
        disable_keyboard_shortcuts: false,
        mediacontrol: {},
        ga: {
          account: '',
          tracker_name: '',
        },
        watermark: {
          image: '',
          url: '',
          position: 'top-right',
        },
        plugins: [],
      }),
    },
  },
  data: () => ({
    player: null,
  }),
  mounted() {
    // Initialze the Player by Clappr
    const player = this.initClapprPlayer();

    // Save `player` object to data
    this.player = player;

    // Register Clapper Player Events
    this.registerEvents(player);
  },
  beforeDestroy() {
    this.player.destroy();
    this.player = null;
  },
  methods: {
    initClapprPlayer() {
      // New Player instance
      const player = new Player({
        parentId: `#${this.el}`,
        source: this.source,
        autoPlay: this.options.autoplay,
        poster: this.options.poster,
        mute: this.options.mute,
        loop: this.options.loop,
        mediacontrol: this.options.mediacontrol,
        disableKeyboardShortcuts: this.options.disable_keyboard_shortcuts,
        disableVideoTagContextMenu: this.options.disable_context_menu,
        gaAccount: this.options.ga.account,
        gaTrackerName: this.options.ga.tracker_name,
        watermark: this.options.watermark.image,
        watermarkLink: this.options.watermark.url,
        position: this.options.watermark.position,
        plugins: this.options.plugins,
      });

      // Emit init event passing map object
      this.$emit('init', player);

      return player;
    },
    registerEvents(player) {
      // Emit the Ready event
      player.on(Events.PLAYER_READY, () => {
        this.$emit('ready', player);
      });

      // Emit the Play event
      player.on(Events.PLAYER_PLAY, () => {
        this.$emit('play', player);
      });

      // Emit the pause event
      player.on(Events.PLAYER_PAUSE, () => {
        this.$emit('pause', player);
      });

      // Emit the Stop event
      player.on(Events.PLAYER_STOP, () => {
        this.$emit('stop', player);
      });

      // Emit the End event
      player.on(Events.PLAYER_ENDED, () => {
        this.$emit('ended', player);
      });

      // Emit the Fulscreen event
      player.on(Events.PLAYER_FULLSCREEN, bool => {
        this.$emit('fullscreen', bool);
      });

      // Emit the Resize event
      player.on(Events.PLAYER_RESIZE, resize => {
        this.$emit('resize', resize);
      });

      // Emit the Seek event
      player.on(Events.PLAYER_SEEK, time => {
        this.$emit('seek', time);
      });

      // Emit the Time update event
      player.on(Events.PLAYER_TIMEUPDATE, progress => {
        this.$emit('timeupdate', progress);
      });

      // Emit the Volume update event
      player.on(Events.PLAYER_VOLUMEUPDATE, volume => {
        this.$emit('volumeupdate', volume);
      });

      // Emit the Play Error event
      player.on(Events.PLAYER_ERROR, err => {
        this.$emit('error', err);
      });
    },
  },
};
</script>
