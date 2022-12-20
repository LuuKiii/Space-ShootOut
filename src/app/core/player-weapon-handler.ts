import { SingleFire } from "../models/interactions/single-fire.js";
import { CanvasEvents } from "../ui/canvas.js";
import { Helper } from "../utils/helper.js";
import { Observer } from "../utils/observer.js";
import { GameGlobalObject } from "./game-global-object.js";

export class PlayerWeaponHandler implements Observer {
  static instance: PlayerWeaponHandler;

  private core = GameGlobalObject.getInstance().core;
  private player = this.core.player[0];

  private canvasEvents = CanvasEvents.getInstance();

  private constructor() {
    this.canvasEvents.register(this)
  }

  fire() {
    const angle = Helper.calculateAngle(this.player, this.canvasEvents.mouse)
    const { dx, dy } = Helper.calculateVelocity(angle, 0);
    const newProjectile = new SingleFire(this.player.x, this.player.y, dx, dy)
    this.core.projectiles.push(newProjectile)
  }

  updateFromSubject(): void {
    const mouse = this.canvasEvents.mouse.button;

    if (mouse.LPM) {
      this.fire()
    }
  }

  static getInstance() {
    if (!PlayerWeaponHandler.instance) {
      PlayerWeaponHandler.instance = new PlayerWeaponHandler()
    }
    return PlayerWeaponHandler.instance;
  }
}

