import { Canvas, CanvasEvents } from "../../ui/canvas.js";
import { CollisionCalculator, OriginAndRadius } from "../../utils/collision-calculator.js";
import { Helper } from "../../utils/helper.js";
import { Point } from "../base/base-entity.js";
import { BaseShip } from "../base/base-ship.js";

export class Player extends BaseShip {
  static instance: Player;

  protected ctx: CanvasRenderingContext2D;
  readonly canvasEvents: CanvasEvents;

  private readonly image = new Image();


  private constructor(pos: Point) {
    super();
    this.ctx = Canvas.getContext();
    this.canvasEvents = CanvasEvents.getInstance();

    this._position = { ...pos }
    this.init();
  }

  protected init(): void {
    this.image.onload = () => {
      this._resourcesLoaded = true;
    }
    this.image.src = "/assets/Player.png"

    this._health = 100;
    this._radius = 30;
    this._maxSpeed = 3;
    this._accelerationModifier = 0.05;
  }

  draw(): void {
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y)
    this.ctx.rotate(this._rotation);
    this.ctx.drawImage(this.image, -this.radius, -this.radius, 2 * this.radius, 2 * this.radius)
    this.ctx.restore();
  }

  update(): void {
    this.calculateMovement()

    this._position.x += this.delta.x;
    this._position.y += this.delta.y;

    this._rotation = Helper.calculateRotationTowardsEntity(this.position, this.canvasEvents.mouse)
    // CollisionCalculator.entitiesObjectIsIntersectingWith(this.originAndRadius, ['player'])
  }

  calculateMovement() {
    if (this.canvasEvents.keyboard["w"]) {
      this._delta.y -= this._accelerationModifier;
    }
    if (this.canvasEvents.keyboard["s"]) {
      this._delta.y += this._accelerationModifier;
    }
    if (this.canvasEvents.keyboard["a"]) {
      this._delta.x -= this._accelerationModifier;
    }
    if (this.canvasEvents.keyboard["d"]) {
      this._delta.x += this._accelerationModifier;
    }

    if (!CollisionCalculator.isWholeInbouds(this.originAndRadius)) {
      this._position.x -= this.delta.x;
      this._position.y -= this.delta.y;
      this._delta.x = -this.delta.x / 4;
      this._delta.y = -this.delta.y / 4;
    }
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

