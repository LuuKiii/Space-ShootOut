import { SingleFire } from "../models/interactions/single-fire.js";
import { CanvasEvents } from "../ui/canvas.js";
import { Helper } from "../utils/helper.js";
import { GameGlobalObject } from "./game-global-object.js";
export class PlayerWeaponHandler {
    constructor() {
        this.globalObj = GameGlobalObject.getInstance();
        this.player = this.globalObj.core.player.a;
        this.canvasEvents = CanvasEvents.getInstance();
        this.canvasEvents.register(this);
    }
    fire() {
        const angle = Helper.calculateAngle(this.player.position, this.canvasEvents.mouse);
        const { dx, dy } = Helper.calculateVelocity(angle, 0);
        const newProjectile = new SingleFire({ x: this.player.position.x, y: this.player.position.y }, { x: dx, y: dy });
        this.globalObj.addEntity('projectiles', newProjectile);
    }
    updateFromSubject() {
        const mouse = this.canvasEvents.mouse.button;
        if (mouse.LPM) {
            this.fire();
        }
    }
    static getInstance() {
        if (!PlayerWeaponHandler.instance) {
            PlayerWeaponHandler.instance = new PlayerWeaponHandler();
        }
        return PlayerWeaponHandler.instance;
    }
}
//# sourceMappingURL=player-weapon-handler.js.map