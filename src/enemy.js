var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d"); 

export default class Enemy {
    // constructor(x, y, speed) {
      constructor(x, speed) {
  
      this.width = 50;
      this.height = 50;

      // speed is initially 5:
      this.speed = speed;
      // this.x = x;
      // this.y = y;

      this.x = x;
      this.y;
  
      this.moving = true;

      this.color = "pink"
      this.delete = false;
      this.force = "ground";

      this.pickupNum = Math.floor(Math.random() * 10);
      // this.pickupOdds = 0.5;
      this.pickupOdds = 8;
      this.pickup = false;

      // this.types = ["stand", "crawl"];

      //this.type = _.sample(["ground", "crawl", "air"]);

      // this.typeNum = Math.floor(Math.random() * 10);
      this.typeNum = Math.random() * 10;

      this.groundOdds = 8;
      this.airOdds = 5;
      this.crawlOdds = 1.5;

      this.type = "ground";
      this.health = 2;
    }

    draw() {
      cxt.beginPath();
      cxt.fillStyle = this.color;
      cxt.fillRect(this.x, this.y, this.width, this.height);

      cxt.font = "20px serif";
      cxt.fillStyle = "black";

      cxt.textAlign = "center";
      cxt.textBaseline = "middle";

      if (this.pickupNum <= this.pickupOdds) {
        this.pickup = true   
      }
      if (this.typeNum <= this.crawlOdds) {
        this.type = "crawl";
        this.width = 30;
        this.height = 30;
      }
      else if (this.typeNum <= this.airOdds) this.type = "air";

      cxt.fillText(this.health, this.x + (this.width / 2), this.y + (this.height / 2));

    }
  
    update() {
      this.x -= this.speed;
    }
}