import { BaseEntity } from "./base-entity.js";
import { MovementConsts, Angle, Vector } from "./base-types.js";

export abstract class BaseShip extends BaseEntity {
  protected abstract _movement: MovementConsts;
  protected abstract _angle: Angle;

  protected _health: number = 0;
  protected _damageTakenFromCollision: number = 0;
  protected _damageDealtByColliding: number = 0;

  protected _resourcesLoaded = false;

  protected createMovementObject(): MovementConsts {
    const defaultMaxSpeed = 1;
    const defaultAccelerationModifier = 0.05;

    return {
      maxSpeed: defaultMaxSpeed,
      acceleration: {
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
        return (this.rotation - 0.5 * Math.PI) % Math.PI * 2;
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

  abstract updateRotation(): void;
  abstract updateDelta(): void;
  abstract calculateDeltaModifier(currentVelocity: number, angle: number, deltaModifier: Vector, accelerationModifier: number, maxSpeed: number): Vector;
}

