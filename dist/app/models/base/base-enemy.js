import { BaseShip } from "./base-ship.js";
export class BaseEnemy extends BaseShip {
    constructor() {
        super(...arguments);
        this._chance = {
            toFire: 0
        };
    }
    get chance() {
        return this._chance;
    }
}
//# sourceMappingURL=base-enemy.js.map