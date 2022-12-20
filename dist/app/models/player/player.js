import { Canvas, CanvasEvents } from "../../ui/canvas.js";
import { CollisionCalculator } from "../../utils/collision-calculator.js";
import { ShipBase } from "../base/ship-base.js";
export class Player extends ShipBase {
    constructor(x, y) {
        super();
        this.image = new Image();
        this.canvas = Canvas.getInstance();
        this.canvasEvents = CanvasEvents.getInstance();
        this.collision = CollisionCalculator.getInstance();
        this.canvasEvents.register(this);
        this.init(x, y);
    }
    init(x, y) {
        this.image.onload = () => {
            this.resourcesLoaded = true;
        };
        this.image.src = "/assets/Player.png";
        this._x = x;
        this._y = y;
        this.health = 100;
        this._radius = 30;
        this.maxSpeed = 3;
        this.accelerationModifier = 0.05;
    }
    draw() {
        this.canvas.context.save();
        this.canvas.context.translate(this.x, this.y);
        this.canvas.context.rotate(this.angle);
        this.canvas.context.drawImage(this.image, -this.radius, -this.radius, 2 * this.radius, 2 * this.radius);
        this.canvas.context.restore();
    }
    update() {
        this.calculateMovement();
        this._x += this.dx;
        this._y += this.dy;
        this.angle = Math.atan2(this.canvasEvents.mouse.x - this.x, -(this.canvasEvents.mouse.y - this.y));
    }
    calculateMovement() {
        if (this.canvasEvents.keyboard["w"]) {
            this.dy -= this.accelerationModifier;
        }
        if (this.canvasEvents.keyboard["s"]) {
            this.dy += this.accelerationModifier;
        }
        if (this.canvasEvents.keyboard["a"]) {
            this.dx -= this.accelerationModifier;
        }
        if (this.canvasEvents.keyboard["d"]) {
            this.dx += this.accelerationModifier;
        }
        if (!this.collision.isWholeInbouds(this)) {
            this._x -= this.dx;
            this._y -= this.dy;
            this.dx = -this.dx / 4;
            this.dy = -this.dy / 4;
        }
    }
    updateFromSubject() {
        const mouse = this.canvasEvents.mouse.button;
        console.log(mouse);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get radius() {
        return this._radius;
    }
}
//# sourceMappingURL=player.js.map