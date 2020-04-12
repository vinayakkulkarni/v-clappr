import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      file: 'dist/v-clappr.cjs.js',
      globals: {
        clappr: 'clappr',
      },
    },
    {
      format: 'umd',
      name: 'VClappr',
      file: 'dist/v-clappr.js',
      globals: {
        clappr: 'clappr',
      },
    },
    {
      format: 'es',
      file: 'dist/v-clappr.esm.js',
      globals: {
        clappr: 'clappr',
      },
    },
  ],
  plugins: [
    commonjs(),
    vue(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
  ],
  external: ['clappr'],
};
