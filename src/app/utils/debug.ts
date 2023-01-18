export interface GameLoopDebug {
  fps: FrameLimiter;
}

export type FrameLimiter = {
  readonly fpsInterval: number;
  frameCount: number;
  elapsed: number;
  startTime: number,
  prevTimeStamp: number;
  currentTimeStamp: number;
}

export class GlobalSettings {
  static readonly fpsLock = 60;
}

