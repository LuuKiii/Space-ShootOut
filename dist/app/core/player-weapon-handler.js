import { SingleFire } from "../models/weaponry/single-fire.js";
import { CanvasEvents } from "../ui/canvas.js";
import { Helper } from "../utils/helper.js";
import { GameGlobalObject } from "./game-global-object.js";
export class PlayerWeaponHandler {
    constructor() {
        this.canvasEvents = CanvasEvents.getInstance();
        this.globalObj = GameGlobalObject.getInstance();
        this.player = this.globalObj.getPlayer();
        this.onCooldown = false;
        this.canvasEvents.register(this);
    }
    fire() {
        const angle = Helper.calculateAngle(this.player.position, this.canvasEvents.mouse);
        const { x, y } = Helper.calculateVelocity(angle, 0);
        const newProjectile = new SingleFire({ x: this.player.position.x, y: this.player.position.y }, { x: x, y: y }, ["enemies"]);
        this.globalObj.addEntity('playerWeaponry', newProjectile);
    }
    //TODO Add button heldown 
    updateFromSubject() {
        if (this.onCooldown)
            return;
        const mouse = this.canvasEvents.mouse.button;
        if (mouse.LPM) {
            this.fire();
            this.setCooldown(0.5);
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