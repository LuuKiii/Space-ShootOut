import { BaseEntity } from "./base-entity.js";
export class BaseShip extends BaseEntity {
    constructor() {
        super(...arguments);
        this._maxSpeed = 0;
        this._accelerationModifier = 0;
        this._acceleration = 0;
        this._rotation = 0;
        this._moveVectorAngle = 0;
        this._health = 0;
        this._resourcesLoaded = false;
    }
    get angle() {
        return this._rotation;
    }
    set angle(value) {
        this._rotation = value;
    }
    get moveVectorAngle() {
        return this._moveVectorAngle;
    }
    set moveVectorAngle(value) {
        this._moveVectorAngle = value;
    }
    get maxSpeed() {
        return this._maxSpeed;
    }
    get delta() {
        return this._delta;
    }
    set delta(value) {
        this._delta = value;
    }
}
//# sourceMappingURL=base-ship.js.map