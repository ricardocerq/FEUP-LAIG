function MyVehicle(scene){
	CGFobject.call(this, scene);
	this.flag = new MyPatch(this.scene, 3, 3, 100, 100,  
							[
							 vec4.fromValues ( -1.0, -1.0, 1, 1 ),
							 vec4.fromValues ( -1.0, -0.5, 1, 1 ),
							 vec4.fromValues ( -1.0,  0.5, 1, 1 ),
							 vec4.fromValues ( -1.0,  1.0, 1, 1 ),
			
							 vec4.fromValues ( -0.5, -1.0, -1, 1 ),
							 vec4.fromValues ( -0.5, -0.5, -1, 1 ),
							 vec4.fromValues ( -0.5,  0.5, -1, 1 ),
							 vec4.fromValues ( -0.5,  1.0, -1, 1 ),
						
							 vec4.fromValues (  0.5, -1.0, 1, 1 ),
							 vec4.fromValues (  0.5, -0.5, 1, 1 ),
							 vec4.fromValues (  0.5,  0.5, 1, 1 ),
							 vec4.fromValues (  0.5,  1.0, 1, 1 ),
 
							 vec4.fromValues (  1.0, -1.0, -1, 1 ),
							 vec4.fromValues (  1.0, -0.5, -1, 1 ),
							 vec4.fromValues (  1.0,  0.5, -1, 1 ),
							 vec4.fromValues (  1.0,  1.0, -1, 1 )
							 
							]);

	this.patch = new MyPatch(this.scene, 3, 3, 100, 100,  
							[
							 vec4.fromValues ( -1.0, -1.0*.75, -1, 1 ),
							 vec4.fromValues ( -1.0, -0.5*.75, -1, 1 ),
							 vec4.fromValues ( -1.0,  0.5*.75, -1, 1 ),
							 vec4.fromValues ( -1.0,  1.0*.75, -1, 1 ),
			
							 vec4.fromValues ( -0.5, -1.0*.75,  0, 1 ),
							 vec4.fromValues ( -0.5, -0.5*.75,  0, 1 ),
							 vec4.fromValues ( -0.5,  0.5*.75,  0, 1 ),
							 vec4.fromValues ( -0.5,  1.0*.75,  0, 1 ),
						
							 vec4.fromValues (  0.5, -1.0*.75,  0, 1 ),
							 vec4.fromValues (  0.5, -0.5*.75,  0, 1 ),
							 vec4.fromValues (  0.5,  0.5*.75,  0, 1 ),
							 vec4.fromValues (  0.5,  1.0*.75, 0, 1 ),
 
							 vec4.fromValues (  1.0, -1.0*.75, -1, 1 ),
							 vec4.fromValues (  1.0, -0.5*.75, -1, 1 ),
							 vec4.fromValues (  1.0,  0.5*.75, -1, 1 ),
							 vec4.fromValues (  1.0,  1.0*.75, -1, 1 )
							 
							]);
	this.pole = new MyCylinder(this.scene, 1.5, .05, .05, 2, 64);
	//this.bot = new MyCylinder(this.scene, .25, 1, 0, 2, 32);
	this.sphere = new MySphere(this.scene, 1, 64, 64);
	//(scene, height,bottomRad,topRad, stacks, slices)

	this.flagtexture = new CGFtexture(scene, "textures/space_pirates.jpg");
	this.flagmat = new CGFappearance(scene);
	this.flagmat.setAmbient(0.3, 0.3, 0.3, 1);
	this.flagmat.setDiffuse(0.7, 0.7, 0.7, 1);
	this.flagmat.setSpecular(0.0, 0.0, 0.0, 1);	
	this.flagmat.setShininess(120);
	this.flagmat.setTexture(this.flagtexture);
	this.flagmat.setTextureWrap ('REPEAT', 'REPEAT');


	this.cockpitmat = new CGFappearance(scene);
	this.cockpitmat.setAmbient(0.3, 0.3, 0.3, 1);
	this.cockpitmat.setDiffuse(0.5, 0.5, .25, 1);
	this.cockpitmat.setSpecular(1.0, 1.0, 1.0, 1);
	this.cockpitmat.setEmission(.5, .5, 0.125, 1);
	this.cockpitmat.setShininess(120);

	this.chassismat = new CGFappearance(scene);
	this.chassismat.setAmbient(0.1, 0.1, 0.1, 1);
	this.chassismat.setDiffuse(0.2, 0.2, 0.2, 1);
	this.chassismat.setSpecular(.5, 0.5, 0.5, 1);	
	this.chassismat.setShininess(120);
	this.initBuffers();
	this.calcAnimation();

}

MyVehicle.prototype.initBuffers = function(){

	this.primitiveType = this.scene.gl.TRIANGLES;
	//this.initGLBuffers();
}
MyVehicle.prototype.calcAnimation = function(){
	var frames = 30;
	for(var t = 0; t < frames; t++){
		
	}
}

MyVehicle.prototype.display = function(){
	//this.patch.display();
	this.scene.pushMatrix();
	this.scene.scale(0.5, 0.5, 0.5);
	this.scene.translate(0, 1.5, 0);
	this.scene.pushMatrix();
		this.scene.translate(0, 1.5, 0);
		this.scene.scale(.05, .05, .05);
		this.chassismat.apply();
		this.sphere.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.chassismat.apply();
		this.pole.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
			//this.scene.translate(0, 1, 0);
		this.scene.rotate(5*Math.PI/4, 0,1,0);
		this.scene.translate(0, 1, 0);
		this.scene.scale(.5, -.5, .5);
		this.scene.translate(-1, 0, 1);
		this.flagmat.apply();
		this.flagtexture.bind(1);
		this.flag.display();
		this.scene.pushMatrix();
			this.scene.scale(-1, 1, -1);
			this.flag.display();
		this.scene.popMatrix();
	this.scene.popMatrix();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.scale(1,.225,1);
		this.chassismat.apply();
		this.sphere.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
		this.scene.translate(0, .25, 0);
		this.scene.scale(.5,.5,.5);
		this.cockpitmat.apply();
		this.sphere.display();
	this.scene.popMatrix();
}


MyVehicle.prototype.updateTexCoords = function(ampS, ampT){
	
}