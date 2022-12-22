import { BaseEntity } from "./base-entity.js";

export abstract class BaseProjectile extends BaseEntity {
  protected isOutOfBounds: boolean = false;
} 
