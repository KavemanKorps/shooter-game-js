var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class Pickup {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.delete = false;
        this.size = 10;

        // this.types = ["ar"];
        // this.type = this.types[Math.floor(Math.random() * this.types.length)];
    }

    update() {
        // this.y -= 15;
        this.y += 10;
        //console.log(this.type);
    }

    draw() {
        if (!this.delete) {
            cxt.beginPath();
            cxt.fillStyle = "purple";
            cxt.fillRect(this.x, this.y, this.size, this.size);
            cxt.fill();
        };
    }
}