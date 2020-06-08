const canvas = document.querySelector('canvas');
//SE DEFINE EL CONTEXTO DONDE SE VA A DIBUJAR EN EL CANVAS
const context = canvas.getContext("2d");
//SE DEFINE UN CONTENEDOR PARA LAS PELOTAS
const balls = new Array();
//SE ASIGNA EL ANCHO Y LARGO DE LA PANTALLA AL CANVAS Y SE DEFINEN DOS VARIABLES CON EL MISMO
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//GENERAR UN NUMERO ALEATORIO ENTRE DOS NUMEROS DADOS
function random (min,max){
	const num = Math.floor(Math.random()*(max-min))+min;
	return num;
}

//CREACION DEL CONSTRUCTOR DE LAS PELOTAS
function Ball(xPosition, yPosition, xVelocity, yVelocity, color, size){
	this.x = xPosition;
	this.y = yPosition;
	this.xVel = xVelocity;
	this.yVel = yVelocity;
	this.color = color;
	this.size = size;
}

//METODO DE DIBUJADO PARA LAS PELOTAS
Ball.prototype.draw = function(){

	context.beginPath();//METODO beginPath PARA DEFINIR QUE SE VA A COMENZAR A DIBUJAR ALGO EN EL CANVAS
	
	context.fillStyle = this.color;//SE DEFINE EL COLOR DE LA FORMA
	
	context.arc(this.x, this.y, this.size, 0, 2*Math.PI);//EL METODO arc ES PARA DIBUJAR UN ARCO
	//SUS PARAMETROS SON |POSICION X|POSICION Y|RADIO|COMIENZO DEL ARCO|FINAL DEL ARCO
	context.fill();//EL METODO fill RELLENA EL AREA DE LA CURVA ESPECIFICADA

}

//METODO DE DETECCION DE LAS COLISIONES DE LAS PELOTAS
Ball.prototype.colisionDetect = function (){
	for(i in balls){
		//SE COMPRUEBA QUE LA PELOTA QUE ESTA INSTANCIADA NO SEA LA MISMA QUE ESTA EN EL BUCLE
		if(this !== balls[i]){

			//SE CALCULA LA DISTANCIA ENTRE LOS DOS CENTROS DE LAS PELOTAS
			let distance = Math.sqrt(Math.pow(this.x - balls[i].x,2)+Math.pow(this.y - balls[i].y,2));

			//SE VALIDA SI ESTAN SUPERPUESTAS Y SE LES CAMBIA EL COLOR A LAS 2 PELOTAS
			//Y SE LAS LANZA DISPARADAS SI SE SUPERPONEN
			if(distance<(this.size + balls[i].size)+2){
				if(distance<this.size + balls[i].size){

					this.x += this.xVel = random(-10,10);
					this.y += this.yVel = random(-10,10);
					
					balls[i].x += balls[i].xVel = -(balls[i].xVel);
					balls[i].y += balls[i].yVel = -(balls[i].yVel);
				}else{

					this.x += this.xVel = random(-10,10);
					this.y += this.yVel = random(-10,10);

					balls[i].x += balls[i].xVel = -(balls[i].xVel);
					balls[i].y += balls[i].yVel = -(balls[i].yVel);					
				}
				this.color = `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
				balls[i].color = `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
			}
		}
	}
}
//METODO DE ACTUALIZACION DE LAS PELOTAS
Ball.prototype.updateBall = function(){

	//INVOCACION DEL METODO DE COLISIONES
	this.colisionDetect();

	if((this.x + this.size) >= width-5) {this.xVel = -(this.xVel);}//CAMBIA LA DIRECCION DE LA PELOTA
	//CUANDO CHOCA CONTRA EL BORDE DERECHO DE LA PANTALLA

	if((this.x - this.size) <= 5) {this.xVel = -(this.xVel);}//CAMBIA LA DIRECCION DE LA PELOTA
	//CUANDO CHOCA CONTRA EL BORDE IZQUIERDO DE LA PANTALLA
	
	if((this.y + this.size) >= height-5) {this.yVel = -(this.yVel);}//CAMBIA LA DIRECCION DE LA PELOTA
	//CUANDO CHOCA CONTRA EL BORDE INFERIOR DE LA PANTALLA

	if((this.y - this.size) <= 5) {this.yVel = -(this.yVel);}//CAMBIA LA DIRECCION DE LA PELOTA
	//CUANDO CHOCA CONTRA EL BORDE SUPERIOR DE LA PANTALLA

	//ACTUALIZACION DE LAS POSICION DE LA PELOTA EN BASE A SU VELOCIDAD
	this.x += this.xVel;
	this.y += this.yVel;
}

//FUNCION PARA CREAR Y ACTUALIZAR VARIAS PELOTAS
function allBalls (){

	//LIMPIAR EL CANVAS
	context.fillStyle = 'rgba(0, 0, 0, 0.25)';
	context.fillRect(0, 0, width, height);
	
	while(balls.length < 20){

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

	//INVOCAR Y ACTUALIZAR LAS PELOTAS
	for(ball in balls){
		balls[ball].draw();
		balls[ball].updateBall();
	}

	requestAnimationFrame(allBalls);
}

allBalls();