import { BehaviourFunctions } from "./enemy-behaviours-functions.js";
export const MovingAction = {
    Accelerating: 0,
    Decelerating: 1,
    Stopped: 2,
    Moving: 3,
};
export const shipBehaviours = {
    faceTowardsPlayer: BehaviourFunctions.faceTowardsPlayer,
    faceAwayFromPlayer: BehaviourFunctions.faceAwayFromPlayer,
    moveToRandomWaypoint: BehaviourFunctions.moveToRandomWaypoint,
    moveToRandomWaypointAndStop: BehaviourFunctions.moveToRandomWaypointAndStop,
    fireAtPlayer: BehaviourFunctions.fireAtPlayer,
    none: BehaviourFunctions.none
};
//# sourceMappingURL=enemy-behaviours.js.map