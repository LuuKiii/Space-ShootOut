import { CollisionHandler } from "../../core/collision-handler.js";
import { Flags } from "../../core/global-flags.js";
import { Canvas, CanvasEvents } from "../../ui/canvas.js";
import { CollisionCalculator } from "../../utils/collision-calculator.js";
import { BaseShip } from "../base/base-ship.js";
export class Player extends BaseShip {
    constructor(pos) {
        super();
        this.image = new Image();
        this.ctx = Canvas.getContext();
        this.canvasEvents = CanvasEvents.getInstance();
        this.flags = Flags.getInstance();
        this._position = Object.assign({}, pos);
        this._movement = this.createMovementObject();
        this._angle = this.createAngleObject();
        this.init();
    }
    init() {
        this.image.onload = () => {
            this._resourcesLoaded = true;
        };
        this.image.src = "/assets/Player.png";
        this._health = 100;
        this._radius = 30;
        // this._maxSpeed = 3;
        // this._accelerationModifier = 0.05;
        // this._rotationModifier = 0.0001;
        // this._rotationMaxSpeed = 0.01;
        this._damageTakenFromCollision = 30;
    }
    draw() {
        this.ctx.save();
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.rotate(this._angle.rotation);
        this.ctx.drawImage(this.image, -this.radius, -this.radius, 2 * this.radius, 2 * this.radius);
        this.ctx.restore();
    }
    update() {
        this.calculateMovement();
        this._position.x += this.delta.x;
        this._position.y += this.delta.y;
        const colidesWith = CollisionCalculator.entitiesObjectIsIntersectingWith(this.originAndRadius, ['enemies']);
        colidesWith.forEach(ent => {
            if (ent instanceof BaseShip) {
                CollisionHandler.updateCollidedShips(this, ent);
            }
        });
        if (this.health <= 0) {
            this.flags.playerDead = true;
        }
    }
    calculateMovement() {
        if (this._angle.rotationSpeed > -this._angle.rotationMaxSpeed && this.canvasEvents.keyboard["q"]) {
            this._angle.rotationSpeed -= this._angle.rotationModifier;
        }
        else if (this._angle.rotationSpeed < this._angle.rotationMaxSpeed && this.canvasEvents.keyboard["e"]) {
            this._angle.rotationSpeed += this._angle.rotationModifier;
        }
        else {
            const slowdown = 0.3 * this._angle.rotationModifier;
            this._angle.rotationSpeed = Math.abs(this._angle.rotationSpeed) - this._angle.rotationModifier > 0
                ? this._angle.rotationSpeed + (-Math.sign(this._angle.rotationSpeed) * slowdown)
                : 0;
        }
        if (this.canvasEvents.keyboard["w"]) {
            this._delta.y -= this._movement.accelerationModifier.forward;
        }
        if (this.canvasEvents.keyboard["s"]) {
            this._delta.y += this._movement.accelerationModifier.backwards;
        }
        if (this.canvasEvents.keyboard["a"]) {
            this._delta.x -= this._movement.accelerationModifier.left;
        }
        if (this.canvasEvents.keyboard["d"]) {
            this._delta.x += this._movement.accelerationModifier.right;
        }
        this._angle.rotation += this._angle.rotationSpeed;
        if (!CollisionCalculator.isWholeInbouds(this.originAndRadius)) {
            this._position.x -= this.delta.x;
            this._position.y -= this.delta.y;
            this._delta.x = -this.delta.x / 4;
            this._delta.y = -this.delta.y / 4;
        }
    }
    static getInstance() {
        if (!Player.instance) {
            let canvasDimensions = Canvas.getDimensions();
            Player.instance = new Player({ x: canvasDimensions.width / 2, y: canvasDimensions.height / 2 });
        }
        return Player.instance;
    }
    static getPosition() {
        return Player.getInstance().position;
    }
}
//# sourceMappingURL=player.js.map