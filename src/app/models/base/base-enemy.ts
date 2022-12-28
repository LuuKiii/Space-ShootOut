import { MovingAction, FacingBehaviours, MovementBehaviours, FiringBehaviours } from "../enemies/enemy-behaviours.js";
import { Point } from "./base-entity.js";
import { WeaponryTypes } from "./base-projectile.js";
import { BaseShip } from "./base-ship.js";

export abstract class BaseEnemy extends BaseShip {
  abstract movingAction: MovingAction;
  abstract destinationPoint: Point | null;
  abstract behaviours: [FacingBehaviours, MovementBehaviours, FiringBehaviours];
  abstract weaponry: WeaponryTypes | null;
  abstract updateFromBehaviours(): void;
  abstract setChances(): void;

  protected _chance: EnemyChance = {
    toFire: 0
  };

  get chance() {
    return this._chance;
  }
}

export type EnemyChance = {
  toFire: number;

}
