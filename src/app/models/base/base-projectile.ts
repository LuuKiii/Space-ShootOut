import { BaseEntity, Point, Vector } from "./base-entity.js";

export abstract class BaseProjectile extends BaseEntity {

  protected isOutOfBounds: boolean = false;
} 
