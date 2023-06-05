var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d");

// BULLETS
export default class Projectile {
    constructor(x, y, direction, weapon) {
      // constructor(x, y) { lol test
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.weapon = weapon;

      this.size = 5;
      this.speed = 10;
      this.delete = false;

      this.pistol = new Audio();
      this.ar = new Audio();
      this.shotty = new Audio();

      this.pistol.src = "src/assets/sounds/shots/pistol.wav";
      this.ar.src = "src/assets/sounds/shots/cg1.wav";

      this.shotty.src = "src/assets/sounds/shots/shotgun.wav";

      // place bullet's y low when shooting down:
      if (this.direction == "down" || this.direction == "down-back") {
        this.y = this.y + 25;
      }
    }
    
    update() {
      if (this.x > 0 && this.x < canvas.height && !this.delete) {
        switch (this.weapon) {
          case "pistol":
            this.pistol.play();
            break;
          case "shotty":
            this.shotty.play();
            break;
          case "ar":
            this.ar.play();
            break;
        }
      }

      if (!this.delete) {
        switch (this.direction) {
          case "straight":
            this.x += this.speed;
            break

          case "up":
            this.x += 0;
            this.y -= this.speed;
            break;
          
          case "diagnal":
            this.x += this.speed;
            this.y -= this.speed / 2;
          
          case "down":
            this.x += this.speed;
            break;
          //   this.y = this.y + 30;

          case "back":
          case "down-back":
            this.x -= this.speed;
            break;
          
          case "diagnal-back":
            this.x -= this.speed;
            this.y -= this.speed * 2;
            break;

          case "down-diagnal":
            this.x -= this.speed;
            this.y += this.speed;
            break;
        }
      }
      // if (this.x > canvas.width - 100) {
      //   this.delete;
      // }
    }
  
    draw() {
      cxt.fillStyle = "black";
      cxt.beginPath();
      cxt.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      cxt.fill();
    }
}