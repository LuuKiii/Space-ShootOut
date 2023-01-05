import { Canvas } from "../ui/canvas.js";
export class Helper {
    static generateID() {
        let time = new Date().getTime();
        return 'xxxxxxxxxxxy'.replace(/[xy]/g, function (char) {
            let randomChar = (time + Math.random() * 16) % 16 | 0;
            time = Math.floor(time / 16);
            return (char === 'x' ? randomChar : randomChar & 0x3 | 0x8).toString(16);
        });
    }
    static calculateRotationTowardsEntity(entity, entityToFaceTowards) {
        return Math.atan2(entityToFaceTowards.x - entity.x, -(entityToFaceTowards.y - entity.y));
    }
    static calculateRotationToFaceAwayEntity(entity, entityToFaceAwayFrom) {
        return Math.atan2(entity.x - entityToFaceAwayFrom.x, -(entity.y - entityToFaceAwayFrom.y));
    }
    static calculateAngle(objA, objB) {
        return Math.atan2(objB.y - objA.y, objB.x - objA.x);
    }
    static calculateVelocityAngle(angle) {
        return {
            x: Math.cos(angle),
            y: Math.sin(angle),
        };
    }
    static calculateVelocity(angle, currentVelocity, speedModified) {
        currentVelocity.x;
        return {
            x: Math.cos(angle),
            y: Math.sin(angle),
        };
    }
    static calculateDistanceBetweenPoints(pointA, pointB) {
        const distanceBetweenOrigins = Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
        return distanceBetweenOrigins;
    }
    static getCoordinatesOutOfBounds(spaceAwayFromBorder = 0, side) {
        if (side === undefined) {
            side = Math.random() * 4 | 0;
        }
        const point = { x: 0, y: 0 };
        const canvasD = Canvas.getDimensions();
        if (side % 2 === 1) {
            point.y = Math.random() * canvasD.height | 0;
            point.x = side === 1 ? spaceAwayFromBorder + canvasD.width : -spaceAwayFromBorder;
        }
        else {
            point.x = Math.random() * canvasD.width | 0;
            point.y = side === 0 ? -spaceAwayFromBorder : canvasD.height + spaceAwayFromBorder;
        }
        return point;
    }
    static getCoordinatesInbound(spaceAwayFromBorder = 0) {
        const canvasD = Canvas.getDimensions();
        const x = (Math.random() * (canvasD.width - 2 * spaceAwayFromBorder)) + spaceAwayFromBorder | 0;
        const y = (Math.random() * (canvasD.height - 2 * spaceAwayFromBorder)) + spaceAwayFromBorder | 0;
        return { x: x, y: y };
    }
}
//# sourceMappingURL=helper.js.map