import { Room, Client } from "colyseus";
import { Entity } from "./Entity";
import { State } from "./State";

export class ArenaRoom extends Room<State> {

  onCreate() {
    this.setState(new State());
    this.state.initialize();
    this.setSimulationInterval(() => this.state.update());
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "JOINED");
    this.state.createPlayer(client.sessionId);
  }

  onMessage("*", (client: Client, type, message)) {
  // onMessage(client: Client, message: any) {
    const entity = this.state.entities[client.sessionId];

    // skip dead players
    if (!entity) {
      console.log("DEAD PLAYER ACTING...");
      return;
    }

    // const [command, data] = message;
    const command = type;
    const data = message;

  // change angle
    if (command === "mouse") {
      const dst = Entity.distance(entity, data as Entity);
      entity.speed = (dst < 20) ? 0 : Math.min(dst / 15, 4);
      entity.angle = Math.atan2(entity.y - data.y, entity.x - data.x);
    }
        
    if (command === "sendJSON")
      {
        console.log("sendJSON")
        this.broadcast({type: "sendJSON", data: JSON.stringify(data)}, { except: client });
      }
  }

  onLeave(client: Client) {
    console.log(client.sessionId, "LEFT!");
    const entity = this.state.entities[client.sessionId];

    // entity may be already dead.
    if (entity) { entity.dead = true; }
  }

}
