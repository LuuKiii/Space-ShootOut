import { Observer, ObserverCanvas, Subject, SubjectCanvas } from "../utils/observer";

export class Canvas {
  private static instance: Canvas;

  readonly element: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D;
  readonly boundingRect: DOMRect;
  readonly width: number;
  readonly height: number;

  private constructor() {
    this.element = document.querySelector("#main__canvas")! as HTMLCanvasElement;
    this.context = this.element.getContext('2d')!;
    this.boundingRect = this.element.getBoundingClientRect();

    this.width = this.element.width = 800;
    this.height = this.element.height = 600;
  }

  static getContext() {
    this.getInstance()

    return this.instance.context;
  }

  static getDimensions() {
    this.getInstance();

    return { width: this.instance.width, height: this.instance.height };
  }

  static getInstance() {
    if (!Canvas.instance) {
      Canvas.instance = new Canvas();
    }
    return Canvas.instance
  }
}


export class CanvasEvents implements SubjectCanvas {
  static instace: CanvasEvents;

  private readonly container: HTMLDivElement;
  private readonly canvas: Canvas;

  observersMouse: ObserverCanvas[] = [];
  observersKeyboard: ObserverCanvas[] = [];

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
      this.notifyFromMouse();
    })

    this.canvas.element.addEventListener('mouseup', event => {
      delete this._mouse.button[MouseButtons[event.button]]
      this.notifyFromMouse();
    })

    this.canvas.element.addEventListener('contextmenu', event => {
      event.preventDefault();
      this.notifyFromMouse();
    })

    this.canvas.element.addEventListener('wheel', event => {
      event.preventDefault();

      if (event.deltaY > 0) {
        this._mouse.button[MouseButtons[MouseButtons.ScrollDown]] = true;
      } else if (event.deltaY < 0) {
        this._mouse.button[MouseButtons[MouseButtons.ScrollUp]] = true;
      }

      this.notifyFromMouse();

      delete this._mouse.button[MouseButtons[MouseButtons.ScrollDown]];
      delete this._mouse.button[MouseButtons[MouseButtons.ScrollUp]];
    })

    this.canvas.element.addEventListener('mouseleave', event => {
      for (const btn in this.mouse.button) {
        delete this.mouse.button[btn];
      }
      this.notifyFromMouse();
    })
  }

  private initKeyboardEvents() {
    this.container.addEventListener('keydown', event => {
      this._keyboard[event.key] = true;
      this.notifyFromKeyDown(event.key)
    })
    this.container.addEventListener('keyup', event => {
      delete this._keyboard[event.key];
      this.notifyFromKeyUp(event.key)
    })
  }

  registerMouse(observer: ObserverCanvas): void {
    if (observer.updateFromMouse == undefined) throw new Error('updateFromMouse Method is not implemented');
    this.observersMouse.push(observer)
  }

  unregisterMouse(observer: ObserverCanvas): void {
    const index = this.observersMouse.indexOf(observer)
    if (index > -1) {
      this.observersMouse.splice(index, 1)
    }
  }

  notifyFromMouse(): void {
    this.observersMouse.forEach(ob => ob.updateFromMouse!())
  }

  registerKeyboard(observer: ObserverCanvas): void {
    if (observer.updateFromKeyUp == undefined || observer.updateFromKeyDown == undefined) throw new Error('updateFromKeyboard Methods are not implemented');
    this.observersKeyboard.push(observer)
  }

  unregisterKeyboard(observer: ObserverCanvas): void {
    const index = this.observersKeyboard.indexOf(observer)
    if (index > -1) {
      this.observersKeyboard.splice(index, 1)
    }
  }

  notifyFromKeyUp(keyReleased: string): void {
    this.observersKeyboard.forEach(ob => ob.updateFromKeyUp!(keyReleased))
  }

  notifyFromKeyDown(keyPressed: string): void {
    this.observersKeyboard.forEach(ob => ob.updateFromKeyDown!(keyPressed))
  }

  // registerImportantKeyboardObservers(observer: Observer) {

  // }

  // unregisterImportantKeyboardObservers(observer: Observer) {

  // }

  // register(observer: Observer): void {
  //   this.observers.push(observer)
  // }

  // unregister(observer: Observer): void {
  //   const index = this.observers.indexOf(observer)
  //   if (index > -1) {
  //     this.observers.splice(index, 1);
  //   }
  // }

  // notify(): void {
  //   this.observers.forEach(observer => observer.updateFromSubject())
  // }

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

export enum MouseButtons {
  LPM = 0, MMB = 1, PPM = 2, ScrollDown, ScrollUp
}
