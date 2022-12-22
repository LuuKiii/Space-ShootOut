import { Canvas } from "../../ui/canvas.js";
import { CollisionCalculator } from "../../utils/collision-calculator.js";
import { Point, Vector } from "../base/base-entity.js";
import { BaseProjectile } from "../base/base-projectile.js";

export class SingleFire extends BaseProjectile {
  protected ctx: CanvasRenderingContext2D;

  constructor(pos: Point, velocity: Vector) {
    super();
    this.ctx = Canvas.getContext();

    this._position = { ...pos };
    this._delta = { ...velocity };
    this.init();
  }

  init() {
    this._radius = 10;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this._radius, 0, Math.PI * 2)
    this.ctx.fill();
  }

  update() {
    this._position.x = this.position.x + this.delta.x;
    this._position.y = this.position.y + this.delta.y;

    if (CollisionCalculator.isWholeOutOfBounds({ ...this.position, radius: this.radius })) {
      this._isToBeRemoved = true;
    }
  }

  get position(): Point {
    return { ...this._position }
  }

  get delta(): Vector {
    return { ...this._delta }
  }

  get radius(): number {
    return this._radius
  }
}
