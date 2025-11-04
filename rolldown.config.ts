import { defineConfig } from 'rolldown';
import Vue from 'unplugin-vue/rolldown';
import { resolve } from 'path';
import pkg from './package.json';

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * (c) ${new Date().getFullYear()} ${pkg.author.name}<${pkg.author.email}>
 * Released under the ${pkg.license} License
 */
`;

export default defineConfig({
  input: resolve(__dirname, 'src/index.ts'),
  external: [
    'vue',
    '@clappr/core',
    '@clappr/plugins',
    '@clappr/hlsjs-playback',
  ],
  output: [
    {
      file: `dist/${pkg.name}.js`,
      format: 'es',
      banner,
      sourcemap: true,
      exports: 'named',
    },
    {
      file: `dist/${pkg.name}.umd.cjs`,
      format: 'umd',
      name: 'VClappr',
      banner,
      sourcemap: true,
      exports: 'named',
      globals: {
        vue: 'vue',
        '@clappr/core': 'core',
        '@clappr/plugins': 'plugins',
        '@clappr/hlsjs-playback': 'HlsjsPlayback',
      },
    },
    {
      file: `dist/${pkg.name}.cjs`,
      format: 'cjs',
      banner,
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [Vue()],
  treeshake: true,
});
