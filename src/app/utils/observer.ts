export interface Subject {
  register(observer: Observer): void;
  unregister(observer: Observer): void;
  notify(): void;
}

export interface Observer {
  updateFromSubject(): void;
}

export interface SubjectCanvas {
  observersMouse: ObserverCanvas[]
  observersKeyboard: ObserverCanvas[]
  registerMouse(observer: ObserverCanvas): void;
  unregisterMouse(observer: ObserverCanvas): void;
  notifyFromMouse(): void;
  registerKeyboard(observer: ObserverCanvas): void;
  unregisterKeyboard(observer: ObserverCanvas): void;
  notifyFromKeyDown(keyPressed: string): void;
  notifyFromKeyUp(keyReleased: string): void;
}

export interface ObserverCanvas {
  updateFromMouse?(): void;
  updateFromKeyDown?(keyPressed: string): void;
  updateFromKeyUp?(keyReleased: string): void;
}
