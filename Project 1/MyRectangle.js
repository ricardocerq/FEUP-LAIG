function MyRectangle(scene, topLeftX, topLeftY, bottomRightX, bottomRightY){
	CGFobject.call(this,scene);

	this.topLeftX = topLeftX;
	this.topLeftY = topLeftY;
	this.bottomRightX = bottomRightX;
	this.bottomRightY = bottomRightY;
	this.ampS = 0;
	this.ampT = 0;

	this.initBuffers();
}

MyRectangle.prototype = Object.create(CGFobject.prototype);
MyRectangle.prototype.constructor = MyRectangle;

MyRectangle.prototype.initBuffers = function(){
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

	this.distX = Math.abs(this.bottomRightX-this.topLeftX);
	this.distY = Math.abs(this.topLeftY - this.bottomRightY);
	
	this.normals = [
	0, 0, 1,
	0, 0, 1, 
	0, 0, 1, 
	0, 0, 1 
	];

	this.updateTexCoords(1,1);

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
}

MyRectangle.prototype.updateTexCoords = function(ampS, ampT){
	if(this.ampS == ampS && this.ampT == ampT) 
    	return;

 	this.ampS = ampS;
  	this.ampT = ampT;
	this.texCoords = [0, this.distY/ampT,
					this.distX/ampS, this.distY/ampT ,
					0,0,
					this.distX/ampS,0
					];
	this.updateTexCoordsGLBuffers();
}