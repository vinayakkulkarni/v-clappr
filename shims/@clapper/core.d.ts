declare module '@clappr/core' {
  type PlayerOptions = {
    parentId: string;
    [key: string]: any;
  };

  export class Player {
    constructor(options: PlayerOptions);
  }
}
