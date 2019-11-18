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
		this.collided = false;
		this.hit = false;
	}
	move(){
		this.x += this.velocity * this.dir;

		if (this.x <= this.maxLeft) this.dir = 1;
		if (this.x >= this.maxRight) this.dir = -1;
		this.encounter();
	}
	encounter(){
		let res = this.collision(player, (payload) => {
			// payload.playerHP -= 30;
						if(!this.collided){
							this.collided = true;
							this.hit = true;
							player.hp -= 30;
							getInfo();
						}
					});
		if (res === undefined) {
			this.collided = false;
		}
	}
}