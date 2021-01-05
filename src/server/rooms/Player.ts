import { Schema, type } from "@colyseus/schema";

import { Stats } from './Stats'

export class Player extends Schema {
  @type("number")
  x: number;
  @type("number")
  y: number;

  @type(Stats)
  stats

  constructor(x: number, y: number) {
    super()

    this.x = x
    this.y = y

    this.stats = new Stats(0)
  }

  move() {
    console.log('moving')
    this.x = this.x + Math.floor(Math.random() * 6) + 1  
    this.y = this.y + Math.floor(Math.random() * 6) + 1  
  }
}