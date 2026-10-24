import type { Plugin } from 'vue';
import VClappr from './components/VClappr.vue';

let installed = false;

const install: Exclude<Plugin['install'], undefined> = (app) => {
  if (!installed) {
    app.component('VClappr', VClappr);
    installed = true;
  }
};

export default install;
