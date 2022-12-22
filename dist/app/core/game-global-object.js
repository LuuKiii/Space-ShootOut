import { Player } from "../models/player/player.js";
import { Canvas } from "../ui/canvas.js";
import { Helper } from "../utils/helper.js";
export class GameGlobalObject {
    constructor() {
        const canvas = Canvas.getInstance();
        this.core = {
            player: { a: new Player({ x: canvas.WIDTH / 2, y: canvas.HEIGHT / 2 }) },
            enemies: {},
            projectiles: {},
            misc: {},
        };
    }
    updateAndDrawAllEntities() {
        for (const coreProp in this.core) {
            const coreObj = this.core[coreProp];
            for (const entityId in coreObj) {
                const entity = coreObj[entityId];
                entity.update();
                entity.draw();
            }
        }
    }
    removeEntity(from, id) {
    }
    addEntity(coreKey, entity) {
        const generatedID = Helper.generateID();
        entity.id = generatedID;
        this.core[coreKey][generatedID] = entity;
    }
    static getInstance() {
        if (!GameGlobalObject.instance) {
            GameGlobalObject.instance = new GameGlobalObject();
        }
        return GameGlobalObject.instance;
    }
}
//# sourceMappingURL=game-global-object.js.map