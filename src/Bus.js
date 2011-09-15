var Bus = function() {
    var subscriptions = [];
	var instanceName = "Bus";
	
	this.initialize = function() {
        document[instanceName] = document[instanceName] || this;

        return document[instanceName];   
   	};

	this.subscribe = function (subscriber, eventName) {
        if (!subscriptionExists(subscriber, eventName)) {
            subscriptions.push([subscriber, eventName]);
        }
    };

    this.unsubscribe = function (subscriber, events) {
        for (var i = 0, eventName; eventName = events[i]; i++) {
            var theSubscription = [subscriber, eventName];
            removeSubscription(theSubscription);
        }
    };

    this.hasSubscriptions = function () {
        return subscriptions.length > 0;
    };

    this.subscribers = function (theEvent) {
        var selectedSubscribers = [];
        for (var i = 0, subscription; subscription = subscriptions[i]; i++) {
            if (subscription[1] === theEvent) {
                selectedSubscribers.push(subscription[0]);
            }
        }
        return selectedSubscribers;
    };

    this.hasSubscriptions = function () {
        return subscriptions.length > 0;
    };

    this.emit = function (eventName, params) {
        var subscribers = this.subscribers(eventName);

        for (var i = 0, subscriber; subscriber = subscribers[i]; i++) {
            subscriber.eventDispatch(eventName, params);
        }
    };

    this.reset = function() {
	    subscriptions = [];
    };

    var subscriptionExists = function (subscriber, eventName) {
        var result = false;
        var theSubscription = [subscriber, eventName];

        for (var i = 0, subscription; subscription = subscriptions[i]; i++) {
            var sameSubscriber = (subscription[0] === theSubscription[0]);
            var sameEvent = (subscription[1] === theSubscription[1]);
            if (sameSubscriber && sameEvent) {
                result = true;
                break;
            }
        }
        return result;
    };

    var removeSubscription = function (theSubscription) {
        for (var i = 0, subscription; subscription = subscriptions[i]; i++) {
            var sameSubscriber = (subscription[0] === theSubscription[0]);
            var sameEvent = (subscription[1] === theSubscription[1]);
            if (sameSubscriber && sameEvent) {
                subscriptions.splice(i, 1);
            }
        }
    };
    
    return this.initialize();
};
