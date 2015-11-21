function MyCircularAnimation(id, scene, center, radius, initialAngle, rotationAngle, time){
	MyAnimation.call(this, id, scene, time);
	this.center = center;
	this.radius = radius;
	this.initialAngle = initialAngle*Math.PI/180;
	this.rotationAngle = rotationAngle*Math.PI/180;
	
}


MyCircularAnimation.prototype = Object.create(MyAnimation.prototype);
 MyCircularAnimation.prototype.constructor = MyCircularAnimation;

MyCircularAnimation.prototype.apply = function(time){
	time = time /1000;
	if(time > this.time)
		return;
	
	var progress = time / this.time;

	var angle = this.initialAngle + this.rotationAngle * progress;


	this.scene.translate(this.center[0], this.center[1], this.center[2]);
	this.scene.rotate(angle, 0, 1, 0);
	this.scene.translate(this.radius, 0, 0);
	//this.scene.translate(-this.center[0], -this.center[1], -this.center[2]);


}