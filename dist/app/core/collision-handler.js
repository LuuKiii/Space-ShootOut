import { BaseEnemy } from "../models/base/base-enemy.js";
import { Player } from "../models/player/player.js";
export class CollisionHandler {
    static updateCollidedShips(...args) {
        args.forEach(ship => {
            if (ship instanceof Player)
                CollisionHandler.updateColidedPlayer(ship);
            if (ship instanceof BaseEnemy)
                CollisionHandler.updateColidedEnemy(ship);
        });
    }
    static updateColidedEnemy(ship) {
        ship.health -= ship.damageTakenFromCollision;
    }
    static updateColidedPlayer(player) {
        console.log('player');
    }
    static updateProjectileHit(projectile, ship) {
        ship.health -= projectile.damageDealt;
        projectile.onHitUpdate();
    }
}
//# sourceMappingURL=collision-handler.js.map