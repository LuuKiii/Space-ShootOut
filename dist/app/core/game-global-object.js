import { Player } from "../models/player/player.js";
import { Helper } from "../utils/helper.js";
import { DroneShip } from "../models/enemies/drone-ship.js";
export class GameGlobalObject {
    constructor() {
        this._size = 0;
        this._core = {
            player: {},
            playerWeaponry: {},
            enemies: {},
            enemyWeaponry: {},
            misc: {},
        };
        this.createPlayer();
    }
    //TODO Instead of this aproach change in core object player object type to enforce it to have at most one property 
    createPlayer() {
        if (Object.keys(this._core.player).length > 0)
            throw new Error("Player Already exists");
        const player = Player.getInstance();
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
    static getEntitiesByCorePropertyName(corePropName) {
        if (!GameGlobalObject.instance)
            return [];
        const corePropertiesToGet = [];
        const returnArr = [];
        for (const coreProp in GameGlobalObject.instance._core) {
            if (corePropName && !corePropName.includes(coreProp)) {
                continue;
            }
            corePropertiesToGet.push(coreProp);
        }
        for (const coreProp of corePropertiesToGet) {
            const coreObj = GameGlobalObject.instance._core[coreProp];
            for (const entityId in coreObj) {
                const entity = coreObj[entityId];
                returnArr.push(entity);
            }
        }
        return returnArr;
    }
    spawner() {
        while (this.size < 5) {
            this.createRandomBasicEnemy();
        }
    }
    createRandomBasicEnemy() {
        const point = Helper.getCoordinatesOutOfBounds(50, 0 /* Side.Up */);
        const enemy = new DroneShip(point);
        this.addEntity("enemies", enemy);
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