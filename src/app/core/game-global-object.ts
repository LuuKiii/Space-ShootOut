import { Player } from "../models/player/player.js";
import { BaseEntity } from "../models/base/base-entity.js";
import { Canvas } from "../ui/canvas.js";
import { BaseProjectile } from "../models/base/base-projectile.js";

export class GameGlobalObject {
  private static instance: GameGlobalObject;

  readonly core: Core;

  private constructor() {
    const canvas = Canvas.getInstance();

    this.core = {
      player: [new Player({ x: canvas.WIDTH / 2, y: canvas.HEIGHT / 2 })],
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
  enemies: BaseEntity[];
  projectiles: BaseProjectile[];
  misc: BaseEntity[];
}
