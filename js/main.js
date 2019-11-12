let ctx = createCanvas();
let timer;
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
			for(snake of snakes) snake.encounter(); 
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
	for(snake of snakes) snake.move(); 
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