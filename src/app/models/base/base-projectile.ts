import { Point, Vector } from "./base-entity";

export abstract class BaseProjectile {
  protected _position: Point = { x: 0, y: 0 };
  protected _delta: Vector = { x: 0, y: 0 };
  protected _radius: number = 0;
  public isOutOfBounds: boolean = false;

  abstract draw(): void;
  abstract update(): void;
  abstract get position(): Point;
  abstract get delta(): Vector;
  abstract get radius(): number;
} 
