import { MovingAction, FacingBehaviours, MovementBehaviours, FiringBehaviours } from "../enemies/enemy-behaviours.js";
import { Point } from "./base-entity.js";
import { BaseShip } from "./base-ship.js";

export abstract class BaseEnemy extends BaseShip {
  abstract movingAction: MovingAction;
  abstract destinationPoint: Point | null;
  abstract behaviours: [FacingBehaviours, MovementBehaviours, FiringBehaviours];
  abstract updateFromBehaviours(): void;
}
