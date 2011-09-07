var Page = function(globalURL) {
	var services = {};
    var components = {};
    var cleaners = [];
    var baseURL = globalURL || '';

    document.page = this;
    //this.addService(new LabelsService());

    this.addService = function (service) {
        service.setBaseURL(this.getBaseURL());
        this.services[service.getName()] = service;
    };

    this.getService = function (name) {
        return services[name] || new NullService();
    };

    this.addComponent = function (component, container, replaceContent) {
        subcribeComponentEvents(component);
        component.setName(this.generateUUID());
        this.components[component.getName()] = component;

        if (replaceContent) {
            this.cleaners.push(component.getName());
        }
        component.setContainer(container);
    },

    this.draw = function () {
	    for(var component in components) {
		    var currentComponent = this.getComponent(component);
		
		   if (cleaners.indexOf(currentComponent.getName()) >= 0) {
                $(currentComponent.getContainer()).innerHTML = '';
	        }
	        currentComponent.draw();
	    }
    };

    this.getComponent = function (name) {
        return components[name] || null;
    };

    this.getBaseURL = function () {
        return baseURL;
    };

    this.initializeServices = function () {};
    var initializeComponents = function () {};

    this.setUp = function () {
        this.initializeServices();
        initializeComponents();
    };

    this.setUp(); 

    var subcribeComponentEvents = function (component) {
        var events = component.getManagedEvents();
        for (var i = 0, eventName; eventName = events[i]; i++) {
            (new Bus()).subscribe(component, eventName);
        }
    };

    var $ = function (name) {
        return document.getElementById(name);
    };

    var generateUUID = function () {
        var S4Pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        var S4 = S4Pattern.replace(/[xy]/g, function (group) {
            var randomNumber = Math.random() * 16 | 0,
                value = group === 'x' ? randomNumber : (randomNumber & 0x3 | 0x8);

            return value.toString(16);
        });
        return S4;
    };

};
