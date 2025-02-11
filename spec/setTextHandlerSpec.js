describe("setTextHandler", function () {

    it("inherits  Handler", function () {
        var aSetTextHandler = new SetTextHandler();
        expect(aSetTextHandler instanceof Handler).toBeTruthy();
        expect(aSetTextHandler instanceof SetTextHandler).toBeTruthy();
        expect(aSetTextHandler.debug).toBeDefined();
    });

    it("sets the text of the owner reading as json object when dispatched", function () {
        var aSetTextHandler = new SetTextHandler();

        var testText = "testText";
        var aButton = {};
        var settedText = null;

        aButton.setText = function (text) {
            settedText = text;
        };

        aSetTextHandler.setOwner(aButton);

        var correctJson = {
            'answer': testText
        };
        var incorrectJson = {
            'something': testText
        };

        aSetTextHandler.handle(correctJson);

        expect(settedText).toEqual(testText);

        settedText = null;
        aSetTextHandler.handle(incorrectJson);

        expect(settedText).toBeUndefined();
    }); 
});