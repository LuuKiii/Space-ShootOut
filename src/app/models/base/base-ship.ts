import { BaseEntity } from "./base-entity.js";

export abstract class BaseShip extends BaseEntity {
  protected maxSpeed: number = 0;
  protected accelerationModifier: number = 0;
  protected health: number = 0;
  protected angle: number = 0;
  protected resourcesLoaded = false;
} 
