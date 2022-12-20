export abstract class BaseShip {
  protected _x: number = 0;
  protected _y: number = 0;
  protected dx: number = 0;
  protected dy: number = 0;
  protected _radius: number = 0;
  protected maxSpeed: number = 0;
  protected accelerationModifier: number = 0;
  protected health: number = 0;
  protected angle: number = 0;
  protected resourcesLoaded = false;


  abstract get x(): number;
  abstract get y(): number;
  abstract get radius(): number;
  protected abstract init(x: number, y: number): void;
  abstract draw(): void;
  abstract update(): void;
}
