import { Observer, Subject } from "../utils/observer";

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


export class CanvasEvents implements Subject {
  static instace: CanvasEvents;

  private readonly container: HTMLDivElement;
  private readonly canvas: Canvas;
  private observers: Observer[] = [];

  private _mouse: MouseEventData = { x: 0, y: 0, button: {} };
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

    this.canvas.element.addEventListener('mousedown', event => {
      this._mouse.button[MouseButtons[event.button]] = true;
      this.notify();
    })

    this.canvas.element.addEventListener('mouseup', event => {
      delete this._mouse.button[MouseButtons[event.button]]
      this.notify();
    })

    this.canvas.element.addEventListener('contextmenu', event => {
      event.preventDefault();
      this.notify();
    })

    this.canvas.element.addEventListener('wheel', event => {
      console.log(event)
      event.preventDefault();

      if (event.deltaY > 0) {
        this._mouse.button[MouseButtons[MouseButtons.ScrollDown]] = true;
      } else if (event.deltaY < 0) {
        this._mouse.button[MouseButtons[MouseButtons.ScrollUp]] = true;
      }
      
      this.notify();

      delete this._mouse.button[MouseButtons[MouseButtons.ScrollDown]];
      delete this._mouse.button[MouseButtons[MouseButtons.ScrollUp]];
    })

    this.canvas.element.addEventListener('mouseleave', event => {
      for (const btn in this.mouse.button) {
        delete this.mouse.button[btn];
      }
      this.notify();
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

  register(observer: Observer): void {
    this.observers.push(observer)
  }

  unregister(observer: Observer): void {
    const index = this.observers.indexOf(observer)
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(): void {
    this.observers.forEach(observer => observer.updateFromSubject())
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
  button: {
    [key: string | number]: boolean
  }
}

interface KeyboardEventData {
  [key: string | number]: boolean;
}

enum MouseButtons {
  LPM = 0, MMB = 1, PPM = 2, ScrollDown, ScrollUp
}
