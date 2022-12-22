import { EntitiesCollection, GameGlobalObject } from "../core/game-global-object.js";
import { BaseEntity } from "../models/base/base-entity.js";
import { Canvas } from "../ui/canvas.js";

export class CollisionCalculator {
  private static canvasDimensions = Canvas.getDimensions();

  private constructor() { }

  static isWholeInbouds(obj: OriginAndRadius): boolean {
    if (obj.x - obj.radius < 0) {
      return false;
    }
    if (obj.x + obj.radius > CollisionCalculator.canvasDimensions.width) {
      return false;
    }
    if (obj.y + obj.radius > CollisionCalculator.canvasDimensions.height) {
      return false;
    }
    if (obj.y - obj.radius < 0) {
      return false;
    }
    return true;
  }

  static isWholeOutOfBounds(obj: OriginAndRadius): boolean {
    if (obj.x + obj.radius < 0) {
      return true;
    }
    if (obj.x - obj.radius > CollisionCalculator.canvasDimensions.width) {
      return true;
    }
    if (obj.y - obj.radius > CollisionCalculator.canvasDimensions.height) {
      return true;
    }
    if (obj.y + obj.radius < 0) {
      return true;
    }

    return false;
  }

  static entitiesAreIntersecting(objA: OriginAndRadius, objB: OriginAndRadius): boolean {
    const distanceBetweenOrigins = Math.sqrt(Math.pow(objA.x - objB.x, 2) + Math.pow(objA.y - objB.y, 2));
    const requiredMinimumDistance = (objA.radius + objB.radius) * 2;

    if (distanceBetweenOrigins < requiredMinimumDistance) {
      return true;
    }

    return false;
  }

  static entitiesObjectIsIntersectingWith<T extends keyof EntitiesCollection>(obj: OriginAndRadius, corePropertiesToInclude?: T[]): BaseEntity[] {
    const entites = GameGlobalObject.getEntitiesByCorePropertyName(corePropertiesToInclude);
    const intersectingEntities: BaseEntity[] = [];
    entites.forEach(ob => {
      if (CollisionCalculator.entitiesAreIntersecting(obj, ob.originAndRadius)) {
        intersectingEntities.push(ob);
      }
    })

    return intersectingEntities.filter(ob => ob.id !== obj.id);
  }
}

export type OriginAndRadius = { id: string, x: number, y: number, radius: number }
