var Component = function() {
    this.service = 'NULL';
    this.procedure = 'nullProcedure';

    var name = 'aComponent';
    var LABELSERVICENAME = 'LABELS';
    var I18NKey = null;
    var handlers = {};
    var SEPARATOR = '_';
    var text = '';
    var renderer = new Renderer();
    var self = this;

    this.initializeExecutionContext = function(customService, customProcedure) {
        if (customService && customProcedure) {
            this.service = customService;
            this.procedure = customProcedure;
        }
    };

    this.getService = function(aService) {
        var theService = aService || this.service;
        return document.page.getService(theService) || null;
    };

    this.setRenderer = function(customRenderer) {
        renderer = customRenderer;
    };

    this.render = function() {
        renderer.render(this);
    };

    this.addHandler = function(eventName, handler) {
        handlers[eventName] = handlers[eventName] || [];
        handler.setOwner(this);
        handlers[eventName].push(handler);
    };

    this.addDispatcher = function(eventName, handler) {
        this.addHandler(eventName, handler);
    };

    this.eventDispatch = function(eventName, params) {
        var eventsToDispatch = handlers[eventName];
        if (!eventsToDispatch) return;

        for (var i = 0, handler; handler = eventsToDispatch[i]; i++) {
            handler.handle(params);
        }
    };

    this.getName = function() {
        return name;
    };

    this.setName = function(aName) {
        name = aName;
    };

    this.getManagedEvents = function() {
        var handlersKeys = [];
        for (var handler in handlers) {
            handlersKeys.push(handler);
        }
        return handlersKeys;
    };

    this.draw = function() {
        this.render();
        this.getLabel();
    };

    this.getContainer = function() {
        return renderer.getContainer();
    };

    this.setContainer = function(container) {
        renderer.setContainer(container);
    };

    this.getI18NKey = function() {
        return I18NKey;
    };

    this.setI18NKey = function(key) {
        if (!key) return;

        I18NKey = key;
        this.addHandler('LABELS_getLabel_EXECUTED_' + key, new SetTextHandler());
        new Bus().subscribe(this, 'LABELS_getLabel_EXECUTED_' + key);
    };

    this.getText = function() {
        return text;
    };

    this.setText = function(aText) {
        text = aText;
        updateRender();
    };

    this.getLabel = function() {
        if (!I18NKey || !getLabelService()) return;

        var params = {
            key: I18NKey
        };

        getLabelService().execute('getLabel', params, true);
    };

    this.getUniqueID = function() {
        return renderer.innerDivName(name);
    };

    this.destroy = function() {
        renderer.erase();
        var bus = new Bus();
        bus.unsubscribe(this, this.getManagedEvents());
    };

    this.addClass = function(aClass) {
        renderer.addClass(aClass);
    };

    this.removeClass = function(aClass) {
        renderer.removeClass(aClass);
    };

    this.execute = function(aService, aProcedure, params, asynchronous) {
        var theService = aService || this.service;
        var theProcedure = aProcedure || this.procedure;
        var serviceInstance = this.getService(theService);

        if (serviceInstance) {
            serviceInstance.execute(theProcedure, params, asynchronous);
        }
    };

    var getLabelService = function() {
        return self.getService(LABELSERVICENAME);
    };

    var updateRender = function() {
        renderer.update(self);
    };
};