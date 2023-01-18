import { GameGlobalObject } from "./core/game/global-object.js";
import { GameLoop } from "./core/game/main-loop.js";
import { Flags } from "./core/global-flags.js";
import { PlayerWeaponHandler } from "./core/handlers/player-weapon-handler.js";
import { HudElement } from "./ui/hud.js";
import { MenuElement } from "./ui/menu.js";
import { RenderBackground } from "./ui/renderers/render-background.js";
import { Observer } from "./utils/observer.js";


class App {
  private menu: MenuElement;
  private hud: HudElement;

  private gameLoop: GameLoop;

  constructor() {
    this.menu = MenuElement.getInstance();
    this.hud = HudElement.getInstance();
    this.gameLoop = GameLoop.getInstance();
    this.gameLoop.startAnimating();
  }
}

const app = new App()
