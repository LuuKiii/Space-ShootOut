export abstract class ShipBase {
  protected x: number = 0;
  protected y: number = 0;
  protected dx: number = 0;
  protected dy: number = 0;
  protected radius: number = 0;
  protected maxSpeed: number = 0;
  protected accelerationModifier: number = 0;
  protected health: number = 0;
  protected angle: number = 0;

  constructor() { }

  protected abstract init(x: number, y: number): void;
  abstract draw(): void;
  abstract update(): void;
}
