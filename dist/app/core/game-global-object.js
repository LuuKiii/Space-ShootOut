import { Player } from "../models/player/player.js";
import { Canvas } from "../ui/canvas.js";
import { Helper } from "../utils/helper.js";
export class GameGlobalObject {
    constructor() {
        this._size = 0;
        this._core = {
            player: {},
            enemies: {},
            projectiles: {},
            misc: {},
        };
        this.createPlayer();
    }
    //TODO Instead of this aproach change in core object player object type to enforce it to have at most one property 
    createPlayer() {
        if (Object.keys(this._core.player).length > 0)
            throw new Error("Player Already exists");
        const canvasDimensions = Canvas.getDimensions();
        const player = new Player({ x: canvasDimensions.width / 2, y: canvasDimensions.height / 2 });
        this.addEntity('player', player);
    }
    getPlayer() {
        return this._core.player[Object.keys(this._core.player)[0]];
    }
    removeEntityFrom(from, id) {
        this._size--;
        delete this._core[from][id];
    }
    addEntity(coreKey, entity) {
        const generatedID = Helper.generateID();
        entity.id = generatedID;
        this._size++;
        this._core[coreKey][generatedID] = entity;
    }
    updateAndDrawAllEntities() {
        for (const coreProp in this._core) {
            const coreObj = this._core[coreProp];
            for (const entityId in coreObj) {
                const entity = coreObj[entityId];
                entity.update();
                entity.draw();
                if (entity.isToBeRemoved) {
                    this.removeEntityFrom(coreProp, entity.id);
                }
            }
        }
    }
    get size() {
        return this._size;
    }
    static getInstance() {
        if (!GameGlobalObject.instance) {
            GameGlobalObject.instance = new GameGlobalObject();
        }
        return GameGlobalObject.instance;
    }
}
//# sourceMappingURL=game-global-object.js.map