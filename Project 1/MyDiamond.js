function MyDiamond(scene,  slices) {
 	CGFobject.call(this,scene);

	this.slices=slices;
	/*this.tris = [];
	var delta_rad = Math.PI*2/this.slices;
	for(var j = 0; j <= slices; j++){
		this.tris.push(new MyTriangle(scene, 0,1,0, .5*Math.cos(j*delta_rad), 0, .5*Math.sin(j*delta_rad),.5*Math.cos((j+1)*delta_rad), 0, .5*Math.sin((j+1)*delta_rad) ));
	}
	for(var j = 0; j <= slices; j++){
		this.tris.push(new MyTriangle(scene, 0,-1,0,.5*Math.cos((j+1)*delta_rad), 0, .5*Math.sin((j+1)*delta_rad), .5*Math.cos(j*delta_rad), 0, .5*Math.sin(j*delta_rad) ));
	}*/

 	this.initBuffers();
 };

 MyDiamond.prototype = Object.create(CGFobject.prototype);
 MyDiamond.prototype.constructor = MyDiamond;

 /*MyDiamond.prototype.display = function(){
 	for(var i = 0; i < this.tris; i++){
 		this.tris[i].display();
 	}
 }*/

 MyDiamond.prototype.initBuffers = function() {
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	var indice = 0;
	var delta_rad = Math.PI*2/this.slices;
		for(var j= 0; j <= this.slices; j++){
			this.vertices.push(0,1,0);
			this.vertices.push(.5*Math.cos(j*delta_rad), 0, .5*Math.sin(j*delta_rad));
			this.vertices.push(.5*Math.cos((j+1)*delta_rad), 0, .5*Math.sin((j+1)*delta_rad));

			var p1 = vec3.fromValues(0,1,0);
			var p2 = vec3.fromValues(.5*Math.cos(j*delta_rad), 0, .5*Math.sin(j*delta_rad));
			var p3 = vec3.fromValues(.5*Math.cos((j+1)*delta_rad), 0, .5*Math.sin((j+1)*delta_rad));

			vec3.subtract(p2, p2, p1);
			vec3.subtract(p3, p3, p1);
			vec3.cross(p1, p3,p2);
			vec3.normalize(p1, p1);
			this.normals.push(p1[0], p1[1], p1[2]);
			this.normals.push(p1[0], p1[1], p1[2]);
			this.normals.push(p1[0], p1[1], p1[2]);


			//console.log(indice);
			this.indices.push(indice, indice + 2, indice + 1);
			indice+=3;

			//console.log("Pushed vertex index " + acc++);
		}
		for(var j= 0; j <= this.slices; j++){
			this.vertices.push(0,-1,0);
			this.vertices.push(.5*Math.cos(j*delta_rad), 0, .5*Math.sin(j*delta_rad));
			this.vertices.push(.5*Math.cos((j+1)*delta_rad), 0, .5*Math.sin((j+1)*delta_rad));

			var p1 = vec3.fromValues(0,-1,0);
			var p2 = vec3.fromValues(.5*Math.cos(j*delta_rad), 0, .5*Math.sin(j*delta_rad));
			var p3 = vec3.fromValues(.5*Math.cos((j+1)*delta_rad), 0, .5*Math.sin((j+1)*delta_rad));

			vec3.subtract(p2, p2, p1);
			vec3.subtract(p3, p3, p1);
			vec3.cross(p1, p2,p3);
			vec3.normalize(p1, p1);
			this.normals.push(p1[0], p1[1], p1[2]);
			this.normals.push(p1[0], p1[1], p1[2]);
			this.normals.push(p1[0], p1[1], p1[2]);


			//console.log(indice);
			this.indices.push(indice, indice + 1, indice + 2);
			indice+=3;

			//console.log("Pushed vertex index " + acc++);
		}
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
MyDiamond.prototype.updateTexCoords = function(ampS, ampT){}