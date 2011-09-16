var Component = function() {
    
    //PUBLIC 
    this.service = 'NULL';
    this.procedure = 'nullProcedure';
    this.name = 'aComponent';


    //PRIVATE
    var LABELSERVICENAME = 'LABELS';
    var I18NKey = null;
    var handlers = {};
    var SEPARATOR = '_';
    var text = '';
    var renderer = new Renderer();
    
    
    this.setRenderer = function (customRenderer) {
        renderer = customRenderer;
        return this;
    };
    
    this.render = function () {
        renderer.render(this);
        return this;
    };
    
    this.addHandler = function (eventName, handler) {
        handlers[eventName] = handlers[eventName] || [];
        handler.setOwner(this);
        handlers[eventName].push(handler);
        return this;
    };
    
    this.eventDispatch = function (eventName, params) {
        var eventsToDispatch = handlers[eventName];
        if (!eventsToDispatch) return;
        for (var i = 0, handler; handler = eventsToDispatch[i]; i++) {
            handler.handle(params);
        }
        return this;
    };
    
    this.getManagedEvents = function () {
        var handlersKeys = [];
        for (var handler in handlers) {
            handlersKeys.push(handler);
        }
        return handlersKeys;
    };
    
    
    this.getContainer = function () {
        return renderer.getContainer();
    };
    
    this.setContainer = function (container) {
        renderer.setContainer(container);
        return this;
    };

    this.getI18NKey = function () {
        return I18NKey;
    };
    
    this.setI18NKey = function (key) {
        I18NKey = key;
        this.addHandler('LABELS_getLabel_EXECUTED_' + key, new SetTextHandler());
        new Bus().subscribe(this, 'LABELS_getLabel_EXECUTED_' + key);
        return this;
    };
    
    this.getText = function () {
        return text;
    };
    
    this.setText = function (aText) {
        text = aText;
        renderer.update(this);
        return this;
    };

    this.getLabel = function () {
        var serv = this.getService(LABELSERVICENAME);
        if (!I18NKey || ! ser; return null;
        var params = { key: I18NKey };
        serv.execute('getLabel', params, true);
    };
    
    this.getUniqueID = function () {
        return renderer.innerDivName(name);
    };
    
    this.destroy = function () {
        renderer.erase();
        var bus = new Bus();
        bus.unsubscribe(this, this.getManagedEvents());
        return this;
    };
    
    this.addClass = function (aClass) {
        renderer.addClass(aClass);
        return this;
    };

    this.removeClass = function (aClass) {
        renderer.removeClass(aClass);
        return this;
    };
    
    this.execute = function (aService, aProcedure, params, asynchronous) {
        var theService = aService || this.service;
        var theProcedure = aProcedure || this.procedure;
        var serviceInstance = this.getService(theService);
        if (serviceInstance) {
            serviceInstance.execute(theProcedure, params, asynchronous);
        }
        return this;
    };
    

};


//COMMON

(function() {
    
    this.initializeExecutionContext = function (customService, customProcedure) {
       this.service = customService;
       this.procedure = customProcedure;
       return this;
    };
    this.getService = function (aService) {
        var theService = aService || this.service;
        return document.page.getService(theService) || null;
    };
    this.addDispatcher = function (eventName, handler) {
        this.addHandler(eventName, handler);
        return this;
    };

    this.draw = function () {
        this.render();
        this.getLabel();
        return this;
    };

    //Useless get-set
    this.getName = function() {
      return this.name;
    }
    this.setName = function (aName) {
      this.name = aName;
      return this
      
    };
    
).call(Component.prototype);