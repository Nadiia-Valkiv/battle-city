import {cellSize} from "./map.js";

export default class GameObject {
    constructor(x,y) {
        this.elem = document.createElement("div");
        this.x = x;
        this.y = y;
        this.mapRow = this.x / cellSize;
        this.mapColumn = this.y / cellSize;
    }
}