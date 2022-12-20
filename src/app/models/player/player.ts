import { Canvas, CanvasEvents } from "../../ui/canvas.js";
import { Helper } from "../../utils/helpers.js";
import { ShipBase } from "../shipBase.js";

export class Player extends ShipBase {
  readonly canvas: Canvas;
  readonly canvasEvents: CanvasEvents;
  readonly helper: Helper;

  constructor(x: number, y: number) {
    super();
    this.canvas = Canvas.getInstance();
    this.canvasEvents = CanvasEvents.getInstance();
    this.helper = Helper.getInstance();

    this.init(x, y);
  }

  protected init(x: number, y: number): void {
    this._x = x;
    this._y = y;
    this.health = 100;
    this._radius = 30;
    this.maxSpeed = 3;
    this.accelerationModifier = 0.05;
  }

  draw(): void {
    this.canvas.context.beginPath();
    this.canvas.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    this.canvas.context.stroke()
  }

  update(): void {
    this.calculateMovement()

    this._x += this.dx;
    this._y += this.dy;
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

    if (!this.helper.isWholeInbouds(this)) {
      this._x -= this.dx;
      this._y -= this.dy;
      this.dx = -this.dx / 4;
      this.dy = -this.dy / 4;
    }
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get radius() {
    return this._radius;
  }
}

