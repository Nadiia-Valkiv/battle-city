import Bullet from "./Bullet.js";
import GameObject from "./GameObject.js";
import { cellSize, map, mapLegend, bulletSize } from "./map.js";
// import { gameMap } from "./main.js";

export default class Tank extends GameObject {
    constructor(x, y, mark) {
        super(x, y);
        this.mapRow = this.x / cellSize;
        this.mapColumn = this.y / cellSize;
        this.direction = "up";
        this.previousState = "up";
        this.mark = mark;
        this.isFiring = false;
        this.bullet = null;
    }

    deleteBullet() {
        this.bullet.elem.remove();
        this.bullet = null;
        this.isFiring = false;
    }

    move() {
        switch (this.direction) {
            case "up":
                this.rotateTank(0);
                //TODO
                if (
                    map[this.mapColumn - 1] !== undefined &&
                    map[this.mapColumn - 1][this.mapRow] === 0
                ) {
                    map[this.mapColumn - 1][this.mapRow] = this.mark;
                    map[this.mapColumn][this.mapRow] = 0;
                    this.y -= cellSize;
                    this.mapColumn -= 1;
                } else {
                    this.changeDirection();
                }
                break;

            case "down":
                this.rotateTank(180);
                if (
                    map[this.mapColumn + 1] !== undefined &&
                    map[this.mapColumn + 1][this.mapRow] === 0
                ) {
                    map[this.mapColumn + 1][this.mapRow] = this.mark;
                    map[this.mapColumn][this.mapRow] = 0;
                    this.y += cellSize;
                    this.mapColumn += 1;
                } else {
                    this.changeDirection();
                }

                break;

            case "left":
                this.rotateTank(270);
                if (
                    map[this.mapColumn][this.mapRow - 1] !== undefined &&
                    map[this.mapColumn][this.mapRow - 1] === 0
                ) {
                    map[this.mapColumn][this.mapRow - 1] = this.mark;
                    map[this.mapColumn][this.mapRow] = 0;
                    this.x -= cellSize;
                    this.mapRow -= 1;
                } else {
                    this.changeDirection();
                }
                break;

            case "right":
                this.rotateTank(90);
                if (
                    map[this.mapColumn][this.mapRow + 1] !== undefined &&
                    map[this.mapColumn][this.mapRow + 1] === 0
                ) {
                    map[this.mapColumn][this.mapRow + 1] = this.mark;
                    map[this.mapColumn][this.mapRow] = 0;
                    this.x += cellSize;
                    this.mapRow += 1;
                } else {
                    this.changeDirection();
                }
                break;
            default:
                console.log("wrong direction");
        }
        this.previousState = this.direction;
        this.update();
    }

    update() {
        this.elem.style["top"] = `${this.y}px`;
        this.elem.style["left"] = `${this.x}px`;
    }

    rotateTank(degrees) {
        this.elem.style.transform = `rotate(${degrees}deg)`;
    }

    fire() {
        this.isFiring = true;
        this.bullet = new Bullet(this.x, this.y, this.direction, this);
        this.bullet.move();
        return this.bullet;
    }

    validateBorder() {
        if (this.bullet) {
            if (
                this.bullet.x < 0 ||
                this.bullet.y < 0 ||
                this.bullet.y > map.length * cellSize ||
                this.bullet.x >= map[0].length * cellSize
            ) {
                console.log("border");
                this.deleteBullet();
                return;
            }
            if (
                map[Math.floor(this.bullet.y / cellSize)][
                    Math.floor(this.bullet.x / cellSize)
                ] === mapLegend.wall ||
                map[Math.floor((this.bullet.y + bulletSize) / cellSize)][
                    Math.floor((this.bullet.x + bulletSize) / cellSize)
                ] === mapLegend.wall
            ) {
                console.log("wall");

                map[Math.floor(this.bullet.y / cellSize)][
                    Math.floor(this.bullet.x / cellSize)
                ] = 0;
                //     map[Math.floor((this.bullet.y + bulletSize) / cellSize)][
                //         Math.floor((this.bullet.x + bulletSize) / cellSize)
                //     ] = 0;

                //     gameMap.innerHTML += `<div class='game-object dark'
                // style='position: absolute; top: ${Math.ceil(this.bullet.y)}px; left: ${
                //         Math.ceil(this.bullet.x +  )
                //     }px;'></div>`;
                this.deleteBullet();
            }
        }
    }
}
