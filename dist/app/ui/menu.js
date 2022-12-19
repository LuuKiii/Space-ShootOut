export class MenuElement {
    constructor() {
        this.element = document.querySelector(".menu");
        this.newGameBtn = this.element.querySelector(".menu__new-game");
        this.element.style.display = 'none';
    }
    static getInstance() {
        if (!MenuElement.instance) {
            MenuElement.instance = new MenuElement();
        }
        return MenuElement.instance;
    }
}
//# sourceMappingURL=menu.js.map