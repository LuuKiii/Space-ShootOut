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

  private constructor() {
    const canvas = Canvas.getInstance();

    this.core = {
      player: { a: new Player({ x: canvas.WIDTH / 2, y: canvas.HEIGHT / 2 }) },
      enemies: {},
      projectiles: {},
      misc: {},
    }
  }

  updateAndDrawAllEntities() {
    for (const coreProp in this.core) {
      const coreObj = this.core[coreProp as keyof typeof this.core]
      for (const entityId in coreObj) {
        const entity = coreObj[entityId as keyof typeof coreObj]
        entity.update();
        entity.draw();
      }
    }
  }

  removeEntity(from: keyof Core, id: string) {

  }

  addEntity<CoreProperty extends keyof Core, InnerProperty extends keyof Core[CoreProperty]>(coreKey: CoreProperty, entity: Core[CoreProperty][InnerProperty]): void {
    const generatedID: string = Helper.generateID();
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


