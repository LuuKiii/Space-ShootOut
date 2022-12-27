import { BaseEntity, Vector } from "./base-entity.js";

export abstract class BaseShip extends BaseEntity {
  protected _maxSpeed: number = 0;
  protected _accelerationModifier: number = 0;
  protected _acceleration: number = 0;
  protected _rotation: number = 0;
  protected _moveVectorAngle: number = 0;

  protected _health: number = 0;
  protected _damageTakenFromCollision: number = 0;
  protected _damageDealtByColliding: number = 0;

  protected _resourcesLoaded = false;

  get maxSpeed() {
    return this._maxSpeed;
  }

  set maxSpeed(value) {
    this._maxSpeed = value;
  }

  get angle() {
    return this._rotation;
  }

  set angle(value: number) {
    this._rotation = value;
  }

  get moveVectorAngle() {
    return this._moveVectorAngle;
  }

  set moveVectorAngle(value) {
    this._moveVectorAngle = value;
  }

  get delta() {
    return this._delta;
  }

  set delta(value) {
    this._delta = value;
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
