import { Canvas } from "./ui/canvas.js";
import { MenuElement } from "./ui/menu.js"
import { HudElement } from "./ui/hud.js";
import { Player } from "./models/player/player.js";
import { GameCore } from "./core/game.js";
import { RenderBackground } from "./core/render-background.js";

interface GameObject {
  player: Player;
  enemies: any[];
  misc: any[];
}

class App {
  private canvas: Canvas;
  private menu: MenuElement;
  private hud: HudElement;
  private core: GameCore;
  private renderBg: RenderBackground;

  constructor() {
    this.canvas = Canvas.getInstance();
    this.menu = MenuElement.getInstance();
    this.hud = HudElement.getInstance();
    this.core = GameCore.getInstance();
    this.renderBg = RenderBackground.getInstance();

    this.setup();
  }

  private setup() {
    this.animate();
  }

  animate() {
    // this.canvas.context.clearRect(0, 0, this.canvas.WIDTH, this.canvas.HEIGHT)
    this.renderBg.drawBackground();
    this.core.updateAndDrawAllObjects();

    requestAnimationFrame(this.animate.bind(this))
  }
}

const app = new App()

