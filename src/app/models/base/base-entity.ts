export abstract class BaseEntity {
  private _id: string | undefined;
  protected _position: Point = { x: 0, y: 0 };
  protected _delta: Vector = { x: 0, y: 0 };
  protected _radius: number = 0;
  protected _isToBeRemoved: boolean = false;

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

  get isToBeRemoved() {
    return this._isToBeRemoved;
  }

  protected abstract ctx: CanvasRenderingContext2D;
  abstract get position(): Point;
  abstract get delta(): Vector;
  abstract get radius(): number;
  protected abstract init(): void;
  abstract draw(): void;
  abstract update(): void;
}

export interface Point {
  x: number,
  y: number,
}

export interface Vector {
  x: number,
  y: number,
}
