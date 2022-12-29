import { SingleFire } from "../models/weaponry/single-fire.js";
import { CanvasEvents } from "../ui/canvas.js";
import { Helper } from "../utils/helper.js";
import { Observer, ObserverCanvas } from "../utils/observer.js";
import { GameGlobalObject } from "./game-global-object.js";

export class PlayerWeaponHandler implements ObserverCanvas {
  static instance: PlayerWeaponHandler;

  private canvasEvents = CanvasEvents.getInstance();
  private globalObj = GameGlobalObject.getInstance();
  private player = this.globalObj.getPlayer();
  private isFiring: boolean = false;
  private onCooldown: boolean = false;

  private constructor() {
    this.canvasEvents.registerKeyboard(this)
  }

  playerFiring() {
    if (!this.isFiring) return;
    if (this.onCooldown) return;

    this.fire()
    this.setCooldown(0.5)
  }

  fire() {
    const { x, y } = Helper.calculateVelocity(this.player.angle.facing, 0);
    const newProjectile = new SingleFire({ x: this.player.position.x, y: this.player.position.y }, { x: x, y: y }, ["enemies"])
    this.globalObj.addEntity('playerWeaponry', newProjectile);
  }

  updateFromKeyDown(keyPressed: string): void {
    if (keyPressed === " ") {
      this.isFiring = true;
    }
  }

  updateFromKeyUp(keyReleased: string): void {
    if (keyReleased === " ") {
      this.isFiring = false;
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

