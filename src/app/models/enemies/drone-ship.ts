import { Canvas } from "../../ui/canvas.js";
import { Helper } from "../../utils/helper.js";
import { BaseEnemy } from "../base/base-enemy.js";
import { Point, MovementConsts, Angle, Vector } from "../base/base-types.js";
import { WeaponryTypes } from "../base/base-projectile.js";
import { MovingAction, FacingBehaviours, MovementBehaviours, FiringBehaviours, shipBehaviours } from "./enemy-behaviours.js";

export class DroneShip extends BaseEnemy {
  protected ctx: CanvasRenderingContext2D;
  private readonly image = new Image();

  public movingAction = MovingAction.Stopped;
  public destinationPoint: Point | null = null;
  public targetFacing: number | null = 11/6 * Math.PI;

  public behaviours: [FacingBehaviours, MovementBehaviours, FiringBehaviours] = ['faceTowardsPlayer', 'moveToRandomWaypointAndStop', "fireAtPlayer"];
  public weaponry: WeaponryTypes | null = 'Cannon';
  protected _movement: MovementConsts;
  protected _angle: Angle;

  constructor(pos: Point) {
    super();
    this.ctx = Canvas.getContext();

    this._position = pos;
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

    // this.updateFromBehaviours()
    this.updateRotation();

    this.angle.rotation += this.angle.rotationSpeed;

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
    // // naive aproach - forward movement is applied to movement in any direction
    // if (this.movingAction === MovingAction.Accelerating) {
    //   this._movement.acceleration.forward = this._movement.acceleration.forward + this._movement.accelerationModifier.forward > this._movement.maxSpeed
    //     ? this._movement.maxSpeed
    //     : this._movement.acceleration.forward + this._movement.accelerationModifier.forward;
    // }

    // if (this.movingAction === MovingAction.Decelerating) {
    //   this._movement.acceleration.forward = this._movement.acceleration.forward - this._movement.accelerationModifier.forward > 0
    //     ? this._movement.acceleration.forward - this._movement.accelerationModifier.forward
    //     : 0;
    // }

    // // if (this.movingAction === MovingAction.Moving) {

    // // }


    this._position.x += this.delta.x;
    this._position.y += this.delta.y;

    this.updateMovingAction();
  }

  updateMovingAction() {
    const breakingpoint = 10;

    if (Helper.calculateDistanceBetweenPoints(this.position, this.destinationPoint!) < breakingpoint) {
      this.movingAction = MovingAction.Decelerating;
    }
  }

  updateRotation(): void {
    if (this.targetFacing === null) return;

    // if (Math.abs(this.angle.facing % Math.PI * 2) < this.targetFacing) {
    //   this.angle.rotationSpeed = 0;
    //   this.targetFacing = null;
    //   return;
    // }

    const angularVelocity = this.angle.rotationSpeed ** 2 / (2 * this.angle.rotationModifier);
    console.log(angularVelocity)

    if (this.angle.rotationSpeed < angularVelocity) {

    } else {

    }

    console.log(this.targetFacing)
    console.log(this.targetFacing - this.angle.facing)
    console.log("==============================================")

    if (this.targetFacing - this.angle.facing > 0) {
      this.angle.rotationSpeed += this.angle.rotationModifier;
    } else {
      this.angle.rotationSpeed -= this.angle.rotationModifier;
    }

    if (Math.abs(this.angle.rotationSpeed) > this.angle.rotationMaxSpeed) {
      this.angle.rotationSpeed = Math.sign(this.angle.rotationSpeed) * this.angle.rotationMaxSpeed;
    }
  }

  updateDelta(): void {

  }

  calculateDeltaModifier(currentVelocity: number, angle: number, deltaModifier: Vector, accelerationModifier: number, maxSpeed: number): Vector {
    return { x: 0, y: 0 }
  }
}
