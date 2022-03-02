import Tank from "./Tank.js";
export default class EnemyTank extends Tank {
  constructor(x, y) {
    super(x, y);
    this.elem.className += "game-object game-object__enemy-tank";
  }
}
