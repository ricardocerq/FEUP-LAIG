function MyMaterial(scene, id, material){
	this.id = id;
	this.mat = material;
}

MyMaterial.materialFromElement = function(scene, element){
	var mat = new CGFappearance(scene);
	mat.setShininess(element.children[0].attributes[0].value);
	mat.setSpecular (element.children[1].attributes[0].value, element.children[1].attributes[1].value, element.children[1].attributes[2].value, element.children[1].attributes[3].value);
	mat.setDiffuse  (element.children[2].attributes[0].value, element.children[2].attributes[1].value, element.children[2].attributes[2].value, element.children[2].attributes[3].value);
	mat.setAmbient  (element.children[3].attributes[0].value, element.children[3].attributes[1].value, element.children[3].attributes[2].value, element.children[3].attributes[3].value);
	mat.setEmission (element.children[4].attributes[0].value, element.children[4].attributes[1].value, element.children[4].attributes[2].value, element.children[4].attributes[3].value);
	return mat;
}
MyMaterial.prototype.apply = function(){
	if(this.mat != null)
		this.mat.apply();
}
