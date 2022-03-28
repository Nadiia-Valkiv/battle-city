const gameTimerInterval = 500;
const gameMap = document.querySelector('#game-map');
const map = [
    [2, 0, 0, 3, 0, 0, 2, 0, 0, 3, 0, 0, 2],
    [0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 3, 3, 3, 0, 0],
    [0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 3, 0, 3, 0, 0, 0, 0, 0],
];

const mapLegend = {
    playerBase: 1,
    enemyBase: 2,
    wall: 3,
    road: 0,
    border: -1,
};

const amountOfPlayerLife = 3;
const amountOfEnemyLife = 21;

const cellSize = 64;
const bulletSize = 8;

const up = 'up';
const down = 'down';
const right = 'right';
const left = 'left';
const directionSet = [right, left, up, down];

const arrowLeft = 'ArrowLeft';
const arrowRight = 'ArrowRight';
const arrowUp = 'ArrowUp';
const arrowDown = 'ArrowDown';

const gameWinMessage = `Game Over! You are the winner!`;
const gameLoseMessage = `Game Over! You lose!`;

const playerCounter = 'playerCounter';
const enemyCounter = 'enemyCounter';

const whiteSpace = ' ';
const keydown = 'keydown';

const bulletCssClass = 'bullet';
const gameObjectCssClass = 'game-object';
const enemyTankCssClass = 'game-object__enemy-tank';
const playerTankCssClass = 'game-object__player-tank';
const wallTankCssClass = 'game-object__wall';

const top = 'top';

const enemy = 'enemy';
const player = 'player';

export {
    gameTimerInterval,
    gameMap,
    map,
    mapLegend,
    cellSize,
    bulletSize,
    directionSet,
    amountOfPlayerLife,
    amountOfEnemyLife,
    gameLoseMessage,
    gameWinMessage,
    up,
    down,
    right,
    arrowDown,
    arrowLeft,
    arrowRight,
    arrowUp,
    playerCounter,
    enemyCounter,
    whiteSpace,
    keydown,
    bulletCssClass,
    left,
    top,
    enemy,
    player,
    gameObjectCssClass,
    playerTankCssClass,
    enemyTankCssClass,
    wallTankCssClass,
};
