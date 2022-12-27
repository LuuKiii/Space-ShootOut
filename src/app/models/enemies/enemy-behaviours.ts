import { Helper } from "../../utils/helper.js";
import { BaseEnemy } from "../base/base-enemy.js";
import { Point } from "../base/base-entity.js";
import { BaseShip } from "../base/base-ship.js";
import { Player } from "../player/player.js";

class BehaviourFunctions {
  static faceTowardsPlayer(instance: BaseShip) {
    instance.angle = Helper.calculateRotationTowardsEntity(instance.position, Player.getPosition())
  }

  static faceAwayFromPlayer(instance: BaseShip) {
    instance.angle = Helper.calculateRotationToFaceAwayEntity(instance.position, Player.getPosition())
  }

  static moveToRandomWaypoint(instance: BaseShip) {

  }

  static moveToRandomWaypointAndStop(instace: BaseEnemy) {
    if (instace.movingAction !== MovingAction.Stopped) return;

    instace.destinationPoint = Helper.getCoordinatesInbound(50);
    instace.moveVectorAngle = Helper.calculateAngle(instace.position, instace.destinationPoint);
    instace.delta = Helper.calculateVelocity(instace.moveVectorAngle, instace.maxSpeed);
    instace.movingAction = MovingAction.Accelerating;
  }

  static fireAtPlayer(instance: BaseShip) {

  }

  static none(instance: BaseShip) {

  }
}

//TODO this api should be changed
// export interface EnemyBehaviours {
//   movingAction: MovingAction;
//   destinationPoint: Point | null;
//   behaviours: [FacingBehaviours, MovementBehaviours, FiringBehaviours];
//   updateFromBehaviours(): void;
// }

export const enum MovingAction {
  'Accelerating' = 0,
  'Decelerating' = 1,
  'Stopped' = 2,
  'Moving' = 3,
}

export type FacingBehaviours = 'faceTowardsPlayer' | 'faceAwayFromPlayer';
export type MovementBehaviours = 'moveToRandomWaypoint' | 'moveToRandomWaypointAndStop' | 'none';
export type FiringBehaviours = 'fireAtPlayer' | 'none'

export const shipBehaviours = {
  faceTowardsPlayer: BehaviourFunctions.faceTowardsPlayer,
  faceAwayFromPlayer: BehaviourFunctions.faceAwayFromPlayer,

  moveToRandomWaypoint: BehaviourFunctions.moveToRandomWaypoint,
  moveToRandomWaypointAndStop: BehaviourFunctions.moveToRandomWaypointAndStop,

  fireAtPlayer: BehaviourFunctions.fireAtPlayer,

  none: BehaviourFunctions.none
};

