import {
    gameTimerInterval,
    gameMap,
    cellSize,
    bulletSize,
    mapLegend,
    map,
    up,
    down,
    right,
    left,
    bulletCssClass,
    top,
} from './constants.js';
import {updateMap} from './function.js';
import GameObject from './GameObject.js';

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
            case up:
                this.x += dif / 2 - 1;
                this.y += dif;
                break;
            case down:
                this.x += dif / 2 + 1;
                break;
            case left:
                this.y += dif / 2;
                this.x += dif;
                break;
            case right:
                this.y += dif / 2 - 1;
                break;
        }
    }

    addBulletToMap() {
        this.elem.classList.add(bulletCssClass);
        gameMap.appendChild(this.elem);
    }

    update() {
        this.elem.style[top] = `${this.y}px`;
        this.elem.style[left] = `${this.x}px`;
    }

    directionHandler(direction) {
        const timerId = setInterval(() => {
            direction.call(this);
            this.update();
            this.targetFired(this.tank, this.checkTarget());
        }, gameTimerInterval / (3 * bulletSize));
        setTimeout(() => {
            clearInterval(timerId);
        }, gameTimerInterval);
    }

    move() {
        switch (this.direction) {
            case up:
                this.directionHandler(this.up);
                break;
            case down:
                this.directionHandler(this.down);
                break;
            case left:
                this.directionHandler(this.left);
                break;
            case right:
                this.directionHandler(this.right);
                break;
        }
    }

    up() {
        this.y = this.y - bulletSize;
    }

    down() {
        this.y = this.y + bulletSize;
    }

    left() {
        this.x = this.x - bulletSize;
    }

    right() {
        this.x = this.x + bulletSize;
    }

    checkTarget() {
        if (
            Math.floor((this.y + bulletSize) / cellSize) >= 0 &&
            Math.floor((this.y + bulletSize) / cellSize) < map.length &&
            Math.floor((this.x + bulletSize) / cellSize) >= 0 &&
            Math.floor((this.x + bulletSize) / cellSize) < map[0].length
        ) {
            return map[Math.floor((this.y + bulletSize) / cellSize)][
                Math.floor((this.x + bulletSize) / cellSize)
            ];
        } else {
            return mapLegend.border;
        }
    }

    targetFired(tank, target) {
        if (tank.hasTankBullet()) {
            if (target === mapLegend.wall) {
                let row = Math.round((tank.bullet.y - bulletSize) / cellSize);
                let column = Math.round(
                    (tank.bullet.x - bulletSize) / cellSize
                );
                updateMap(row, column, mapLegend.road);

                let wallToRemove = document.getElementsByClassName(
                    `wall${column * cellSize}${row * cellSize}`
                );
                if (wallToRemove.length > 0) {
                    wallToRemove[0].remove();
                    tank.deleteBullet.call(tank);
                }
            }

            if (target === mapLegend.border) {
                tank.deleteBullet.call(tank);
            }
        }
    }
}
