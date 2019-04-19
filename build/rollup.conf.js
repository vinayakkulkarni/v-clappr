import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  plugins: [
    commonjs(),
    vue(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
  ],
  external: ['clappr'],
  output: [
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
};
