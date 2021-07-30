import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import beep from '@rollup/plugin-beep';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import sucrase from '@rollup/plugin-sucrase';
import scss from 'rollup-plugin-scss';
import { terser } from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';
import pkg from '../package.json';

const extensions = ['.js', '.ts', '.vue'];

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * (c) 2021 ${pkg.author.name}<${pkg.author.email}>
 * Released under the ${pkg.license} License
 */
`;

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/v-clappr.min.js',
    format: 'umd',
    name: 'VClappr',
    exports: 'named',
    strict: true,
    sourcemap: true,
    banner,
    globals: {
      vue: 'vue',
      '@clappr/core': 'core',
      '@clappr/plugins': 'plugins',
      '@clappr/hlsjs-playback': 'HlsjsPlayback',
      '@vue/composition-api': 'vueCompositionApi',
    },
  },
  plugins: [
    alias({
      entries: {
        vue: 'vue/dist/vue.runtime.esm.js',
        Clappr: '@clappr/core/src/main.js',
      },
    }),
    resolve({
      extensions,
      browser: true,
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    commonjs({
      extensions,
      include: 'node_modules',
      exclude: 'src/**',
    }),
    vue({ css: false }),
    scss({
      output: 'dist/v-clappr.min.css',
      outputStyle: 'compressed',
    }),
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['typescript'],
    }),
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    }),
    beep(),
  ],
  external: [
    'vue',
    '@vue/composition-api',
    '@clappr/core',
    '@clappr/plugins',
    '@clappr/hlsjs-playback',
    'dash-shaka-player',
  ],
};
