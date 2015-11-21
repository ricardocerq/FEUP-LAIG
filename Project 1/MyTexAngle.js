function MyTexAngle(scene, angle){
	CGFobject.call(this,scene);
	this.angle = -angle*Math.PI/180;
	//this.doublesided = doublesided;
	this.topLeftX = 0;
	this.topLeftY = 1;
	this.bottomRightX = 1;
	this.bottomRightY = 0;
	this.ampS = 0;
	this.ampT = 0;
	this.initBuffers();
}

MyTexAngle.prototype = Object.create(CGFobject.prototype);
MyTexAngle.prototype.constructor = MyTexAngle;

MyTexAngle.prototype.initBuffers = function(){

	/*this.vertices = [
	this.topLeftX, this.topLeftY, 0,
	this.topLeftX, this.bottomRightY, 0,
	this.bottomRightX, this.topLeftY, 0,
	this.bottomRightX, this.bottomRightY, 0
	];

	this.indices = [
	0, 1, 2,
	2, 1, 3
	];*/

	this.vertices = [
		this.topLeftX, this.bottomRightY, 0,
		this.bottomRightX, this.bottomRightY, 0,
		this.topLeftX, this.topLeftY, 0,
		this.bottomRightX, this.topLeftY, 0
	];

	this.indices = [
		0, 1, 2,
		2, 1, 3
	];
	this.normals = [
	0, 0, 1,
	0, 0, 1, 
	0, 0, 1, 
	0, 0, 1 
	];
	
	var t1 = [0,1-1];
	var t2 = [1,1-1];
	var t3 = [0,1-0];
	var t4 = [1,1-0];
	this.applyRotation(t1, this.angle);
	this.applyRotation(t2, this.angle);
	this.applyRotation(t3, this.angle);
	this.applyRotation(t4, this.angle);

	this.texCoords = [
		t1[0], 1-t1[1],
		t2[0], 1-t2[1],
		t3[0], 1-t3[1],
		t4[0], 1-t4[1],
	];
	
	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
}

MyTexAngle.prototype.applyRotation = function(coords, angle){
	var dist = Math.sqrt(Math.pow(coords[0],2)+Math.pow(coords[1],2));
	console.log("1 " + dist);
	var initialAngle = Math.atan2(coords[1],coords[0]);
	console.log("2 " + initialAngle);
	console.log("3 " + angle);
	coords[0] = dist*Math.cos(initialAngle + angle);
	coords[1] = dist*Math.sin(initialAngle + angle);
	console.log(coords[0], coords[1]);
}

MyTexAngle.prototype.updateTexCoords = function(ampS, ampT){
	if(this.ampS == ampS && this.ampT == ampT)
    	return;
 	this.ampS = ampS;
  	this.ampT = ampT;
	this.texCoords = [
					0, this.distY/ampT,
					this.distX/ampS, this.distY/ampT ,
					0,0,
					this.distX/ampS,0
					
					];

	this.updateTexCoordsGLBuffers();

}