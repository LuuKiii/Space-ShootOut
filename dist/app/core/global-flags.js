export class Flags {
    constructor() {
        this.observers = [];
        this._playerDead = false;
    }
    get playerDead() {
        return this._playerDead;
    }
    set playerDead(value) {
        this._playerDead = value;
        this.notify();
    }
    notify() {
        this.observers.forEach(ob => ob.updateFromSubject());
    }
    register(observer) {
        this.observers.push(observer);
    }
    unregister(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
    static getInstance() {
        if (!Flags.instance) {
            Flags.instance = new Flags();
        }
        return Flags.instance;
    }
}
//# sourceMappingURL=global-flags.js.map