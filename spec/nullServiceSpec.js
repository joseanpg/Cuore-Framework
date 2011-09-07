describe("NullService", function () {
	
    it("inherits Service", function () {
        var aService = new NullService();
        expect(aService instanceof Service).toBeTruthy();
        expect(aService instanceof NullService).toBeTruthy();
    });

    it("does nothing when executes a procedure", function () {
        var aService = new NullService();
        aService.getBus = function () {
            return createDummyBus();
        };
        var procedureName = "testProcedure";
        var params = {
            "testParam1": true,
            "testParam2": true
        };

        aService.execute(procedureName, params);
        expect(aService.getBus().broadcastEvent).toBeNull();
    });

    var createDummyBus = function() {
        var aBus = {
            broadcastEvent: null,
            emit: function (eventName, params) {
                this.broadcastEvent = eventName;
            }
        };

        return aBus;
    };

});