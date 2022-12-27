import { BaseEnemy } from "../models/base/base-enemy.js";
import { BaseProjectile } from "../models/base/base-projectile.js";
import { BaseShip } from "../models/base/base-ship.js";
import { Player } from "../models/player/player.js";

export class CollisionHandler {
  static updateCollidedShips(...args: [BaseShip, BaseShip]) {
    args.forEach(ship => {
      if (ship instanceof Player) CollisionHandler.updateColidedPlayer(ship)
      if (ship instanceof BaseEnemy) CollisionHandler.updateColidedEnemy(ship)
    })
  }

  private static updateColidedEnemy(ship: BaseShip) {
    ship.health -= ship.damageTakenFromCollision;
  }

  private static updateColidedPlayer(player: Player) {
    console.log('player')
  }

  static updateProjectileHit(projectile: BaseProjectile, ship: BaseShip) {
    ship.health -= projectile.damageDealt;
    projectile.onHitUpdate()
  }

}
