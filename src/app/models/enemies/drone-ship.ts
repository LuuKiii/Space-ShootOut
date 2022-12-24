import { Canvas } from "../../ui/canvas.js";
import { Helper } from "../../utils/helper.js";
import { Point } from "../base/base-entity.js";
import { BaseShip } from "../base/base-ship.js";
import { shipBehaviours, EnemyBehaviours, FacingBehaviours, MovementBehaviours, FiringBehaviours, MovingAction } from "./enemy-behaviours.js";

export class DroneShip extends BaseShip implements EnemyBehaviours {
  protected ctx: CanvasRenderingContext2D;
  private readonly image = new Image();

  public movingAction: MovingAction = MovingAction.Stopped;
  public destinationPoint: Point | null = null;
  public behaviours: [FacingBehaviours, MovementBehaviours, FiringBehaviours] = ['faceTowardsPlayer', 'moveToRandomWaypointAndStop', "none"];

  constructor(pos: Point) {
    super();
    this.ctx = Canvas.getContext();

    this._position = { ...pos }
    this.init()
  }

  protected init(): void {
    this.image.onload = () => {
      this._resourcesLoaded = true;
    }
    this.image.src = "/assets/SCruiser.png"

    this._health = 100;
    this._radius = 30;
    this._maxSpeed = 1;
    this._accelerationModifier = 0.005;
  }

  draw(): void {
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y)
    this.ctx.rotate(this._rotation);
    this.ctx.drawImage(this.image, -this.radius, -this.radius, 2 * this.radius, 2 * this.radius)
    this.ctx.restore();
  }

  updateFromBehaviours(): void {
    for (const bhv of this.behaviours) {
      shipBehaviours[bhv](this)
    }
  }

  update(): void {
    if (this.movingAction !== MovingAction.Stopped) {
      this.calculateMovement();
    }

    this.updateFromBehaviours()
  }

  calculateMovement() {
    if (this.movingAction === MovingAction.Accelerating) {
      this._acceleration = this._acceleration + this._accelerationModifier > this.maxSpeed ? this.maxSpeed : this._acceleration + this._accelerationModifier;
    }

    if (this.movingAction === MovingAction.Decelerating) {
      this._acceleration = this._acceleration - this._accelerationModifier > 0 ? this._acceleration - this._accelerationModifier : 0;
    }

    // if (this.movingAction === MovingAction.Moving) {

    // }

    this._position.x += this.delta.x * this._acceleration;
    this._position.y += this.delta.y * this._acceleration;

    this.updateMovingAction();
  }

  updateMovingAction() {
    const breakingpoint = 10;

    if (Helper.calculateDistanceBetweenPoints(this.position, this.destinationPoint!) < breakingpoint) {
      this.movingAction = MovingAction.Decelerating;
    }
  }

}
