import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name: 'VClappr',
    file: 'dist/v-clappr.min.js',
    globals: {
      clappr: 'clappr',
    },
  },
  plugins: [
    commonjs(),
    vue(),
    terser(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
  ],
  external: ['clappr'],
};
