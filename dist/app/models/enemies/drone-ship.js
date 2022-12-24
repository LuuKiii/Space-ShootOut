import { Canvas } from "../../ui/canvas.js";
import { Helper } from "../../utils/helper.js";
import { BaseShip } from "../base/base-ship.js";
import { shipBehaviours } from "./enemy-behaviours.js";
export class DroneShip extends BaseShip {
    constructor(pos) {
        super();
        this.image = new Image();
        this.movingAction = 2 /* MovingAction.Stopped */;
        this.destinationPoint = null;
        this.behaviours = ['faceTowardsPlayer', 'moveToRandomWaypointAndStop', "none"];
        this.ctx = Canvas.getContext();
        this._position = Object.assign({}, pos);
        this.init();
    }
    init() {
        this.image.onload = () => {
            this._resourcesLoaded = true;
        };
        this.image.src = "/assets/SCruiser.png";
        this._health = 100;
        this._radius = 30;
        this._maxSpeed = 1;
        this._accelerationModifier = 0.005;
    }
    draw() {
        this.ctx.save();
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.rotate(this._rotation);
        this.ctx.drawImage(this.image, -this.radius, -this.radius, 2 * this.radius, 2 * this.radius);
        this.ctx.restore();
    }
    updateFromBehaviours() {
        for (const bhv of this.behaviours) {
            shipBehaviours[bhv](this);
        }
    }
    update() {
        if (this.movingAction !== 2 /* MovingAction.Stopped */) {
            this.calculateMovement();
        }
        this.updateFromBehaviours();
    }
    calculateMovement() {
        if (this.movingAction === 0 /* MovingAction.Accelerating */) {
            this._acceleration = this._acceleration + this._accelerationModifier > this.maxSpeed ? this.maxSpeed : this._acceleration + this._accelerationModifier;
        }
        if (this.movingAction === 1 /* MovingAction.Decelerating */) {
            this._acceleration = this._acceleration - this._accelerationModifier > 0 ? this._acceleration - this._accelerationModifier : 0;
        }
        // if (this.movingAction === MovingAction.Moving) {
        // }
        this._position.x += this.delta.x * this._acceleration;
        this._position.y += this.delta.y * this._acceleration;
        this.updateMovingAction();
    }
    updateMovingAction() {
        const breakingpoint = 10;
        if (Helper.calculateDistanceBetweenPoints(this.position, this.destinationPoint) < breakingpoint) {
            this.movingAction = 1 /* MovingAction.Decelerating */;
        }
    }
}
//# sourceMappingURL=drone-ship.js.map