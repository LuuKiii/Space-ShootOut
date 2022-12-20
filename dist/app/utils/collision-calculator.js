import { Canvas } from "../ui/canvas.js";
export class CollisionCalculator {
    constructor() {
        this.canvas = Canvas.getInstance();
    }
    isWholeInbouds(ship) {
        if (ship.x - ship.radius < 0) {
            return false;
        }
        if (ship.x + ship.radius > this.canvas.WIDTH) {
            return false;
        }
        if (ship.y + ship.radius > this.canvas.HEIGHT) {
            return false;
        }
        if (ship.y - ship.radius < 0) {
            return false;
        }
        return true;
    }
    isWholeOutOfBounds(ship) {
        if (ship.x + ship.radius < 0) {
            return false;
        }
        if (ship.x - ship.radius > this.canvas.WIDTH) {
            return false;
        }
        if (ship.y - ship.radius > this.canvas.HEIGHT) {
            return false;
        }
        if (ship.y + ship.radius < 0) {
            return false;
        }
        return true;
    }
    static getInstance() {
        if (!CollisionCalculator.instance) {
            CollisionCalculator.instance = new CollisionCalculator();
        }
        return CollisionCalculator.instance;
    }
}
//# sourceMappingURL=collision-calculator.js.map