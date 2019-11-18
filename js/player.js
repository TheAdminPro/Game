//Number of Sprites
let nosPassive;
let nosRun;
let nosUp = 1;
let hero = 'jasmine';

let path = 'media/sprites/';
let extension = '.gif'; 
let sprites = {
	passive: [],
	up: [],
	run: []
};


if(hero === 'aladdin') {
	nosPassive = 2;
	nosRun = 9;
}else{
	nosPassive = 1;
	nosRun = 6;
}

function initSprites(folder, spritesCount, arr) {
	for (let i = 1; i <= spritesCount; i++) {
		let img = new Image();
		img.src = `${path}${hero}/${folder}/${i}${extension}`;
		arr.push(img);	
	}	
}

initSprites('passive', nosPassive, sprites.passive);
initSprites('up', nosUp, sprites.up);
initSprites('run', nosRun, sprites.run);
/* <- Init Sprites */


let player = {
	img: new Image(),
	hp: 100,
	x: 0,
	y: 0,
	x_velocity: 0.1,
	y_velocity: 0,
	width: 55,
	height: 100,
	jumping: false,
	jumpLength: 80,
	gravity: 2,
	state: 'passive',
	frames: 0,
	frame: 0,
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
player.controller.keyListener = function (event){
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
		this.state = 'run';
		if( (this.x + this.width / 2) <= window.innerWidth / 2 && bg.x > 0){
			this.x = window.innerWidth / 2 - this.width / 2;
			this.x_velocity = -0.1;
			bg.viewport(-5);
			viewportArray(platforms, 5);
			viewportArray(banans, 5);
			// viewportArray(snakes, 5);
			for(snake of snakes) snake.x += 7;
		}
		else{
			this.x_velocity -= 0.5;
		}
	}
	// Controller Right
	if(this.controller.right){
		this.state = 'run';
		if( (this.x + this.width / 2) >= (window.innerWidth / 2) && bg.x + window.innerWidth < bg.img.width){
			this.x = window.innerWidth / 2 - this.width / 2;
			bg.viewport(5);
			viewportArray(platforms, -5);
			viewportArray(banans, -5);
			// viewportArray(snakes, -5);
			for(snake of snakes) snake.x -= 7;
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
	for(platform of platforms) platform.encounter(); 
	for(banana of banans) banana.encounter(); 
	// for(snake of snakes) snake.encounter(); 
}

// Draw Player
player.draw = function() {
	if(this.state === 'up'){
		player.img = sprites.up[0];
		// animated(4, player.img, sprites.run);
	}
	else if (this.state === 'run'){
		// 1: sprite per frame
		// 2: player img
		// 3: sprites array
		animated(4, player.img, sprites.run);
	}
	else if (this.state === 'passive') {
		animated(20, player.img, sprites.passive);
	}	

	if (this.x_velocity > 0) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	} else {
		ctx.save();
		ctx.scale(-1, 1);
		ctx.drawImage(this.img, -this.x, this.y, -this.width, this.height);
		ctx.restore();
	}
}


function animated(spf, playerImg, arr){
		player.frame >= arr.length ? player.frame = 0 : false; 
		if(player.frames >= spf){
			player.frames = 0;
			player.frame = (player.frame + 1) % arr.length;
		} 
		else{
			player.frames++;
		}
			// console.log(i);   
		player.img = arr[player.frame];
		// console.log(arr[i]);
}