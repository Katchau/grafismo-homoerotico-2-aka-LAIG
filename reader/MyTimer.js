/* Construtor do cilindro */
function MyTimer(scene) {
    CGFobject.call(this, scene);

    this.scene = scene;
    this.back = new MyRectangle(this.scene, 0, 0, 5, 4);
    this.leftPlane = new MyPlane(this.scene, 1, 2, 10, 10);
    this.rightPlane = new MyPlane(this.scene, 1, 2, 10, 10);
    this.leftNumber = 6;
    this.rightNumber = 0;

    this.clock = new CGFappearance(this.scene);
	  this.clock.setAmbient(1,1,1,0.1);
	  this.clock.setDiffuse(0.5,0.5,0.5,0.1);
	  this.clock.setSpecular(0.5,0.5,0.5,0.1);
	  this.clock.setShininess(100);
    this.clock.loadTexture("scenes//textures//clock.png");

    this.numL = new CGFappearance(this.scene);
	  this.numL.setAmbient(1,1,1,0.1);
	  this.numL.setDiffuse(0.5,0.5,0.5,0.1);
	  this.numL.setSpecular(0.5,0.5,0.5,0.1);
	  this.numL.setShininess(100);

    this.numR = new CGFappearance(this.scene);
	  this.numR.setAmbient(1,1,1,0.1);
	  this.numR.setDiffuse(0.5,0.5,0.5,0.1);
	  this.numR.setSpecular(0.5,0.5,0.5,0.1);
	  this.numR.setShininess(100);

    this.initBuffers();
}
MyTimer.prototype = Object.create(CGFobject.prototype);
MyTimer.prototype.constructor = MyTimer;

/* Inicializa as caracteristicas do cilindro */
MyTimer.prototype.initBuffers = function() {
    var leftNum = "scenes//textures//number" + this.leftNumber + ".jpg";
    var rightNum = "scenes//textures//number" + this.rightNumber + ".jpg";
    console.log(leftNum);
    this.numL.loadTexture(leftNum);
    this.numR.loadTexture(rightNum);
};

MyTimer.prototype.update = function(num){
    var right = num % 10;
    var left = (num - right) / 10;
    this.leftNumber = left;
    this.rightNumber = right;
    this.initBuffers();
};

/* Faz o display das várias componentes do cilindro, nomeadamente body e tampas */
MyTimer.prototype.display = function(){

    this.scene.pushMatrix();
    this.clock.apply();
    this.back.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.numL.apply();
    this.scene.translate(1.5,2,0.1);
    this.scene.rotate(Math.PI,0,0,1);
    this.leftPlane.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.numR.apply();
    this.scene.translate(3.5,2,0.1);
    this.scene.rotate(Math.PI,0,0,1);
    this.rightPlane.display();
    this.scene.popMatrix();
}
