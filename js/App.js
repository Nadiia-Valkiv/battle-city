import { map, mapLegend, cellSize } from "./map.js";
import { gameTimerInterval } from "./constants.js";
import PlayerTank from "./PlayerTank.js";
import EnemyTank from "./EnemyTank.js";
import Wall from "./Wall.js";
let playerTank = null;

export default class App {
    constructor() {
        this.playerLifeCount = 3;
        this.enemyTanksCount = 21;
        this.isGameOver = false;
        this.enemyTanks = [];
        this.walls = [];
        this.bullet = false;
    }

    startGame() {
        this.gameInitialization();
        setTimeout(() => this.gameLoop(), gameTimerInterval);
    }

    gameInitialization() {
        let gameMap = document.querySelector("#game-map");

        this.enemyTanks.splice(0, this.enemyTanks.length);

        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                const currentElement = map[i][j];
                if (currentElement === mapLegend.wall) {
                    this.walls.push(new Wall(j * cellSize, i * cellSize))
                } else if (currentElement === mapLegend.playerBase) {
                    playerTank = new PlayerTank(j * cellSize, i * cellSize);
                } else if (currentElement === mapLegend.enemyBase) {
                    this.enemyTanks.push(
                        new EnemyTank(j * cellSize, i * cellSize)
                    );
                }
            }
        }


         this.walls.forEach((wall) => {
            gameMap.appendChild(wall.elem);
        });

        gameMap.appendChild(playerTank.elem);
        playerTank.update();
        this.enemyTanks.forEach((tank) => {
            gameMap.appendChild(tank.elem);
        });
               this.enemyTanks.forEach((tank) => {
            tank.update();
        });
        document.addEventListener(
            "keydown",
            function (event) {
                if (event.key === " ") {
                    if (playerTank.isFiring === false && !playerTank.bullet) {
                        playerTank.fire();
                    }
                } else {
                    playerTank.changeDirection(event);
                    playerTank.isTankMove = true;
                }
            },
            false
        );
    }

    gameLoop() {
        if (this.isGameOver !== true) {
            this.gameStep();

            setTimeout(() => this.gameLoop(), gameTimerInterval);
        }
    }

    gameStep() {
        this.enemyTanks.forEach((tank) => {
            tank.move();
        });
        if (playerTank.isTankMove) {
            playerTank.move();
            playerTank.isTankMove = false;
        }
        if (playerTank.bullet) {
            playerTank.bullet.move();
        }
    }
}

export { playerTank };
