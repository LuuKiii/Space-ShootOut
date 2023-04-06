import { Point, Vector } from "../models/base/base-types.js";
import { Canvas } from "../ui/canvas.js";
import { OriginAndRadius } from "./collision-calculator.js";

export class Helper {
  static generateID() {
    let time = new Date().getTime();
    return 'xxxxxxxxxxxy'.replace(/[xy]/g, function (char) {
      let randomChar = (time + Math.random() * 16) % 16 | 0;
      time = Math.floor(time / 16);
      return (char === 'x' ? randomChar : randomChar & 0x3 | 0x8).toString(16)
    })
  }

  static calculateRotationTowardsEntity(entity: Point, entityToFaceTowards: Point): number {
    return Math.atan2(entityToFaceTowards.x - entity.x, -(entityToFaceTowards.y - entity.y))
  }

  static calculateRotationToFaceAwayEntity(entity: Point, entityToFaceAwayFrom: Point): number {
    return Math.atan2(entity.x - entityToFaceAwayFrom.x, -(entity.y - entityToFaceAwayFrom.y))
  }

  static calculateAngle(objA: Point, objB: Point): number {
    return Math.atan2(objB.y - objA.y, objB.x - objA.x)
  }

  static calculateVelocityAngle(angle: number): Vector {
    return {
      x: Math.cos(angle),
      y: Math.sin(angle),
    }
  }

  static calculateVelocity(angle: number, currentVelocity: Vector, speedModified: number): Vector {

    currentVelocity.x

    return {
      x: Math.cos(angle),
      y: Math.sin(angle),
    }
  }

  static calculateDistanceBetweenPoints(pointA: Point, pointB: Point): number {
    const distanceBetweenOrigins = Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));

    return distanceBetweenOrigins;
  }

  static getCoordinatesOutOfBounds(spaceAwayFromBorder: number = 0, side?: Side): Point {
    if (side === undefined) {
      side = Math.random() * 4 | 0;
    }

    const point: Point = { x: 0, y: 0 };
    const canvasD = Canvas.getDimensions()

    if (side % 2 === 1) {
      point.y = Math.random() * canvasD.height | 0;
      point.x = side === 1 ? spaceAwayFromBorder + canvasD.width : -spaceAwayFromBorder;
    } else {
      point.x = Math.random() * canvasD.width | 0;
      point.y = side === 0 ? -spaceAwayFromBorder : canvasD.height + spaceAwayFromBorder;
    }

    return point;
  }

  static getCoordinatesInbound(spaceAwayFromBorder: number = 0): Point {
    const canvasD = Canvas.getDimensions();
    const x = (Math.random() * (canvasD.width - 2 * spaceAwayFromBorder)) + spaceAwayFromBorder | 0;
    const y = (Math.random() * (canvasD.height - 2 * spaceAwayFromBorder)) + spaceAwayFromBorder | 0;

    return { x: x, y: y };
  }
}

export const enum Side {
  "Up" = 0,
  "Right" = 1,
  "Down" = 2,
  "Left" = 3,
}
