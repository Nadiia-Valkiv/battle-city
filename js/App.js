import {
    gameTimerInterval,
    gameMap,
    map,
    mapLegend,
    cellSize,
    amountOfPlayerLife,
    amountOfEnemyLife,
    gameWinMessage,
    gameLoseMessage,
    enemyCounter,
    playerCounter,
    whiteSpace,
    keydown,
} from './constants.js';
import PlayerTank from './PlayerTank.js';
import EnemyTank from './EnemyTank.js';
import Wall from './Wall.js';
import {updateMap} from './function.js';

export default class App {
    constructor() {
        this.playerLifeCount = amountOfPlayerLife;
        this.enemyTanksLifeCount = amountOfEnemyLife;
        this.isGameOver = false;
        this.enemyTanksBases = [];
        this.playerTankBase = null;
        this.playerTank = null;
        this.enemyTanks = [];
        this.walls = [];
    }

    eliminateTank() {
        this.removePlayerTank()
        if (this.playerLifeCount <= 0) {
            this.gameOver(gameLoseMessage);
        }
        this.createNewPlayerTank()
        gameMap.appendChild(this.playerTank.elem);
    }

    removePlayerTank(){
        this.playerLifeCount--;
        this.addAmountTanksLifeToDom(playerCounter, this.playerLifeCount);
        updateMap(this.playerTank.getMapColumn(),this.playerTank.getMapRow(), mapLegend.road )
        this.playerTank.deleteBullet();
        this.playerTank.removeTankFromDOM('game-object__player-tank');
    }

    createNewPlayerTank(){
        this.playerTank = PlayerTank.newPlayer(
            this.playerTankBase[0] * cellSize,
            this.playerTankBase[1] * cellSize
        );
        this.playerTank.update();
        updateMap(this.playerTank.getMapColumn(), this.playerTank.getMapRow(),mapLegend.playerBase)
    }

    eliminateEnemyTank(enemyTankIndex) {
        this.enemyTanksLifeCount--;
        updateMap(this.enemyTanks[enemyTankIndex].getMapColumn(),this.enemyTanks[enemyTankIndex].getMapRow(),mapLegend.road)
        this.enemyTanks[enemyTankIndex].deleteBullet();
        this.addAmountTanksLifeToDom(enemyCounter, this.enemyTanksLifeCount);
        if (this.enemyTanksLifeCount <= 0) {
            this.gameOver(gameWinMessage);
        }
        const randomBase = this.getRandomEnemyBase();
        this.enemyTanks.splice(
            enemyTankIndex,
            1,
            new EnemyTank(randomBase[0] * cellSize, randomBase[1] * cellSize)
        );
        this.enemyTanks[enemyTankIndex].update();
        updateMap(this.enemyTanks[enemyTankIndex].getMapColumn(),this.enemyTanks[enemyTankIndex].getMapRow(),mapLegend.enemyBase)
        gameMap.appendChild(this.enemyTanks[enemyTankIndex].elem);
    }

    startGame() {
        this.gameInitialization();   
        setTimeout(() => this.gameLoop(), gameTimerInterval);
    }

    gameInitialization() {
        this.enemyTanks.splice(0, this.enemyTanks.length);

        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                const currentElement = map[i][j];
                if (currentElement === mapLegend.wall) {
                    this.walls.push(new Wall(j * cellSize, i * cellSize));
                } else if (currentElement === mapLegend.playerBase) {
                    this.playerTank = new PlayerTank(
                        j * cellSize,
                        i * cellSize
                    );
                    this.playerTankBase = [j, i];
                } else if (currentElement === mapLegend.enemyBase) {
                    this.enemyTanks.push(
                        new EnemyTank(j * cellSize, i * cellSize)
                    );
                    this.enemyTanksBases.push([j, i]);
                }
            }
        }

        this.walls.forEach((wall) => {
            gameMap.appendChild(wall.elem);
        });

        gameMap.appendChild(this.playerTank.elem);
        this.playerTank.update();
        this.enemyTanks.forEach((tank) => {
            gameMap.appendChild(tank.elem);
            tank.update();
        });

        document.addEventListener(
            keydown,
            (event) => {
                if (event.key === whiteSpace) {
                    if (
                        this.playerTank.isFiring === false &&
                        !this.playerTank.hasTankBullet()
                    ) {
                        this.playerTank.fire();
                    }
                } else {
                    this.playerTank.changeDirection(event);
                    this.playerTank.isTankMove = true;
                }
            },
            false
        );
        this.addAmountTanksLifeToDom(enemyCounter, this.enemyTanksLifeCount);
        this.addAmountTanksLifeToDom(playerCounter, this.playerLifeCount);
    }

    gameLoop() {
        if (this.isGameOver !== true) {
            this.gameStep();
            setTimeout(() => this.gameLoop(), gameTimerInterval);
        }
    }

    gameOver(message) {
        alert(message);
        location.reload();
    }

    gameStep() {
        this.enemyTanks.forEach((tank) => {
            tank.move();
            if (tank.bullet) {
                tank.bullet.move();
            }
            if (!tank.isFiring && !tank.hasTankBullet()) {
                tank.fire();
            }
        });

        if (this.playerTank.isTankMove) {
            this.playerTank.move();
            this.playerTank.isTankMove = false;
        }

        if (this.playerTank.hasTankBullet()) {
            this.playerTank.bullet.move();
        }
    }

    addAmountTanksLifeToDom(id, amount) {
        document.getElementById(id).innerHTML = amount;
    }

    getRandomEnemyBase() {
        return this.enemyTanksBases[
            Math.floor(Math.random() * this.enemyTanksBases.length)
        ];
    }
}
