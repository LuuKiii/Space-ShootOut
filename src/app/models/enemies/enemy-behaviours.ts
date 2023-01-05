import { BehaviourFunctions } from "./enemy-behaviours-functions.js";


export interface EnemyCooldowns {
  defaultCooldowns: {
    toFire: number
  },
  activeCooldowns: {
    [key in keyof EnemyCooldowns["defaultCooldowns"]]?: string
  }
}

export const MovingAction: {
  Accelerating: EnumMovingAction,
  Decelerating: EnumMovingAction,
  Stopped: EnumMovingAction,
  Moving: EnumMovingAction,
} = {
  Accelerating: 0,
  Decelerating: 1,
  Stopped: 2,
  Moving: 3,
}

export type EnumMovingAction = 0 | 1 | 2 | 3

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

