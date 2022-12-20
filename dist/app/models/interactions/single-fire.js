import { Canvas } from "../../ui/canvas.js";
import { BaseProjectile } from "../base/projectile-base.js";
export class SingleFire extends BaseProjectile {
    constructor(x, y, dx, dy) {
        super();
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = 0;
        this.canvas = Canvas.getInstance();
        this.init();
    }
    init() {
        this.radius = 10;
    }
    draw() {
        this.canvas.context.beginPath();
        this.canvas.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.canvas.context.fill();
    }
    update() {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
    }
}
//# sourceMappingURL=single-fire.js.map