import { Canvas } from "../../ui/canvas.js";
import { Helper } from "../../utils/helper.js";
import { BaseEnemy } from "../base/base-enemy.js";
import { Point } from "../base/base-entity.js";
import { WeaponryTypes } from "../base/base-projectile.js";
import { Movement, Angle } from "../base/base-ship.js";
import { shipBehaviours, FacingBehaviours, MovementBehaviours, FiringBehaviours, MovingAction } from "./enemy-behaviours.js";

export class DroneShip extends BaseEnemy {
  protected ctx: CanvasRenderingContext2D;
  private readonly image = new Image();

  public movingAction: MovingAction = MovingAction.Stopped;
  public destinationPoint: Point | null = null;
  public behaviours: [FacingBehaviours, MovementBehaviours, FiringBehaviours] = ['faceTowardsPlayer', 'moveToRandomWaypointAndStop', "fireAtPlayer"];
  public weaponry: WeaponryTypes | null = 'SingleFire';
  protected _movement: Movement;
  protected _angle: Angle;

  constructor(pos: Point) {
    super();
    this.ctx = Canvas.getContext();

    this._position = { ...pos }
    this._movement = this.createMovementObject();
    this._angle = this.createAngleObject();
    this.init()
  }

  protected init(): void {
    this.image.onload = () => {
      this._resourcesLoaded = true;
    }
    this.image.src = "/assets/SCruiser.png"

    this._radius = 30;
    // this._maxSpeed = 1;
    // this._accelerationModifier = 0.005;

    this._health = 100;
    this._damageDealtByColliding = 30;
    this._damageTakenFromCollision = 1000;

    this.setChances()
  }

  setChances(): void {
    this.chance.toFire = 0.005;
  }

  draw(): void {
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y)
    this.ctx.rotate(this._angle.rotation);
    this.ctx.drawImage(this.image, -this.radius, -this.radius, 2 * this.radius, 2 * this.radius)
    this.ctx.restore();
  }


  update(): void {
    if (this.movingAction !== MovingAction.Stopped) {
      this.calculateMovement();
    }

    this.updateFromBehaviours()

    if (this._health <= 0) {
      this._isToBeRemoved = true;
    }
  }

  updateFromBehaviours(): void {
    for (const bhv of this.behaviours) {
      shipBehaviours[bhv](this)
    }
  }

  //TODO This requires work. like - a lot.
  calculateMovement() {
    // naive aproach - forward movement is applied to movement in any direction
    if (this.movingAction === MovingAction.Accelerating) {
      this._movement.acceleration.forward = this._movement.acceleration.forward + this._movement.accelerationModifier.forward > this._movement.maxSpeed.forward
        ? this._movement.maxSpeed.forward
        : this._movement.acceleration.forward + this._movement.accelerationModifier.forward;
    }

    if (this.movingAction === MovingAction.Decelerating) {
      this._movement.acceleration.forward = this._movement.acceleration.forward - this._movement.accelerationModifier.forward > 0
        ? this._movement.acceleration.forward - this._movement.accelerationModifier.forward
        : 0;
    }

    // if (this.movingAction === MovingAction.Moving) {

    // }

    this._position.x += this.delta.x * this._movement.acceleration.forward;
    this._position.y += this.delta.y * this._movement.acceleration.forward;

    this.updateMovingAction();
  }

  updateMovingAction() {
    const breakingpoint = 10;

    if (Helper.calculateDistanceBetweenPoints(this.position, this.destinationPoint!) < breakingpoint) {
      this.movingAction = MovingAction.Decelerating;
    }
  }

}
