/**
 * MySphere
 * @constructor
 */
 function MySphere(scene, radius, slices, stacks) {
 	CGFobject.call(this,scene);
 	this.radius = radius;
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MySphere.prototype = Object.create(CGFobject.prototype);
 MySphere.prototype.constructor = MySphere;

 MySphere.prototype.initBuffers = function() {

	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
	

	var r = this.radius;
	var height = 1;
	var delta_long = 2*Math.PI/this.slices;
	var delta_lat = Math.PI/this.stacks;
	var acc = 0;
	var index = 0;

	for(var i = 0; i <= this.stacks; i++){
		for(var j= 0; j <= this.slices; j++){
			var teta = Math.PI-i*delta_lat;
			this.vertices.push(
			r * Math.sin(teta) * Math.cos(j*delta_long),
			r * Math.sin(teta) * Math.sin(j*delta_long),	
			r * Math.cos(teta)
			);
			this.normals.push(
				Math.sin(teta) * Math.cos(j*delta_long),
				Math.sin(teta) * Math.sin(j*delta_long),	
				Math.cos(teta)
			);
			this.texCoords.push(
				j/this.slices,
				1 - i/this.stacks
			);
			index++;
		}
	}
	for(var i = 0; i < this.stacks; i++){
		for(var j = 0; j < this.slices; j++){
			this.indices.push(
				i*(this.slices+1)+j,
				i*(this.slices+1)+(j+1),
				(i+1)*(this.slices+1)+(j+1)
			);
			this.indices.push(
				(i+1)*(this.slices+1)+(j+1),
				(i+1)*(this.slices+1)+j,
				i*(this.slices+1)+j
				);
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 MySphere.prototype.updateTexCoords = function(ampS, ampT){}