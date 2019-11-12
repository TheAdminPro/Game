class General{
	constructor(width, height){
		this.img = new Image();
		this.width = width;
		this.height = height;
	}
	viewport(offset){
		this.x += offset;
	}
	draw(){
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}
	collision(player, callback){
		if(	player.x + player.width > this.x &&
		   	player.x < this.x + this.width &&
		   	player.y + player.height > this.y &&
		   	player.y < this.y + this.height ){
				callback({platform: this, playerHP: player.hp});
		}
	}
}