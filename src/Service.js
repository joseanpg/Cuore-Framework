var Service = function() {
    var name = 'ABSTRACT';
    var executionPrefix = 'EXECUTED';
    var SEPARATOR = '_';
    var lastDataSent = null;
    var baseURL = '';

    this.execute = function(method, params, asynchronous) {
        var eventName = this.getEventNameForExecution(method);
        this[method](params, eventName);

        if (!asynchronous) {
            this.emit(eventName, params);
        }
    };

    this.request = function(url, params, eventName) {
        new Request.JSON({
            url: url,
            data: {
                "query": JSON.encode(params)
            },
            onComplete: function(response) {
                this.emit(eventName, response);

            }.bind(this)
        }).send();

        lastDataSent = params;
    };

    this.emit = function(eventName, params) {
        this.getBus().emit(eventName, params);
    };

    this.getEventNameForExecution = function(method) {
        return name + SEPARATOR + method + SEPARATOR + executionPrefix;
    };

    this.getName = function() {
        return name;
    };

    this.getLastDataSent = function() {
        return lastDataSent;
    };

    this.getExecutionPrefix = function() {
        return executionPrefix;
    };

    this.getBaseURL = function() {
        return baseURL;
    };

    this.setBaseURL = function(GlobalbaseURL) {
        baseURL = GlobalbaseURL;
    };

    this.getBus = function() {
        return new Bus();
    };
};