import Projectile from "./projectile.js";

// OVERHAUL SPEED FUNCTIONALITY:
export default class Enemy {
    constructor(x, speed, round) {
      // cxt
      // FASTER SPEED ON CRAWLIES
      this.width = 50;
      this.height = 50;

      // speed is initially 5:

      this.speed = speed;
      // this.speed = 2;

      this.x = x;
      this.y;

      this.round = round;
      //this.round = 12;

      this.color = "pink"
      this.dead = false;

      this.pickupNum = Math.floor(Math.random() * 10);
      this.pickupOdds = 0;
      this.pickup = false;

      this.typeNum = Math.floor(Math.random() * 10);

      this.groundOdds = 10;
      this.airOdds = 4;
      this.crawlOdds = 2;
      this.bomberOdds = 2;

      this.isCivie = false;
      this.inNadeRange = false;

      this.duckable = false;

      // ground, crawl, air, civie
      // this.type = "ground";
      this.type = "ground";
      this.health = 2;

      // ENEMY GUN:
      this.projectiles = [];
      // this.fireRate = 200;
      // this.fireRate = 150;
      this.fireRate = 100;
      this.shooting = false;
      this.timer = 0;
      this.angle = "back";

      // POSITION CRAP:
      this.inPosition = false;
      this.position = 0;

      this.dead = false;

      this.beaming = false;
      this.beamHeight = 200;
      this.openFire = 100;
      this.beamActive = false;
    }

    renderBeam(context) {
      if (this.timer >= this.openFire) {
        context.beginPath();
        context.fillStyle = "purple";
        context.fillRect(this.x, this.y, 20, this.beamHeight);
      }
    }

    draw(context) {
      context.beginPath();
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);

      context.font = "20px serif";
      context.fillStyle = "black";

      context.textAlign = "center";
      context.textBaseline = "middle";

      if (this.isCivie) this.color = "gray";

      if (this.pickupNum <= this.pickupOdds && this.round <= 4) {
        this.pickup = true   
      }

      if (this.type == "bomber") {
        
      }

      // spawn crawlies first, then airs
      // TEMPORARILY BOMBER FOR NOW:
      if (this.typeNum <= this.crawlOdds && this.round >= 1) {
      // if (this.typeNum <= this.crawlOdds) {
          // this.type = "crawl";
          // this.width = 30;
          // this.height = 30;
          this.type = "bomber";
          this.openFire = 200;
          this.fireRate = 15;
          this.width = 50;
          this.height = 50;

          if (!this.isCivie) this.speed = 4;
          else this.speed = -3;
      }
      else if (this.typeNum <= this.airOdds && (this.round >= 2 && this.round != 3)) {
        this.type = "air";
        this.openFire = 150;
        this.fireRate = 150;
      }

      // in last round, crawlies and bombers have equal chance of spawning:
      // else if (this.typeNum <= this.crawlOdds && this.round >= 9) this.type = ["crawl", "bomber"][ Math.floor(Math.random() * 2)];

      context.fillText(`${this.beamActive}, ${this.timer}`, this.x + (this.width / 2), this.y + (this.height / 2));
    } // projectiles
  
    update() {
      // THIS WORKS
      if (!this.shooting) {
        this.x -= this.speed;
      } else {
        this.speed = 0;
        this.timer++;

        switch(this.type) {
          case "crawl":
            this.sound = "growl";
            break;
          case "ground":
          case "air":
            this.sound = "shotty";
            break;
          case "bomber":
            this.sound = "bomb-dropper";
            break;
        }

        if (this.timer >= this.openFire && this.timer % this.fireRate === 0) {
          this.projectiles.push(new Projectile(this.x + this.width - 20, this.y + 10, this.angle, this.sound, this.dead)); 

          this.beamActive == true;
        } 
      }
    }
}

