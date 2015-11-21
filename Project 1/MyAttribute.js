//represents an attribute in the lsx file, stores its name, type, default value, possible options where applicable
//for the leaves, previous indicates the acceptable values for the args based on the value of the previous attribute type
function MyAttribute(name, type, defaultValue, options, previous, optional){
	this.name = name;
	this.type = type;
	this.value = defaultValue;
	this.defaultValue = defaultValue;
	if(defaultValue == null)
		this.mandatory = true;
	this.options = options;
	this.parent = null;
	this.previous = previous;
	if (typeof optional === 'undefined') { optional = false; }
	this.optional = optional;
 };

MyAttribute.prototype.clone = function(){
	var out = new MyAttribute(this.name, this.type, this.defaultValue, this.options);
	out.value = this.value;
	out.parent = this.parent;
	out.previous = this.previous;
	out.optional = this.optional;
	return out;
};
MyAttribute.prototype.setParent = function(parent){
	this.parent = parent;
};

MyAttribute.prototype.convertValue = function(type, value){
	if(type == "ss")
		return value;
	var temp = parseFloat(value);
	var newValue;
	if(isNaN(temp)){
		return value;
	}
	else return temp;
};

MyAttribute.prototype.validateValue = function(type, value){
	var newValue = this.convertValue(type,value);

	if(typeof options !== "undefined" && this.options != null && this.options.length != 0){
		for(var i = 0; i < options.length; i++){
			if(newValue == options[i]){
				this.value = newValue;
				return true;
			}
		}
		return false;
	}

	if(type == "ss"){
		return true;
	}

	else if(type == "ff" && typeof newValue === 'number'){
		return true;
	}

	else if(type == "cc" && (newValue == 'x' || newValue == 'y' || newValue == 'z' )){
		return true;
	}
	else if(type == "ii" && typeof newValue === 'number' && newValue % 1 === 0){
		return true;
	}
	else if(type == "tt" && (newValue == 1 || newValue == 0)){
		return true;
	}
	else {
		return false;
	}
};

MyAttribute.prototype.processMultiple = function(defaultv, value){
		var typeres = this.type.match(/[^ ]+/g);
		var valueres = value.match(/[^ ]+/g);
		var defaultres = defaultv.match(/[^ ]+/g);
		if(valueres.length != typeres.length){
			console.warn("Attribute " + this.name + " was given the wrong number of arguments, expected " + typeres.length +  ", given " + valueres.length + ".");
			return false;
		}
		else{
			var success = true;
			var nextvalue = [];
			for(var i = 0; i < valueres.length; i++){
				
				if(this.validateValue(typeres[i], valueres[i])){
					nextvalue.push(this.convertValue(typeres[i], valueres[i]));
				}
				else {
					nextvalue.push(this.convertValue(typeres[i], defaultres[i]));
					success = false;
				}
			}
			this.value = nextvalue;
			return success;
	}
};

MyAttribute.prototype.setValue = function(value){
	if(this.type == "m"){
		var found = false;

		loop1:
		for(var i = 0; i < this.parent.attributes.length; i++){
			for(var j = 0; j < this.previous.length; j++){
				//position 0 of each element of previous has triangle/rectangle/cylinder/sphere
				//position 1 has the type of each value
				//position 2 has the default values
				var test1 = this.parent.attributes;
				var test2 = this.previous;
				if(this.parent.attributes[i].value == this.previous[j][0]){
					this.type = this.previous[j][1];
					if(this.processMultiple(this.previous[j][2], value)){
						found = true;
						break loop1;
					}
				}
				else{
				}
			}	
		}
		if(!found)
			return false;
		else return true;
	}
	else if(this.type.length > 2){
		if(this.processMultiple(this.value, value))
			return true;
		else return false;
	}
	else if(this.validateValue(this.type, value)){
		this.value = this.convertValue(this.type, value);
		return true;
	}
	else return false;
};

MyAttribute.prototype.toString = function(){
	var out = this.name + "=\"";

	if(this.value instanceof Array) {
		for(var i  = 0; i < this.value.length; i++){
			out+= this.value[i] + " ";
		}
	}
	else 
		out+= this.value;
	return out + "\"";
};