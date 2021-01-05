import { Room, Client } from "colyseus";
import { State } from "./State";


export class GameRoom extends Room<State> {
  onCreate() {
    this.setState(new State());

    this.setSimulationInterval(() => this.state.update());
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "JOINED");
    this.state.createPlayer(client.sessionId);
  }

  onLeave(client: Client) {
    console.log(client.sessionId, "LEFT!");
    const entity = this.state.players[client.sessionId];
  }

}