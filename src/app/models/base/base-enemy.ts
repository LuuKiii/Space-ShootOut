import { MovingAction, FacingBehaviours, MovementBehaviours, FiringBehaviours, EnumMovingAction } from "../enemies/enemy-behaviours";
import { Angle, Point } from "./base-types";
import { WeaponryTypes } from "./base-projectile";
import { BaseShip } from "./base-ship";

export abstract class BaseEnemy extends BaseShip {
  abstract movingAction: EnumMovingAction;
  abstract destinationPoint: Point | null;
  abstract targetFacing: number | null;

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
