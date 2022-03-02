import { cellSize, map } from "./map.js";

export default class Tank {
  constructor(x, y) {
    this.elem = document.createElement("div");
    this.x = x;
    this.y = y;
    this.mapRow = this.x / cellSize;
    this.mapColumn = this.y / cellSize;

    this.directionSet = ["right", "left", "up", "down"];
    this.direction = "up";
    this.update();
  }

  left() {
    this.x -= cellSize;
    this.update();
  }

  right() {
    this.x += cellSize;
    this.update();
  }

  up() {
    this.y -= cellSize;
    this.update();
  }

  down() {
    this.y += cellSize;
    this.update();
  }

  update() {
    this.elem.style["top"] = `${this.y}px`;
    this.elem.style["left"] = `${this.x}px`;
  }

  randomDirection() {
    return this.directionSet[
      Math.floor(Math.random() * this.directionSet.length)
    ];
  }

  move() {
    this.direction = "down";

    switch (this.direction) {
      case "up":
        map[this.mapColumn - 1][this.mapRow] = 1;
        map[this.mapColumn][this.mapRow] = 0;
        break;

      case "down":
        map[this.mapColumn + 1][this.mapRow] = 1;
        map[this.mapColumn][this.mapRow] = 0;
        break;

      case "left":
        map[this.mapColumn][this.mapRow - 1] = 1;
        map[this.mapColumn][this.mapRow] = 0;
        break;

      case "right":
        map[this.mapColumn][this.mapRow + 1] = 1;
        map[this.mapColumn][this.mapRow] = 0;
        break;
      default:
        console.log("wrong direction");
    }
  }
}
