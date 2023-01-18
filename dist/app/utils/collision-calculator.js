import { GameGlobalObject } from "../core/game/global-object.js";
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
    static entitiesAreIntersecting(objA, objB) {
        const distanceBetweenOrigins = Math.sqrt(Math.pow(objA.x - objB.x, 2) + Math.pow(objA.y - objB.y, 2));
        const requiredMinimumDistance = (objA.radius + objB.radius);
        if (distanceBetweenOrigins < requiredMinimumDistance) {
            return true;
        }
        return false;
    }
    static entitiesObjectIsIntersectingWith(obj, corePropertiesToInclude) {
        const entites = GameGlobalObject.getEntitiesByCorePropertyName(corePropertiesToInclude);
        const intersectingEntities = [];
        entites.forEach(ob => {
            if (CollisionCalculator.entitiesAreIntersecting(obj, ob.originAndRadius)) {
                intersectingEntities.push(ob);
            }
        });
        return intersectingEntities.filter(ob => ob.id !== obj.id);
    }
}
CollisionCalculator.canvasDimensions = Canvas.getDimensions();
//# sourceMappingURL=collision-calculator.js.map