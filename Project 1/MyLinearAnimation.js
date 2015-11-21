function MyLinearAnimation(id, scene, points, time){
	MyAnimation.call(this, id, scene, time);
	this.points = points;

	this.totalDistance = 0;
	var i = 0;
	this.distances = [0];
	for(; i < points.length-1; i++){
		this.totalDistance += vec3.distance(vec3.fromValues(points[i][0],points[i][1],points[i][2]), vec3.fromValues(points[i+1][0],points[i+1][1],points[i+1][2]));
		this.distances.push(this.totalDistance);
	}
	this.speed = this.totalDistance / this.time;
	this.previousangle = 0;
} 

MyLinearAnimation.prototype = Object.create(MyAnimation.prototype);
MyLinearAnimation.prototype.constructor = MyLinearAnimation;

// time is D absolute time since D beginning of the program
MyLinearAnimation.prototype.apply = function( time){
	time = time /1000;
	if(time > this.time)
		return;
	
	var currentDist =  this.speed * time;

	var currentMove = 0;
	for(; currentMove < this.distances.length; currentMove++){
		if(this.distances[currentMove] >= currentDist)
			break;
	}
	currentMove--;
	if(currentMove == -1)
		currentMove = 0;
	var p1 = this.points[currentMove];
	var p2 = this.points[currentMove +1];
	var dist = this.distances[currentMove+1]-this.distances[currentMove];

	currentDist -= this.distances[currentMove];

	var progress = currentDist / dist;

	var translateV = vec3.fromValues((p2[0] - p1[0])*progress + p1[0],
									(p2[1] - p1[1])*progress + p1[1],
									(p2[2] - p1[2])*progress + p1[2]);

	
	var angle = Math.atan((p2[0]-p1[0])/(p2[2] - p1[2]));
	if(p2[2]-p1[2] < 0)
		angle += Math.PI;

	if(p2[2] - p1[2] == 0 && p2[0] - p1[0] == 0){
		angle = this.previousangle;
	}
	this.previousangle = angle;
	this.scene.translate(translateV[0], translateV[1], translateV[2]);
	this.scene.rotate(angle, 0, 1, 0);
}