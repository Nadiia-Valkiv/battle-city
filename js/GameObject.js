import { cellSize } from './constants.js';

export default class GameObject {
    constructor(x, y) {
        this.elem = document.createElement('div');
        this.x = x;
        this.y = y;
        this.mapRow = this.x / cellSize;
        this.mapColumn = this.y / cellSize;
    }
    getMapRow() {
        return Math.floor(this.x / cellSize);
    }

    getMapColumn() {
        return Math.floor(this.y / cellSize);
    }
}
