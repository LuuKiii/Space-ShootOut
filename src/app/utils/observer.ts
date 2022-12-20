export interface Subject {
  register(observer: Observer): void;
  unregister(observer: Observer): void;
  notify(): void;
}

export interface Observer {
  updateFromSubject(): void;
}
