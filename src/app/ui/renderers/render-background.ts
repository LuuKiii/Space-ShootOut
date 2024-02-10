import { Canvas } from "../canvas";

export class RenderBackground {
  static instance: RenderBackground;

  private canvas: Canvas;
  private image = new Image();
  private resourcesLoaded: boolean;

  private constructor() {
    this.canvas = Canvas.getInstance();
    this.resourcesLoaded = false;
    this.init();
  }

  init() {
    this.image.onload = () => {
      this.resourcesLoaded = true;
    }
    this.image.src = "/src/assets/nebula.jpg";
  }

  drawBackground() {
    this.canvas.context.drawImage(this.image, 0, 0)
  }

  static getInstance() {
    if (!RenderBackground.instance) {
      RenderBackground.instance = new RenderBackground();
    }
    return RenderBackground.instance;
  };
}
