function MyPlane(scene, uDivs, vDivs){
	CGFobject.call(this,scene);
	//console.warn(uDivs+ vDivs);
	var nurbsSurface = new CGFnurbsSurface(1, 1, [0, 0, 1, 1], [0, 0, 1, 1], 

					[	// U = 0
						[ // V = 0..1;
							 vec4.fromValues ( .5,  0.0, -.5, 1 ),
							 vec4.fromValues ( .5,  0.0,  .5, 1 )
							
						],
						// U = 1
						[ // V = 0..1
							 vec4.fromValues ( -.5,  0.0, -.5, 1 ),
							 vec4.fromValues ( -.5,  0.0,  .5, 1 )							 
						]
					]);
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.plane = new CGFnurbsObject(scene, getSurfacePoint, uDivs, vDivs);
	//this.initBuffers();
	this.vertices = [];
	this.normals = [];
	this.indices= [];
	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyPlane.prototype = Object.create(CGFobject.prototype);
MyPlane.prototype.constructor = MyPlane;


MyPlane.prototype.display = function(){
	//this.scene.pushMatrix();
		//this.scene.rotate(-Math.PI/2, 1, 0, 0);
		//this.scene.scale( 10,5, 3);
	this.plane.display();
	//this.scene.popMatrix();
};

MyPlane.prototype.updateTexCoords = function(ampS, ampT){
};


