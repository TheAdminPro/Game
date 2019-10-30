let path = 'media/sprites/';
let extension = '.gif'; 

let sprites = {
	passive: [],
	rightRun: []
};

function initSprites(folder, spritesCount, arr) {
	for (let i = 1; i <= spritesCount; i++) {
		arr.push(`${path}${folder}/${i}${extension}`);	
	}	
}

initSprites('passive', 2, sprites.passive);
initSprites('rightRun', 9, sprites.rightRun);
/* <- Init Sprites */


let player = {
	img: new Image(),
	hp: 100,
	x: 0,
	y: 0,
	x_velocity: 0,
	y_velocity: 0,
	width: 40,
	height: 100,
	jumping: false,
	jumpLength: 80,
	gravity: 2,
	state: 'passive',
	controller: {
		left: false,
		right: false,
		up: false
	} 
};


// return PLayer HP 
player.getHP = function () {
	return this.hp;
}

// Key Listener
player.controller.keyListener = function (event) {
	let keyEvent = event.type === 'keydown' ? true : false;
	switch(event.keyCode) {
		// Left
		case 37:
			player.controller.left = keyEvent; 
			break;
		// Up
		case 38:
			player.controller.up = keyEvent;
			break;
		// Right
		case 39:
			player.controller.right = keyEvent;
			break;	
	}
}


// Move Player
player.move = function () {
	if(this.controller.up && !this.jumping){
		this.y_velocity -= this.jumpLength;
		this.jumping = true;	
	}
	if(this.controller.left){
		this.x_velocity -= 0.5;

	}
	if(this.controller.right){
		this.x_velocity += 0.5;
	}
	// Gravity
	this.y_velocity += this.gravity;

	this.x += this.x_velocity;
	this.y += this.y_velocity;

	this.y_velocity *= 0.9; 		
	this.x_velocity *= 0.9; 
}
 
//Limitations Move Player
player.limit = function () {
	if(this.y + this.height >= window.innerHeight){
		this.jumping = false;
		this.y = window.innerHeight - this.height;
		this.y_velocity = 0;
	}
	if (this.x <= 0){
		this.x = 0;
		this.x_velocity = 0;
	}
}

player.img.src = sprites.passive[0];

// Draw Player
player.draw = function() {
	if (this.state === 'passive') {

	}
	// ctx.fillRect(this.x, this.y, this.width, this.height);	
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height);	
}
