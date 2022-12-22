import { Canvas } from "../../ui/canvas.js";
import { CollisionCalculator } from "../../utils/collision-calculator.js";
import { BaseProjectile } from "../base/base-projectile.js";
export class SingleFire extends BaseProjectile {
    constructor(pos, velocity) {
        super();
        this.ctx = Canvas.getContext();
        this._position = Object.assign({}, pos);
        this._delta = Object.assign({}, velocity);
        this.init();
    }
    init() {
        this._radius = 10;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this._radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
    update() {
        this._position.x = this.position.x + this.delta.x;
        this._position.y = this.position.y + this.delta.y;
        if (CollisionCalculator.isWholeOutOfBounds(Object.assign(Object.assign({}, this.position), { radius: this.radius }))) {
            this.isOutOfBounds = true;
        }
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