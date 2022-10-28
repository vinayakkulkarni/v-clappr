import { App, Plugin } from 'vue';
import VClappr from './VClappr.vue';

const VClapprPlugin: Plugin = {
  install(app: App) {
    app.component('VClappr', VClappr);
  },
};

export default VClapprPlugin;
