var Handler = function() {
    var owner = null;

    this.handle = function (params) {},

    this.dispatch = function (params) {
        this.handle(params);
    };

    this.setOwner = function (anObject) {
        owner = anObject;
    };

    this.getOwner = function () {
        return owner;
    };

    this.getPage = function () {
        return document.page;
    };
};
