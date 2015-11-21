
function XMLscene(interface) {
    CGFscene.call(this);
    this.interface = interface;
};

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();
    this.enableTextures(true);
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

	this.gl.enable(this.gl.BLEND);
	this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
	
	this.axis=new CGFaxis(this);
	this.materialStack = [];
	this.textureStack = [];

	this.initialTransform = mat4.create();
	this.lightsON = [false,false,false,false,false,false,false,false];
	var defaultMaterial = new CGFappearance(this);
	defaultMaterial.setShininess(100);
	defaultMaterial.setSpecular (.1,.1,.1,1);
	defaultMaterial.setDiffuse  (.1,.1,.1,1);
	defaultMaterial.setAmbient  (.1,.1,.1,1);
	defaultMaterial.setEmission (.1,.1,.1,1);
	this.defaultMaterial = defaultMaterial;
	this.materialStack.push(new MyMaterial(this, "default", defaultMaterial));
	this.textureStack.push(new MyTexture(this,"default", null, 1, 1));
	this.setUpdatePeriod(10);
	this.startTime = 0;
	this.elapsedTime = 0;
	/*this.anim1 = new MyAnimationSequence([
											
											new MyLinearAnimation(this, [[0,0,0],[0,.25,0], [0,0,0],[0,.25,0],[0,0,0],[0,.25,0],[0,0,0],[0,.25,0],[0,0,0]], 10),
											new MyLinearAnimation(this, [[0,0,0],[0,5,0],[5,5,0]], 2.5),
											new MyCircularAnimation(this, [5,5,10/Math.PI], 10/Math.PI, 90, -180, 2.5),
											new MyLinearAnimation(this, [[5,5,2*10/Math.PI],[-5,5,2*10/Math.PI]], 2.5),
											new MyCircularAnimation(this, [-5,5,10/Math.PI], 10/Math.PI, -90, -180, 2.5),
											new MyLinearAnimation(this, [[-5,5,0],[0,5,0],[0,0,0]], 2.5),
										]
											);*/
	//MyCircularAnimation(scene, center, radius, initialAngle, rotationAngle, time)
	/*var test = [];
	for(var x = -1; x <= 1; x++){
		//for(var y = -1; y <= 1; y++){
			for(var z = -1; z <= 1; z++){
				test.push([0,0,0]);
				test.push([5*x,0,5*z]);
			}
		//}
	}
	test.push([0,0,0]);
	this.anim1 = new MyLinearAnimation(this, test, 10);*/
	//this.anim1 = new MyLinearAnimation(this, [[0, 0, 0], [2, 0, 0], [0, 0, 2], [-2, 0, 0], [0, 0, -2]], 10);
	//this.anim1 = new MyCircularAnimation(this, [5,5,5], 1, 0, -36000, 100);

	//this.anim1 = new MyAnimationSequence([new MyLinearAnimation(this, [[0,0,0],[0,5,0]], 10), new MyLinearAnimation(this, [[0,5,0],[0,0,0]], 10)]);
	/*this.cone = new MyCylinder(this, 1, .5 ,0, 10, 24);
	this.plane = new MyPlane(this, 10, 10);*/
	/*var nurbsSurface = new CGFnurbsSurface(1, 1, [0, 0, 1, 1], [0, 0, 1, 1], 

					[	// U = 0
						[ // V = 0..1;
							 vec4.fromValues ( -1.0,  0.0, 1.0, 1 ),
							 vec4.fromValues ( -1.0,  0.0,  -1.0, 1 )
							
						],
						// U = 1
						[ // V = 0..1
							 vec4.fromValues ( 1.0, 0.0, 1.0, 1 ),
							 vec4.fromValues ( 1.0, 0.0, -1.0, 1 )							 
						]
					]);
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.plane = new CGFnurbsObject(this, getSurfacePoint, 10, 10);*/
	//this.plane = new MyPlane(this, 10, 10);
	/*this.patch =  new MyPatch(this, 3, 3, 100, 100,  
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
							 
							]);*/

	this.patch =  new MyPatch(this, 2, 2, 100, 100,  
							[
							 vec4.fromValues ( -1.5, -1.5, 0, 1 ),
							 vec4.fromValues ( -2.0, -2.0, 2, 1 ),
							 vec4.fromValues ( -1.5,  1.5, 0, 1 ),
							 
			
							 vec4.fromValues (    0,    0, 3, 1 ),
							 vec4.fromValues (    0,    2, 3, 1 ),
							 vec4.fromValues (    0,    0, 3, 1 ),
							 
						
							  vec4.fromValues ( 1.5, -1.5, 0, 1 ),
							  vec4.fromValues ( 2.0, -2.0, 2, 1 ),
							  vec4.fromValues ( 1.5,  1.5, 0, 1 )
							
							 
							 
							]);

	this.terrain = new MyTerrain(this, 150, 150, "textures/terceira_color.jpg", "textures/terceira_height.jpg");
	this.vehicle = new MyVehicle(this);
	/*this.appearance = new CGFappearance(this);
	this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
	this.appearance.setSpecular(0.0, 0.0, 0.0, 1);	
	this.appearance.setShininess(120);
	this.texture = new CGFtexture(this, "textures/texture.jpg");
	this.appearance.setTexture(this.texture);
	this.appearance.setTextureWrap ('REPEAT', 'REPEAT');

	this.shader= new CGFshader(this.gl, "shaders/texture2.vert", "shaders/texture2.frag");*/

	
	//this.shader.setUniformsValues({uSampler2: 1});
	//this.plane2 = new MyRectangle(this, -1, 1, 1, -1);
};

XMLscene.prototype.update = function (currTime) {
	if(this.startTime == 0)
		this.startTime = currTime;
	this.elapsedTime = currTime - this.startTime;
};

XMLscene.prototype.initLights = function () {
};

XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};



// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop

XMLscene.prototype.onGraphLoaded = function () 
{
	this.setupInitials();
	this.setupLights();
};

XMLscene.prototype.setupInitials = function(){
	var ambr = this.graph.sceneMyElements.children[1].children[0].attributes[0].value;
	var ambg = this.graph.sceneMyElements.children[1].children[0].attributes[1].value;
	var ambb = this.graph.sceneMyElements.children[1].children[0].attributes[2].value;
	var amba = this.graph.sceneMyElements.children[1].children[0].attributes[3].value;

	this.setGlobalAmbientLight(ambr, ambg, ambb, amba);

	var br = this.graph.sceneMyElements.children[1].children[1].attributes[0].value;
	var bg = this.graph.sceneMyElements.children[1].children[1].attributes[1].value;
	var bb = this.graph.sceneMyElements.children[1].children[1].attributes[2].value;
	var ba = this.graph.sceneMyElements.children[1].children[1].attributes[3].value;
	
	this.gl.clearColor(br, bg, bb, ba);
	

	var frustumnear = this.graph.sceneMyElements.children[0].children[0].attributes[0].value;
	var frustumfar = this.graph.sceneMyElements.children[0].children[0].attributes[1].value;
	this.camera.near = frustumnear;
	this.camera.far = frustumfar;

    var degToRad = Math.PI / 180;
    var trans = [this.graph.sceneMyElements.children[0].children[1],
    			this.graph.sceneMyElements.children[0].children[2],
    			this.graph.sceneMyElements.children[0].children[3],
    			this.graph.sceneMyElements.children[0].children[4],
    			this.graph.sceneMyElements.children[0].children[5]];

    for(var i = 0; i < trans.length; i++){
		if(trans[i].name == "translation"){
			var x = trans[i].attributes[0].value;
			var y = trans[i].attributes[1].value;
			var z = trans[i].attributes[2].value;
			mat4.translate(this.initialTransform, this.initialTransform, vec3.fromValues(x,y,z));
		}
		else if(trans[i].name == "rotation"){
			var axis = trans[i].attributes[0].value;
			var angle = trans[i].attributes[1].value;
			if(axis == "x"){
				mat4.rotateX(this.initialTransform, this.initialTransform, angle*degToRad);
			}else if(axis == "y"){
				mat4.rotateY(this.initialTransform, this.initialTransform, angle*degToRad);
			}else if(axis == "z"){
				mat4.rotateZ(this.initialTransform,this.initialTransform, angle*degToRad);
			}
		}
		else if(trans[i].name == "scale"){
			var sx = trans[i].attributes[0].value;
			var sy = trans[i].attributes[1].value;
			var sz = trans[i].attributes[2].value;
			mat4.scale(this.initialTransform, this.initialTransform, vec3.fromValues(sx,sy,sz));
		}
	}
	this.reflength = this.graph.sceneMyElements.children[0].children[6].attributes[0].value;
	this.axis = new CGFaxis(this, this.reflength, .2);
}
XMLscene.prototype.setupLights = function(){
	var lites = this.graph.sceneMyElements.children[2].children;
	if(lites.length > 8)
		console.warn("Scene has more than 8 lights");
	

	for(var i = 0; i < lites.length && i < 8; i++){
		var enable = lites[i].children[0].attributes[0].value;
		if(enable){
			this.lights[i].enable();
			this.lightsON[i] = true;
		}
		else {
			this.lights[i].disable();
			this.lightsON[i] = false;
		}
		var p = [
			lites[i].children[1].attributes[0].value,
			lites[i].children[1].attributes[1].value,
			lites[i].children[1].attributes[2].value,
			lites[i].children[1].attributes[3].value
				];
		var a = [
			lites[i].children[2].attributes[0].value,
			lites[i].children[2].attributes[1].value,
			lites[i].children[2].attributes[2].value,
			lites[i].children[2].attributes[3].value
				];
		var d = [
			lites[i].children[3].attributes[0].value,
			lites[i].children[3].attributes[1].value,
			lites[i].children[3].attributes[2].value,
			lites[i].children[3].attributes[3].value
				];
		var s = [
			lites[i].children[4].attributes[0].value,
			lites[i].children[4].attributes[1].value,
			lites[i].children[4].attributes[2].value,
			lites[i].children[4].attributes[3].value
				];

		this.lights[i].setPosition(p[0], p[1], p[2], p[3]);
    	this.lights[i].setAmbient(a[0], a[1], a[2], a[3]);
    	this.lights[i].setDiffuse(d[0], d[1], d[2], d[3]);
   		this.lights[i].setSpecular(s[0], s[1], s[2], s[3]);
    	this.lights[i].setVisible(true);
    	this.lights[i].update();
    	//this.interface.lightGroup.add(this, i, this.lightsON[i]);
    	this.interface.addLightController(i, lites[i].attributes[0].value);
	}
	
}


XMLscene.prototype.displayGraph = function(){
	this.pushMatrix();

		this.multMatrix(this.initialTransform);
		this.updateLights();
		this.displayGraphAux(this.graph.rootNode);

	this.popMatrix();
};

XMLscene.prototype.displayGraphAux = function(node){
	if(node instanceof MyIntermediateNode){
		this.pushMatrix();

			node.playAnimation(this.elapsedTime);
			this.multMatrix(node.matrix);

			if(node.mat != null)
				this.materialStack.push(node.mat);

			if(node.tex != null)
				this.textureStack.push(node.tex);

			for(var i = 0; i < node.children.length; i++){
				this.displayGraphAux(node.children[i]);
			}

			if(node.tex != null)
				this.textureStack.pop();

			if(node.mat != null)
				this.materialStack.pop();

		this.popMatrix();
	}else{
		//this.terrain.display();
		if(node.id == "plane")
			var breakpoint;
		this.materialStack[this.materialStack.length - 1].apply();
		this.textureStack[this.textureStack.length - 1].apply();
		if(node.primitive.updateTexCoords)
		node.primitive.updateTexCoords(this.textureStack[this.textureStack.length - 1].s, this.textureStack[this.textureStack.length - 1].t);
		node.primitive.display();
		this.textureStack[this.textureStack.length - 1].unapply();
	}
};

XMLscene.prototype.updateLights = function(node){
	for(var i = 0; i < this.lightsON.length; i++){
		if(this.lightsON[i])
			this.lights[i].enable();
		else this.lights[i].disable();
		this.lights[i].update();
	}
}
XMLscene.prototype.display = function () {
	
	
	// Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
    this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Draw axis
	if(this.reflength != 0)
		this.axis.display();

	// ---- END Background, camera and axis setup

	// it is important that things depending on the proper loading of the graph
	// only get executed after the graph has loaded correctly.
	// This is one possible way to do it
	if (this.graph.loadedOk)
	{

		//this.defaultMaterial.apply();
		//this.plane.display();
		/*this.patch.display();
		this.scale(-1,1,-1);
		this.patch.display();
		this.scale(-1,1,-1);*/


		//this.setActiveShader(this.shader);
		//this.pushMatrix();

	    //this.texture.bind(1);
		/*this.pushMatrix();
		this.translate(0, -11, 0);
		this.scale(50, 25, 50);
		this.terrain.display();
		this.popMatrix();
		this.pushMatrix();
		this.anim1.apply(this.elapsedTime);
		this.vehicle.display();
		
		//this.cone.display();
		this.popMatrix();*/
		//this.setActiveShader(this.defaultShader);

		//this.popMatrix();
		//this.scale(10, 10, 10);
		//this.plane.display();
		this.displayGraph(this.graph.sceneNodes);

		//this.terrain.display();
		//this.vehicle.updateTexCoords(1,1);
		//this.vehicle.display();
		//this.scale(10,10,10);
		//this.plane.display();
		//this.patch.display();
	};	

};
