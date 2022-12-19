export class HudElement {
    constructor() {
        this.element = document.querySelector(".hud");
    }
    static getInstance() {
        if (!HudElement.instance) {
            HudElement.instance = new HudElement();
        }
        return HudElement.instance;
    }
}
//# sourceMappingURL=hud.js.map