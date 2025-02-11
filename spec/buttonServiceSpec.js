describe("ButtonService", function () {
	
    it("inherits Service", function () {
        var aButtonService = new ButtonService();
        expect(aButtonService instanceof Service).toBeTruthy();
        expect(aButtonService instanceof ButtonService).toBeTruthy();
    });

    it("emits to bus with correct eventname and buttonname property is added to params when it is executed", function () {

        var testingProcedure = "testingProcedure";
        var thePrefix = "CLICKED";

        var aButtonService = new ButtonService();
        var aBus = {};
        aButtonService.getBus = function () {
            return aBus;
        };

        var paramEmitted = null;
        var eventNameEmitted = null;
        var testParams = {
            'key': 'value'
        };

        aBus.emit = function (event, params) {
            paramEmitted = params;
            eventNameEmitted = aButtonService.name + aButtonService.SEPARATOR + testingProcedure + aButtonService.SEPARATOR + thePrefix;
        };

        var eventNameExpected = aButtonService.name + aButtonService.SEPARATOR + testingProcedure + aButtonService.SEPARATOR + thePrefix;

        aButtonService.execute(testingProcedure, testParams);

        expect(eventNameEmitted).toEqual(eventNameExpected);
        expect(paramEmitted.key).toEqual("value");
        expect(paramEmitted.buttonName).toEqual(testingProcedure);
    });

});