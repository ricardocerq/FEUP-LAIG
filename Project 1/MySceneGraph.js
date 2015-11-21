
function MySceneGraph(filename, scene) {
	this.loadedOk = null;
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;
		
	// File reading 
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */
	 
	this.reader.open('scenes/'+filename, this);  
};

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;

	var error = this.parseAll(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}


	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};



MySceneGraph.prototype.parseAll = function(rootElement){
	MyElement.ignore("animations");
	//define the expected structure of the file
	var frustum = new MyElement("frustum", [new MyAttribute("near", "ff", 0, []) , new MyAttribute("far", "ff", 100, [])], [], false, true, true);
	var translate = new MyElement("translation", [new MyAttribute("x", "ff", 0, []) , new MyAttribute("y", "ff", 0, []), new MyAttribute("z", "ff", 0, [])], [], false, true, true);
	var rotation = new MyElement("rotation", [new MyAttribute("axis", "cc", "x", []) , new MyAttribute("angle", "ff", 0, [])], [], false, true, false);
	var rotation2 = new MyElement("rotation", [new MyAttribute("axis", "cc", "y", []) , new MyAttribute("angle", "ff", 0, [])], [], false, true, false);
	var rotation3 = new MyElement("rotation", [new MyAttribute("axis", "cc", "z", []) , new MyAttribute("angle", "ff", 0, [])], [], false, true, false);
	var scale = new MyElement("scale", [new MyAttribute("sx", "ff", 1, []) , new MyAttribute("sy", "ff", 1, []), new MyAttribute("sz", "ff", 1, [])], [], false, true, true);
	var reference = new MyElement("reference", [new MyAttribute("length", "ff", 1, [])], [], true, true);
	var initials = new MyElement("INITIALS", [], [frustum, translate, rotation, rotation2, rotation3, scale, reference], true, true, true);
	

	var ambient = new MyElement("ambient", [new MyAttribute("r", "ff", 0.1, []) , new MyAttribute("g", "ff", 0.1, []), new MyAttribute("b", "ff", 0.1, []), new MyAttribute("a", "ff", 1, [])], [], false, true, true);
	var background = new MyElement("background", [new MyAttribute("r", "ff", 0, []) , new MyAttribute("g", "ff", 0, []), new MyAttribute("b", "ff", 0, []), new MyAttribute("a", "ff", 1, [])], [], false, true, true);
	var illumination = new MyElement("ILLUMINATION", [], [ambient, /*doubleside,*/ background], true, true);

	var enable = new MyElement("enable", [new MyAttribute("value", "tt", 1, [])], [], false, true, true);
	var position = new MyElement("position", [new MyAttribute("x", "ff", 0, []) , new MyAttribute("y", "ff", 0, []), new MyAttribute("z", "ff", 0, []), new MyAttribute("w", "ff", 0, [])], [], false, true, true);	
	var ambientlight = new MyElement("ambient", [new MyAttribute("r", "ff", 0.5, []) , new MyAttribute("g", "ff", 0.5, []), new MyAttribute("b", "ff", 0.5, []), new MyAttribute("a", "ff", 1, [])], [], false, true, true);
	var diffuselight = new MyElement("diffuse", [new MyAttribute("r", "ff", 0.5, []) , new MyAttribute("g", "ff", 0.5, []), new MyAttribute("b", "ff", 0.5, []), new MyAttribute("a", "ff", 1, [])], [], false, true, true);
	var specularlight = new MyElement("specular", [new MyAttribute("r", "ff", 0.5, []) , new MyAttribute("g", "ff", 0.5, []), new MyAttribute("b", "ff", 0.5, []), new MyAttribute("a", "ff", 1, [])], [], false, true, true);
	var light = new MyElement("LIGHT", [new MyAttribute("id", "ss", null, []) ], [enable, position, ambientlight, diffuselight, specularlight], true, true, false);
	var lights = new MyElement("LIGHTS", [], [light], true, true);

	var file = new MyElement("file", [new MyAttribute("path", "ss", "none", [])], [], false, true, true);
	var amplif_factor = new MyElement("amplif_factor", [new MyAttribute("s", "ff", 1, []), new MyAttribute("t", "ff", 1, [])], [], false, true, true);
	var texture = new MyElement("TEXTURE", [new MyAttribute("id", "ss", null, []) ], [file, amplif_factor], true, true, false);
	var textures = new MyElement("TEXTURES", [], [texture], true, true, true);

	var shininess = new MyElement("shininess", [new MyAttribute("value", "ff", 1, [])], [], false, true, true);
	var specularmaterial = new MyElement("specular", [new MyAttribute("r", "ff", 0.5, []) , new MyAttribute("g", "ff", 0.5, []), new MyAttribute("b", "ff", 0.5, []), new MyAttribute("a", "ff", 1, [])], [], false, true, true);
	var diffusematerial = new MyElement("diffuse", [new MyAttribute("r", "ff", 0.5, []) , new MyAttribute("g", "ff", 0.5, []), new MyAttribute("b", "ff", 0.5, []), new MyAttribute("a", "ff", 1, [])], [], false, true, true);
	var ambientmaterial = new MyElement("ambient", [new MyAttribute("r", "ff", 0.5, []) , new MyAttribute("g", "ff", 0.5, []), new MyAttribute("b", "ff", 0.5, []), new MyAttribute("a", "ff", 1, [])], [], false, true, true);
	var emissionmaterial = new MyElement("emission", [new MyAttribute("r", "ff", 0.5, []) , new MyAttribute("g", "ff", 0.5, []), new MyAttribute("b", "ff", 0.5, []), new MyAttribute("a", "ff", 1, [])], [], false, true, true);
	var material = new MyElement("MATERIAL", [new MyAttribute("id", "ss", null, []) ], [shininess, specularmaterial, diffusematerial, ambientmaterial, emissionmaterial], true, true, false);
	var materials = new MyElement("MATERIALS", [], [material], true, true, true);
	/*
	var controlPoint = new MyElement("controlpoint", [new MyAttribute("xx", "ff", 0, []) , new MyAttribute("yy", "ff", 0, []), new MyAttribute("zz", "ff", 0, [])], [], false, false, false, true);
	var animation1 = new MyElement("linearanimation", [new MyAttribute("id", "ss", null, []), new MyAttribute("span", "ff", 1, []), new MyAttribute("type", "ss", "linear", [])], [controlPoint], true, true, false);
	var animation2 = new MyElement("circularanimation", [new MyAttribute("id", "ss", null, []), new MyAttribute("span", "ff", 1, []), new MyAttribute("type", "ss", "circular", []), new MyAttribute("center", "ff ff ff", "0 0 0", []), new MyAttribute("radius", "ff", "0", []) , new MyAttribute("startang", "ff", "0", []), new MyAttribute("rotang", "ff", "0", [])], [controlPoint], true, true, false);
	var animations = new MyElement("animations", [], [animation1, animation2], true, true, true);
	*/
	var patchcontrolpoint = new MyElement("controlpoint", [new MyAttribute("x", "ff", 0, []) , new MyAttribute("y", "ff", 0, []), new MyAttribute("z", "ff", 0, [])], [], false, false, false, true);
	var leaf = new MyElement("LEAF", 
									[
									new MyAttribute("id", "ss", null, []), 
									new MyAttribute("type", "ss", "rectangle", [
																				"rectangle", 
																				"cylinder", 
																				"sphere", 
																				"triangle", 
																				"vehicle", 
																				"plane", 
																				"terrain", 
																				"patch"
																				]),
									 new MyAttribute("args", "m", null, [], [
									 										["rectangle", "ff ff ff ff", "-.5 .5 .5 -.5"], 
									 										["cylinder", "ff ff ff ii ii", "1 1 1 16 16"], 
									 										["sphere", "ff ii ii", "1 16 16"], 
									 										["triangle", "ff ff ff  ff ff ff  ff ff ff", ".5 .5 0  -.5 .5 0  -.5 -.5 0"], 
									 										["vehicle", "ff", "0"], 
									 										["plane", "ii", "100"], 
									 										["terrain", "ss ss", "null null"], 
									 										["patch", "ii ii ii", "0 10 10"]
									 										], true),
									 new MyAttribute("order", "ii", 1, [], null, true),
									 new MyAttribute("partsU", "ii", 10, [],null, true),
									 new MyAttribute("partsV", "ii", 10, [], null, true),
									 new MyAttribute("texture", "ss", "null", [], null, true),
									 new MyAttribute("heightmap", "ss", "null", [], null, true),
									 new MyAttribute("parts", "ii", "null", [], null, true),

									], 
									[patchcontrolpoint], true, true, false);

	var leaves = new MyElement("LEAVES", [], [leaf], true, true, true);
	

	var root = new MyElement("ROOT", [new MyAttribute("id", "ss", null, []) ], [], false, true, true);
	var nodematerial = new MyElement("MATERIAL", [new MyAttribute("id", "ss", "null", []) ], [], false, true, true);
	var nodetexture = new MyElement("TEXTURE", [new MyAttribute("id", "ss", "null", []) ], [], false, true, true);
	var nodetranslation = new MyElement("TRANSLATION", [new MyAttribute("x", "ff", 0, []) , new MyAttribute("y", "ff", 0, []), new MyAttribute("z", "ff", 0, [])], [], false, false, false, true);
	var noderotation = new MyElement("ROTATION", [new MyAttribute("axis", "cc", "x", []) , new MyAttribute("angle", "ff", 0, [])], [], false, false, false, true);
	var nodescale = new MyElement("SCALE", [new MyAttribute("sx", "ff", 1, []) , new MyAttribute("sy", "ff", 1, []), new MyAttribute("sz", "ff", 1, [])], [], false, false, false, true);
	var descendant = new MyElement("DESCENDANT", [new MyAttribute("id", "ss", null, []) ], [], true, true, false);
	var descendants = new MyElement("DESCENDANTS", [], [descendant], true, true, true);
	var nodeanim = new MyElement("animationref", [new MyAttribute("id", "ss", "null", [])], [], false, false, false, true);
	
	var node = new MyElement("NODE", [new MyAttribute("id", "ss", null, []) ], [nodematerial, nodetexture, nodetranslation, noderotation, nodescale, nodeanim, descendants], true, true, false);
	var nodes = new MyElement("NODES", [], [root, node], true, true, true);
	

	this.sceneMyElements = new MyElement("SCENE", [], [initials, illumination, lights, textures, materials, leaves, nodes/*, animations*/], true, true, true);

	if(this.sceneMyElements.read(rootElement) === 'Error'){
		return 'Error in file';
	}

	console.log(this.sceneMyElements.treeString());

	this.verifyIDs(this.sceneMyElements);
	
	this.fillTextures(this.sceneMyElements);
	
	this.fillMaterials(this.sceneMyElements);

	this.fillAnimations(this.sceneMyElements, rootElement);
	
	this.genGraph(this.sceneMyElements);

	console.log("Done");
	
}


MySceneGraph.prototype.verifyIDs = function(scene){
	var lights = scene.children[2].children;
	var textures = scene.children[3].children;
	var materials = scene.children[4].children;
	var leaves = scene.children[5].children;
	var nodes = scene.children[6].children;
	var all = [lights, textures, materials, leaves, nodes];
	for(var i = 0; i < all.length; i++){
		for(var j = 0; j < all[i].length-1; j++){
			for(var k = j + 1; k < all[i].length; k++){
				
				if(all[i][j].attributes[0].value == all[i][k].attributes[0].value && all[i][k].name == all[i][j].name){
					console.warn("Warning: " + "more than one id " + all[i][k].attributes[0].value + " found in " + scene.children[i+2].name + ", keeping first");
					scene.children[i+2].children.splice(k, 1);
				}
			}
		}
	}
	//ensure root is a node
	var found = false;

	for(var i = 1; i < nodes.length; i++){
		if(nodes[i].attributes[0].value == nodes[0].attributes[0].value){
			found = true;
		}
	}
	if(!found){
		console.warn("ROOT of scene " + nodes[0].attributes[0].value +" not found, substituting for id = " + nodes[1].attributes[0].value);
		scene.children[6].children[0].attributes[0].value = nodes[1].attributes[0].value;
	}

	var els = [];
	var els = [];

	for(var i = 0; i < nodes.length; i++){
		els.push(nodes[i]);
	}
	for(var i = 0; i < leaves.length; i++){
		els.push(leaves[i]);
	}
	for(var i = 0; i < nodes.length; i++){
		var descendants = nodes[i].getElements("DESCENDANT");
		for(var j = 0; j < descendants.length; j++){
			var found = false;
			for(var k = 0; k < els.length; k++){
				if(els[k].attributes[0].value == descendants[j].attributes[0].value){
					found = true;
					break;
				}
			}
			if(!found){
				console.warn("Descendant " + descendants[j].attributes[0].value + " of Node " + nodes[i].attributes[0].value + " does not exist, discarding.");
			}
		}
	}
	
	return true;
}

MySceneGraph.prototype.fillTextures = function(scene){
	this.textures = [];
	var texs =  scene.children[3].children;

	for(var i = 0; i < texs.length; i++){
		if(MyTexture.verifyPath(texs[i].children[0].attributes[0].value)){
			this.textures.push(new MyTexture(this.scene, texs[i].attributes[0].value,texs[i].children[0].attributes[0].value, texs[i].children[1].attributes[0].value, texs[i].children[1].attributes[1].value));
		}else console.warn("Warning: Path "+ texs[i].children[0].attributes[0].value + " of Texture " + texs[i].attributes[0].value+ " is invalid, discarding");
	}
}

MySceneGraph.prototype.fillMaterials = function(scene){
	this.materials = [];
	var mats =  scene.children[4].children;

	for(var i = 0; i < mats.length; i++){
		this.materials.push(new MyMaterial(this.scene, mats[i].attributes[0].value, MyMaterial.materialFromElement(this.scene, mats[i])));
	}
}

MySceneGraph.prototype.fillAnimations = function(scene, rootElement){
	this.animations = [];

	var animationsElements = rootElement.getElementsByTagName("animations");
	if(animationsElements == 0)
		return;
	var animationElement = animationsElements[0];
	for(var i = 0; i < animationElement.childNodes.length; i++){
		if(animationElement.childNodes[i].nodeType == 1 && animationElement.childNodes[i].tagName == "animation"){
			var type = this.reader.getString(animationElement.childNodes[i], "type", true);
			var id =  this.reader.getString(animationElement.childNodes[i], "id", true);
			var span = this.reader.getFloat(animationElement.childNodes[i], "span", true);
			if(type == "linear"){
				var controlpoints = [];
				for(var j = 0; j < animationElement.childNodes[i].childNodes.length; j++){
					if(animationElement.childNodes[i].childNodes[j].nodeType == 1 && animationElement.childNodes[i].childNodes[j].tagName == "controlpoint"){
						var x = this.reader.getFloat(animationElement.childNodes[i].childNodes[j], "xx", true);
						var y = this.reader.getFloat(animationElement.childNodes[i].childNodes[j], "yy", true);
						var z = this.reader.getFloat(animationElement.childNodes[i].childNodes[j], "zz", true);
						controlpoints.push([x,y,z]);
					}
				}
					
				newAnim = new MyLinearAnimation(id, this.scene, controlpoints, span);
			}else if(type == "circular"){
				var center = this.reader.getVector3(animationElement.childNodes[i], "center", true);
				var radius = this.reader.getFloat(animationElement.childNodes[i], "radius", true);
				var initialAngle = this.reader.getFloat(animationElement.childNodes[i], "startang", true);
				var rotationAngle = this.reader.getFloat(animationElement.childNodes[i], "rotang", true);
				newAnim = new MyCircularAnimation(id, this.scene, center, radius, initialAngle, rotationAngle, span);
			}else continue;
			this.animations.push(newAnim);
		}	
	}

	/*var anims =  scene.children[7].children;

	for(var i = 0; i < anims.length; i++){
		var type = anims[i].attributes[2].value;
		var id =  anims[i].attributes[0].value;
		var span =  anims[i].attributes[1].value;
		var newAnim;
		if(type == "linear"){
			var controlpoints = [];
			for(var j = 0; j < anims[i].children.length; j++){
				var x = anims[i].children[j].attributes[0].value;
				var y = anims[i].children[j].attributes[1].value;
				var z = anims[i].children[j].attributes[2].value;
				controlpoints.push([x,y,z]);
			}
			newAnim = new MyLinearAnimation(id, this.scene, controlpoints, span);
		}else if(type == "circular"){
			var center = anims[i].attributes[3].value;
			var radius = anims[i].attributes[4].value;
			var initialAngle = anims[i].attributes[5].value;
			var rotationAngle = anims[i].attributes[6].value;
			newAnim = new MyCircularAnimation(id, this.scene, center, radius, initialAngle, rotationAngle, span);
		}else{
			console.warn("Animation " + id + " has unkown type " + type);
			continue;
		}
		this.animations.push(newAnim);
	}*/
}

MySceneGraph.prototype.genGraph = function(scene){
	var rootelement = scene.getElements("ROOT")[0];
	var leaves = scene.children[5].children;
	var nodes = scene.children[6].children;
	var els = [];

	for(var i = 0; i < nodes.length; i++){
		els.push(nodes[i]);
	}

	for(var i = 0; i < leaves.length; i++){
		els.push(leaves[i]);
	}

	var nodes = [];
	this.rootNode = new MyIntermediateNode(null, rootelement.attributes[0].value, els,  this.materials, this.textures, this.animations, this.scene, nodes);	
}


MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


