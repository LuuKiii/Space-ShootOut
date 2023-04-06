import { RenderBackground } from "../../ui/renderers/render-background";
import { FrameLimiter, GlobalSettings } from "../../utils/debug";
import { Observer } from "../../utils/observer";
import { Flags } from "../global-flags";
import { PlayerWeaponHandler } from "../handlers/player-weapon-handler";
import { GameGlobalObject } from "./global-object";

export class GameLoop implements Observer {
  private static instance: GameLoop;

  private fps: FrameLimiter;
  private shouldAnimate: boolean;
  private renderBg = RenderBackground.getInstance();
  private globalObj = GameGlobalObject.getInstance();
  private playerWeaponHandler = PlayerWeaponHandler.getInstance();
  private flags = Flags.getInstance();

  private constructor() {
    this.fps = {
      fpsInterval: 1000 / GlobalSettings.fpsLock,
      frameCount: 0,
      elapsed: 0,
      startTime: 0,
      prevTimeStamp: 0,
      currentTimeStamp: 0,
    }
    this.shouldAnimate = false;
  }

  public startAnimating() {
    this.flags.register(this);
    this.shouldAnimate = true;
    this.fps.prevTimeStamp = performance.now();
    this.fps.startTime = this.fps.prevTimeStamp;
    this.animate();
  }

  private animate() {
    if (this.shouldAnimate) {
      requestAnimationFrame(this.animate.bind(this))
    }

    this.fps.currentTimeStamp = performance.now();
    this.fps.elapsed = this.fps.currentTimeStamp - this.fps.prevTimeStamp;

    if (this.fps.elapsed > this.fps.fpsInterval) {
      this.fps.prevTimeStamp = this.fps.currentTimeStamp - (this.fps.elapsed % this.fps.fpsInterval);

      // const sinceStart = this.fps.currentTimeStamp - this.fps.startTime
      // const currentFps = Math.round((1000 / (sinceStart / ++this.fps.frameCount)) * 100) / 100;
      // console.log(`Time elapsed ${Math.round((sinceStart / 1000) * 100) / 100} + secs @  ${currentFps} + fps.`)

      this.renderBg.drawBackground();
      this.globalObj.updateAndDrawAllEntities();
      this.globalObj.spawner();
      this.playerWeaponHandler.playerFiring();
    }
  }

  updateFromSubject(): void {

  }

  public static getInstance() {
    if (!this.instance) {
      GameLoop.instance = new GameLoop();
    }
    return this.instance;
  }
}
