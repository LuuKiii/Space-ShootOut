export class MenuElement {
  private static instance: MenuElement;

  readonly element: HTMLElement;
  readonly newGameBtn: HTMLButtonElement;

  private constructor() {
    this.element = document.querySelector(".menu")! as HTMLSelectElement;
    this.newGameBtn = this.element.querySelector(".menu__new-game")! as HTMLButtonElement;

    this.element.style.display = 'none';
  }

  static getInstance() {
    if (!MenuElement.instance) {
      MenuElement.instance = new MenuElement();
    }
    return MenuElement.instance
  }
}
