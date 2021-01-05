import nanoid from "nanoid";
import { Schema, type, MapSchema } from "@colyseus/schema";

import Player from './Player'

export class State extends Schema {

  createPlayer (sessionId: string) {
    this.players[sessionId] = new Player(
      x: 100,
      y: 100,
    );
  }

  update() {
    this.players.move()
  }
}