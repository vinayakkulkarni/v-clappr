import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/v-clappr/',
  // optimizeDeps: {
  //   include: ['dash-shaka-playback', 'clappr'],
  // },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  plugins: [vue()],
});
