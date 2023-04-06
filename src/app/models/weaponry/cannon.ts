import { EntityTypes } from "../../core/game/global-object";
import { CollisionHandler } from "../../core/handlers/collision-handler";
import { Canvas } from "../../ui/canvas";
import { CollisionCalculator } from "../../utils/collision-calculator";
import { BaseProjectile } from "../base/base-projectile";
import { BaseShip } from "../base/base-ship";
import { Point, Vector } from "../base/base-types";

export class SingleFire extends BaseProjectile {
  protected ctx: CanvasRenderingContext2D;

  constructor(pos: Point, velocity: Vector, damages: EntityTypes[]) {
    super();
    this.ctx = Canvas.getContext();

    this._position = { ...pos };
    this._delta = { ...velocity };
    this.damages = damages;
    this.init();
  }

  init() {
    this._radius = 10;
    this._damageDealt = 60;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this._radius, 0, Math.PI * 2)
    this.ctx.fill();
  }

  update() {
    this._position.x = this.position.x + this.delta.x;
    this._position.y = this.position.y + this.delta.y;

    if (CollisionCalculator.isWholeOutOfBounds(this.originAndRadius)) {
      this._isToBeRemoved = true;
    }

    const colidesWith = CollisionCalculator.entitiesObjectIsIntersectingWith(this.originAndRadius, this.damages)
    colidesWith.forEach(ent => {
      if (ent instanceof BaseShip) {
        CollisionHandler.updateProjectileHit(this, ent);
      }
    })
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
