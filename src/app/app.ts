import { Canvas } from "./ui/canvas.js";
import { MenuElement } from "./ui/menu.js"
import { HudElement } from "./ui/hud.js";
import { Player } from "./models/player/player.js";
import { GameGlobalObject } from "./core/game-global-object.js";
import { RenderBackground } from "./core/render-background.js";
import { PlayerWeaponHandler } from "./core/player-weapon-handler.js";

interface GameObject {
  player: Player;
  enemies: any[];
  misc: any[];
}

class App {
  private canvas: Canvas;
  private menu: MenuElement;
  private hud: HudElement;
  private globalObj: GameGlobalObject;
  private playerWeaponHanlder: PlayerWeaponHandler;
  private renderBg: RenderBackground;

  constructor() {
    this.canvas = Canvas.getInstance();
    this.menu = MenuElement.getInstance();
    this.hud = HudElement.getInstance();
    this.globalObj = GameGlobalObject.getInstance();
    this.playerWeaponHanlder = PlayerWeaponHandler.getInstance();
    this.renderBg = RenderBackground.getInstance();

    this.setup();
  }

  private setup() {
    this.animate();
  }

  animate() {
    this.renderBg.drawBackground();
    this.globalObj.updateAndDrawAllObjects();

    requestAnimationFrame(this.animate.bind(this))
  }
}

const app = new App()

