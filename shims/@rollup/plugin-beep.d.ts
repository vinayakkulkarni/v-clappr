// @TODO: Remove this once https://github.com/rollup/plugins/pull/969
declare module '@rollup/plugin-beep' {
  import { Plugin } from 'rollup';
  export default function beep(): Plugin;
}
