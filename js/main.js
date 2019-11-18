let ctx = createCanvas();
let timer; 
let time = 0;
let pause = false;
//Init platforms 
let platforms = [];
for(let i = 0; i < 10; i++){
	platforms.push(new Platform());
}
//Init snakes
let snakes = [];
for(let i = 0; i < 5; i++){
	snakes.push(new Snake(getRandomNumber(500, bg.img.width - 500)));
}
let banans = [];
for (let i = 0; i < 2; i++) {
	banans.push(new Banana());
	banans[i].setPosition(platforms);
}

loop();

// Return Info Game
function getInfo(){
	$('timer').innerText = getTime();
	$('hp').innerText = player.hp;
}

// Firsts output info
getInfo();


function mainTimer() {
	if(!pause){
		timer = setInterval(() => {
			tickTime();
			getInfo();
		}, 1000);
	}
}
mainTimer();




function update() {
	bg.draw();
	player.draw();
	player.move();
	player.limit();
	drawArray(platforms);
	drawArray(snakes);
	drawArray(banans);
	for(snake of snakes) snake.move(); 

	let t = new Date().getTime();
		if (time <= t) {

			for (let snake of snakes) {
				if (snake.collided === true && snake.hit !== true) {
					player.hp -= 30;
				} else {
					snake.hit = false;
				}
			}


			player.hp--;

			if (player.hp < 0) {
				player.hp = 0;
				// die();
			}

			getInfo();
			time = t + 1000;
		}
}


window.addEventListener("keydown", player.controller.keyListener);
window.addEventListener("keyup", player.controller.keyListener);

function loop() {
	if(!pause){
		clearCanvas();
		update();
		ctx.fillRect(window.innerWidth / 2 - 5, window.innerHeight - 100, 10,10);
		requestAnimationFrame(loop);
	}
}	