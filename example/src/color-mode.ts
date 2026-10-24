import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

export type ColorMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'v-clappr-color-mode';

const readStored = (): ColorMode => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : 'system';
  } catch {
    return 'system';
  }
};

/**
 * Single source of truth for the demo theme. The inline script in
 * `index.html` applies the same rule before first paint, so there is no flash.
 */
export const useColorModePreference = () => {
  const preference = ref<ColorMode>(readStored());
  const systemDark = ref(false);
  let media: MediaQueryList | null = null;

  const isDark = computed(
    () =>
      preference.value === 'dark' ||
      (preference.value === 'system' && systemDark.value),
  );

  const apply = () => {
    document.documentElement.classList.toggle('dark', isDark.value);
  };

  const onSystemChange = (event: MediaQueryListEvent) => {
    systemDark.value = event.matches;
    apply();
  };

  const setPreference = (mode: ColorMode) => {
    preference.value = mode;
    try {
      if (mode === 'system') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Storage can be unavailable (private mode); the choice still applies.
    }
    apply();
  };

  onMounted(() => {
    media = window.matchMedia('(prefers-color-scheme: dark)');
    systemDark.value = media.matches;
    media.addEventListener('change', onSystemChange);
    apply();
  });

  onBeforeUnmount(() => {
    media?.removeEventListener('change', onSystemChange);
  });

  return { preference, isDark, setPreference };
};
