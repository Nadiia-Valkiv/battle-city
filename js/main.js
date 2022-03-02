import { map, mapLegend, cellSize } from "./map.js";
import PlayerTank from "./PlayerTank.js";
import EnemyTank from "./EnemyTank.js";
const gameTimerInterval = 1000;
let playerLifeCount = 3;
let enemyTanksCount = 21;
let isGameOver = false;
let playerTank;
const enemyTanks = [];

/**
 * в этой функции можно выполнить весь тот код, который необходим для старта игры
 * например, именно в этом месте можно нарисовать блоки стен на карте и подписаться на события нажатия кнопок управления
 */
gameInitialization();

/**
 * Жизненный цикл игры
 * вызывает функцию gameLoop каждые gameTimerInterval до тех пор, пока игра не закончится
 * (чтобы закончить игру, установите занчение переменной isGameOver в true)
 */
gameLoop();

function gameInitialization() {
  let gameMap = document.querySelector("#game-map");

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === mapLegend.wall) {
        gameMap.innerHTML += `<div class='game-object game-object__wall' 
            style='position: absolute; top: ${i * cellSize}px; left: ${
          j * cellSize
        }px;'></div>`;
      } else if (map[i][j] === mapLegend.playerBase) {
        playerTank = new PlayerTank(j * cellSize, i * cellSize);
        gameMap.appendChild(playerTank.elem);
      } else if (map[i][j] === mapLegend.enemyBase) {
        enemyTanks.push(new EnemyTank(j * cellSize, i * cellSize));

        gameMap.appendChild(enemyTanks[enemyTanks.length - 1].elem);
      }
    }
  }
}

function gameLoop() {
  if (isGameOver !== true) {
    let gameMap = document.querySelector("#game-map");
    gameMap.innerHTML = "";
    playerTank.move();
    gameInitialization();
    /**
     * вот именно в функции gameStep стоит разместить код, который будет выполняться на каждом шаге игрового цикла
     */
    gameStep();

    setTimeout(function () {
      gameLoop();
    }, gameTimerInterval);
  }
}

function gameStep() {
  /**
   * это то самое место, где стоит делать основные шаги игрового цикла
   * например, как нам кажется, можно было бы сделать следующее
   * 1. передвинуть пули
   * 2. рассчитать, где танки окажутся после этого шага
   * 3. проверить столкновения (пуль с танками, пуль со стенами, танков со стенами и танков с танками)
   * 4. убрать с поля мертвые танки и разрушенные стены
   * 5. проверить, не закончились ли жизни у игрока или не закончиличь ли танки противника
   * 6. создать новые танки на базах в случае, если кого-то убили на этом шаге
   */
}
