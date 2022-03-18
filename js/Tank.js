import Bullet from "./Bullet.js";
import GameObject from "./GameObject.js";
import { cellSize, map} from "./map.js";

export default class Tank extends GameObject {
    constructor(x, y, mark) {
        super(x, y);
        this.direction = "up";
        this.previousState = "up";
        this.mark = mark;
        this.isFiring = false;
        this.bullet = null;
    }

    deleteBullet() {
        if (this.bullet !== null) {
            this.bullet.elem.remove();
            this.bullet = null;
            this.isFiring = false;
        }
    }

    move() {
        switch (this.direction) {
            case "up":
                this.rotateTank(0);
                const mapColumnUp = this.mapColumn - 1;
                if (
                    map[mapColumnUp] !== undefined &&
                    map[mapColumnUp][this.mapRow] === 0
                ) {
                    map[mapColumnUp][this.mapRow] = this.mark;
                    map[this.mapColumn][this.mapRow] = 0;
                    this.y -= cellSize;
                    this.mapColumn -= 1;
                } else {
                    this.changeDirection();
                }
                break;

            case "down":
                this.rotateTank(180);
                const mapColumnDown = this.mapColumn + 1;
                if (
                    map[mapColumnDown] !== undefined &&
                    map[mapColumnDown][this.mapRow] === 0
                ) {
                    map[mapColumnDown][this.mapRow] = this.mark;
                    map[this.mapColumn][this.mapRow] = 0;
                    this.y += cellSize;
                    this.mapColumn += 1;
                } else {
                    this.changeDirection();
                }

                break;

            case "left":
                this.rotateTank(270);
                const mapRowLeft = this.mapRow - 1;
                if (
                    map[this.mapColumn][mapRowLeft] !== undefined &&
                    map[this.mapColumn][mapRowLeft] === 0
                ) {
                    map[this.mapColumn][mapRowLeft] = this.mark;
                    map[this.mapColumn][this.mapRow] = 0;
                    this.x -= cellSize;
                    this.mapRow -= 1;
                } else {
                    this.changeDirection();
                }
                break;

            case "right":
                this.rotateTank(90);
                const mapRowRight = this.mapRow + 1;
                if (
                    map[this.mapColumn][mapRowRight] !== undefined &&
                    map[this.mapColumn][mapRowRight] === 0
                ) {
                    map[this.mapColumn][mapRowRight] = this.mark;
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
}
