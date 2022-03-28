import Tank from './Tank.js';
import PlayerBullet from './PlayerBullet.js';
import {
    mapLegend,
    player,
    gameObjectCssClass,
    playerTankCssClass,
    left,
    right,
    up,
    down,
    arrowLeft,
    arrowRight,
    arrowUp,
    arrowDown,
} from './constants.js';

export default class PlayerTank extends Tank {
    constructor(x, y) {
        super(x, y, mapLegend.playerBase);
        this.type = player;
        this.targetType = mapLegend.playerBase;
        this.isTankMove = false;
        this.elem.className += `${gameObjectCssClass} ${playerTankCssClass}`;
    }

    static newPlayer(x, y) {
        return new PlayerTank(x, y);
    }

    fire() {
        this.isFiring = true;
        this.bullet = new PlayerBullet(this.x, this.y, this.direction, this);
        this.bullet.move();
    }

    changeDirection(event) {
        if (event !== undefined) {
            switch (event.key) {
                case arrowLeft:
                    this.direction = left;
                    break;
                case arrowRight:
                    this.direction = right;
                    break;
                case arrowUp:
                    this.direction = up;
                    break;
                case arrowDown:
                    this.direction = down;
                    break;
            }
        }
    }
}
