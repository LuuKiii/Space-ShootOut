import { Canvas } from "../ui/canvas.js";

export class CollisionCalculator {
  private static canvasDimensions = Canvas.getDimensions();

  private constructor() { }

  static isWholeInbouds(obj: { x: number, y: number, radius: number }): boolean {
    if (obj.x - obj.radius < 0) {
      return false;
    }
    if (obj.x + obj.radius > CollisionCalculator.canvasDimensions.width) {
      return false;
    }
    if (obj.y + obj.radius > CollisionCalculator.canvasDimensions.height) {
      return false;
    }
    if (obj.y - obj.radius < 0) {
      return false;
    }
    return true;
  }

  static isWholeOutOfBounds(obj: { x: number, y: number, radius: number }): boolean {
    if (obj.x + obj.radius < 0) {
      return false;
    }
    if (obj.x - obj.radius > CollisionCalculator.canvasDimensions.width) {
      return false;
    }
    if (obj.y - obj.radius > CollisionCalculator.canvasDimensions.height) {
      return false;
    }
    if (obj.y + obj.radius < 0) {
      return false;
    }

    return true;
  }
}
