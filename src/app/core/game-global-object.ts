import { Player } from "../models/player/player.js";
import { BaseEntity } from "../models/base/base-entity.js";
import { Canvas } from "../ui/canvas.js";
import { BaseProjectile } from "../models/base/base-projectile.js";
import { BaseShip } from "../models/base/base-ship.js";
import { Helper } from "../utils/helper.js";

export class GameGlobalObject {
  private static instance: GameGlobalObject;

  //TODO: CHANGE TO PRIVATE, DEEP CLONING NEEDS TO BE IMPLEMENTED
  readonly core: Core;
  private _size: number = 0;

  private canvas = Canvas.getInstance();

  private constructor() {
    this.core = {
      player: {},
      enemies: {},
      projectiles: {},
      misc: {},
    }

    this.createPlayer();
  }

  //TODO Instead of this aproach change in core object player object type to enforce it to have at most one property 
  private createPlayer() {
    if (Object.keys(this.core.player).length > 0) throw new Error("Player Already exists");

    const player = new Player({ x: this.canvas.WIDTH / 2, y: this.canvas.HEIGHT / 2 })
    this.addEntity('player', player);
  }

  getPlayer(): Player {
    return this.core.player[Object.keys(this.core.player)[0]];
  }

  updateAndDrawAllEntities(): void {
    for (const coreProp in this.core) {
      const coreObj = this.core[coreProp as keyof typeof this.core]
      for (const entityId in coreObj) {
        const entity = coreObj[entityId as keyof typeof coreObj]
        entity.update();
        entity.draw();
      }
    }
  }

  removeEntityFrom(from: keyof Core, id: string) {
    this._size--;
    delete this.core[from][id];
  }

  addEntity<CoreProperty extends keyof Core, InnerProperty extends keyof Core[CoreProperty]>(coreKey: CoreProperty, entity: Core[CoreProperty][InnerProperty]): void {
    const generatedID: string = Helper.generateID();
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

interface Core {
  player: {
    [key: string]: Player
  };
  enemies: {
    [key: string]: BaseShip
  };
  projectiles: {
    [key: string]: BaseProjectile;
  };
  misc: {
    [key: string]: BaseShip;
  };
}
