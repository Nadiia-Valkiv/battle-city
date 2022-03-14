export default class GameObject {
    constructor(x,y) {
        this.elem = document.createElement("div");
        this.x = x;
        this.y = y;
    }
}