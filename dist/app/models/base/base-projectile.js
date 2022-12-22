import { BaseEntity } from "./base-entity.js";
export class BaseProjectile extends BaseEntity {
    constructor() {
        super(...arguments);
        this.isOutOfBounds = false;
    }
}
//# sourceMappingURL=base-projectile.js.map