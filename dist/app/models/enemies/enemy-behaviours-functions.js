import { GameGlobalObject } from "../../core/game-global-object.js";
import { CollisionCalculator } from "../../utils/collision-calculator.js";
import { Helper } from "../../utils/helper.js";
import { Player } from "../player/player.js";
import { SingleFire } from "../weaponry/single-fire.js";
import { MovingAction } from "./enemy-behaviours.js";
export class BehaviourFunctions {
    static faceTowardsPlayer(instance) {
        instance.angle.rotation = Helper.calculateRotationTowardsEntity(instance.position, Player.getPosition());
    }
    static faceAwayFromPlayer(instance) {
        instance.angle.rotation = Helper.calculateRotationToFaceAwayEntity(instance.position, Player.getPosition());
    }
    static moveToRandomWaypoint(instance) {
    }
    static moveToRandomWaypointAndStop(instace) {
        if (instace.movingAction !== MovingAction.Stopped)
            return;
        instace.destinationPoint = Helper.getCoordinatesInbound(50);
        instace.angle.moveAngle = Helper.calculateAngle(instace.position, instace.destinationPoint);
        instace.delta = Helper.calculateVelocityAngle(instace.angle.moveAngle);
        instace.movingAction = MovingAction.Accelerating;
    }
    static fireAtPlayer(instance) {
        if (CollisionCalculator.isWholeOutOfBounds(instance.originAndRadius))
            return;
        const isToFire = instance.chance.toFire > Math.random();
        if (!isToFire)
            return;
        const angle = Helper.calculateAngle(instance.position, Player.getPosition());
        const { x, y } = Helper.calculateVelocityAngle(angle);
        const newProjectile = new SingleFire({ x: instance.position.x, y: instance.position.y }, { x: x, y: y }, ["player"]);
        const core = GameGlobalObject.getInstance();
        core.addEntity('enemyWeaponry', newProjectile);
    }
    static none(instance) {
    }
}
//# sourceMappingURL=enemy-behaviours-functions.js.map