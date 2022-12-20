import { Canvas, CanvasEvents } from "../../ui/canvas.js";
import { CollisionCalculator } from "../../utils/collision-calculator.js";
import { ShipBase } from "../base/ship-base.js";

export class Player extends ShipBase {
  readonly canvas: Canvas;
  readonly canvasEvents: CanvasEvents;
  readonly collision: CollisionCalculator;

  private readonly image = new Image();


  constructor(x: number, y: number) {
    super();
    this.canvas = Canvas.getInstance();
    this.canvasEvents = CanvasEvents.getInstance();
    this.collision = CollisionCalculator.getInstance();

    this.init(x, y);
  }

  protected init(x: number, y: number): void {
    this.image.onload = () => {
      this.resourcesLoaded = true;
    }
    this.image.src = "/assets/Player.png"

    this._x = x;
    this._y = y;
    this.health = 100;
    this._radius = 30;
    this.maxSpeed = 3;
    this.accelerationModifier = 0.05;
  }

  draw(): void {
    this.canvas.context.save();
    this.canvas.context.translate(this.x, this.y)
    this.canvas.context.rotate(this.angle);
    this.canvas.context.drawImage(this.image, -this.radius, -this.radius, 2 * this.radius, 2 * this.radius)
    this.canvas.context.restore();
  }

  update(): void {
    this.calculateMovement()

    this._x += this.dx;
    this._y += this.dy;

    this.angle = Math.atan2(this.canvasEvents.mouse.x - this.x, -(this.canvasEvents.mouse.y - this.y))
  }

  calculateMovement() {
    if (this.canvasEvents.keyboard["w"]) {
      this.dy -= this.accelerationModifier;
    }
    if (this.canvasEvents.keyboard["s"]) {
      this.dy += this.accelerationModifier;
    }
    if (this.canvasEvents.keyboard["a"]) {
      this.dx -= this.accelerationModifier;
    }
    if (this.canvasEvents.keyboard["d"]) {
      this.dx += this.accelerationModifier;
    }

    if (!this.collision.isWholeInbouds(this)) {
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

