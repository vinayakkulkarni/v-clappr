declare module '@clappr/core' {
  export type PlayerOptions = {
    parentId: string;
    [key: string]: unknown;
  };

  export class Player {
    constructor(options: PlayerOptions);
    destroy(): void;
    configure(options: unknown): void;
  }
}
