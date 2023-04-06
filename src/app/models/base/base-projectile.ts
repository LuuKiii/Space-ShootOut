
import { EntityTypes } from "../../core/game/global-object";
import { BaseEntity } from "./base-entity";

export abstract class BaseProjectile extends BaseEntity {
  protected _damages: EntityTypes[] = [];
  protected _damageDealt: number = 0;

  get damages() {
    return this._damages;
  }

  set damages(value) {
    this._damages = value
  }

  get damageDealt() {
    return this._damageDealt;
  }

  onHitUpdate() {
    this._isToBeRemoved = true;
  }
}

export type WeaponryTypes = 'Cannon' | 'none';
