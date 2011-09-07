var NullService = function() {
	this.execute = function() {}
};

NullService.prototype.constructor = NullService; 
NullService.prototype = new Service();
