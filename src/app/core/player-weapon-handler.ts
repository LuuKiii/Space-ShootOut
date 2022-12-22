import { SingleFire } from "../models/interactions/single-fire.js";
import { CanvasEvents } from "../ui/canvas.js";
import { Helper } from "../utils/helper.js";
import { Observer } from "../utils/observer.js";
import { GameGlobalObject } from "./game-global-object.js";

export class PlayerWeaponHandler implements Observer {
  static instance: PlayerWeaponHandler;

  private globalObj = GameGlobalObject.getInstance();
  private player = this.globalObj.getPlayer();

  private canvasEvents = CanvasEvents.getInstance();

  private constructor() {
    this.canvasEvents.register(this)
  }

  fire() {
    const angle = Helper.calculateAngle(this.player.position, this.canvasEvents.mouse)
    const { dx, dy } = Helper.calculateVelocity(angle, 0);
    const newProjectile = new SingleFire({ x: this.player.position.x, y: this.player.position.y }, { x: dx, y: dy })
    this.globalObj.addEntity('projectiles', newProjectile);
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

