class Platform extends General{
	constructor(){
		//width, height
		super(250, 120);
		this.img.src = 'media/clipart/platform.png';
		this.x = getRandomNumber(0, bg.img.width);
		this.y = getRandomNumber(window.innerHeight - 500, window.innerHeight - 200) - this.height;
	}
}