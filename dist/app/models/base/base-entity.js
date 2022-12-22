export class BaseEntity {
    constructor() {
        this._position = { x: 0, y: 0 };
        this._delta = { x: 0, y: 0 };
        this._radius = 0;
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
}
//# sourceMappingURL=base-entity.js.map