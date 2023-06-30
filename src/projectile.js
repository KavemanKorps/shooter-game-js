// BULLETS
export default class Projectile {
    // "dead" used as determinant for playing sounds
    constructor(x, y, direction, weapon, dead, entity) {

      // NEW HOWLER CRAP (sound fx "bucket"):
      this.sfx = {
        pistol: new Howl({
          /* accepts multiple versions of the same audio! (automatically selects the best one for the 
          current web browser */
          src: [
            "src/assets/sounds/shots/pistol.wav",
          ],
          loop: false,
          volume: 0.6
        }),
        ar: new Howl({
          src: [
            "src/assets/sounds/shots/cg1.wav",
          ],
          // the "loop" flag is false by default!
          loop: false,
          volume: 0.6
        }), 
        flammen: new Howl({
          src: [
            "src/assets/sounds/laser.mp3",
          ],
          // the "loop" flag is false by default!
          loop: false,
          // function to execute as soon as the sound effect ends:
          // good use case: when there is an intro to a song. Play the intro first, then use "onend" 
          // to play the song without having to worry about the intro repeating. 
          onend: function() {}
        }), 
        shotty: new Howl({
          src: [
            "src/assets/sounds/shots/rifle.wav",
          ],
          // the "loop" flag is false by default!
          loop: false,
          volume: 0.6,
          // function to execute as soon as the sound effect ends:
          // good use case: when there is an intro to a song. Play the intro first, then use "onend" 
          // to play the song without having to worry about the intro repeating. 
          onend: function() {}
        }), 
        growl: new Howl({
          src: [
            "src/assets/sounds/shots/rifle.wav",
          ],
          // the "loop" flag is false by default!
          loop: false,
          // function to execute as soon as the sound effect ends:
          // good use case: when there is an intro to a song. Play the intro first, then use "onend" 
          // to play the song without having to worry about the intro repeating. 
          onend: function() {}
        }), 

      }

      // constructor(x, y) { lol test
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.weapon = weapon;
      this.dead = dead;

      this.size = 5;

      this.speed = 10;
      // this.speed =5;
      this.delete = false;
      this.randomY = [1.7, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4];
      // this.randomY = [0.95, 1.0, 1.6, 1.8, 2, 2.2, 2.4];

      this.isDucked = false;

      this.pistol = new Audio();
      this.ar = new Audio();
      this.shotty = new Audio();
      this.flammen = new Audio();

      this.pistol.src = "src/assets/sounds/shots/pistol.wav";
      this.ar.src = "src/assets/sounds/shots/cg1.wav";
      // this.flammen.src = "src/assets/sounds/burst fire.mp3";
      this.flammen.src = "src/assets/sounds/laser.mp3";

      this.shotty.src = "src/assets/sounds/shots/shotgun.wav";

      // HERE IS WHERE PROJECTILE'S Y GETS CHANGED:
      // place bullet's y low when shooting down:
      if (this.direction == "down" || this.direction == "down-back" || this.direction == "diagnal-duck") {
        this.y = this.y + 25;
      }
    }

    playSound(sound) {
      if (!sound.playing()) {
        sound.play();
      }
    }
    
    update() {
      switch (this.weapon) {
        case "pistol":
          // this.pistol.play();
          // if (!this.sfx.pistol.playing()) {
          //   this.sfx.pistol.play();
          // }
          this.playSound(this.sfx.pistol);
          
          break;
        case "shotty":
          if (!this.dead) {
            // this.shotty.play();
            this.playSound(this.sfx.shotty);
          } else {
            // this.shotty.pause();
            this.sfx.shotty.stop();
          } 
          break;
        case "ar":
          // this.ar.play();
          this.playSound(this.sfx.ar);
          break;
        case "flammen":
          this.playSound(this.sfx.flammen);
          break;
      }

      // DIRECTION TO SHOOT IN:
      switch (this.direction) {
        case "straight":
          this.x += this.speed;
          break

        case "up":
          this.x += 0;
          this.y -= this.speed;
          break;
        
        case "diagnal":
        case "diagnal-duck":
          this.x += this.speed;
          // this.y -= this.speed / this.randomY[Math.floor(Math.random() * this.randomY.length)];
          this.y -= this.speed / this.randomY[Math.floor(Math.random() * this.randomY.length)];
          break;
        
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
          this.y -= this.speed * 2  
          break;

        // THIS IS FOR AIR ENEMIES:
        case "down-diagnal":
          this.x -= this.speed;
          this.y += this.speed / 2;
          break;

        // FOR BOMBERS:
        case "straight-down":
          this.y -= 3;
          break;  
      }
    }
    
    draw(context) {
      context.fillStyle = "black";
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
    }
}