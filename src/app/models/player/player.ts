import { Canvas, CanvasEvents } from "../../ui/canvas.js";
import { ShipBase } from "../shipBase.js";

export class Player extends ShipBase {
  readonly canvas: Canvas;
  readonly canvasEvents: CanvasEvents;

  constructor(x: number, y: number) {
    super();
    this.canvas = Canvas.getInstance();
    this.canvasEvents = CanvasEvents.getInstance();

    this.init(x, y);
  }

  protected init(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.health = 100;
    this.radius = 30;
    this.maxSpeed = 3;
    this.accelerationModifier = 0.05;
  }

  draw(): void {
    this.canvas.context.fillRect(this.x, this.y, 20, 20)
  }

  update(): void {
    this.calculateMovement()

    this.x += this.dx;
    this.y += this.dy;
  }

  calculateMovement() {
    if (this.canvasEvents.keyboard["ArrowUp"]) {
      this.dy -= this.accelerationModifier;
    }
    if (this.canvasEvents.keyboard["ArrowDown"]) {
      this.dy += this.accelerationModifier;
    }
    if (this.canvasEvents.keyboard["ArrowLeft"]) {
      this.dx -= this.accelerationModifier;
    }
    if (this.canvasEvents.keyboard["ArrowRight"]) {
      this.dx += this.accelerationModifier;
    }
  }
}

