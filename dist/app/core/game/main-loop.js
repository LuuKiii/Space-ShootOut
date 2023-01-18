import { RenderBackground } from "../../ui/renderers/render-background.js";
import { GlobalSettings } from "../../utils/debug.js";
import { Flags } from "../global-flags.js";
import { PlayerWeaponHandler } from "../handlers/player-weapon-handler.js";
import { GameGlobalObject } from "./global-object.js";
export class GameLoop {
    constructor() {
        this.renderBg = RenderBackground.getInstance();
        this.globalObj = GameGlobalObject.getInstance();
        this.playerWeaponHandler = PlayerWeaponHandler.getInstance();
        this.flags = Flags.getInstance();
        this.fps = {
            fpsInterval: 1000 / GlobalSettings.fpsLock,
            frameCount: 0,
            elapsed: 0,
            startTime: 0,
            prevTimeStamp: 0,
            currentTimeStamp: 0,
        };
        this.shouldAnimate = false;
    }
    startAnimating() {
        this.flags.register(this);
        this.shouldAnimate = true;
        this.fps.prevTimeStamp = performance.now();
        this.fps.startTime = this.fps.prevTimeStamp;
        this.animate();
    }
    animate() {
        if (this.shouldAnimate) {
            requestAnimationFrame(this.animate.bind(this));
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
    updateFromSubject() {
    }
    static getInstance() {
        if (!this.instance) {
            GameLoop.instance = new GameLoop();
        }
        return this.instance;
    }
}
//# sourceMappingURL=main-loop.js.map