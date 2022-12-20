"use strict";
//TODO
class Singleton {
    constructor() {
    }
    static getInstance() {
        if (Singleton.instance) {
            Singleton.instance = new Singleton;
        }
        return Singleton.instance;
    }
}
//# sourceMappingURL=singleton-base.js.map