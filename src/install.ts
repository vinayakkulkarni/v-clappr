import { App as Application, Plugin } from 'vue';
import VClappr from './components/VClappr.vue';
import { setVueInstance } from './utils/config';

let installed = false;

const install: Exclude<Plugin['install'], undefined> = (app: Application) => {
  if (!installed) {
    setVueInstance(app);
    app.component('VClappr', VClappr);
    installed = true;
  }
};

export default install;
