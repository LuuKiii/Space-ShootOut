import { BaseEntity } from "./base-entity.js";
export class BaseProjectile extends BaseEntity {
    constructor() {
        super(...arguments);
        this._damageDealt = 0;
    }
    get damageDealt() {
        return this._damageDealt;
    }
    onHitUpdate() {
        this._isToBeRemoved = true;
    }
}
//# sourceMappingURL=base-projectile.js.map