import Tank from './Tank.js';
import EnemyBullet from './EnemyBullet.js';

import { mapLegend, directionSet, enemy, gameObjectCssClass, enemyTankCssClass } from './constants.js';

export default class EnemyTank extends Tank {
    constructor(x, y) {
        super(x, y, mapLegend.enemyBase);
        this.targetType = mapLegend.enemyBase;
        this.type = enemy;
        this.elem.className += `${gameObjectCssClass} ${enemyTankCssClass}`;
        this.rotateTank(180);
    }

    static newPlayer(x, y) {
        return new EnemyTank(x, y);
    }


    randomDirection() {
        return directionSet[Math.floor(Math.random() * directionSet.length)];
    }

    changeDirection() {
        this.move();
    }

    move() {
        if (Math.random() < 0.33) {
            this.direction = this.randomDirection();
        } else {
            this.direction = this.previousState;
        }
        super.move();
    }

    fire() {
        this.isFiring = true;
        this.bullet = new EnemyBullet(this.x, this.y, this.direction, this);
        this.bullet.move();
    }

    removeTankFromDOM() {
        this.elem.remove();
    }
}
