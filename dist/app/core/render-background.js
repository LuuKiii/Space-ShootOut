import { Canvas } from "../ui/canvas.js";
export class RenderBackground {
    constructor() {
        this.image = new Image();
        this.canvas = Canvas.getInstance();
        this.resourcesLoaded = false;
        this.init();
    }
    init() {
        this.image.onload = () => {
            this.resourcesLoaded = true;
        };
        this.image.src = "/assets/nebula.jpg";
    }
    drawBackground() {
        this.canvas.context.drawImage(this.image, 0, 0);
    }
    static getInstance() {
        if (!RenderBackground.instance) {
            RenderBackground.instance = new RenderBackground();
        }
        return RenderBackground.instance;
    }
    ;
}
//# sourceMappingURL=render-background.js.map