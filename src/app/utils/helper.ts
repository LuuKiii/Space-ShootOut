export class Helper {
  constructor() { }

  static calculateRotateAngle(objA: { x: number, y: number }, objB: { x: number, y: number }): number {
    return Math.atan2(objB.x - objA.x, -(objB.y - objA.y))
  }

  static calculateAngle(objA: { x: number, y: number }, objB: { x: number, y: number }): number {
    return Math.atan2(objB.y - objA.y, objB.x - objA.x)
  }

  static calculateVelocity(angle: number, speed: number) {
    return {
      dx: Math.cos(angle),
      dy: Math.sin(angle),
    }
  }
}
