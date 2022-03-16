import GameObject from "./GameObject.js";

export default class Wall extends GameObject {
    constructor(x ,y){
        super(x,y);
        this.elem.className +=`game-object  game-object__wall wall${this.x}${this.y}`;
        this.styleWall();
    }
    styleWall() {
        this.elem.style["top"] = `${this.y}px`;
        this.elem.style["left"] = `${this.x}px`;
    }
}