var SetTextHandler = function() {
    this.handle = function (params) {
        if (params) {
            var text = params.answer;
            this.getOwner().setText(text);
        }
    }
};

SetTextHandler.prototype.constructor = SetTextHandler;
SetTextHandler.prototype = new Handler();
