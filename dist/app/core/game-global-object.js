import { Player } from "../models/player/player.js";
import { Canvas } from "../ui/canvas.js";
import { Helper } from "../utils/helper.js";
export class GameGlobalObject {
    constructor() {
        this._size = 0;
        this.canvas = Canvas.getInstance();
        this.core = {
            player: {},
            enemies: {},
            projectiles: {},
            misc: {},
        };
        this.createPlayer();
    }
    //TODO Instead of this aproach change in core object player object type to enforce it to have at most one property 
    createPlayer() {
        if (Object.keys(this.core.player).length > 0)
            throw new Error("Player Already exists");
        const player = new Player({ x: this.canvas.WIDTH / 2, y: this.canvas.HEIGHT / 2 });
        this.addEntity('player', player);
    }
    getPlayer() {
        return this.core.player[Object.keys(this.core.player)[0]];
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
    removeEntityFrom(from, id) {
        this._size--;
        delete this.core[from][id];
    }
    addEntity(coreKey, entity) {
        const generatedID = Helper.generateID();
        entity.id = generatedID;
        this._size++;
        this.core[coreKey][generatedID] = entity;
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