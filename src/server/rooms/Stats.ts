import { Schema, type } from "@colyseus/schema";

export class Stats extends Schema {
  @type("number")
  gold: number;

  constructor(gold: number) {
    super()

    this.gold = gold
  }

  public giveGold() {
    console.log('giving gold')
    this.gold = this.gold + Math.floor(Math.random() * 10) + 1  
  }
}