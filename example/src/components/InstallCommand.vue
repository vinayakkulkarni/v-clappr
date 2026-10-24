<script setup lang="ts">
  import { ref } from 'vue';
  import { track } from '../analytics';

  const command =
    'pnpm add v-clappr @clappr/core @clappr/plugins @clappr/hlsjs-playback hls.js';

  const copied = ref(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  const copy = async () => {
    await navigator.clipboard.writeText(command);
    track('install_copy', { manager: 'pnpm' });
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied.value = false), 1600);
  };
</script>

<template>
  <div
    class="flex min-w-0 items-stretch overflow-hidden rounded-md border border-line bg-surface"
  >
    <code
      class="min-w-0 flex-1 overflow-x-auto px-3 py-2.5 font-mono text-[13px] whitespace-nowrap"
    >
      <span class="text-muted select-none">$ </span>{{ command }}
    </code>
    <button
      type="button"
      class="shrink-0 border-l border-line px-3 font-mono text-xs text-muted transition-colors hover:text-ink"
      :aria-label="copied ? 'Copied install command' : 'Copy install command'"
      @click="copy"
    >
      {{ copied ? 'copied' : 'copy' }}
    </button>
  </div>
</template>
