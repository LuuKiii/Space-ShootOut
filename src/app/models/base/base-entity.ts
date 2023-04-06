import { OriginAndRadius } from "../../utils/collision-calculator";
import { Point, Vector } from "./base-types";

export abstract class BaseEntity {
  private _id: string | undefined;
  protected _position: Point = { x: 0, y: 0 };
  protected _delta: Vector = { x: 0, y: 0 };
  protected _radius: number = 0;
  protected _isToBeRemoved: boolean = false;
  protected abstract ctx: CanvasRenderingContext2D;
  protected abstract init(): void;
  abstract draw(): void;
  abstract update(): void;

  get id() {
    if (this._id) {
      return this._id;
    }
    throw new Error("Id is not set");
  }

  set id(newId: string) {
    if (!this._id) {
      this._id = newId;
    } else {
      throw new Error("Cannot overwrite existing id");
    }
  }

  get position(): Point {
    return { ...this._position }
  }

  get delta(): Vector {
    return { ...this._delta }
  }

  set delta(value) {
    this._delta = value;
  }

  get radius() {
    return this._radius;
  }

  get isToBeRemoved() {
    return this._isToBeRemoved;
  }

  get originAndRadius(): OriginAndRadius {
    return { id: this.id, x: this.position.x, y: this.position.y, radius: this.radius }
  }
}

