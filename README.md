# V-Clappr 🎥

<a href="http://npmjs.org/package/v-clappr" target="_blank"><img alt="npm (tag)" src="https://img.shields.io/npm/v/v-clappr/latest"></a> <a href="https://github.com/vinayakkulkarni/v-clappr/releases" target="_blank"><img alt="GitHub tag (latest SemVer pre-release)" src="https://img.shields.io/github/v/tag/vinayakkulkarni/v-clappr?include_prereleases&label=release%40latest"></a> <a href="https://travis-ci.org/github/vinayakkulkarni/v-clappr" target="_blank"><img alt="Travis (.org)" src="https://img.shields.io/travis/vinayakkulkarni/v-clappr?logo=travis"></a> <a href="https://github.com/vinayakkulkarni/v-clappr/actions?query=workflow%3A%22Ship+js+trigger%22" target="_blank"><img alt="Build Status" src="https://github.com/vinayakkulkarni/v-clappr/workflows/Ship%20js%20trigger/badge.svg"></a> <a href="https://github.com/vinayakkulkarni/v-clappr/releases/latest" target="_blank"><img src="http://img.badgesize.io/vinayakkulkarni/v-clappr/master/dist/v-clappr.min.js?compression=gzip" alt="gzip size"></a> <a href="https://travis-ci.org/vinayakkulkarni/v-clappr" target="_blank"><img src="https://travis-ci.org/vinayakkulkarni/v-clappr.svg?branch=master" alt="Build Status"></a> <a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-clappr?ref=badge_shield" target="_blank"><img alt="FOSSA Status" src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-clappr.svg?type=shield"/></a> <a href="http://npm-stat.com/charts.html?package=v-clappr" target="_blank"><img src="https://img.shields.io/npm/dm/v-clappr.svg" alt="npm downloads"></a> <a href="https://david-dm.org/vinayakkulkarni/v-clappr" target="_blank"><img alt="David" src="https://img.shields.io/david/vinayakkulkarni/v-clappr"></a> <a href="https://david-dm.org/vinayakkulkarni/janak?type=dev" target="_blank"><img alt="David" src="https://img.shields.io/david/dev/vinayakkulkarni/v-clappr?color=brightgreen"></a> <a href="https://github.com/vinayakkulkarni/v-clappr/commits/master" target="_blank"><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/vinayakkulkarni/v-clappr"></a> <a href="https://github.com/vinayakkulkarni/v-clappr/commits/master" target="_blank"><img alt="Maintenance" src="https://img.shields.io/maintenance/yes/2020"></a> <a href="https://github.com/vinayakkulkarni/v-clappr/graphs/contributors" target="_blank"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/vinayakkulkarni/v-clappr"></a>

---

* Tiny Vue.js wrapper for [Clappr](https://github.com/clappr/clappr/)

* This is [on GitHub](https://github.com/vinayakkulkarni/v-clappr) so let me know if I've b0rked it somewhere, give me a star :star: if you like it :beers:

* Demo here -> [💯 Codesandbox Link](http://bit.ly/v-clappr)

## Requirements

* [Vue.js](https://vuejs.org/) 2.x

## Installation

```bash
npm install v-clappr
# or
yarn add v-clappr
```

CDN: [UNPKG](https://unpkg.com/v-clappr/dist/) | [jsDelivr](https://cdn.jsdelivr.net/npm/v-clappr/dist/) (available as `window.VClappr`)

## Usage

Register the component globally:

```javascript
Vue.component('VClappr', require('v-clappr'));
```

Or use locally

```javascript
import VClappr from 'v-clappr';
```

<details>
<summary>
<em>Example 1 (<a href="examples/App.vue">refer App.vue</a>)</em>
</summary>

### HTML
```html
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
```

### JS
```javascript
import VClappr from 'v-clappr';

Vue.component('example-component', {
  components: {
    VClappr,
  },
  data: () => ({
    source:'https://your.site/yourfile.mp4',
    options: {
      width: 720,
      height: 480,
      poster: 'https://placehold.it/1000x1000',
      mute: false,
      autoplay: false,
      loop: false,
      disable_keyboard_shortcuts: false,
      disable_context_menu: true,
      mediacontrol: { seekbar: '#E113D3', buttons: '#66B2FF' },
      ga: {},
      watermark: {},
      plugins: [],
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
});
```

</details>

<details>
<summary>
<em>Example 2 (minimal)</em>
</summary>

### HTML
```html
  <v-clappr
    el="mycustomid"
    :source="source"
  />
```
### JS
```javascript
import VClappr from 'v-clappr';

Vue.component('example-component', {
  components: {
    VClappr,
  },
  data: () => ({
    source:'https://your.site/yourfile.mp4',
  }),
});
```

</details>

### Props

| Name            | Type   | Required? | Description                                                 |
| --------------  | ------ | --------- | ----------------------------------------------------------- |
| `el`     | String | Yes        | The id required for initializing Clappr    |
| `source`  | String | Yes        | The URL of the video to be fed to Clappr  |
| `options` | Object | No        | Set of options provided to `Clappr.Player()` defaults: [L24-L79](src/VClappr.vue#L24-L79) |

### Events

| Name                 | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| `ready` | Emits an `Object` the Player instance |
| `play` |  Emits an `Object` the Player instance |
| `pause` |  Emits an `Object` the Player instance |
| `stop` |  Emits an `Object` the Player instance |
| `ended` |  Emits an `Object` the Player instance |
| `fullscreen` | Emits an `Boolean` value. |
| `resize` | Emits an `Object` with Player's current size  |
| `seek` | Emits an `Object` current time in seconds |
| `timeupdate` | Emits an `Object` current & total time in seconds |
| `volumeupdate` | Emits an `Number` with current volume |
| `error` | Emits an `Object` with error event |

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

## Author

**v-clappr** © [Vinayak](https://github.com/vinayakkulkarni), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Vinayak Kulkarni with help from contributors ([list](https://github.com/vinayakkulkarni/v-clappr/contributors)).

> [vinayakkulkarni.dev](https://vinayakkulkarni.dev) · GitHub [@vinayakkulkarni](https://github.com/vinayakkulkarni) · Twitter [@\_vinayak_k](https://twitter.com/_vinayak_k)


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-clappr.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-clappr?ref=badge_large)