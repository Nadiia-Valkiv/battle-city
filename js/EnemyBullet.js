import { mapLegend } from './constants.js';
import { game } from './main.js';
import Bullet from './Bullet.js';

export default class EnemyBullet extends Bullet {
    constructor(x, y, direction, tank) {
        super(x, y, direction, tank);
    }

    targetFired(tank, target) {
        super.targetFired(tank, target);
        if (tank.hasTankBullet()) {
            if (target === mapLegend.playerBase) {
                game.eliminateTank();
                tank.deleteBullet.call(tank);
            }
            if (target === mapLegend.enemyBase) {
                if (!this.isBulletBelongsThisTank(tank)) {
                    tank.deleteBullet(tank);
                }
            }
        }
    }
    isBulletBelongsThisTank(tank) {
        return tank.mapRow === this.mapRow && tank.mapColumn === this.mapColumn;
    }
}
