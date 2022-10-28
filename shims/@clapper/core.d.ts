declare module '@clappr/core' {
  type PlayerOptions = {
    parentId: string;
    [key: string]: unknown;
  };

  export class Player {
    constructor(options: PlayerOptions);
  }
}
