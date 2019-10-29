let ctx = createCanvas();
let timer;
let m = s = 0;

loop();

function Timer() {
	return (m < 10 ? '0' + m : m) +':'+(s < 10 ? '0' + s : s);
}

function TicTac() {
	timer = setInterval()
}



function update() {
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