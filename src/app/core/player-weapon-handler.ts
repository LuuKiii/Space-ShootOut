import { SingleFire } from "../models/weaponry/single-fire.js";
import { CanvasEvents } from "../ui/canvas.js";
import { Helper } from "../utils/helper.js";
import { Observer } from "../utils/observer.js";
import { GameGlobalObject } from "./game-global-object.js";

export class PlayerWeaponHandler implements Observer {
  static instance: PlayerWeaponHandler;

  private canvasEvents = CanvasEvents.getInstance();
  private globalObj = GameGlobalObject.getInstance();
  private player = this.globalObj.getPlayer();
  private onCooldown: boolean = false;

  private constructor() {
    this.canvasEvents.register(this)
  }

  fire() {
    const angle = Helper.calculateAngle(this.player.position, this.canvasEvents.mouse)
    const { x, y } = Helper.calculateVelocity(angle, 0);
    const newProjectile = new SingleFire({ x: this.player.position.x, y: this.player.position.y }, { x: x, y: y })
    this.globalObj.addEntity('playerWeaponry', newProjectile);
  }

  //TODO Add button heldown 
  updateFromSubject(): void {
    if (this.onCooldown) return;
    const mouse = this.canvasEvents.mouse.button;

    if (mouse.LPM) {
      this.fire()
      this.setCooldown(0.5)
    }
  }

  setCooldown(timeInSec: number) {
    timeInSec *= 1000;
    this.onCooldown = true;
    setTimeout(() => {
      this.onCooldown = false;
    }, timeInSec);
  }

  static getInstance() {
    if (!PlayerWeaponHandler.instance) {
      PlayerWeaponHandler.instance = new PlayerWeaponHandler()
    }
    return PlayerWeaponHandler.instance;
  }
}

