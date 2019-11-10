let ctx = createCanvas();
let timer;
let m = s = 0;
let touchWithSnake = false;



let platforms = [];
for(let i = 0; i < 10; i++){
	platforms.push(new Platform());
}
let snakes = [];
for(let i = 0; i < 5; i++){
	snakes.push(new Snake());
}


loop();

// Return Time
function getTime() {
	return (m < 10 ? '0' + m : m) +':'+(s < 10 ? '0' + s : s);
}
// Timer Tick
function tickTime(){
	s++;
	s > 59 ? (m++, s=0) : false;
}

// Return Info Game
function getInfo(){
	$('timer').innerText = getTime();
	$('hp').innerText = player.hp;
}
// Firsts output info
getInfo();


function mainTimer() {
	timer = setInterval(() => {
		tickTime();
		getInfo();
		// touchWithSnake ? player.hp -= 30 : false;
		snakes.forEach(snake => {
		if(player.x + player.width > snake.x &&
		   player.x < snake.x + snake.width &&
		   player.y + player.height > snake.y &&
		   player.y < snake.y + snake.height){
		   	// console.log('test');
		   player.hp -= 30;
		} 
	});
	}, 1000);
}
mainTimer();




function update() {
	bg.draw();
	player.draw();
	player.move();
	player.limit();
	drawArray(platforms);
	drawArray(snakes);
}


window.addEventListener("keydown", player.controller.keyListener);
window.addEventListener("keyup", player.controller.keyListener);

function loop() {
	clearCanvas();
	update();
	ctx.fillRect(window.innerWidth / 2 - 5, window.innerHeight - 100, 10,10);
	requestAnimationFrame(loop);
}	