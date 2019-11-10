// Get Elem
const $ = elem => {
	return document.getElementById(elem);
}

// Create Canvas
const createCanvas = () => {
	let canv = document.createElement('canvas');
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;
	document.body.append(canv);
	return canv.getContext('2d');
}

// Clear Canvas
const clearCanvas = () => {
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
};


// Random Number
const getRandomNumber = (min=0, max=window.innerWidth) =>{
	 return Math.floor(Math.random() * (max - min)) + min;
}

// Draw Some Array
const drawArray = (array) => {
	array.forEach(arr => {
		arr.draw();
	});
}

// Viewport Some Array
const viewportArray = (array, offset) => {
	array.forEach(arr => {
		arr.x += offset;
	});	
}


