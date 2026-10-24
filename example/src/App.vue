<script setup lang="ts">
  import { computed, defineAsyncComponent, reactive, ref } from 'vue';
  import { loadGa, track } from './analytics';
  import InstallCommand from './components/InstallCommand.vue';
  import SiteHeader from './components/SiteHeader.vue';
  import { usage } from './usage';

  // Clappr + hls.js are ~800 kB; load them after the page has painted.
  const VClappr = defineAsyncComponent(() =>
    import('v-clappr').then((m) => m.VClappr),
  );

  type Source = { id: string; label: string; kind: string; url: string };
  type LogEntry = { id: number; name: string; detail: string };

  const sources: Source[] = [
    {
      id: 'hls',
      label: 'Big Buck Bunny',
      kind: 'HLS · adaptive',
      url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    },
    {
      id: 'mp4',
      label: 'Sample clip',
      kind: 'MP4 · progressive',
      url: 'https://download.samplelib.com/mp4/sample-30s.mp4',
    },
  ];

  const options = {
    width: '100%',
    height: '100%',
    autoPlay: false,
    mute: false,
    loop: false,
    language: 'en-US',
    playbackNotSupportedMessage: 'Playback not supported',
    playback: { preload: 'metadata', playInline: true, crossOrigin: null },
  };

  const activeId = ref('hls');
  const active = computed(
    () => sources.find((s) => s.id === activeId.value) ?? sources[0],
  );

  const state = reactive({ current: 0, total: 0, status: 'idle', volume: 100 });
  const log = ref<LogEntry[]>([]);
  let logId = 0;
  let played = false;

  const pad = (n: number) => String(Math.floor(n)).padStart(2, '0');
  const timecode = (seconds: number) =>
    `${pad(seconds / 60)}:${pad(seconds % 60)}`;

  const record = (name: string, detail = '') => {
    log.value = [{ id: ++logId, name, detail }, ...log.value].slice(0, 7);
  };

  const selectSource = (id: string) => {
    if (id === activeId.value) return;
    activeId.value = id;
    Object.assign(state, { current: 0, total: 0, status: 'idle' });
    record('source', id);
    track('demo_interaction', { action: 'source', source: id });
  };

  const onPlay = () => {
    state.status = 'playing';
    record('play');
    if (!played) {
      played = true;
      track('demo_interaction', { action: 'play', source: activeId.value });
    }
  };
  const onPause = () => {
    state.status = 'paused';
    record('pause');
  };
  const onEnded = () => {
    state.status = 'ended';
    record('ended');
  };
  const onSeek = (seconds: number) => record('seek', timecode(seconds));
  const onTime = (e: { current: number; total: number }) => {
    state.current = e.current;
    state.total = e.total;
  };
  const onVolume = (v: number) => {
    state.volume = Math.round(v);
    record('volume-updated', `${state.volume}%`);
  };
  const onError = (e: Error) => {
    state.status = 'error';
    record('error', e.message ?? 'playback error');
  };

  loadGa();
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:py-8">
    <SiteHeader />

    <section class="pt-8 pb-6 lg:pt-12">
      <p class="font-mono text-xs tracking-wide text-accent uppercase">
        Vue 3 · Clappr · HLS
      </p>
      <h1
        class="mt-3 max-w-3xl text-[clamp(2rem,6vw,3.75rem)] leading-[1.02] font-light tracking-tight"
      >
        A media player that speaks
        <span class="font-extrabold">Vue events.</span>
      </h1>
      <p class="mt-4 max-w-xl text-base text-muted">
        <code class="font-mono text-ink">v-clappr</code> wraps the Clappr player
        as a typed Vue 3 component. Play the stream below and watch the
        component emit.
      </p>
      <div class="mt-6 max-w-3xl">
        <InstallCommand />
      </div>
    </section>

    <section
      class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]"
      aria-label="Live demo"
    >
      <div class="min-w-0">
        <div
          class="aspect-video w-full overflow-hidden rounded-lg bg-stage ring-1 ring-line"
        >
          <v-clappr
            :key="active.id"
            el="player"
            class="size-full"
            :source="active.url"
            :options="options"
            @play="onPlay"
            @pause="onPause"
            @ended="onEnded"
            @seek="onSeek"
            @time-updated="onTime"
            @volume-updated="onVolume"
            @error="onError"
          />
        </div>
        <div
          class="mt-3 grid grid-cols-2 gap-2"
          role="group"
          aria-label="Source"
        >
          <button
            v-for="s in sources"
            :key="s.id"
            type="button"
            :aria-pressed="activeId === s.id"
            class="rounded-md border px-3 py-2 text-left transition-colors"
            :class="
              activeId === s.id
                ? 'border-ink bg-surface'
                : 'border-line text-muted hover:border-muted'
            "
            @click="selectSource(s.id)"
          >
            <span class="block text-sm font-medium">{{ s.label }}</span>
            <span class="block font-mono text-xs text-muted">{{ s.kind }}</span>
          </button>
        </div>
      </div>

      <aside
        class="flex min-w-0 flex-col rounded-lg border border-line bg-surface p-4"
      >
        <p class="font-mono text-xs text-muted">@time-updated</p>
        <p
          class="mt-1 font-mono text-5xl leading-none font-extralight tracking-tighter tabular-nums"
        >
          {{ timecode(state.current) }}
        </p>
        <p class="mt-2 font-mono text-xs text-muted tabular-nums">
          of {{ timecode(state.total) }} ·
          <span :class="state.status === 'playing' ? 'text-accent' : ''">
            {{ state.status }}
          </span>
        </p>
        <div class="mt-5 border-t border-line pt-4">
          <p class="font-mono text-xs text-muted">Emitted events</p>
          <ol class="mt-2 space-y-1.5 font-mono text-[13px]" aria-live="polite">
            <li v-if="!log.length" class="text-muted">Press play to begin.</li>
            <li
              v-for="entry in log"
              :key="entry.id"
              class="flex justify-between gap-3"
            >
              <span>@{{ entry.name }}</span>
              <span class="truncate text-muted">{{ entry.detail }}</span>
            </li>
          </ol>
        </div>
      </aside>
    </section>

    <section class="mt-10 grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <div>
        <h2 class="text-lg font-semibold">Usage</h2>
        <p class="mt-2 text-sm text-muted">
          Register the component, pass a source and listen to any Clappr event
          as a Vue emit. Options map 1:1 to Clappr's player options.
        </p>
      </div>
      <pre
        class="min-w-0 overflow-x-auto rounded-lg border border-line bg-surface p-4 font-mono text-[13px] leading-relaxed"
      ><code>{{ usage }}</code></pre>
    </section>

    <footer
      class="mt-12 flex flex-wrap justify-between gap-2 border-t border-line pt-4 text-xs text-muted"
    >
      <span>MIT · Vinayak Kulkarni</span>
      <a
        href="https://vinayakkulkarni.dev"
        class="hover:text-ink"
        target="_blank"
        rel="noopener noreferrer"
      >
        vinayakkulkarni.dev
      </a>
    </footer>
  </div>
</template>
