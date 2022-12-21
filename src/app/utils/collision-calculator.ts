import { Canvas } from "../ui/canvas.js";

export class CollisionCalculator {
  // private static instance: CollisionCalculator;
  private static canvas = Canvas.getInstance();

  private constructor() { }

  static isWholeInbouds(obj: { x: number, y: number, radius: number }): boolean {
    if (obj.x - obj.radius < 0) {
      return false;
    }
    if (obj.x + obj.radius > CollisionCalculator.canvas.WIDTH) {
      return false;
    }
    if (obj.y + obj.radius > CollisionCalculator.canvas.HEIGHT) {
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
    if (obj.x - obj.radius > CollisionCalculator.canvas.WIDTH) {
      return false;
    }
    if (obj.y - obj.radius > CollisionCalculator.canvas.HEIGHT) {
      return false;
    }
    if (obj.y + obj.radius < 0) {
      return false;
    }

    return true;
  }

  // static getInstance() {
  //   if (!CollisionCalculator.instance) {
  //     CollisionCalculator.instance = new CollisionCalculator();
  //   }
  //   return CollisionCalculator.instance
  // }
}
