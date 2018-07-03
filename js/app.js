window.onload = function() {
    const modal = document.getElementById('modal');
		const info = document.getElementById('info');
		const scoring = document.getElementById('scoring');
    const btn = document.getElementById('btn');
    btn.addEventListener('click', player.playMe);
    scoring.innerHtml =`Score: ${player.score}`;
  }

	// Enemies our player must avoid
class Enemy {
	constructor(x,y){
		this.sprite = 'images/enemy-bug.png';
	  this.x = x;
		this.y = y;
		this.speed= 100;
	}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
	update(dt) {
		if (this.x<505) {
			this.x +=this.speed*dt;
		} else {
			this.x = -100;
			this.speed =(Math.random()+1)*110;
			this.x +=this.speed*dt;
				 }
// You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	}
	// Draw the enemy on the screen, required method for game
	render() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	collision() {
	  if (player.x<this.x+75 && player.x+70>this.x
	    && player.y<this.y+65 && player.y+75>this.y) {
		   player.reset();
	    }
		}


}
// Player class

class Player {
	constructor(x,y) {
		this.sprite = 'images/char-boy.png';
		this.x = x;
		this.y = y;
		this.lifes = 3;
		this.score = 0;
	}
	update(){}
	render(){
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	handleInput(allowedKeys) {
		switch(allowedKeys) {
			case 'left': this.x-=101;
				if (this.x<-2) {
					this.x = 402;
				}
				return;
			case 'right': this.x+=101;
				if (this.x>402) {
					this.x = -2;
				}
				return;
			case 'up': this.y-=84;
				if (this.y<-16) {

					this.scoreUp();
					this.y = 404;
				}
				return;
			case 'down': this.y+=84;
				if (this.y>404) {
					this.y = -16;
				}
				return;
		}
	}
	reset() {
		this.x = 200;
		this.y = 320;
		died();

	}
  scoreUp() {
    this.score++;
  }
   playMe() {
    modal.style.display = 'none';
  player = new Player(200,320);
    hearts = [ new Heart(380, 540), new Heart(420, 540), new Heart( 460, 540)];

  }

}

function died() {
	player.lifes--;
	let last = hearts.length -1
	hearts.pop(hearts[last]);
	if (player.lifes == 0) {
		openModal();
}
}

function openModal() {
		info.textContent = `Died. Score: ${player.score}`
		modal.style.display = 'block';

  }
class Heart {
	constructor(x,y) {
		this.sprite = 'images/Heart.png';
		this.x = x;
		this.y = y;
		this.width = 40;
		this.height = 50;
	}
	render() {
		  ctx.drawImage(Resources.get(this.sprite),this.x,this.y, this.width, this.height );
	}

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
allEnemies = [new Enemy(-100,63), new Enemy(-150, 146), new Enemy(0,229)];
const [enemy1, enemy2,enemy3] = allEnemies;
hearts = [ new Heart(380, 540), new Heart(420, 540), new Heart( 460, 540)];
const [ heart1, heart2, heart3 ] = hearts;

// Place the player object in a variable called player
let player = new Player(200,320);


window.addEventListener('click', outsideClick);

function outsideClick(e) {
  if(e.target == modal) {
    modal.style.display = 'none';
  }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
