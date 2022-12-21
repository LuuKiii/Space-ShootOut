import { Canvas } from "../ui/canvas.js";
export class CollisionCalculator {
    constructor() { }
    static isWholeInbouds(obj) {
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
    static isWholeOutOfBounds(obj) {
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
}
// private static instance: CollisionCalculator;
CollisionCalculator.canvas = Canvas.getInstance();
//# sourceMappingURL=collision-calculator.js.map