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
    }
    createMovementObject() {
        const defaultMaxSpeed = 1;
        const defaultAccelerationModifier = 0.05;
        return {
            maxSpeed: {
                forward: defaultMaxSpeed,
                left: defaultMaxSpeed,
                right: defaultMaxSpeed,
                backwards: defaultMaxSpeed,
            },
            acceleration: {
                forward: 0,
                left: 0,
                right: 0,
                backwards: 0,
            },
            accelerationModifier: {
                forward: defaultAccelerationModifier,
                left: defaultAccelerationModifier,
                right: defaultAccelerationModifier,
                backwards: defaultAccelerationModifier
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