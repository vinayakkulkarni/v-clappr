# V-Clappr 🎥

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/vinayakkulkarni/v-clappr/ci?logo=github-actions)](https://github.com/vinayakkulkarni/v-clappr/actions/workflows/ci.yml)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/vinayakkulkarni/v-clappr/Ship%20js%20trigger?label=⛴%20Ship.js%20trigger)](https://github.com/vinayakkulkarni/v-clappr/actions/workflows/shipjs-trigger.yml)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/vinayakkulkarni/v-clappr?sort=semver&logo=github)](https://github.com/vinayakkulkarni/v-clappr/releases)
[![npm](https://img.shields.io/npm/v/v-clappr?logo=npm)](https://www.npmjs.com/package/v-clappr)
[![npm](https://img.shields.io/npm/dm/v-clappr?logo=npm)](http://npm-stat.com/charts.html?package=v-clappr)
[![npm bundle size (version)](https://img.shields.io/bundlephobia/min/v-clappr/latest)](https://bundlephobia.com/package/v-clappr@latest)
[![npm type definitions](https://img.shields.io/npm/types/v-clappr)](https://github.com/vinayakkulkarni/v-clappr/blob/master/package.json)
[![DeepScan grade](https://deepscan.io/api/teams/9055/projects/11603/branches/309654/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=9055&pid=11603&bid=309654)
[![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/vinayakkulkarni/v-clappr)](https://snyk.io/test/github/vinayakkulkarni/v-clappr)
[![LGTM Alerts](https://img.shields.io/lgtm/alerts/github/vinayakkulkarni/v-clappr?logo=lgtm)](https://lgtm.com/projects/g/vinayakkulkarni/v-clappr/alerts/)
[![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/github/vinayakkulkarni/v-clappr?logo=lgtm)](https://lgtm.com/projects/g/vinayakkulkarni/v-clappr/context:javascript)
[![GitHub contributors](https://img.shields.io/github/contributors/vinayakkulkarni/v-clappr)](https://github.com/vinayakkulkarni/v-clappr/graphs/contributors)
[![FOSSA](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-clappr.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-clappr?ref=badge_shield)

[![eslint](https://img.shields.io/npm/dependency-version/v-clappr/dev/eslint?logo=eslint)](https://eslint.org/)
[![prettier](https://img.shields.io/npm/dependency-version/v-clappr/dev/prettier?logo=prettier)](https://prettier.io/)
[![vite](https://img.shields.io/npm/dependency-version/v-clappr/dev/vite?logo=vite)](https://vitejs.dev/)
[![vue](https://img.shields.io/npm/dependency-version/v-clappr/dev/vue?logo=vue.js)](https://vuejs.org/)
[![typescript](https://img.shields.io/npm/dependency-version/v-clappr/dev/typescript?logo=TypeScript)](https://www.typescriptlang.org/)


---
## Features

- Built with latest [`@clappr/core`](https://www.npmjs.com/package/@clappr/core)
- Built from scratch using [TypeScript](https://www.typescriptlang.org)
- For Vue 2.x version – `npm i v-clappr@2`
- For Vue 3.x version – `npm i v-clappr@3`

---
## Demo 

[![Edit VClappr Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](http://bit.ly/v-clappr-2)

---

## Table of Contents

- [V-Clappr 🎥](#v-clappr-)
  - [Features](#features)
  - [Demo](#demo)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
    - [Build Setup](#build-setup)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Globally](#globally)
    - [Locally](#locally)
  - [Example(s)](#examples)
  - [API](#api)
    - [Props](#props)
    - [Events](#events)
  - [Contributing](#contributing)
  - [Author](#author)
  - [License](#license)


## Requirements

- [Vue 3.x](https://vuejs.org/)
- [@clappr/core](https://www.npmjs.com/package/@clappr/core)
- [@clappr/plugins](https://www.npmjs.com/package/@clappr/core)
- [@clappr/plugins](https://www.npmjs.com/package/@clappr/hlsjs-playback)
<!-- - [dash-shaka-playback](https://www.npmjs.com/package/dash-shaka-playback) `^3.0.3` -->

### Build Setup

``` bash
# install dependencies
$ npm ci

# package the library
$ npm run build
```
## Installation

```bash
$ npm install v-clappr --save
$ npm install @clappr/core @clappr/plugins @clappr/hlsjs-playback dash-shaka-playback --save
$ npm install @vue/composition-api --save-dev
```

CDN: [UNPKG](https://unpkg.com/v-clappr/dist/) | [jsDelivr](https://cdn.jsdelivr.net/npm/v-clappr/dist/) (available as `window.VClappr`)

## Usage

### Globally
> As a component
```javascript
import { VClappr } from 'v-clappr';
Vue.component('VClappr', VClappr);
```
> As a plugin
```javascript
import VClappr from 'v-clappr';
Vue.use(VClappr);
```

### Locally
> As a component
```javascript
import { VClappr } from 'v-clappr';
```

## Example(s)

<details>
<summary>
<em>Example 1 (w/ all options – <a href="./examples/App.vue">refer App.vue</a>)</em>
</summary>

HTML
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

JS
```javascript
import { VClappr } from 'v-clappr';

Vue.component('example-component', {
  components: {
    VClappr,
  },
  data: () => ({
    source:'https://your.site/yourfile.mp4',
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
    clappr: null,
  }),
  methods: {
    oninit(clappr) {
      this.clappr = clappr;
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

HTML
```html
  <v-clappr
    el="mycustomid"
    :source="source"
  />
```
JS
```javascript
import { VClappr } from 'v-clappr';

Vue.component('example-component', {
  components: {
    VClappr,
  },
  data: () => ({
    source:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  }),
});
```

</details>

## API
### Props

| Name      | Type   | Required? | Description                                                                                                                                             |
| --------- | ------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `el`      | String | Yes       | The id required for initializing Clappr                                                                                                                 |
| `source`  | String | Yes       | The URL of the video to be fed to Clappr                                                                                                                |
| `options` | Object | No        | Set of options provided by [Clappr](https://github.com/clappr/clappr-core#hammer_and_wrench-configuration) defaults: [L47-L69](src/VClappr.vue#L47-L69) |

### Events

| Name                 | Description                                            |
| -------------------- | ------------------------------------------------------ |
| `ready`              | Emits an `Object` the Player instance                  |
| `resize`             | Emits an `Object` with width & height numbers          |
| `play`               | Emits an `Boolean` value                               |
| `pause`              | Emits an `Boolean` value                               |
| `stop`               | Emits an `Boolean` value                               |
| `ended`              | Emits an `Boolean` value                               |
| `seek`               | Emits an `Number` value                                |
| `error`              | Emits an `Error` type                                  |
| `time-updated`       | Emits an `Object` current & total time in microseconds |
| `volume-updated`     | Emits an `Number` with current volume                  |
| `subtitle-available` | Emits an `Boolean` value                               |

## Contributing 

1. Fork it ( [https://github.com/vinayakkulkarni/v-clappr/fork](https://github.com/vinayakkulkarni/v-clappr/fork) )
2. Create your feature branch (`git checkout -b feat/new-feature`)
3. Commit your changes (`git commit -Sam 'feat: add feature'`)
4. Push to the branch (`git push origin feat/new-feature`)
5. Create a new [Pull Request](https://github.com/vinayakkulkarni/v-clappr/compare)

_Note_: 
1. Please contribute using [GitHub Flow](https://web.archive.org/web/20191104103724/https://guides.github.com/introduction/flow/)
2. Commits & PRs will be allowed only if the commit messages & PR titles follow the [conventional commit standard](https://www.conventionalcommits.org/), _read more about it [here](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum)_
3. PS. Ensure your commits are signed. _[Read why](https://withblue.ink/2020/05/17/how-and-why-to-sign-git-commits.html)_


## Author

**v-clappr** &copy; [Vinayak](https://vinayakkulkarni.dev), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Vinayak Kulkarni with help from contributors ([list](https://github.com/vinayakkulkarni/v-clappr/contributors)).

> [vinayakkulkarni.dev](https://vinayakkulkarni.dev) · GitHub [@vinayakkulkarni](https://github.com/vinayakkulkarni) · Twitter [@\_vinayak_k](https://twitter.com/_vinayak_k)


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-clappr.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-clappr?ref=badge_large)
