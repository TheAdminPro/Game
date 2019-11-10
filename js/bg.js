let bg = {
	img: new Image(),
	x: 0,
	y: 0,
	width: 4380,
	height: 494
};
bg.img.src = 'media/bg/bg.png';

bg.viewport = function (offset) {
	this.x += offset;
}

bg.draw = function () {
	ctx.drawImage(this.img,
				this.x,
				this.y,
				this.width / 4,
				this.height,
				0, 0,
				window.innerWidth,
				window.innerHeight);	
}
