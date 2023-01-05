import { Canvas } from "../../ui/canvas.js";
import { Helper } from "../../utils/helper.js";
import { BaseEnemy } from "../base/base-enemy.js";
import { MovingAction, shipBehaviours } from "./enemy-behaviours.js";
export class DroneShip extends BaseEnemy {
    constructor(pos) {
        super();
        this.image = new Image();
        this.movingAction = MovingAction.Stopped;
        this.destinationPoint = null;
        this.behaviours = ['faceTowardsPlayer', 'moveToRandomWaypointAndStop', "fireAtPlayer"];
        this.weaponry = 'SingleFire';
        this.ctx = Canvas.getContext();
        this._position = pos;
        this._movement = this.createMovementObject();
        this._angle = this.createAngleObject();
        this.init();
    }
    init() {
        this.image.onload = () => {
            this._resourcesLoaded = true;
        };
        this.image.src = "/assets/SCruiser.png";
        this._radius = 30;
        // this._maxSpeed = 1;
        // this._accelerationModifier = 0.005;
        this._health = 100;
        this._damageDealtByColliding = 30;
        this._damageTakenFromCollision = 1000;
        this.setChances();
    }
    setChances() {
        this.chance.toFire = 0.005;
    }
    draw() {
        this.ctx.save();
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.rotate(this._angle.rotation);
        this.ctx.drawImage(this.image, -this.radius, -this.radius, 2 * this.radius, 2 * this.radius);
        this.ctx.restore();
    }
    update() {
        if (this.movingAction !== MovingAction.Stopped) {
            this.calculateMovement();
        }
        this.updateFromBehaviours();
        if (this._health <= 0) {
            this._isToBeRemoved = true;
        }
    }
    updateFromBehaviours() {
        for (const bhv of this.behaviours) {
            shipBehaviours[bhv](this);
        }
    }
    //TODO This requires work. like - a lot.
    calculateMovement() {
        // naive aproach - forward movement is applied to movement in any direction
        if (this.movingAction === MovingAction.Accelerating) {
            this._movement.acceleration.forward = this._movement.acceleration.forward + this._movement.accelerationModifier.forward > this._movement.maxSpeed.forward
                ? this._movement.maxSpeed.forward
                : this._movement.acceleration.forward + this._movement.accelerationModifier.forward;
        }
        if (this.movingAction === MovingAction.Decelerating) {
            this._movement.acceleration.forward = this._movement.acceleration.forward - this._movement.accelerationModifier.forward > 0
                ? this._movement.acceleration.forward - this._movement.accelerationModifier.forward
                : 0;
        }
        // if (this.movingAction === MovingAction.Moving) {
        // }
        this._position.x += this.delta.x * this._movement.acceleration.forward;
        this._position.y += this.delta.y * this._movement.acceleration.forward;
        this.updateMovingAction();
    }
    updateMovingAction() {
        const breakingpoint = 10;
        if (Helper.calculateDistanceBetweenPoints(this.position, this.destinationPoint) < breakingpoint) {
            this.movingAction = MovingAction.Decelerating;
        }
    }
}
//# sourceMappingURL=drone-ship.js.map