let path = 'media/sprites/';
let extension = '.gif'; 

let sprites = {
	passive: [],
	up: [],
	rightRun: [],
	leftRun: []
};

function initSprites(folder, spritesCount, arr) {
	for (let i = 1; i <= spritesCount; i++) {
		let img = new Image();
		img.src = `${path}${folder}/${i}${extension}`;
		arr.push(img);	
	}	
}

initSprites('passive', 2, sprites.passive);
initSprites('up', 5, sprites.up);
initSprites('rightRun', 9, sprites.rightRun);
initSprites('leftRun', 9, sprites.leftRun);
/* <- Init Sprites */


let player = {
	img: new Image(),
	hp: 100,
	x: 0,
	y: 0,
	x_velocity: 0,
	y_velocity: 0,
	width: 55,
	height: 100,
	jumping: false,
	jumpLength: 80,
	gravity: 2,
	state: 'passive',
	frames: 0,
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
	this.state = 'passive';
	// Controller Up
	if(this.controller.up && !this.jumping){
		this.y_velocity -= this.jumpLength;
		this.jumping = true;
		console.log(this.state);
	}
	// Controller Left
	if(this.controller.left){
		this.state = 'left';
		if(this.x + this.width / 2 <= window.innerWidth / 2 && bg.x > 0){
			this.x = window.innerWidth / 2 - this.width / 2;
			bg.viewport(-5);
			viewportArray(platforms, 5);
			viewportArray(snakes, 5);
		}
		else{
			this.x_velocity -= 0.5;
		}
	}
	// Controller Right
	if(this.controller.right){
		this.state = 'right';
		if(this.x + this.width / 2 >= window.innerWidth / 2 && bg.x + bg.img.width / 4 < bg.img.width){
			this.x = window.innerWidth / 2 - this.width / 2;
			bg.viewport(5);
			viewportArray(platforms, -5);
			viewportArray(snakes, -5);
		} 
		else{
			this.x_velocity += 0.5;
		}
	}
	if(this.jumping) this.state = 'up';
	
	// Gravity
	this.y_velocity += this.gravity;

	this.x += this.x_velocity;
	this.y += this.y_velocity;

	this.y_velocity *= 0.9; 		
	this.x_velocity *= 0.9; 
}
 
//Limitations Move Player
player.limit = function () {
	this.jumping = true;
	if(this.y + this.height >= window.innerHeight){
		this.jumping = false;
		this.y = window.innerHeight - this.height;
		this.y_velocity = 0;
	}
	if (this.x <= 0){
		this.x = 0;
		this.x_velocity = 0;
	}
	platforms.forEach( platform => {
		if(this.x + this.width > platform.x &&
		   this.x < platform.x + platform.width &&
		   this.y + this.height >= platform.y && 
		   this.y < platform.y){
			this.jumping = false;
			this.y = platform.y - this.height;
			this.y_velocity = 0;			
		}
	});
	snakes.forEach(snake => {
		if(this.x + this.width > snake.x &&
		   this.x < snake.x + snake.width &&
		   this.y + this.height > snake.y &&
		   this.y < snake.y + snake.height){
		   	console.log('test');
		} 
	});
}

let i = 0;

// Draw Player
player.draw = function() {
	if(this.state === 'up'){
		player.img = sprites.up[4];
	}
	else if (this.state === 'right'){
		// 1: sprite per frame
		// 2: player img
		// 3: sprites array
		animated(4,player.img, sprites.rightRun);
	}
	else if (this.state === 'left'){
		animated(4,player.img, sprites.leftRun);
	}
	else if (this.state === 'passive') {
		animated(20,player.img, sprites.passive);
	}	

	ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}


function animated(spf, playerImg, arr){
		i >= arr.length ? i = 0 : false; 
		if(player.frames >= spf){
			player.frames = 0;
			i = (i + 1) % arr.length;
		} 
		else{
			player.frames++;
		}
			// console.log(i);   
		player.img = arr[i];
		// console.log(arr[i]);
}