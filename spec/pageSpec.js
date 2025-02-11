describe("Page", function () {

    it("initialization calls initializeServices", function () {
        var aPage = new Page();
        var initializeServicesCalled = false;

        aPage.initializeServices = function () {
            initializeServicesCalled = true;
        };

        aPage.initialize();

        expect(initializeServicesCalled).toBeTruthy();
    });

    it("initialization calls initializeComponents", function () {
        var aPage = new Page();
        var initializeComponentsCalled = false;

        aPage.initializeComponents = function () {
            initializeComponentsCalled = true;
        };

        aPage.initialize();

        expect(initializeComponentsCalled).toBeTruthy();
    });

    it("can add and fecth services", function () {
        var aPage = new Page();
        var abstractServiceName = "ABSTRACT";
        var aService = aPage.getService(abstractServiceName);
        expect(aService instanceof NullService).toBeTruthy();

        aService = aPage.getService(null);
        expect(aService instanceof NullService).toBeTruthy();

        aService = aPage.getService(undefined);
        expect(aService instanceof NullService).toBeTruthy();

        aService = {};
        aService.getName = function () {
            return abstractServiceName;
        };
        aService.setBaseURL = function (baseURL) {};
        aPage.addService(aService);

        var serviceRetrieved = aPage.getService(abstractServiceName);
        expect(serviceRetrieved.getName()).toEqual(abstractServiceName);
    });

    it("initialization creates a Labelservice ", function () {
        var aPage = new Page();
        var serviceName = "LABELS";
        var aService = aPage.getService(serviceName);
        expect(aService instanceof LabelsService).toBeTruthy();

    });

    it("allows baseUrl initialization", function () {
        var aPage = new Page();
        expect(aPage.getBaseURL()).toEqual("");

        aPage = new Page("A Base URL");
        expect(aPage.getBaseURL()).toEqual("A Base URL");
    });

    it("sets baseURL to the services", function () {
        var aBaseURL = "a base URL";
        var aPage = new Page(aBaseURL);
        var baseURLSet = "";
        aService = {};
        aService.setBaseURL = function (baseURL) {
            baseURLSet = baseURL;
        };
        aService.getName = function () {};
        aPage.addService(aService);
        expect(baseURLSet).toEqual(aBaseURL);
    });

    it("allow component registration", function () {
        var aPage = new Page();

        var aComponent = createDummyComponent();
        var anotherComponent = createDummyComponent(); 

        var testingContainer = "testingContainer";

        aPage.addComponent(aComponent, testingContainer);
        aPage.addComponent(anotherComponent, testingContainer);
        var componentName = aComponent.setNameCalled;
        var anotherComponentName = anotherComponent.setNameCalled;

        expect(anotherComponentName).not.toEqual(componentName);
    });

    it("draw components when it is drawn", function () {
        var aPage = new Page();
        var aComponent = createDummyComponent();
        var anotherComponent = createDummyComponent();

        var testingContainer = "testingContainer";

        aPage.addComponent(aComponent, testingContainer);
        aPage.addComponent(anotherComponent, testingContainer);

        aPage.draw();

        expect(aComponent.drawCalled).toBeTruthy();
        expect(anotherComponent.drawCalled).toBeTruthy();
    });


    it("drawing can replace container when asked", function () {
        var container = new Element('div', {
            "id": "testingContainer"
        }).inject($("xhtmlToTest"));
        var containerHtml = "Lorem ipsum";
        container.set("html", containerHtml);

        aPage = new Page();
        aPage.addComponent(createDummyComponent(), "testingContainer");
        aPage.draw();
        expect(container.get("html")).toEqual(containerHtml);

        aPage.addComponent(createDummyComponent(), "testingContainer", false);
        aPage.draw();
        expect(container.get("html")).toEqual(containerHtml);

        aPage.addComponent(createDummyComponent(), "testingContainer", true);
        aPage.draw();
        expect(container.get("html")).toEqual("");
    });


    it("subscribes components to the bus", function () {
        var aComponent = createDummyComponent();
        var aBus = new Bus();
        aBus.reset();

        var aPage = new Page();
        aPage.addComponent(aComponent, "anyContainer");

        expect(aBus.subscribers("testEvent")).toContain(aComponent);
        expect(aBus.subscribers("dummyEvent")).toContain(aComponent);

    });


    function createDummyComponent() {
        var aComponent = {};

        aComponent.setNameCalled = null;
        aComponent.drawCalled = false;
        aComponent.container = null;
        aComponent.getManagedEvents = function () {
            return ["testEvent", "dummyEvent"];
        };
        aComponent.getTypeName = function () {
            return "dummy";
        };
        aComponent.setName = function (name) {
            this.setNameCalled = name;
        };
        aComponent.getName = function () {
            return this.setNameCalled;
        };
        aComponent.setContainer = function (aContainer) {
            this.container = aContainer;
        };
        aComponent.getContainer = function () {
            return this.container;
        };
        aComponent.draw = function () {
            this.drawCalled = true;
        };

        return aComponent;
    }

});