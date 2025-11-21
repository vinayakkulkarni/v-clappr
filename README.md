# V-Clappr 🎥

<!-- Badges -->
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/vinayakkulkarni/v-clappr/ci.yml?logo=github-actions)](https://github.com/vinayakkulkarni/v-clappr/actions/workflows/ci.yml)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/vinayakkulkarni/v-clappr/codeql.yml?logo=lgtm&logoWidth=18)](https://github.com/vinayakkulkarni/v-clappr/actions/workflows/codeql.yml)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/vinayakkulkarni/v-clappr/shipjs-trigger.yml?label=⛴%20Ship.js%20trigger)](https://github.com/vinayakkulkarni/v-clappr/actions/workflows/shipjs-trigger.yml)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/vinayakkulkarni/v-clappr?sort=semver&logo=github)](https://github.com/vinayakkulkarni/v-clappr/releases)
[![npm](https://img.shields.io/npm/v/v-clappr?sort=semver&logo=npm)](https://www.npmjs.com/package/v-clappr)
[![DeepScan grade](https://deepscan.io/api/teams/9055/projects/11603/branches/309654/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=9055&pid=11603&bid=309654)
[![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/vinayakkulkarni/v-clappr)](https://snyk.io/test/github/vinayakkulkarni/v-clappr)
<!-- [![Netlify](https://img.shields.io/netlify/341e9f45-256e-4ad0-9f7f-b948b60f4e99?logo=netlify)](https://app.netlify.com/sites/v-clappr/deploys) -->
[![GitHub contributors](https://img.shields.io/github/contributors/vinayakkulkarni/v-clappr)](https://github.com/vinayakkulkarni/v-clappr/graphs/contributors)
[![npm type definitions](https://img.shields.io/npm/types/v-clappr?logo=typescript)](https://github.com/vinayakkulkarni/v-clappr/blob/main/package.json)
[![npm](https://img.shields.io/npm/dt/v-clappr?logo=npm)](http://npm-stat.com/charts.html?package=v-clappr)
[![npm](https://img.shields.io/npm/dw/v-clappr?logo=npm)](http://npm-stat.com/charts.html?package=v-clappr)
[![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/v-clappr)](https://bundlephobia.com/package/v-clappr@latest)

[![built using janak](https://img.shields.io/badge/built%20using-janak-brightgreen)](https://github.com/vinayakkulkarni/janak)
[![vue](https://img.shields.io/npm/dependency-version/v-clappr/dev/vue?logo=vue.js)](https://vuejs.org/)
[![rolldown](https://img.shields.io/github/package-json/dependency-version/vinayakkulkarni/v-clappr/dev/rolldown)](https://rolldown.rs)
[![eslint](https://img.shields.io/github/package-json/dependency-version/vinayakkulkarni/v-clappr/dev/eslint?logo=eslint)](https://eslint.org/)
[![prettier](https://img.shields.io/github/package-json/dependency-version/vinayakkulkarni/v-clappr/dev/prettier?logo=prettier)](https://prettier.io/)
[![typescript](https://img.shields.io/github/package-json/dependency-version/vinayakkulkarni/v-clappr/dev/typescript?logo=TypeScript)](https://www.typescriptlang.org/)
<!-- End Badges -->

---

## Features

- Built with latest [`@clappr/core`](https://www.npmjs.com/package/@clappr/core)
- Built from scratch using [TypeScript](https://www.typescriptlang.org)
- Built for [Vue 3](https://vuejs.org) using [Rolldown](https://rolldown.rs)

---

## Demo

[![Edit v-clappr](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/v-clappr?file=src/App.vue)

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
- [@clappr/hlsjs-playback](https://www.npmjs.com/package/@clappr/hlsjs-playback)

### Build Setup

```bash
# install dependencies
$ npm ci

# package the library
$ npm run build
```

## Installation

```bash
$ npm install v-clappr
$ npm install @clappr/core @clappr/plugins @clappr/hlsjs-playback
```

## Usage

Global component:

```js
// main.ts
import { VClappr } from 'v-clappr';
import { createApp } from 'vue';

const app = createApp({});
app.component('VClappr', VClappr);
```

Or use locally

```js
// component.vue
<script lang="ts">
import { defineComponent } from 'vue';
import { VClappr } from 'v-clappr';

export default defineComponent({
  components: {
    VClappr,
  },
});
</script>
```

For Nuxt 3, create a file in `plugins/v-clappr.ts`

```js
import { VClappr } from 'v-clappr';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VClappr', VClappr);
});
```

## Example(s)

<details>
<summary>
<em>Example 1 (w/ all options – <a href="./example/src/App.vue">refer App.vue</a>)</em>
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
import { defineComponent, reactive } from 'vue';
import { VClappr } from 'v-clappr';

export default defineComponent({
  name: 'ClapprComponent',
  components: {
    VClappr,
  },
  setup() {
    const state = reactive({
      clappr: null,
      source: 'http://clappr.io/highline.mp4',
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
```

</details>

<details>
<summary>
<em>Example 2 (minimal)</em>
</summary>

HTML

```html
<v-clappr el="my-custom-id" :source="source" />
```

JS

```javascript
import { defineComponent, ref } from 'vue';
import { VClappr } from 'v-clappr';

export default defineComponent({
  name: 'ClapprComponent',
  components: {
    VClappr,
  },
  setup() {
    const source = ref('http://clappr.io/highline.mp4');

    return {
      source,
    };
  },
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
