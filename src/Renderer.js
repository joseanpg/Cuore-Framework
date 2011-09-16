var Renderer = function() {
    var panel = null;
    var panelClasses = ["innerComponentDiv"];
    var container = document.body;
    var self = this;

    this.setContainer = function(aContainer) {
        container = document.getElementById(aContainer);
    };

    this.getContainer = function() {
        return container;
    };

    this.render = function(component) {
        if (!isDrawn()) {
            draw(component);
        }
        this.update(component)
    };

    this.update = function(component) {
        if (isDrawn()) {
            updateWhenDrawn(component);
        }
    };

    this.erase = function() {
        var erase = panel;

        if (erase) {
            container.removeChild(erase);
        }
    };

    this.addClass = function(aClass) {
        panelClasses.push(aClass);
        if (isDrawn()) {
            panel.className += ' ' + aClass;
        }
    };

    this.removeClass = function(aClass) {
        erase(panelClasses, aClass); // @TODO
        if (isDrawn()) {
            var reg = new RegExp("(^|\\s)" + aClass + "(\\s|$)", "g");
            panel.className = panel.className.replace(reg, '');
        }
    };

    this.getCurrentClasses = function() {
        return panelClasses;
    };

    this.innerDivName = function(componentName) {
        var divNameSuffix = "_inner"
        return componentName + divNameSuffix;
    };

    var draw = function(component) {
        var divID = self.innerDivName(component.getName());

        panel = document.createElement('div');
        panel.id = divID;
        container.appendChild(panel);

        setCurrentClasses();
    };

    var updateWhenDrawn = function(component) {
        if (component.getText()) {
            panel.set('text', component.getText());
        }
    };

    var setCurrentClasses = function() {
        for (var i = 0, oneClass; oneClass = panelClasses[i]; i++) {
            panel.addClass(oneClass);
        }
    };

    var isDrawn = function() {
        return panel;
    };

    var erase = function(arrayName, arrayElement) {
        for (var i = 0, len = arrayName.length; i < len; i++) {
            if (arrayName[i] === arrayElement) {
                arrayName.splice(i, 1);
            }
        }
        return arrayName;
    };

};