function MyLeaf(parent, element, els, mats, texs, anims, sceneObject, nodes){
	MyNode.call(this, parent, element, els, mats, texs, anims, sceneObject, nodes);
	this.primitive = null;
	this.type = this.element.attributes[1].value;
	this.args = this.element.attributes[2].value;
	if(this.type == "rectangle"){
		this.primitive = new MyRectangle(sceneObject, this.args[0],this.args[1],this.args[2],this.args[3]);
	}
	else if(this.type == "sphere"){
		this.primitive = new MySphere(sceneObject, this.args[0],this.args[1],this.args[2]);
	}
	else if(this.type == "triangle"){
		this.primitive = new MyTriangle(sceneObject, this.args[0],this.args[1],this.args[2], this.args[3],this.args[4],this.args[5], this.args[6],this.args[7],this.args[8]);
	}
	else if(this.type == "cylinder"){
		this.primitive = new MyCylinder(sceneObject, this.args[0],this.args[1],this.args[2],this.args[3],this.args[4]);
	}else if(this.type == "vehicle"){
		this.primitive = new MyVehicle(sceneObject);
	}else  if(this.type == "plane"){
		//this.primitive = new MyPlane(sceneObject, this.args[0], this.args[0]);
		this.primitive = new MyPlane(sceneObject, this.element.attributes[8].value, this.element.attributes[8].value);
	}else if(this.type == "terrain"){
		//this.primitive = new MyTerrain(sceneObject, 100, 100, this.args[0],  this.args[1]);
		this.primitive = new MyTerrain(sceneObject, 100, 100, this.element.attributes[6].value,  this.element.attributes[7].value);
	}else if(this.type == "patch"){
		var controlPoints = [];
		for(var i = 0; i < this.element.children.length; i++){
			var x = this.element.children[i].attributes[0].value;
			var y = this.element.children[i].attributes[1].value;
			var z = this.element.children[i].attributes[2].value;
			controlPoints.push([x,y,z,1]);
		}
		//this.primitive = new MyPatch(sceneObject, this.args[0],this.args[0], this.args[1], this.args[2], controlPoints);
		this.primitive = new MyPatch(sceneObject, this.element.attributes[3].value,this.element.attributes[3].value, this.element.attributes[4].value, this.element.attributes[5].value, controlPoints);
	}
};

MyLeaf.prototype = Object.create(MyNode.prototype);
MyLeaf.prototype.constructor = MyLeaf;	

MyLeaf.prototype.toString = function(n){
	var out = "";

	for(var i = 0; i < n; i++){
		out+= "\t";
	}
	
	out+= "<LEAF id=\"" + this.id + "\"/>"  ;
	return out;
}

