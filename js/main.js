let ctx = createCanvas();
let timer;
let m = s = 0;

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
	}, 1000);
}
mainTimer();



function update() {
	bg.draw();
	player.draw();
	player.move();
	player.limit();
}


window.addEventListener("keydown", player.controller.keyListener);
window.addEventListener("keyup", player.controller.keyListener);

function loop() {
	clearCanvas();
	update();
	requestAnimationFrame(loop);
}	