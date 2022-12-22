import { Canvas } from "../ui/canvas.js";
export class CollisionCalculator {
    constructor() { }
    static isWholeInbouds(obj) {
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
    static isWholeOutOfBounds(obj) {
        if (obj.x + obj.radius < 0) {
            return true;
        }
        if (obj.x - obj.radius > CollisionCalculator.canvasDimensions.width) {
            return true;
        }
        if (obj.y - obj.radius > CollisionCalculator.canvasDimensions.height) {
            return true;
        }
        if (obj.y + obj.radius < 0) {
            return true;
        }
        return false;
    }
}
CollisionCalculator.canvasDimensions = Canvas.getDimensions();
//# sourceMappingURL=collision-calculator.js.map