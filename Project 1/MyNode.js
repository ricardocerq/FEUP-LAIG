function MyNode(parent, elementid, els, mats, texs, anims, sceneObject, nodes){
	this.children = [];
	this.id = elementid;
	this.element = null;
	this.parent = [parent];

	for(var i = 0; i < els.length; i++){
		if(elementid == els[i].attributes[0].value){
			this.element = els[i];
		}
	}
	nodes.push(this);
}

MyNode.prototype.toString = function(n){
	return "Generic Node";
}