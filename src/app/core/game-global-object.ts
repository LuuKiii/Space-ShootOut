import { Player } from "../models/player/player.js";
import { Canvas } from "../ui/canvas.js";
import { BaseProjectile } from "../models/base/base-projectile.js";
import { BaseShip } from "../models/base/base-ship.js";
import { Helper, Side } from "../utils/helper.js";
import { BaseEntity } from "../models/base/base-entity.js";
import { DroneShip } from "../models/enemies/drone-ship.js";

export class GameGlobalObject {
  private static instance: GameGlobalObject;

  //TODO ATM giving access to one of core properties also grants ability to modify given object outside of this class. Ensure its possible only within it.
  private _core: EntitiesCollection;
  private _size: number = 0;

  private constructor() {
    this._core = {
      player: {},
      playerWeaponry: {},
      enemies: {},
      enemyWeaponry: {},
      misc: {},
    }

    this.createPlayer();
  }

  //TODO Instead of this aproach change in core object player object type to enforce it to have at most one property 
  private createPlayer() {
    if (Object.keys(this._core.player).length > 0) throw new Error("Player Already exists");

    const player = Player.getInstance();
    this.addEntity('player', player);
  }

  getPlayer(): Player {
    return this._core.player[Object.keys(this._core.player)[0]];
  }

  removeEntityFrom(from: keyof EntitiesCollection, id: string) {
    this._size--;
    delete this._core[from][id];
  }

  addEntity<CoreProperty extends keyof EntitiesCollection, InnerProperty extends keyof EntitiesCollection[CoreProperty]>(coreKey: CoreProperty, entity: EntitiesCollection[CoreProperty][InnerProperty]): void {
    const generatedID: string = Helper.generateID();
    entity.id = generatedID;
    this._size++;
    this._core[coreKey][generatedID] = entity;
  }

  updateAndDrawAllEntities(): void {
    for (const coreProp in this._core) {
      const coreObj = this._core[coreProp as keyof typeof this._core]
      for (const entityId in coreObj) {
        const entity = coreObj[entityId as keyof typeof coreObj]
        entity.update();
        entity.draw();
        if (entity.isToBeRemoved) {
          this.removeEntityFrom(coreProp as EntityTypes, entity.id);
        }
      }
    }
  }

  static getEntitiesByCorePropertyName<T extends EntityTypes>(corePropName?: T[]): BaseEntity[] {
    if (!GameGlobalObject.instance) return [];

    const corePropertiesToGet = [];
    const returnArr: BaseEntity[] = [];

    for (const coreProp in GameGlobalObject.instance._core) {
      if (corePropName && !corePropName.includes(coreProp as T)) {
        continue;
      }
      corePropertiesToGet.push(coreProp)
    }

    for (const coreProp of corePropertiesToGet) {
      const coreObj = GameGlobalObject.instance._core[coreProp as EntityTypes]
      for (const entityId in coreObj) {
        const entity = coreObj[entityId as keyof typeof coreObj]
        returnArr.push(entity)
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
    const point = Helper.getCoordinatesOutOfBounds(50, Side.Up);
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

export type EntityTypes = keyof EntitiesCollection;

interface EntitiesCollection {
  player: {
    [key: string]: Player
  };
  playerWeaponry: {
    [key: string]: BaseProjectile;
  };
  enemies: {
    [key: string]: BaseShip
  };
  enemyWeaponry: {
    [key: string]: BaseProjectile
  }
  misc: {
    [key: string]: BaseShip;
  };
}
