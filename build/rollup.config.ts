import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import beep from '@rollup/plugin-beep';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import sucrase from '@rollup/plugin-sucrase';
import scss from 'rollup-plugin-scss';
import vue from 'rollup-plugin-vue';
import pkg from '../package.json';

const extensions = ['.js', '.ts', '.vue'];

const plugins = [
  alias({
    entries: {
      vue: 'vue/dist/vue.runtime.esm.js',
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
    output: 'dist/v-clappr.css',
  }),
  sucrase({
    exclude: ['node_modules/**'],
    transforms: ['typescript'],
  }),
  beep(),
];

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * (c) ${new Date().getFullYear()} ${pkg.author.name}<${pkg.author.email}>
 * Released under the ${pkg.license} License
 */
`;

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/v-clappr.esm.js',
      format: 'esm',
      name: 'VClappr',
      exports: 'named',
      sourcemap: true,
      banner,
    },
    {
      file: 'dist/v-clappr.cjs.js',
      format: 'cjs',
      name: 'VClappr',
      exports: 'named',
      sourcemap: true,
      banner,
    },
    {
      file: 'dist/v-clappr.js',
      format: 'umd',
      name: 'VClappr',
      exports: 'named',
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
  ],
  plugins,
  external: [
    'vue',
    '@vue/composition-api',
    '@clappr/core',
    '@clappr/plugins',
    '@clappr/hlsjs-playback',
    'dash-shaka-player',
  ],
};
