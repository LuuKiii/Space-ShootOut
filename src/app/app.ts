import { MenuElement } from "./ui/menu.js"
import { HudElement } from "./ui/hud.js";
import { GameGlobalObject } from "./core/game-global-object.js";
import { RenderBackground } from "./core/render-background.js";
import { PlayerWeaponHandler } from "./core/player-weapon-handler.js";
import { Observer } from "./utils/observer.js";
import { Flags } from "./core/global-flags.js";

class App implements Observer {
  private menu: MenuElement;
  private hud: HudElement;
  private globalObj: GameGlobalObject;
  private playerWeaponHanlder: PlayerWeaponHandler;
  private renderBg: RenderBackground;
  private flags: Flags;

  private shouldAnimate: boolean;

  constructor() {
    this.menu = MenuElement.getInstance();
    this.hud = HudElement.getInstance();
    this.globalObj = GameGlobalObject.getInstance();
    this.playerWeaponHanlder = PlayerWeaponHandler.getInstance();
    this.renderBg = RenderBackground.getInstance();
    this.flags = Flags.getInstance();

    this.shouldAnimate = true;

    this.setup();
  }

  private setup() {
    this.flags.register(this);
    this.animate();
  }

  animate() {
    this.renderBg.drawBackground();
    this.globalObj.updateAndDrawAllEntities();
    this.globalObj.spawner();
    this.playerWeaponHanlder.playerFiring();

    if (this.shouldAnimate) {
      requestAnimationFrame(this.animate.bind(this))
    }
  }

  updateFromSubject(): void {
    // this.shouldAnimate = false;
  }

}

const app = new App()
