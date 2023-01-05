import { BaseEntity, Vector } from "./base-entity.js";

export abstract class BaseShip extends BaseEntity {
  // protected _maxSpeed: number = 0;
  // protected _acceleration: number = 0;
  // protected _accelerationModifier: number = 0;
  // protected _sideWayAcceleration: number = 0;
  // protected _sideWayAccelerationModifier: number = 0;

  // protected _rotation: number = 0;
  // protected _rotationSpeed: number = 0;
  // protected _rotationMaxSpeed: number = 0;
  // protected _rotationModifier: number = 0;
  // protected _moveVectorAngle: number = 0;
  protected abstract _movement: Movement;
  protected abstract _angle: Angle;

  protected createMovementObject(): Movement {
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
    }
  };

  protected createAngleObject(): Angle {
    return {
      rotation: 0,
      rotationSpeed: 0,
      rotationMaxSpeed: 0.025,
      rotationModifier: 0.001,
      get facing() {
        return this.rotation - 0.5 * Math.PI
      },
      moveAngle: 0
    }
  };

  get angle() {
    return this._angle;
  }

  get movement() {
    return this._movement;
  }

  protected _health: number = 0;
  protected _damageTakenFromCollision: number = 0;
  protected _damageDealtByColliding: number = 0;

  protected _resourcesLoaded = false;

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

export type Movement = {
  maxSpeed: Directions,
  acceleration: Directions,
  accelerationModifier: Directions,
}

export type Directions = {
  forward: number,
  left: number,
  right: number,
  backwards: number
}

export type Angle = {
  rotation: number,
  rotationSpeed: number,
  rotationMaxSpeed: number,
  rotationModifier: number,
  get facing(): number,
  moveAngle: number,
}
