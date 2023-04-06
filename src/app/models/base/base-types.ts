export interface Point {
  x: number,
  y: number,
}

export interface Vector {
  x: number,
  y: number,
}

export type MovementConsts = {
  maxSpeed: number,
  acceleration: Directions,
}

export type Directions = {
  forward: number,
  left: number,
  right: number,
  backwards: number
}

export type Angle = {
  rotation: number,
  rotationSpeed: number,
  rotationMaxSpeed: number,
  rotationModifier: number,
  get facing(): number,
  moveAngle: number,
}
