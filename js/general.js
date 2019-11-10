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
}