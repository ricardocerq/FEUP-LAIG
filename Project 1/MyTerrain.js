function MyTerrain(scene, uDivs, vDivs, colorMap, heightmap){
	CGFobject.call(this, scene);
	
	//this.plane = new MyPlane(scene, uDivs, vDivs);
	
	this.appearance = new CGFappearance(scene);
	this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
	this.appearance.setSpecular(0.0, 0.0, 0.0, 1);	
	this.appearance.setShininess(120);
	
	this.defaultTexture = new CGFtexture(scene, "textures/glass.png");
	this.appearance.setTexture(this.defaultTexture);
	this.appearance.setTextureWrap ('REPEAT', 'REPEAT');

	this.shader = new CGFshader(scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");

	this.plane = new MyPlane(scene, uDivs, vDivs);
	this.shader.setUniformsValues({uSampler2: 2});
	this.shader.setUniformsValues({uSampler:  1});
	this.shader.setUniformsValues({normScale: 1});

	this.colorTexture = new CGFtexture(scene, colorMap);
	this.heightTexture = new CGFtexture(scene, heightmap);
}



MyTerrain.prototype = Object.create(CGFobject.prototype);
MyTerrain.prototype.constructor = MyTerrain;

MyTerrain.prototype.display = function(){
	this.appearance.apply();
	this.scene.setActiveShader(this.shader);
	this.colorTexture.bind(1);
	this.heightTexture.bind(2);
	this.plane.display();
	this.heightTexture.unbind();
	this.colorTexture.unbind();
	this.scene.setActiveShader(this.scene.defaultShader);
	//this.scene.popMatrix();
}

MyTerrain.prototype.updateTexCoords = function(ampS, ampT){
	
}