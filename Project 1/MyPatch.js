function MyPatch(scene, orderu, orderv, uDivs, vDivs, controlPoints){
	CGFobject.call(this,scene);
	if(controlPoints.length != (orderu+1) * (orderv + 1)){
		console.warn("Incorrect number of Control Points!");
		this.patch = null;
	}
	else{
		var knotsu = this.getKnots(orderu);
		var knotsv = this.getKnots(orderv);
		var sepControlPoints = [];
		for(var i = 0; i < orderu + 1; i++){
			var control = [];
			for(var j = 0; j < orderv + 1; j++){
				control.push(controlPoints.shift());
			}
			sepControlPoints.push(control);
		}
		var nurbsSurface = new CGFnurbsSurface(orderu, orderv, knotsu, knotsv, sepControlPoints);
		getSurfacePoint = function(u, v) {
			return nurbsSurface.getPoint(u, v);
		};
		this.patch = new CGFnurbsObject(scene, getSurfacePoint, uDivs, vDivs);
	}
}



MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor = MyPatch;

MyPatch.prototype.display = function(){
	if(this.patch)
		this.patch.display();
}

MyPatch.prototype.getKnots = function(order){
	if(order == 1)
		return [0, 0, 1, 1];
	if(order == 2)
		return [0,0,0,1,1,1];
	if(order == 3)
		return [0,0,0,0,1,1,1,1];
	return [];
}


MyPatch.prototype.updateTexCoords = function(ampS, ampT){
	
}