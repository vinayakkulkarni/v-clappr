import Vue, { VueConstructor } from 'vue';

export type Options = {
  width?: number;
  height?: number;
  poster?: string;
  mute?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  language?: string;
  playbackNotSupportedMessage?: string;
  autoSeekFromUrl?: boolean;
  includeResetStyle?: boolean;
  playback?: {
    preload?: string;
    disableContextMenu?: boolean;
    controls?: boolean;
    crossOrigin?: string | null;
    playInline?: boolean;
    minimumDvrSize?: null | unknown;
    externalTracks?: string[] | null;
    hlsjsConfig?: any;
    shakaConfiguration?: any;
  };
};

export type VClapprProps = {
  el: string;
  source: string;
  options?: Options;
};

export const VClappr: VueConstructor<Vue>;
