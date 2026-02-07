import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'v-clappr',
    },
    rollupOptions: {
      external: [
        'vue',
        '@clappr/core',
        '@clappr/plugins',
        '@clappr/hlsjs-playback',
      ],
      output: {
        exports: 'named',
      },
    },
  },
});
