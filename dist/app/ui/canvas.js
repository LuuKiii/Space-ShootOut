export class Canvas {
    constructor() {
        this.element = document.querySelector("#main__canvas");
        this.context = this.element.getContext('2d');
        this.boundingRect = this.element.getBoundingClientRect();
        this.width = this.element.width = 800;
        this.height = this.element.height = 600;
    }
    static getContext() {
        this.getInstance();
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
        return Canvas.instance;
    }
}
export class CanvasEvents {
    constructor() {
        this.observersMouse = [];
        this.observersKeyboard = [];
        this._mouse = { x: 0, y: 0, button: {} };
        this._keyboard = {};
        this.canvas = Canvas.getInstance();
        this.container = document.querySelector(".container");
        this.initMouseEvents();
        this.initKeyboardEvents();
    }
    initMouseEvents() {
        this.canvas.element.addEventListener('mousemove', event => {
            this._mouse.x = event.x - this.canvas.boundingRect.x;
            this._mouse.y = event.y - this.canvas.boundingRect.y;
        });
        this.canvas.element.addEventListener('mousedown', event => {
            this._mouse.button[MouseButtons[event.button]] = true;
            this.notifyFromMouse();
        });
        this.canvas.element.addEventListener('mouseup', event => {
            delete this._mouse.button[MouseButtons[event.button]];
            this.notifyFromMouse();
        });
        this.canvas.element.addEventListener('contextmenu', event => {
            event.preventDefault();
            this.notifyFromMouse();
        });
        this.canvas.element.addEventListener('wheel', event => {
            event.preventDefault();
            if (event.deltaY > 0) {
                this._mouse.button[MouseButtons[MouseButtons.ScrollDown]] = true;
            }
            else if (event.deltaY < 0) {
                this._mouse.button[MouseButtons[MouseButtons.ScrollUp]] = true;
            }
            this.notifyFromMouse();
            delete this._mouse.button[MouseButtons[MouseButtons.ScrollDown]];
            delete this._mouse.button[MouseButtons[MouseButtons.ScrollUp]];
        });
        this.canvas.element.addEventListener('mouseleave', event => {
            for (const btn in this.mouse.button) {
                delete this.mouse.button[btn];
            }
            this.notifyFromMouse();
        });
    }
    initKeyboardEvents() {
        this.container.addEventListener('keydown', event => {
            this._keyboard[event.key] = true;
            this.notifyFromKeyDown(event.key);
        });
        this.container.addEventListener('keyup', event => {
            delete this._keyboard[event.key];
            this.notifyFromKeyUp(event.key);
        });
    }
    registerMouse(observer) {
        if (observer.updateFromMouse == undefined)
            throw new Error('updateFromMouse Method is not implemented');
        this.observersMouse.push(observer);
    }
    unregisterMouse(observer) {
        const index = this.observersMouse.indexOf(observer);
        if (index > -1) {
            this.observersMouse.splice(index, 1);
        }
    }
    notifyFromMouse() {
        this.observersMouse.forEach(ob => ob.updateFromMouse());
    }
    registerKeyboard(observer) {
        if (observer.updateFromKeyUp == undefined || observer.updateFromKeyDown == undefined)
            throw new Error('updateFromKeyboard Methods are not implemented');
        this.observersKeyboard.push(observer);
    }
    unregisterKeyboard(observer) {
        const index = this.observersKeyboard.indexOf(observer);
        if (index > -1) {
            this.observersKeyboard.splice(index, 1);
        }
    }
    notifyFromKeyUp(keyReleased) {
        this.observersKeyboard.forEach(ob => ob.updateFromKeyUp(keyReleased));
    }
    notifyFromKeyDown(keyPressed) {
        this.observersKeyboard.forEach(ob => ob.updateFromKeyDown(keyPressed));
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
        return this._keyboard;
    }
    static getInstance() {
        if (!CanvasEvents.instace) {
            CanvasEvents.instace = new CanvasEvents();
        }
        return CanvasEvents.instace;
    }
}
export var MouseButtons;
(function (MouseButtons) {
    MouseButtons[MouseButtons["LPM"] = 0] = "LPM";
    MouseButtons[MouseButtons["MMB"] = 1] = "MMB";
    MouseButtons[MouseButtons["PPM"] = 2] = "PPM";
    MouseButtons[MouseButtons["ScrollDown"] = 3] = "ScrollDown";
    MouseButtons[MouseButtons["ScrollUp"] = 4] = "ScrollUp";
})(MouseButtons || (MouseButtons = {}));
//# sourceMappingURL=canvas.js.map