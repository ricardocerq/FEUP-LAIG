/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	this.gui = new dat.GUI();
	this.lightGroup = this.gui.addFolder("Lights");

	return true;
};
MyInterface.prototype.addLightController = function(i, id){
	this.lightGroup.add(this.scene.lightsON, i, this.scene.lightsON[i]).name(id);
}
/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	CGFinterface.prototype.processKeyboard.call(this,event);
	


};