import { Observer, Subject } from "../utils/observer";

export class Flags implements Subject {
  private static instance: Flags;
  private observers: Observer[] = [];

  private _playerDead = false;

  private constructor() { }

  get playerDead() {
    return this._playerDead;
  }

  set playerDead(value) {
    this._playerDead = value;
    this.notify();
  }

  notify(): void {
    this.observers.forEach(ob => ob.updateFromSubject())
  }

  register(observer: Observer): void {
    this.observers.push(observer);
  }

  unregister(observer: Observer): void {
    const index = this.observers.indexOf(observer)
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  static getInstance() {
    if (!Flags.instance) {
      Flags.instance = new Flags();
    }
    return Flags.instance;
  }
}
