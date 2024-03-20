import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import pkg from './package.json';

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * (c) ${new Date().getFullYear()} ${pkg.author.name}<${pkg.author.email}>
 * Released under the ${pkg.license} License
 */
`;

export default defineConfig({
  build: {
    target: 'esnext',
    sourcemap: true,
    reportCompressedSize: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VClappr',
      formats: ['es', 'cjs', 'umd'],
      fileName: pkg.name,
    },
    commonjsOptions: {
      extensions: ['.js', '.ts', '.vue'],
      strictRequires: true,
      transformMixedEsModules: true,
      exclude: 'src/**',
      include: 'node_modules/**',
    },
    rollupOptions: {
      external: [
        'vue',
        '@clappr/core',
        '@clappr/plugins',
        '@clappr/hlsjs-playback',
      ],
      output: {
        banner,
        exports: 'named',
        strict: true,
        extend: true,
        globals: {
          vue: 'vue',
          clappr: 'clappr',
          '@clappr/core': 'core',
          '@clappr/plugins': 'plugins',
          '@clappr/hlsjs-playback': 'HlsjsPlayback',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'v-clappr.css';
          return assetInfo.name;
        },
      },
    },
  },
  plugins: [vue()],
});
