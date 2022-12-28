import { CollisionHandler } from "../../core/collision-handler.js";
import { Canvas } from "../../ui/canvas.js";
import { CollisionCalculator } from "../../utils/collision-calculator.js";
import { BaseProjectile } from "../base/base-projectile.js";
import { BaseShip } from "../base/base-ship.js";
export class SingleFire extends BaseProjectile {
    constructor(pos, velocity, damages) {
        super();
        this.ctx = Canvas.getContext();
        this._position = Object.assign({}, pos);
        this._delta = Object.assign({}, velocity);
        this.damages = damages;
        this.init();
    }
    init() {
        this._radius = 10;
        this._damageDealt = 60;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this._radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
    update() {
        this._position.x = this.position.x + this.delta.x;
        this._position.y = this.position.y + this.delta.y;
        if (CollisionCalculator.isWholeOutOfBounds(this.originAndRadius)) {
            this._isToBeRemoved = true;
        }
        const colidesWith = CollisionCalculator.entitiesObjectIsIntersectingWith(this.originAndRadius, this.damages);
        colidesWith.forEach(ent => {
            if (ent instanceof BaseShip) {
                CollisionHandler.updateProjectileHit(this, ent);
            }
        });
    }
    get position() {
        return Object.assign({}, this._position);
    }
    get delta() {
        return Object.assign({}, this._delta);
    }
    get radius() {
        return this._radius;
    }
}
//# sourceMappingURL=single-fire.js.map