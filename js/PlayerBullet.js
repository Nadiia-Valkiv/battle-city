import { mapLegend } from './constants.js';
import { game } from './main.js';
import Bullet from './Bullet.js';

export default class PlayerBullet extends Bullet {
    constructor(x, y, direction, tank) {
        super(x, y, direction, tank);
    }

    targetFired(tank, target) {
        super.targetFired(tank, target);
        if (tank.hasTankBullet()) {
            if (target === mapLegend.enemyBase) {
                const arr = game.enemyTanks.filter(
                    (enemyTank) =>
                        enemyTank.getMapColumn() === this.getMapColumn() &&
                        enemyTank.getMapRow() === this.getMapRow()
                );
                const idEnemyTank = game.enemyTanks.findIndex((object) => {
                    return (
                        object.getMapColumn() === this.getMapColumn() &&
                        object.getMapRow() === this.getMapRow()
                    );
                });
                arr[0].elem.remove();
                game.eliminateEnemyTank(idEnemyTank);
                tank.deleteBullet.call(tank);
            }
        }
    }
}
