export class HudElement {
  private static instance: HudElement;

  readonly element: HTMLElement;

  private constructor() {
    this.element = document.querySelector(".hud")! as HTMLSelectElement;
  }

  static getInstance() {
    if (!HudElement.instance) {
      HudElement.instance = new HudElement();
    }
    return HudElement.instance
  }
}
