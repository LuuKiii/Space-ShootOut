import { BaseEntity } from "./base-entity.js";

export abstract class BaseProjectile extends BaseEntity {
  protected _damageDealt: number = 0;

  get damageDealt() {
    return this._damageDealt;
  }

  onHitUpdate() {
    this._isToBeRemoved = true;
  }
} 
