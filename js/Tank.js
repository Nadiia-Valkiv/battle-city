import Bullet from './Bullet.js';
import GameObject from './GameObject.js';
import {
    cellSize,
    down,
    left,
    map,
    mapLegend,
    right,
    up,
    top,
} from './constants.js';
import { checkIsNotUndefined, checkIsRoad, updateMap } from './function.js';

export default class Tank extends GameObject {
    constructor(x, y, mark) {
        super(x, y);
        this.direction = up;
        this.previousState = up;
        this.mark = mark;
        this.isFiring = false;
        this.bullet = null;
    }

    deleteBullet() {
        if (this.hasTankBullet()) {
            this.bullet.elem.remove();
            this.bullet = null;
            this.isFiring = false;
        }
    }

    move() {
        switch (this.direction) {
            case up:
                this.rotateTank(0);
                const mapColumnUp = this.mapColumn - 1;
                if (
                    checkIsNotUndefined(mapColumnUp) &&
                    checkIsRoad(mapColumnUp, this.mapRow)
                ) {
                    updateMap(mapColumnUp, this.mapRow, this.mark);
                    this.updateMapLegendToRoad();
                    this.y -= cellSize;
                    this.mapColumn -= 1;
                } else {
                    this.changeDirection();
                }
                break;

            case down:
                this.rotateTank(180);
                const mapColumnDown = this.mapColumn + 1;
                if (
                    checkIsNotUndefined(mapColumnDown) &&
                    checkIsRoad(mapColumnDown, this.mapRow)
                ) {
                    updateMap(mapColumnDown, this.mapRow, this.mark);
                    this.updateMapLegendToRoad();
                    this.y += cellSize;
                    this.mapColumn += 1;
                } else {
                    this.changeDirection();
                }

                break;

            case left:
                this.rotateTank(270);
                const mapRowLeft = this.mapRow - 1;
                if (
                    map[this.mapColumn][mapRowLeft] !== undefined &&
                    checkIsRoad(this.mapColumn, mapRowLeft)
                ) {
                    updateMap(this.mapColumn, mapRowLeft, this.mark);
                    this.updateMapLegendToRoad();
                    this.x -= cellSize;
                    this.mapRow -= 1;
                } else {
                    this.changeDirection();
                }
                break;

            case right:
                this.rotateTank(90);
                const mapRowRight = this.mapRow + 1;
                if (
                    map[this.mapColumn][mapRowRight] !== undefined &&
                    checkIsRoad(this.mapColumn, mapRowRight)
                ) {
                    updateMap(this.mapColumn, mapRowRight, this.mark);
                    this.updateMapLegendToRoad();
                    this.x += cellSize;
                    this.mapRow += 1;
                } else {
                    this.changeDirection();
                }
                break;
        }
        this.previousState = this.direction;
        this.update();
    }
    updateMapLegendToRoad() {
        updateMap(this.mapColumn, this.mapRow, mapLegend.road);
    }

    update() {
        this.elem.style[top] = `${this.y}px`;
        this.elem.style[left] = `${this.x}px`;
    }

    rotateTank(degrees) {
        this.elem.style.transform = `rotate(${degrees}deg)`;
    }

    fire() {    
        this.isFiring = true;
        this.bullet = new Bullet(this.x, this.y, this.direction, this);
        this.bullet.move();
    }

    removeTankFromDOM(className) {
        document.getElementsByClassName(className)[0].remove();
    }

    hasTankBullet() {
        return this.bullet;
    }
}
