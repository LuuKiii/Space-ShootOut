export class Canvas {
  private static instance: Canvas;

  readonly element: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D;
  readonly boundingRect: DOMRect;
  readonly WIDTH: number;
  readonly HEIGHT: number;

  private constructor() {
    this.element = document.querySelector("#main__canvas")! as HTMLCanvasElement;
    this.context = this.element.getContext('2d')!;
    this.boundingRect = this.element.getBoundingClientRect();

    this.WIDTH = this.element.width = 800;
    this.HEIGHT = this.element.height = 600;
  }

  static getInstance() {
    if (!Canvas.instance) {
      Canvas.instance = new Canvas();
    }
    return Canvas.instance
  }
}

export class CanvasEvents {
  static instace: CanvasEvents;

  private readonly container: HTMLDivElement;
  private readonly canvas: Canvas;

  private _mouse: MouseEventData = { x: 0, y: 0 };
  private _keyboard: KeyboardEventData = {};

  private constructor() {
    this.canvas = Canvas.getInstance();
    this.container = document.querySelector(".container")!

    this.initMouseEvents();
    this.initKeyboardEvents();
  }

  private initMouseEvents() {
    this.canvas.element.addEventListener('mousemove', event => {
      this._mouse.x = event.x - this.canvas.boundingRect.x;
      this._mouse.y = event.y - this.canvas.boundingRect.y;
    })
  }

  private initKeyboardEvents() {
    this.container.addEventListener('keydown', event => {
      this._keyboard[event.key] = true;
    })
    this.container.addEventListener('keyup', event => {
      delete this._keyboard[event.key];
    })
  }

  get mouse() {
    return this._mouse;
  }

  get keyboard() {
    return this._keyboard
  }

  static getInstance() {
    if (!CanvasEvents.instace) {
      CanvasEvents.instace = new CanvasEvents();
    }
    return CanvasEvents.instace
  }
}

interface MouseEventData {
  x: number;
  y: number;
}

interface KeyboardEventData {
  [key: string | number]: boolean;
}
