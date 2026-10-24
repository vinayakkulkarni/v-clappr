<script setup lang="ts">
  import { track } from '../analytics';
  import { useColorModePreference } from '../color-mode';
  import type { ColorMode } from '../color-mode';

  const { preference, setPreference } = useColorModePreference();

  const modes: ColorMode[] = ['light', 'system', 'dark'];

  const choose = (mode: ColorMode) => {
    setPreference(mode);
    track('demo_interaction', { action: 'color_mode', mode });
  };

  const outbound = (target: 'github' | 'npm') => {
    track('outbound_click', { target });
  };
</script>

<template>
  <header
    class="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4"
  >
    <a href="/" class="flex items-center gap-2 font-mono text-sm font-medium">
      <span
        class="grid size-6 place-items-center rounded bg-ink text-canvas"
        aria-hidden="true"
      >
        <svg viewBox="0 0 16 16" class="size-3 fill-accent">
          <path d="M4 2.5v11l9-5.5z" />
        </svg>
      </span>
      v-clappr
    </a>
    <nav class="flex items-center gap-1 text-sm" aria-label="Project links">
      <a
        href="https://github.com/vinayakkulkarni/v-clappr"
        target="_blank"
        rel="noopener noreferrer"
        class="rounded px-2.5 py-1.5 text-muted transition-colors hover:text-ink"
        @click="outbound('github')"
      >
        GitHub
      </a>
      <a
        href="https://www.npmjs.com/package/v-clappr"
        target="_blank"
        rel="noopener noreferrer"
        class="rounded px-2.5 py-1.5 text-muted transition-colors hover:text-ink"
        @click="outbound('npm')"
      >
        npm
      </a>
      <div
        class="ml-2 flex rounded-md border border-line p-0.5"
        role="radiogroup"
        aria-label="Color mode"
      >
        <button
          v-for="mode in modes"
          :key="mode"
          type="button"
          role="radio"
          :aria-checked="preference === mode"
          class="rounded px-2 py-1 font-mono text-xs capitalize transition-colors"
          :class="
            preference === mode
              ? 'bg-ink text-canvas'
              : 'text-muted hover:text-ink'
          "
          @click="choose(mode)"
        >
          {{ mode }}
        </button>
      </div>
    </nav>
  </header>
</template>
