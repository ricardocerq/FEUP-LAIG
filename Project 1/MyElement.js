
function MyElement(name, attributes, children, needed, mandatory, unique, unordered){
	this.name = name;
	this.attributes = attributes;
	this.children = children;
	this.mandatory = mandatory;
	this.unique = unique;
	this.present = false;
	this.needed = needed;

	for(var i = 0; i < this.attributes.length; i++){
		this.attributes[i].setParent(this);
	}

	this.unordered = typeof unordered !== 'undefined' ? unordered : false;
};
var toignore = [];
MyElement.ignore = function(tag){
	toignore.push(tag);
}
MyElement.prototype.getElements = function(name){
	var out = [];

	for(var i = 0; i < this.children.length; i++){
		if(this.children[i].name == name){
			out.push(this.children[i]);
		}
		var extra= this.children[i].getElements(name);
	
		for(var j = 0; j < extra.length; j++){
			out.push(extra[j]);
		}
	}
	return out;
}

MyElement.prototype.clone = function(){
	var attrClone = [];

	for(var i  = 0; i <  this.attributes.length; i++){
		attrClone.push(this.attributes[i].clone());
		attrClone[i].setParent();
	}
	var childrenClone = [];

	for(var i  = 0; i <  this.children.length; i++){
		childrenClone.push(this.children[i].clone());
	}

	var out = new MyElement(this.name, attrClone, childrenClone, this.mandatory, this.unique);
	out.present = this.present;
	
	for(var i  = 0; i <  this.attributes.length; i++){
		out.attributes[i].setParent(out);
	}

	out.unordered = this.unordered;
	return out;
};

MyElement.prototype.setAttrs = function(attrs){
	this.attributes = attrs;
};

MyElement.prototype.toString = function(element){
	var path = [];
	var elem = element;
	while(elem != null){
		var current = elem.localName;
		if(elem.attributes)
		for(var i = 0; i < elem.attributes.length; i++){
			current += " " + elem.attributes[i].name + "=\"" + elem.attributes[i].value +"\"";
		}
		path.push(current);
		elem = elem.parentNode;
	}

	var out = "";
	
	for(var i = path.length -2; i >= 0 ; i--){
		out += "/" + path[i] ;
	}
	return out;
};

MyElement.prototype.read = function(node){
	for(var i = 0; i < toignore.length; i++){
		if(toignore[i] == node.tagName)
			return
	}
	console.log("Reading element " + this.toString(node));
	var nodeChildren =[];

	for(var i = 0; i < node.childNodes.length; i++){
		if(node.childNodes[i].nodeType == 1)
			nodeChildren.push(node.childNodes[i]);
	}

	var warning = false;
	var error = false;
	
	for(var i = 0; i < this.children.length; i++){
		var elems = node.getElementsByTagName(this.children[i].name);

		if(this.children[i].mandatory){
			if(elems.length == 0){
				if(this.children[i].needed){
					error = true;
					console.error("Error: Element " + this.toString(node) + "/" + this.children[i].name + " is missing, stopping read.");				
				}
				else{
					warning = true;
					console.warn("Warning: Element " + this.toString(node) + "/" + this.children[i].name + " is missing, replacing its values with " +  this.children[i].defaultString() + ".");
				}
			}
		}
		if(this.children[i].unique){
			if(elems.length > 1){
				warning = true;
				console.warn("Warning: Element " + this.toString(node) + " has multiple instances of element " + this.children[i].name + ".");
			}
		}
		if(elems.length >= 1){
			//console.log("setting " + this.children[i].name + " to present");
			this.children[i].present = true;
		}
	}

	for(var j = 0; j < nodeChildren.length; j++){
		var found = false;

		for(var i = 0; i < this.children.length; i++){
			if(this.children[i].name == nodeChildren[j].tagName){
				found = true;
				break;
			}
		}
		if(!found){
			for(var i = 0; i < toignore.length; i++){
				if(toignore[i] == nodeChildren[j].tagName)
					found = true;
			}
			if(!found){
				warning= true;
				console.warn("Warning: Unknown element " + this.toString(node) + "/" + nodeChildren[j].tagName + ", discarding.");
			}
		}
	}

	for(var i = 0; i < this.attributes.length; i++){
		if(!node.hasAttribute(this.attributes[i].name)){
			if(this.attributes[i].optional)
				continue;
			if(this.attributes[i].mandatory){
				error = true;
				console.error("Error: Element " + this.toString(node) + " is missing attribute " + this.attributes[i].name + ".");
				return 'Error';
			}
			else{
				warning = true;
				console.warn("Warning: Element " + this.toString(node) + " is missing attribute " + this.attributes[i].name + ", using default value " + this.attributes[i].toString() + ".");
			}
		}else{
			if(this.attributes[i].setValue(node.attributes.getNamedItem(this.attributes[i].name).value)){
			}else{
				warning = true;
				console.warn("Warning: Could not assign value "  + node.attributes.getNamedItem(this.attributes[i].name).value + " to attribute " + this.attributes[i].name + " of element " + this.toString(node)  + ", using default value " + this.attributes[i].toString() + ".");
			}
		}
	}

	for(var i =  0; i < node.attributes.length; i++){
		var found = false;

		for(var j = 0; j < this.attributes.length; j++){
			if(node.attributes[i].name == this.attributes[j].name){
				found = true;
				break;
			}
		}
		if(!found){
			warning = true;
			console.warn("Warning: Element " + this.toString(node) + " has unknown attribute " + node.attributes[i].name + ", discarding.");
		}
	}
	//add elements
	for(var i = 0; i < this.children.length; i++){
		if(!this.children[i].unique){
			var elems = node.getElementsByTagName(this.children[i].name);
			if(elems.length>0){
				var numExisting = 0;
				for(var j = 0; j < this.children.length; j++){
					if(this.children[i].name == this.children[j].name)
						numExisting++;
				}
				var numToAdd = elems.length-numExisting;
				while(numToAdd > 0){
					numToAdd--;
					this.children.push(this.children[i].clone());
				}
			}
		}
	}

	var nodechildrenCopy = nodeChildren.slice(0);
	var thischildrenCopy = this.children.slice(0);
	
	while (thischildrenCopy.length > 0) {
		if (thischildrenCopy[0].present) {
			for (var i = 0; i < nodechildrenCopy.length; i++) {
				if (nodechildrenCopy[i].tagName == thischildrenCopy[0].name) {
					thischildrenCopy[0].read(nodechildrenCopy[i]);
					nodechildrenCopy.splice(i,1);
					break;
				}
			}
		}
		thischildrenCopy.shift();
	}

	var pos = -1;
	
	for(var i = 0; i < this.children.length; i++){
		if(this.children[i].unordered && this.children[i].present){
			pos = i;
			break;
		}
	}
	if(pos != -1){
		var unordereds = [];

		for(var i = 0; i < this.children.length; i++){
			if(this.children[i].unordered && this.children[i].present){
				unordereds.push(this.children[i]);
				//console.warn(this.children[i].name);
				this.children.splice(i, 1);
				i--;
			}
		}
		var ordereds = [];

		for(var i = 0; i < nodeChildren.length; i++){
			for(var j = 0; j < unordereds.length; j++){
				if(nodeChildren[i].tagName == unordereds[j].name){
					ordereds.push(unordereds[j]);
					unordereds.splice(j, 1);
					break;
				}
			}
		}
		for(var i = 0; i < ordereds.length; i++){
			this.children.splice(pos + i, 0, ordereds[i]);
		}
	}
	if(error)
		return 'Error';
	else if(warning)
		return 'Warning';
	else return 'Success';
};

MyElement.prototype.defaultString = function(){
	var out = "";

	for(var i = 0; i < this.attributes.length; i++){
		out += this.attributes[i].toString() + " ";
	}
	return out;
};

MyElement.prototype.treeString = function(){
	return this.treeStringAux(0);
}

MyElement.prototype.nSpaces = function(num){
	var out = "";

	while(num > 0){
		out+= " ";
		num--;
	}
	return out;
}

MyElement.prototype.treeStringAux = function(num){
	var numCpy = num;
	var out = this.nSpaces(num*3);
	out += "<" + this.name;
	
	for(var i = 0; i < this.attributes.length; i++){
		out+= " " + this.attributes[i].toString();
	}
	if(this.children.length == 0)
		out += "/>";
	else{
		out += ">";
		for(var i = 0; i < this.children.length; i++){
			out+= "\n" + this.children[i].treeStringAux(num + 1);
		}
		out += "\n" +  this.nSpaces(num*3) + "</" + this.name + ">";
	}
	return out;
}