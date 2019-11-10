class Snake extends General{
	constructor(){
		//width, height
		super(130, 90);
		this.img.src = 'media/clipart/snake.png';
		this.x = getRandomNumber(0, bg.img.width);
		this.y = window.innerHeight - this.height;
	}
}