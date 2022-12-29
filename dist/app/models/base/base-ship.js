import { BaseEntity } from "./base-entity.js";
export class BaseShip extends BaseEntity {
    constructor() {
        // protected _maxSpeed: number = 0;
        // protected _acceleration: number = 0;
        // protected _accelerationModifier: number = 0;
        // protected _sideWayAcceleration: number = 0;
        // protected _sideWayAccelerationModifier: number = 0;
        super(...arguments);
        this._health = 0;
        this._damageTakenFromCollision = 0;
        this._damageDealtByColliding = 0;
        this._resourcesLoaded = false;
        // get maxSpeed() {
        //   return this._maxSpeed;
        // }
        // set maxSpeed(value) {
        //   this._maxSpeed = value;
        // }
        // get rotation() {
        //   return this._rotation;
        // }
        // set rotation(value: number) {
        //   this._rotation = value;
        // }
        // get facingAngle() {
        //   return this.rotation - 0.5 * Math.PI;
        // }
        // get moveVectorAngle() {
        //   return this._moveVectorAngle;
        // }
        // set moveVectorAngle(value) {
        //   this._moveVectorAngle = value;
        // }
    }
    createMovementObject() {
        const equalMaxSpeeds = 1;
        const equalAccelerationModifier = 0.05;
        return {
            maxSpeed: {
                forward: equalMaxSpeeds,
                left: equalMaxSpeeds,
                right: equalMaxSpeeds,
                backwards: equalMaxSpeeds,
            },
            acceleration: {
                forward: 0,
                left: 0,
                right: 0,
                backwards: 0,
            },
            accelerationModifier: {
                forward: equalAccelerationModifier,
                left: equalAccelerationModifier,
                right: equalAccelerationModifier,
                backwards: equalAccelerationModifier
            }
        };
    }
    ;
    createAngleObject() {
        return {
            rotation: 0,
            rotationSpeed: 0,
            rotationMaxSpeed: 0.025,
            rotationModifier: 0.001,
            get facing() {
                return this.rotation - 0.5 * Math.PI;
            },
            moveAngle: 0
        };
    }
    ;
    get angle() {
        return this._angle;
    }
    get movement() {
        return this._movement;
    }
    get health() {
        return this._health;
    }
    set health(value) {
        this._health = value;
    }
    get damageTakenFromCollision() {
        return this._damageTakenFromCollision;
    }
    get damageDealtByColliding() {
        return this._damageDealtByColliding;
    }
}
//# sourceMappingURL=base-ship.js.map