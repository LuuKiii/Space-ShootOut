import { Player } from "../models/player/player.js";
import { ShipBase } from "../models/base/ship-base.js";
import { Canvas } from "../ui/canvas.js";

export class GameCore {
  private static instance: GameCore;

  readonly core: Core;

  private constructor() {
    const canvas = Canvas.getInstance();

    this.core = {
      player: [new Player(canvas.WIDTH / 2, canvas.HEIGHT / 2)],
      enemies: [],
      misc: [],
    }
  }

  updateAndDrawAllObjects() {
    for (const property in this.core) {
      this.core[property as keyof Core].forEach(element => {
        element.update();
        element.draw();
      });
    }
  }

  static getInstance() {
    if (!GameCore.instance) {
      GameCore.instance = new GameCore();
    }
    return GameCore.instance;
  }
}

interface Core {
  player: [Player];
  enemies: ShipBase[];
  misc: ShipBase[];
}
