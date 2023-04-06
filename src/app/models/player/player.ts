import { CollisionHandler } from "../../core/handlers/collision-handler.js";
import { Flags } from "../../core/global-flags.js";
import { Canvas, CanvasEvents } from "../../ui/canvas.js";
import { CollisionCalculator, OriginAndRadius } from "../../utils/collision-calculator.js";
import { Helper } from "../../utils/helper.js";
import { BaseShip } from "../base/base-ship.js";
import { Angle, MovementConsts, Point, Vector } from "../base/base-types.js";

export class Player extends BaseShip {
  static instance: Player;

  protected _movement: MovementConsts;
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

    this._movement.maxSpeed = 1;
    this._movement.acceleration.forward = 0.08;
    this._movement.acceleration.backwards = 0.03;
    this._movement.acceleration.left = 0.03;
    this._movement.acceleration.right = 0.03;
    this._damageTakenFromCollision = 30;
  }


  draw(): void {
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y)
    this.ctx.rotate(this._angle.rotation);
    this.ctx.drawImage(this.image, -this.radius, -this.radius, 2 * this.radius, 2 * this.radius);
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

    this.angle.rotation += this.angle.rotationSpeed;

    if (!CollisionCalculator.isWholeInbouds(this.originAndRadius)) {
      this._position.x -= this.delta.x;
      this._position.y -= this.delta.y;
      this._delta.x = -this.delta.x / 4;
      this._delta.y = -this.delta.y / 4;
    }
  }

  updateRotation() {
    // console.log(this.angle.facing)
    if (this.angle.rotationSpeed > -this.angle.rotationMaxSpeed && this.canvasEvents.keyboard["q"]) {
      this.angle.rotationSpeed -= this.angle.rotationModifier
    } else if (this.angle.rotationSpeed < this.angle.rotationMaxSpeed && this.canvasEvents.keyboard["e"]) {
      this.angle.rotationSpeed += this.angle.rotationModifier
    } else {
      const slowdown = 0.3 * this.angle.rotationModifier;
      this.angle.rotationSpeed = Math.abs(this.angle.rotationSpeed) - this.angle.rotationModifier > 0
        ? this.angle.rotationSpeed + (-Math.sign(this.angle.rotationSpeed) * slowdown)
        : 0;
    }
  }

  updateDelta() {
    let deltaModifier: Vector = this.delta;
    const currentVelocity = Math.sqrt(this.delta.x ** 2 + this.delta.y ** 2);

    if (this.canvasEvents.keyboard["w"]) {
      deltaModifier = this.calculateDeltaModifier(currentVelocity, this.angle.facing, deltaModifier, this.movement.acceleration.forward, this.movement.maxSpeed);
    }
    if (this.canvasEvents.keyboard["s"]) {
      deltaModifier = this.calculateDeltaModifier(currentVelocity, this.angle.facing - Math.PI, deltaModifier, this.movement.acceleration.backwards, this.movement.maxSpeed);
    }
    if (this.canvasEvents.keyboard["a"]) {
      deltaModifier = this.calculateDeltaModifier(currentVelocity, this.angle.facing - Math.PI * 0.5, deltaModifier, this.movement.acceleration.left, this.movement.maxSpeed);
    }
    if (this.canvasEvents.keyboard["d"]) {
      deltaModifier = this.calculateDeltaModifier(currentVelocity, this.angle.facing + Math.PI * 0.5, deltaModifier, this.movement.acceleration.right, this.movement.maxSpeed);
    }

    this._delta.x = deltaModifier.x;
    this._delta.y = deltaModifier.y;
  }

  calculateDeltaModifier(currentVelocity: number, angle: number, deltaModifier: Vector, accelerationModifier: number, maxSpeed: number): Vector {
    const { x, y } = Helper.calculateVelocity(angle, this.delta, accelerationModifier)

    if (currentVelocity >= maxSpeed) {
      const velocityRatio = maxSpeed / currentVelocity;

      deltaModifier.x *= velocityRatio;
      deltaModifier.y *= velocityRatio;
    }

    deltaModifier.x += x / 4 * accelerationModifier;
    deltaModifier.y += y / 4 * accelerationModifier;
    return deltaModifier;
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

