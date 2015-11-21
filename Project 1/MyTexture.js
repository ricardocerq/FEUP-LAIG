function MyTexture(scene, id, path, s, t){
	this.id = id;
	this.path = path;
	this.s = s;
	this.t = t;
	this.scene = scene;
	if(path == null)
		this.texture = null;
	else this.texture = new CGFtexture(scene, path);
}

MyTexture.verifyPath = function(path){
   var http = new XMLHttpRequest();
   http.open('HEAD', path, false);
   http.send();
   if(http.status == 404)
    return false;
	else return true;
}


MyTexture.prototype.apply = function(){
	if(this.texture != null)
		this.texture.bind();
}

MyTexture.prototype.unapply = function(){
	if(this.texture != null)
		this.texture.unbind();
}
