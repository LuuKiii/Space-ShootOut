export class BaseEntity {
    constructor() {
        this._position = { x: 0, y: 0 };
        this._delta = { x: 0, y: 0 };
        this._radius = 0;
        this.maxSpeed = 0;
        this.accelerationModifier = 0;
        this.health = 0;
        this.angle = 0;
        this.resourcesLoaded = false;
    }
}
//# sourceMappingURL=base-entity.js.map