class Banana extends General{
	constructor(){
		//width, height
		super(70, 70);
		this.img.src = 'media/clipart/banana.png';
	}
	setPosition(platforms){
		let ind = getRandomNumber(0, platforms.length);
		this.x = platforms[ind].x + platforms[ind].width / 2 - this.width / 2;
		this.y = platforms[ind].y - this.height;
	}
	encounter(){
		this.collision(player, (payload) => {
			player.hp + 5 > 100 ? player.hp = 100 : player.hp += 5;
			getInfo();
			this.setPosition(platforms); 
		});
	}
}