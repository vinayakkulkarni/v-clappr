'use strict';

var clappr = require('clappr');

var script = {
  name: 'VClappr',
  props: {
    el: {
      type: String,
      required: true,
      default: 'player'
    },
    source: {
      type: String,
      required: true,
      default: ''
    },
    options: {
      type: Object,
      required: false,
      default: () => ({
        width: 640,
        height: 360,
        poster: '',
        mute: false,
        autoplay: true,
        loop: false,
        disable_context_menu: false,
        disable_keyboard_shortcuts: false,
        mediacontrol: {},
        ga: {
          account: '',
          tracker_name: ''
        },
        watermark: {
          image: '',
          url: '',
          position: 'top-right'
        },
        plugins: []
      })
    }
  },
  data: () => ({
    player: null
  }),

  mounted() {
    const player = this.initClapprPlayer();
    this.player = player;
    this.registerEvents(player);
  },

  beforeDestroy() {
    this.player.destroy();
    this.player = null;
  },

  methods: {
    initClapprPlayer() {
      const player = new clappr.Player({
        parentId: `#${this.el}`,
        source: this.source,
        width: this.options.width,
        height: this.options.height,
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
        plugins: this.options.plugins
      });
      this.$emit('init', player);
      return player;
    },

    registerEvents(player) {
      player.on(clappr.Events.PLAYER_READY, () => {
        this.$emit('ready', player);
      });
      player.on(clappr.Events.PLAYER_PLAY, () => {
        this.$emit('play', player);
      });
      player.on(clappr.Events.PLAYER_PAUSE, () => {
        this.$emit('pause', player);
      });
      player.on(clappr.Events.PLAYER_STOP, () => {
        this.$emit('stop', player);
      });
      player.on(clappr.Events.PLAYER_ENDED, () => {
        this.$emit('ended', player);
      });
      player.on(clappr.Events.PLAYER_FULLSCREEN, bool => {
        this.$emit('fullscreen', bool);
      });
      player.on(clappr.Events.PLAYER_RESIZE, resize => {
        this.$emit('resize', resize);
      });
      player.on(clappr.Events.PLAYER_SEEK, time => {
        this.$emit('seek', time);
      });
      player.on(clappr.Events.PLAYER_TIMEUPDATE, progress => {
        this.$emit('timeupdate', progress);
      });
      player.on(clappr.Events.PLAYER_VOLUMEUPDATE, volume => {
        this.$emit('volumeupdate', volume);
      });
      player.on(clappr.Events.PLAYER_ERROR, err => {
        this.$emit('error', err);
      });
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { attrs: { id: _vm.el } })
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

module.exports = __vue_component__;
