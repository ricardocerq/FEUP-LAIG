function MyAnimationSequence(animations){
	this.animations = animations;
	this.times = [0];
	for(var i = 0; i < animations.length; i++){
		this.times.push(animations[i].time*1000 + this.times[i]);
	}
}



MyAnimationSequence.prototype.apply = function(time){
	var i;
	time = (time % this.times[this.times.length - 1]);
	if(time > this.times[this.times.length - 1])
		return;
	for(i = 0; i < this.times.length; i++){
		if(time < this.times[i])
			break;
	}
	var animindex = i - 1;
	this.animations[animindex].apply(time - this.times[animindex]);

}