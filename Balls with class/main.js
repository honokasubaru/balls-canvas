const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const height = canvas.height = window.innerHeight;
const width = canvas.width = window.innerWidth;
const balls = new Array();

//GENERAR UN NUMERO ALEATORIO ENTRE DOS NUMEROS DADOS
function random (min,max){
	const num = Math.floor(Math.random()*(max-min))+min;
	return num;
}

class Ball {

	constructor(xPosition,yPosition,xVelocity,yVelocity,color,size){

		this.xPosition = xPosition;
		this.yPosition = yPosition;
		this.xVelocity = xVelocity;
		this.yVelocity = yVelocity;
		this.color = color;
		this.size = size;		

	}

	draw(){

		context.beginPath();
		context.arc(this.xPosition, this.yPosition, this.size, 0, 2*Math.PI);
		context.fillStyle = this.color;
		context.fill();

	}

	updateBall(){

		this.colisionDetect();
		if(this.xPosition + this.size >= width-3)this.xVelocity = -(this.xVelocity);
		if(this.xPosition - this.size <= 3)this.xVelocity = -(this.xVelocity);
		if(this.yPosition + this.size >= height-3)this.yVelocity = -(this.yVelocity);
		if(this.yPosition - this.size <= 3)this.yVelocity = -(this.yVelocity);
		this.xPosition += this.xVelocity;
		this.yPosition += this.yVelocity;
	}

	colisionDetect(){

		for(let position in balls){
			if (this !== balls[position]) {
				let distance = Math.sqrt(
					Math.pow(this.xPosition - balls[position].xPosition,2) + 
					Math.pow(this.yPosition - balls[position].yPosition,2)
					);
				if(distance < this.size + balls[position].size){
					this.color = `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
					balls[position].color = `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
				}
			}
		}
	}
}
	
function allBalls (){

	context.clearRect(0, 0, width, height);

	while(balls.length< 20){

		//PARAMETROS DE LAS PELOTAS
		let xVelocity = random(-5,5);//VELOCIDAD X ALEATORIA
		let yVelocity = random(-5,5);//VELOCIDAD Y ALEATORIA
		if(xVelocity == 0 || yVelocity == 0) continue;//QUITAR PELOTAS CON VELOCIDAD NULA
		let size = random(15,30);//TAMAÑO ALEATORIO
		let xPosition = random((0+size),(width-size));//POSICION X ALEATORIA
		let yPosition = random((0+size),(height-size));//POSICION Y ALEATORIA
		let color = `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;//COLOR RGB ALEATORIA

		let ball = new Ball(xPosition,yPosition,xVelocity,yVelocity,color,size);//CREAR LAS PELOTAS
		//CON LOS PARAMETROS
		
		balls.push(ball);//AGREGAR LAS PELOTAS AL CONTENEDOR DE LAS PELOTAS

	}

	balls.forEach((element)=> {
		element.draw();
		element.updateBall();
	});

	requestAnimationFrame(allBalls);
}

allBalls();