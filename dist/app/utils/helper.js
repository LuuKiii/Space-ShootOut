export class Helper {
    static generateID() {
        let time = new Date().getTime();
        return 'xxxxxxxxxxxy'.replace(/[xy]/g, function (char) {
            let randomChar = (time + Math.random() * 16) % 16 | 0;
            time = Math.floor(time / 16);
            return (char === 'x' ? randomChar : randomChar & 0x3 | 0x8).toString(16);
        });
    }
    static calculateRotateAngle(objA, objB) {
        return Math.atan2(objB.x - objA.x, -(objB.y - objA.y));
    }
    static calculateAngle(objA, objB) {
        return Math.atan2(objB.y - objA.y, objB.x - objA.x);
    }
    static calculateVelocity(angle, speed) {
        return {
            dx: Math.cos(angle),
            dy: Math.sin(angle),
        };
    }
}
//# sourceMappingURL=helper.js.map