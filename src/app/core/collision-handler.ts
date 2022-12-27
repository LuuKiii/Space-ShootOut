import { BaseEnemy } from "../models/base/base-enemy.js";
import { BaseShip } from "../models/base/base-ship.js";
import { Player } from "../models/player/player.js";

export class CollisionHandler {
  static updateCollidedShips(...args: [BaseShip, BaseShip]) {
    args.forEach(ship => {
      if (ship instanceof Player) CollisionHandler.updatePlayer(ship)
      if (ship instanceof BaseEnemy) CollisionHandler.updateEnemy(ship)
    })
  }

  private static updateEnemy(ship: BaseShip) {
    ship.health -= ship.damageTakenFromCollision;
  }

  private static updatePlayer(player: Player) {
    console.log('player')

  }
}
