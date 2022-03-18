import { cellSize, bulletSize, mapLegend, map } from "./map.js";
import { gameTimerInterval, gameMap } from "./constants.js";
import GameObject from "./GameObject.js";
import PlayerTank from "./PlayerTank.js";
import {playerTank} from "./App.js";

export default class Bullet extends GameObject {
    constructor(x, y, direction, tank) {
        super(x, y);
        this.tank = tank;
        this.direction = direction;
        this.mapPositionRow = Math.floor(this.mapRow);
        this.mapPositionColumn = Math.floor(this.mapColumn);
        this.draw();
        this.update();
        this.addBulletToMap();
    }

    draw() {
        let dif = cellSize - bulletSize;
        switch (this.direction) {
            case "up":
                this.x += dif / 2 - 1;
                this.y += dif
                break;
            case "down":
                this.x += dif / 2 + 1;
                break;
            case "left":
                this.y += dif / 2;
                this.x += dif
                break;
            case "right":
                this.y += dif / 2 - 1;
                break;
        }
    }

    addBulletToMap() {
        this.elem.classList.add("bullet");
        gameMap.appendChild(this.elem);
    }

    update() {
        this.elem.style["top"] = `${this.y}px`;
        this.elem.style["left"] = `${this.x}px`;
    }
    move() {
        let timerId;
        switch (this.direction) {
            case "up":
                timerId = setInterval(
                    () => this.up(),
                    gameTimerInterval / 16
                );
                setTimeout(() => {
                    clearInterval(timerId);
                }, gameTimerInterval);
                break;
            case "down":
                timerId = setInterval(
                    () => this.down(),
                    gameTimerInterval / 16
                );
                setTimeout(() => {
                    clearInterval(timerId);
                }, gameTimerInterval);
                break;
            case "left":
                timerId = setInterval(
                    () => this.left(),
                    gameTimerInterval / 16
                );
                setTimeout(() => {
                    clearInterval(timerId);
                }, gameTimerInterval);
                break;
            case "right":
                timerId = setInterval(
                    () => this.right(),
                    gameTimerInterval / 16
                );
                setTimeout(() => {
                    clearInterval(timerId);
                }, gameTimerInterval);
                break;
        }
    }

    up() {
        this.y = this.y - bulletSize;
        this.update();
        this.targetFired(this.tank, this.checkTarget());
    }

    down() {
        this.y = this.y + bulletSize;
        this.update();
        this.targetFired(this.tank, this.checkTarget());
    }

    left() {
        this.x = this.x - bulletSize;
        this.update();
        this.targetFired(this.tank, this.checkTarget());
    }

    right() {
        this.x = this.x + bulletSize;
        this.update();
        this.targetFired(this.tank, this.checkTarget());
    }

    getBulletPositionOnTheMap() {
        if (
            Math.floor((this.y + bulletSize) / cellSize) >= 0 &&
            Math.floor((this.y + bulletSize) / cellSize) < 14 &&
            Math.floor((this.x + bulletSize) / cellSize) >= 0 &&
            Math.floor((this.x + bulletSize) / cellSize) < 13
        ) {
            return map[Math.floor((this.y + bulletSize) / cellSize)][
                Math.floor((this.x + bulletSize) / cellSize)
            ];
        }
    }

    checkTarget() {
        switch (this.getBulletPositionOnTheMap()) {
            case mapLegend.wall:
                return "wall";
            case mapLegend.enemyBase:
                return "enemy";
            case mapLegend.playerBase:
                return "player";
            case 0:
                return "road";
            default:
                return "border";
        }
    }

    targetFired(tank, target) {
        if (tank.bullet !== null) {
            if (target === "wall") {
                let row = Math.round((tank.bullet.y - bulletSize) / cellSize);
                let column = Math.round((tank.bullet.x - bulletSize) / cellSize);

                map[row][column] = 0;

                let wallToRemove = document.getElementsByClassName(`wall${column*cellSize}${row*cellSize}`);
                if (wallToRemove.length > 0) {
                    wallToRemove[0].remove();
                    tank.deleteBullet.call(tank);
                }
            }
            if (target === "border") {
                tank.deleteBullet.call(tank);
            }
            if (target === "player" && tank.type === 'enemy') {
                // document.getElementsByClassName('game-object__player-tank')[0].remove();
                // tank.deleteBullet.call(tank);
                // playerTank = new PlayerTank(4*64, 13*64);
            }
        }
    }
}
