import { GameLoop } from "./core/game/main-loop.js";
import { HudElement } from "./ui/hud.js";
import { MenuElement } from "./ui/menu.js";
class App {
    constructor() {
        this.menu = MenuElement.getInstance();
        this.hud = HudElement.getInstance();
        this.gameLoop = GameLoop.getInstance();
        this.gameLoop.startAnimating();
    }
}
const app = new App();
//# sourceMappingURL=app.js.map