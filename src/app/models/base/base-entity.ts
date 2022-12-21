export abstract class BaseEntity {
  protected _position: Point = { x: 0, y: 0 };
  protected _delta: Vector = { x: 0, y: 0 };
  protected _radius: number = 0;
  protected maxSpeed: number = 0;
  protected accelerationModifier: number = 0;
  protected health: number = 0;
  protected angle: number = 0;
  protected resourcesLoaded = false;


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
