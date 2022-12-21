import { Canvas, CanvasEvents } from "../../ui/canvas.js";
import { CollisionCalculator } from "../../utils/collision-calculator.js";
import { Helper } from "../../utils/helper.js";
import { BaseEntity } from "../base/base-entity.js";
export class Player extends BaseEntity {
    constructor(pos) {
        super();
        this.image = new Image();
        this.canvas = Canvas.getInstance();
        this.canvasEvents = CanvasEvents.getInstance();
        this._position = Object.assign({}, pos);
        this.init();
    }
    init() {
        this.image.onload = () => {
            this.resourcesLoaded = true;
        };
        this.image.src = "/assets/Player.png";
        this.health = 100;
        this._radius = 30;
        this.maxSpeed = 3;
        this.accelerationModifier = 0.05;
    }
    draw() {
        this.canvas.context.save();
        this.canvas.context.translate(this.position.x, this.position.y);
        this.canvas.context.rotate(this.angle);
        this.canvas.context.drawImage(this.image, -this.radius, -this.radius, 2 * this.radius, 2 * this.radius);
        this.canvas.context.restore();
    }
    update() {
        this.calculateMovement();
        this._position.x += this.delta.x;
        this._position.y += this.delta.y;
        this.angle = Helper.calculateRotateAngle(this.position, this.canvasEvents.mouse);
    }
    calculateMovement() {
        if (this.canvasEvents.keyboard["w"]) {
            this._delta.y -= this.accelerationModifier;
        }
        if (this.canvasEvents.keyboard["s"]) {
            this._delta.y += this.accelerationModifier;
        }
        if (this.canvasEvents.keyboard["a"]) {
            this._delta.x -= this.accelerationModifier;
        }
        if (this.canvasEvents.keyboard["d"]) {
            this._delta.x += this.accelerationModifier;
        }
        if (!CollisionCalculator.isWholeInbouds(Object.assign(Object.assign({}, this.position), { radius: this.radius }))) {
            this._position.x -= this.delta.x;
            this._position.y -= this.delta.y;
            this._delta.x = -this.delta.x / 4;
            this._delta.y = -this.delta.y / 4;
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
//# sourceMappingURL=player.js.map