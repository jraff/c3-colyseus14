export class Player {
    constructor(x: number, y: number) {
        super(x, y);
    }
  move() {
    this.x = this.x + Math.random() * 8 + 1
    this.y = this.y + Math.random() * 8 + 1
  }
}