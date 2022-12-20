import { Player } from "../models/player/player.js";
import { BaseShip } from "../models/base/ship-base.js";
import { Canvas } from "../ui/canvas.js";
import { BaseProjectile } from "../models/base/projectile-base.js";

export class GameGlobalObject {
  private static instance: GameGlobalObject;

  readonly core: Core;

  private constructor() {
    const canvas = Canvas.getInstance();

    this.core = {
      player: [new Player(canvas.WIDTH / 2, canvas.HEIGHT / 2)],
      enemies: [],
      projectiles: [],
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
    if (!GameGlobalObject.instance) {
      GameGlobalObject.instance = new GameGlobalObject();
    }
    return GameGlobalObject.instance;
  }
}

interface Core {
  player: [Player];
  enemies: BaseShip[];
  projectiles: BaseProjectile[];
  misc: BaseShip[];
}
