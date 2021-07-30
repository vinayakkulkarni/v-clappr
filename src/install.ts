import VueCompositionApi from '@vue/composition-api';
import { VueConstructor } from 'vue';
import VClappr from './VClappr.vue';

let installed = false;

const install = {
  install(Vue: VueConstructor): void {
    if (installed) return;
    Vue.use(VueCompositionApi);
    Vue.component('VClappr', VClappr);
    installed = true;
  },
};

export default install;
