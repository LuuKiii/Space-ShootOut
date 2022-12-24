import { Helper } from "../../utils/helper.js";
import { Player } from "../player/player.js";
class BehaviourFunctions {
    static faceTowardsPlayer(instance) {
        instance.angle = Helper.calculateRotationTowardsEntity(instance.position, Player.getPosition());
    }
    static faceAwayFromPlayer(instance) {
        instance.angle = Helper.calculateRotationToFaceAwayEntity(instance.position, Player.getPosition());
    }
    static moveToRandomWaypoint(instance) {
    }
    static moveToRandomWaypointAndStop(instace) {
        if (instace.movingAction !== 2 /* MovingAction.Stopped */)
            return;
        instace.destinationPoint = Helper.getCoordinatesInbound(50);
        instace.moveVectorAngle = Helper.calculateAngle(instace.position, instace.destinationPoint);
        instace.delta = Helper.calculateVelocity(instace.moveVectorAngle, instace.maxSpeed);
        instace.movingAction = 0 /* MovingAction.Accelerating */;
    }
    static fireAtPlayer(instance) {
    }
    static none(instance) {
    }
}
export const shipBehaviours = {
    faceTowardsPlayer: BehaviourFunctions.faceTowardsPlayer,
    faceAwayFromPlayer: BehaviourFunctions.faceAwayFromPlayer,
    moveToRandomWaypoint: BehaviourFunctions.moveToRandomWaypoint,
    moveToRandomWaypointAndStop: BehaviourFunctions.moveToRandomWaypointAndStop,
    fireAtPlayer: BehaviourFunctions.fireAtPlayer,
    none: BehaviourFunctions.none
};
//# sourceMappingURL=enemy-behaviours.js.map