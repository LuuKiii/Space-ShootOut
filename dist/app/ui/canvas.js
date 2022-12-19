export class Canvas {
    constructor() {
        this.element = document.querySelector("#main__canvas");
        console.log(this.element);
        this.context = this.element.getContext('2d');
        this.WIDTH = this.element.width = 800;
        this.HEIGHT = this.element.height = 600;
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
        this._mouse = { x: 0, y: 0 };
        this._keyboard = {};
        this.canvas = Canvas.getInstance();
        this.container = document.querySelector(".container");
        this.initMouseEvents();
        this.initKeyboardEvents();
    }
    initMouseEvents() {
        const rect = this.canvas.element.getBoundingClientRect();
        this.canvas.element.addEventListener('mousemove', event => {
            this._mouse.x = event.x - rect.x;
            this._mouse.y = event.y - rect.y;
        });
    }
    initKeyboardEvents() {
        this.container.addEventListener('keydown', event => {
            this._keyboard[event.key] = true;
        });
        this.container.addEventListener('keyup', event => {
            delete this._keyboard[event.key];
        });
    }
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
//# sourceMappingURL=canvas.js.map