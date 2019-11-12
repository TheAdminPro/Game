class Snake extends General{
	constructor(x){
		//width, height
		super(130, 90);
		this.img.src = 'media/clipart/snake.png';
		this.x = x;
		this.y = window.innerHeight - this.height;
		this.velocity = 2;
		this.maxLeft = this.x - 500;
		this.maxRight = this.x + 500;
		this.dir = getRandomNumber(0, 2) ? 1 : -1;
		console.log(this.width / 2);
	}
	move(){
		// this.x = this.x + this.width / 2;
		// ctx.fillRect(this.x, this.y, 10, 10);
		// ctx.fillRect(this.startPoint, this.y, 10, 10);
		this.x += this.velocity * this.dir;

		if (this.x <= this.maxLeft) this.dir = 1;
		if (this.x >= this.maxRight) this.dir = -1;

	}
	encounter(){
		this.collision(player, function (payload) {
			// payload.playerHP -= 30;
			player.hp -= 30;
			// console.log(payload.playerHP);
		});
	}
}