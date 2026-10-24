import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  build: {
    // hls.js ships as one prebuilt ~574 kB ES module that cannot be split
    // further; every other chunk stays well under the default 500 kB.
    chunkSizeWarningLimit: 600,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'hls', test: /node_modules[\\/]hls\.js[\\/]/ },
            {
              name: 'clappr-plugins',
              test: /node_modules[\\/]@clappr[\\/]plugins[\\/]/,
            },
            { name: 'clappr', test: /node_modules[\\/]@clappr[\\/]/ },
            { name: 'vue', test: /node_modules[\\/]@?vue/ },
          ],
        },
      },
    },
  },
});
