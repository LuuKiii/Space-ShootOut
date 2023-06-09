import { GameGlobalObject } from "../../core/game/global-object";
import { CollisionCalculator } from "../../utils/collision-calculator";
import { Helper } from "../../utils/helper";
import { BaseEnemy } from "../base/base-enemy";
import { Player } from "../player/player";
import { SingleFire } from "../weaponry/cannon";
import { MovingAction } from "./enemy-behaviours";

export class BehaviourFunctions {
  static faceTowardsPlayer(instance: BaseEnemy) {
    instance.angle.rotation = Helper.calculateRotationTowardsEntity(instance.position, Player.getPosition())
  }

  static faceAwayFromPlayer(instance: BaseEnemy) {
    instance.angle.rotation = Helper.calculateRotationToFaceAwayEntity(instance.position, Player.getPosition())
  }

  static moveToRandomWaypoint(instance: BaseEnemy) {

  }

  static moveToRandomWaypointAndStop(instace: BaseEnemy) {
    if (instace.movingAction !== MovingAction.Stopped) return;

    instace.destinationPoint = Helper.getCoordinatesInbound(50);
    instace.angle.moveAngle = Helper.calculateAngle(instace.position, instace.destinationPoint);
    instace.delta = Helper.calculateVelocityAngle(instace.angle.moveAngle);
    instace.movingAction = MovingAction.Accelerating;
  }

  static fireAtPlayer(instance: BaseEnemy) {
    if (CollisionCalculator.isWholeOutOfBounds(instance.originAndRadius)) return;
    const isToFire = instance.chance.toFire > Math.random();
    if (!isToFire) return;

    const angle = Helper.calculateAngle(instance.position, Player.getPosition())
    const { x, y } = Helper.calculateVelocityAngle(angle);
    const newProjectile = new SingleFire({ x: instance.position.x, y: instance.position.y }, { x: x, y: y }, ["player"])
    const core = GameGlobalObject.getInstance();
    core.addEntity('enemyWeaponry', newProjectile)
  }

  static none(instance: BaseEnemy) {

  }
}
