// Enemies our player must avoid
let Enemy = function(x, y, speed) {

// Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = getRandomInt(100, 225);
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bullet.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
     if (this.x > 400) {
        this.x = -100;
    }
    
       if (player.x < this.x + 50 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
            score.updateMiss();


        // toggle background after collision between player and enemies
        document.querySelector('body').style.backgroundColor = '#fff';
        setTimeout(function () {
         document.querySelector('body').style.backgroundColor = '#828486';
        }, 200);
      
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/petter.png';
};
Player.prototype.update = function() {

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Walk on border of game
if (this.y > 425) {
        this.y = 425;
        }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    
 // success cross to blue go to top now go back to start point
        if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        score.updateSuccess();
    }

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 25;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 25;
            break;
    }
};

let allEnemies = [];
let enemyPosition = [60, 140, 220];
let player = new Player(200, 380, 50);
let enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 50));
    allEnemies.push(enemy);
});



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function getRandomInt(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

///
let Score = function() {
  this.success = 0;
  this.miss = 0;
};

Score.prototype.updateSuccess = function() {
  this.success += 1;
  document.getElementById('score-success').innerHTML = this.success;
};

Score.prototype.updateMiss = function() {
  this.miss += 1;
  document.getElementById('score-miss').innerHTML = this.miss;
};
let score = new Score();