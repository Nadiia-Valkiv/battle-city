import Tank from "./Tank.js";
export default class PlayerTank extends Tank {
  constructor(x, y) {
    super(x, y);
    this.elem.className += "game-object player game-object__player-tank";
  }
}
