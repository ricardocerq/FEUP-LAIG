function MyIntermediateNode(parent, elementid, els, mats, texs, anims, sceneObject, nodes){
	MyNode.call(this, parent, elementid, els, mats, texs, anims, sceneObject, nodes);
	
	this.assignMaterial(mats);
	this.assignTexture(sceneObject, texs);
	this.assignMatrix();
	this.assignAnimations(anims);
	this.assignDescendants(els, mats, texs, anims, sceneObject, nodes);
};

MyIntermediateNode.prototype = Object.create(MyNode.prototype);
MyIntermediateNode.prototype.constructor = MyIntermediateNode;

MyIntermediateNode.prototype.assignMaterial = function(mats){
	var matnode = this.element.getElements("MATERIAL");

	if(matnode.length == 0)
		return;

	var matID = matnode[0].attributes[0].value;
	this.mat = null;

	if(matID != "null"){
		var found = false;

		for(var i = 0; i < mats.length; i++){
			if(matID == mats[i].id){
				this.mat = mats[i];
				found = true;
				break;
			}
		}
		if(!found){
			console.warn("Could not find material " + matID + " of node " + this.id + ", setting to null.");
		}
	}
}

MyIntermediateNode.prototype.assignTexture = function(sceneObject, texs){
	var texnode = this.element.getElements("TEXTURE");

	if(texnode.length == 0)
		return;

	var texID = texnode[0].attributes[0].value;
	this.tex = null;

	if(texID == "clear"){
		this.tex = new MyTexture(sceneObject, "clear", null, 1, 1);
	}
	else if(texID != "null"){
		for(var i = 0; i < texs.length; i++){
			if(texID == texs[i].id){
				this.tex = texs[i];
				found = true;
				break;
			}
		}
		if(!found){
			console.warn("Could not find texture " + texID + " of node " + this.id + ", setting to null.");
		}
	}
}

MyIntermediateNode.prototype.assignMatrix = function(){
	this.matrix = mat4.create();
	var degToRad = Math.PI / 180;

	for(var i = 0; i < this.element.children.length; i++){
		if(this.element.children[i].name == "TRANSLATION"){
			var x = this.element.children[i].attributes[0].value;
			var y = this.element.children[i].attributes[1].value;
			var z = this.element.children[i].attributes[2].value;
			mat4.translate(this.matrix, this.matrix, vec3.fromValues(x,y,z));
		}
		else if(this.element.children[i].name == "ROTATION"){
			var axis = this.element.children[i].attributes[0].value;
			var angle = this.element.children[i].attributes[1].value;
			if(axis == "x"){
				mat4.rotateX(this.matrix, this.matrix, angle*degToRad);
			}else if(axis == "y"){
				mat4.rotateY(this.matrix, this.matrix, angle*degToRad);
			}else if(axis == "z"){
				mat4.rotateZ(this.matrix, this.matrix, angle*degToRad);
			}
		}
		else if(this.element.children[i].name == "SCALE"){
			var sx = this.element.children[i].attributes[0].value;
			var sy = this.element.children[i].attributes[1].value;
			var sz = this.element.children[i].attributes[2].value;
			mat4.scale(this.matrix, this.matrix, vec3.fromValues(sx,sy,sz));
		}
	}
}
MyIntermediateNode.prototype.assignAnimations = function(anims){
	var animations = [];

	for(var i = 0; i < this.element.children.length; i++){
		if(this.element.children[i].name == "animationref"){
			var id = this.element.children[i].attributes[0].value;
			if(id == "null")
				continue;
			var animation = null;
			for(var j = 0; j < anims.length; j++){
				if(anims[j].id == id)
					animation = anims[j];
			}
			if(animation == null){
				console.warn("Animation " + id + " in node " + this.id + " does not exist, discarding.");
			}else{
				animations.push(animation);
			}
		}
	}
	if(animations.length>0)
		this.animation = new MyAnimationSequence(animations);
}
MyIntermediateNode.prototype.playAnimation = function(time){
	if(this.animation)
		this.animation.apply(time);
}

MyIntermediateNode.prototype.assignDescendants = function(els, mats, texs, anims, sceneObject, nodes){
	var descendants = this.element.getElements("DESCENDANT");

	for(var i = 0; i < descendants.length; i++){
		var found = false;

		for(var j = 0; j < nodes.length; j++){
			if(descendants[i].attributes[0].value == nodes[j].id){
				found = true;
				if(this.verifyCycle(this,descendants[i].attributes[0].value)){
					this.children.push(nodes[j]);
					nodes[j].parent.push(this);
				}
				break;
			}
		}
		if(!found){
			for(var j = 0; j < els.length; j++){
				if(descendants[i].attributes[0].value == els[j].attributes[0].value){
					if(els[j].name == "NODE"){
						if(this.verifyCycle(this,descendants[i].attributes[0].value))
							this.children.push(new MyIntermediateNode(this,descendants[i].attributes[0].value, els, mats, texs, anims, sceneObject, nodes));
					}else {
						this.children.push(new MyLeaf(this,descendants[i].attributes[0].value, els, mats, texs, anims, sceneObject, nodes));
					}
				}
			}
		}
	}
}

//detect a cycle in the graph
//return false if adding a node of id would cause a cycle

MyIntermediateNode.prototype.verifyCycle = function(current, id){
	if(current == null)
		return true;

	if(current.id == id){
		console.warn("Inserting Node " + id + " would cause a cycle, discarding.");
		return false;
	}

	for(var i = 0; i < current.parent.length; i++){
		if(!this.verifyCycle(current.parent[i], id)){
			//console.warn("<<<Inserting Node " + id + " would cause a cycle, discarding.");
			return false;
		}
	}
	return true;
}


MyIntermediateNode.prototype.verifyCycleAux = function(id){
	var current = this;
	
	while (current != null){
		if(current.id == id){
			console.warn("Inserting Node " + id + " would cause a cycle, discarding.");
			return false;
		}
		current = current.parent;
	}
	return true;
}

MyIntermediateNode.prototype.toString = function(n){
	var out = "";

	for(var i = 0; i < n; i++){
		out+= "\t";
	}
	out += "<NODE id=\"" + this.id+"\">";

	for(var i = 0; i < this.children.length; i++){
		out+="\n";
		out+= this.children[i].toString(n+1);
	}
	out+= "\n";

	for(var i = 0; i < n; i++){
		out+= "\t";
	}
	out+= "</NODE>";
	return out;
}


