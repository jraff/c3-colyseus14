import nanoid from "nanoid";
import { Schema, type, MapSchema } from "@colyseus/schema";

import {Player} from './Player'

export class State extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();

  createPlayer (sessionId: string) {
    this.players[sessionId] = new Player(
      100,
      100,
    );
  }

  update() {
    // this.players.move()
    this.players.forEach((player) => {
      player.move()
      player.stats.giveGold()
    })
  }
}