import { Canvas } from "../canvas";
import { ResourceHandler } from "../../common/resourceHandler"; // Import the ResourceHandler class

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

    this.image.src = ResourceHandler.getResourcePath('nebula.jpg');
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
