import { BaseEnemy } from "../models/base/base-enemy.js";
import { Player } from "../models/player/player.js";
export class CollisionHandler {
    static updateCollidedShips(...args) {
        args.forEach(ship => {
            if (ship instanceof Player)
                CollisionHandler.updatePlayer(ship);
            if (ship instanceof BaseEnemy)
                CollisionHandler.updateEnemy(ship);
        });
    }
    static updateEnemy(ship) {
        ship.health -= ship.damageTakenFromCollision;
    }
    static updatePlayer(player) {
        console.log('player');
    }
}
//# sourceMappingURL=collision-handler.js.map