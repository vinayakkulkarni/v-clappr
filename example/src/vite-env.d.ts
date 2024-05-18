/* eslint-disable @typescript-eslint/ban-types */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module '@clappr/core' {
  export type PlayerOptions = {
    parentId: string;
    [key: string]: unknown;
  };

  export class Player {
    constructor(options: PlayerOptions);
    destroy(): void;
    configure(options: PlayerOptions): void;
  }
}
