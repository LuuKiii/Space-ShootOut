import { SingleFire } from "../models/weaponry/single-fire.js";
import { CanvasEvents } from "../ui/canvas.js";
import { Helper } from "../utils/helper.js";
import { GameGlobalObject } from "./game-global-object.js";
export class PlayerWeaponHandler {
    constructor() {
        this.canvasEvents = CanvasEvents.getInstance();
        this.globalObj = GameGlobalObject.getInstance();
        this.player = this.globalObj.getPlayer();
        this.isFiring = false;
        this.onCooldown = false;
        this.canvasEvents.registerKeyboard(this);
    }
    playerFiring() {
        if (!this.isFiring)
            return;
        if (this.onCooldown)
            return;
        this.fire();
        this.setCooldown(0.5);
    }
    fire() {
        const { x, y } = Helper.calculateVelocityAngle(this.player.angle.facing);
        const newProjectile = new SingleFire({ x: this.player.position.x, y: this.player.position.y }, { x: x, y: y }, ["enemies"]);
        this.globalObj.addEntity('playerWeaponry', newProjectile);
    }
    updateFromKeyDown(keyPressed) {
        if (keyPressed === " ") {
            this.isFiring = true;
        }
    }
    updateFromKeyUp(keyReleased) {
        if (keyReleased === " ") {
            this.isFiring = false;
        }
    }
    setCooldown(timeInSec) {
        timeInSec *= 1000;
        this.onCooldown = true;
        setTimeout(() => {
            this.onCooldown = false;
        }, timeInSec);
    }
    static getInstance() {
        if (!PlayerWeaponHandler.instance) {
            PlayerWeaponHandler.instance = new PlayerWeaponHandler();
        }
        return PlayerWeaponHandler.instance;
    }
}
//# sourceMappingURL=player-weapon-handler.js.map