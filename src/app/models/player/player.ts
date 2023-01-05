import { CollisionHandler } from "../../core/collision-handler.js";
import { Flags } from "../../core/global-flags.js";
import { Canvas, CanvasEvents } from "../../ui/canvas.js";
import { CollisionCalculator, OriginAndRadius } from "../../utils/collision-calculator.js";
import { Helper } from "../../utils/helper.js";
import { Point, Vector } from "../base/base-entity.js";
import { Angle, BaseShip, Movement } from "../base/base-ship.js";

export class Player extends BaseShip {
  static instance: Player;

  protected _movement: Movement;
  protected _angle: Angle;

  protected ctx: CanvasRenderingContext2D;
  readonly canvasEvents: CanvasEvents;
  readonly flags: Flags;

  private readonly image = new Image();

  private constructor(pos: Point) {
    super();
    this.ctx = Canvas.getContext();
    this.canvasEvents = CanvasEvents.getInstance();
    this.flags = Flags.getInstance();

    this._position = { ...pos }
    this._movement = this.createMovementObject();
    this._angle = this.createAngleObject();
    this.init();
  }

  protected init(): void {
    this.image.onload = () => {
      this._resourcesLoaded = true;
    }
    this.image.src = "/assets/Player.png"

    this._health = 100;
    this._radius = 30;
    // this._maxSpeed = 3;
    // this._accelerationModifier = 0.05;
    // this._rotationModifier = 0.0001;
    // this._rotationMaxSpeed = 0.01;

    this._movement.maxSpeed.forward = 1;
    this._movement.maxSpeed.backwards = 0.5;
    this._movement.maxSpeed.left = 0.5;
    this._movement.maxSpeed.right = 0.5;
    this._movement.accelerationModifier.forward = 0.01;
    this._movement.accelerationModifier.backwards = 0.005;
    this._movement.accelerationModifier.left = 0.005;
    this._movement.accelerationModifier.right = 0.005;
    this._damageTakenFromCollision = 30;
  }


  draw(): void {
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y)
    this.ctx.rotate(this._angle.rotation);
    this.ctx.drawImage(this.image, -this.radius, -this.radius, 2 * this.radius, 2 * this.radius)
    this.ctx.restore();
  }

  update(): void {
    this.updateProperties()

    this._position.x += this.delta.x;
    this._position.y += this.delta.y;

    const colidesWith = CollisionCalculator.entitiesObjectIsIntersectingWith(this.originAndRadius, ['enemies'])
    colidesWith.forEach(ent => {
      if (ent instanceof BaseShip) {
        CollisionHandler.updateCollidedShips(this, ent);
      }
    })

    if (this.health <= 0) {
      this.flags.playerDead = true;
    }
  }

  updateProperties() {
    this.updateRotation()
    this.updateDelta()

    this._angle.rotation += this._angle.rotationSpeed;

    if (!CollisionCalculator.isWholeInbouds(this.originAndRadius)) {
      this._position.x -= this.delta.x;
      this._position.y -= this.delta.y;
      this._delta.x = -this.delta.x / 4;
      this._delta.y = -this.delta.y / 4;
    }
  }

  updateRotation() {
    if (this._angle.rotationSpeed > -this._angle.rotationMaxSpeed && this.canvasEvents.keyboard["q"]) {
      this._angle.rotationSpeed -= this._angle.rotationModifier
    } else if (this._angle.rotationSpeed < this._angle.rotationMaxSpeed && this.canvasEvents.keyboard["e"]) {
      this._angle.rotationSpeed += this._angle.rotationModifier
    } else {
      const slowdown = 0.3 * this._angle.rotationModifier;
      this._angle.rotationSpeed = Math.abs(this._angle.rotationSpeed) - this._angle.rotationModifier > 0
        ? this._angle.rotationSpeed + (-Math.sign(this._angle.rotationSpeed) * slowdown)
        : 0;
    }
  }

  updateDelta() {
    const deltaModifier: Vector = this.delta;

    if (this.canvasEvents.keyboard["w"] && this.delta.x < this.movement.maxSpeed.forward && this.delta.y < this.movement.maxSpeed.forward) {
      const { x, y } = Helper.calculateVelocity(this._angle.facing, this.delta, this.movement.accelerationModifier.forward)
      deltaModifier.x += x * this.movement.accelerationModifier.forward;
      deltaModifier.y += y * this.movement.accelerationModifier.forward;
    }
    if (this.canvasEvents.keyboard["s"]) {
      const { x, y } = Helper.calculateVelocity(this._angle.facing - Math.PI, this.delta, this.movement.accelerationModifier.backwards)
      deltaModifier.x += x * this.movement.accelerationModifier.backwards;
      deltaModifier.y += y * this.movement.accelerationModifier.backwards;
    }
    if (this.canvasEvents.keyboard["a"]) {
      const { x, y } = Helper.calculateVelocity(this._angle.facing - Math.PI * 0.5, this.delta, this.movement.accelerationModifier.left)
      deltaModifier.x += x * this.movement.accelerationModifier.left;
      deltaModifier.y += y * this.movement.accelerationModifier.left;
    }
    if (this.canvasEvents.keyboard["d"]) {
      const { x, y } = Helper.calculateVelocity(this._angle.facing + Math.PI * 0.5, this.delta, this.movement.accelerationModifier.right)
      deltaModifier.x += x * this.movement.accelerationModifier.right;
      deltaModifier.y += y * this.movement.accelerationModifier.right;
    }


    this._delta.x = deltaModifier.x;
    this._delta.y = deltaModifier.y;
  }

  static getInstance() {
    if (!Player.instance) {
      let canvasDimensions = Canvas.getDimensions();
      Player.instance = new Player({ x: canvasDimensions.width / 2, y: canvasDimensions.height / 2 });
    }
    return Player.instance;
  }

  static getPosition() {
    return Player.getInstance().position;
  }
}

