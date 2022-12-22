import { Player } from "../models/player/player.js";
import { Canvas } from "../ui/canvas.js";
import { BaseProjectile } from "../models/base/base-projectile.js";
import { BaseShip } from "../models/base/base-ship.js";
import { Helper } from "../utils/helper.js";

export class GameGlobalObject {
  private static instance: GameGlobalObject;

  //TODO ATM giving access to one of core properties also grants ability to modify given object outside of this class. Ensure its possible only within it.
  private _core: Core;
  private _size: number = 0;

  private constructor() {
    this._core = {
      player: {},
      enemies: {},
      projectiles: {},
      misc: {},
    }

    this.createPlayer();
  }

  //TODO Instead of this aproach change in core object player object type to enforce it to have at most one property 
  private createPlayer() {
    if (Object.keys(this._core.player).length > 0) throw new Error("Player Already exists");

    const canvasDimensions = Canvas.getDimensions();
    const player = new Player({ x: canvasDimensions.width / 2, y: canvasDimensions.height / 2 })
    this.addEntity('player', player);
  }

  getPlayer(): Player {
    return this._core.player[Object.keys(this._core.player)[0]];
  }

  removeEntityFrom(from: keyof Core, id: string) {
    this._size--;
    delete this._core[from][id];
  }

  addEntity<CoreProperty extends keyof Core, InnerProperty extends keyof Core[CoreProperty]>(coreKey: CoreProperty, entity: Core[CoreProperty][InnerProperty]): void {
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
