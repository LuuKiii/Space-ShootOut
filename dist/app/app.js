import { MenuElement } from "./ui/menu.js";
import { HudElement } from "./ui/hud.js";
import { GameGlobalObject } from "./core/game-global-object.js";
import { RenderBackground } from "./core/render-background.js";
import { PlayerWeaponHandler } from "./core/player-weapon-handler.js";
class App {
    constructor() {
        this.menu = MenuElement.getInstance();
        this.hud = HudElement.getInstance();
        this.globalObj = GameGlobalObject.getInstance();
        this.playerWeaponHanlder = PlayerWeaponHandler.getInstance();
        this.renderBg = RenderBackground.getInstance();
        this.setup();
    }
    setup() {
        this.animate();
    }
    animate() {
        this.renderBg.drawBackground();
        this.globalObj.updateAndDrawAllEntities();
        requestAnimationFrame(this.animate.bind(this));
    }
}
const app = new App();
//# sourceMappingURL=app.js.map