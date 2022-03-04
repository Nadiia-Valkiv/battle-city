import { cellSize, map} from "./map.js";
let previousState = 'up';

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
    if (Math.random() < 0.2) {
      this.direction = this.randomDirection();
    } else {
        this.direction = previousState;
    }

    switch (this.direction) {
      case "up":
        if (
         map[this.mapColumn - 1] !== undefined  &&
          map[this.mapColumn - 1][this.mapRow] === 0
        ) {
          map[this.mapColumn - 1][this.mapRow] = 1;
          map[this.mapColumn][this.mapRow] = 0;
          this.rotateTank(0);
        } else {
          this.move();
        }
        break;

      case "down":
        if (
            map[this.mapColumn + 1] !== undefined   &&
          map[this.mapColumn + 1][this.mapRow] === 0 
        ) {
          map[this.mapColumn + 1][this.mapRow] = 1;
          map[this.mapColumn][this.mapRow] = 0;
          this.rotateTank(180);
        } else {
          this.move();
        }

        break;

      case "left":
        if (
             map[this.mapRow - 1] !== undefined &&
          map[this.mapColumn][this.mapRow - 1] === 0 
        ) {
          map[this.mapColumn][this.mapRow - 1] = 1;
          map[this.mapColumn][this.mapRow] = 0;
          this.rotateTank(270);
        } else {
          this.move();
        }
        break;

      case "right":
        if (
            map[this.mapRow + 1] !== undefined &&
          map[this.mapColumn][this.mapRow + 1] === 0
        ) {
          map[this.mapColumn][this.mapRow + 1] = 1;
          map[this.mapColumn][this.mapRow] = 0;
          this.rotateTank(90);
        } else {
          this.move();
        }
        break;
      default:
        console.log("wrong direction");
    }
    previousState = this.direction;
    
  }
  rotateTank(degrees) {
    const tank = document.getElementsByClassName("player")[0];
    console.log(this.elem);
    tank.style.transform = `rotate(${degrees}deg)`;
  }
}
