import { BaseEntity } from "./base-entity.js";
export class BaseShip extends BaseEntity {
    constructor() {
        super(...arguments);
        this.maxSpeed = 0;
        this.accelerationModifier = 0;
        this.health = 0;
        this.angle = 0;
        this.resourcesLoaded = false;
    }
}
//# sourceMappingURL=base-ship.js.map