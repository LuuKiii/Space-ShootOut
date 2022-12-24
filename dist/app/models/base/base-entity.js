export class BaseEntity {
    constructor() {
        this._position = { x: 0, y: 0 };
        this._delta = { x: 0, y: 0 };
        this._radius = 0;
        this._isToBeRemoved = false;
    }
    get id() {
        if (this._id) {
            return this._id;
        }
        throw new Error("Id is not set");
    }
    set id(newId) {
        if (!this._id) {
            this._id = newId;
        }
        else {
            throw new Error("Cannot overwrite existing id");
        }
    }
    get position() {
        return Object.assign({}, this._position);
    }
    get delta() {
        return Object.assign({}, this._delta);
    }
    get radius() {
        return this._radius;
    }
    get isToBeRemoved() {
        return this._isToBeRemoved;
    }
    get originAndRadius() {
        return { id: this.id, x: this.position.x, y: this.position.y, radius: this.radius };
    }
}
//# sourceMappingURL=base-entity.js.map