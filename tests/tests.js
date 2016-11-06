var panel,
    flag,
    listener = function(value) { flag = value;};

QUnit.config.hidepassed = true;

//////////////////////////////////
// region  BOOLEAN
//////////////////////////////////

QUnit.module("boolean", {
    before:  function() {
        panel = QuickSettings.create()
            .addBoolean("boolean", false, listener);
    },

    beforeEach:  function() {
        flag = null;
    },

    after: function() {
        panel.removeControl("boolean");
        panel.destroy();
    }
});

QUnit.test("set and get", function(assert) {
    // initial value
    assert.notOk(panel.getValue("boolean"), "boolean initialized to false");

    // set true
    panel.setValue("boolean", true);
    assert.ok(panel.getValue("boolean"), "boolean set to true");

    // set false
    panel.setValue("boolean", false);
    assert.notOk(panel.getValue("boolean"), "boolean set to false");
});

QUnit.test("listener", function(assert) {
    // flag not set
    assert.equal(flag, null, "flag not set. null");

    // listen true
    panel.setValue("boolean", true);
    assert.equal(flag, true, "listener set flag to true");

    // listen false
    panel.setValue("boolean", false);
    assert.equal(flag, false, "listener set flag to false");
});
// endregion

//////////////////////////////////
// region  BUTTON
//////////////////////////////////
QUnit.module("button", {
    before:  function() {
        panel = QuickSettings.create()
            .addButton("button", function() { flag = true;});
    },

    beforeEach:  function() {
        flag = null;
    },

    after: function() {
        panel.removeControl("button");
        panel.destroy();
    }
});

QUnit.test("listener", function(assert) {
    // flag not set
    assert.equal(flag, null, "flag not set. null");

    panel._controls["button"].control.click();
    assert.ok(flag, "listener set flag to true");

});
// endregion

//////////////////////////////////
// region  COLOR
//////////////////////////////////

QUnit.module("color", {
    before:  function() {
        panel = QuickSettings.create()
            .addColor("color", "#000000", listener);
    },

    beforeEach:  function() {
        flag = null;
    },

    after: function() {
        panel.removeControl("color");
        panel.destroy();
    }
});

QUnit.test("set and get", function(assert) {
    // initial value
    assert.equal(panel.getValue("color"), "#000000", "color initialized to black");
    assert.equal(panel._controls["color"].label.innerHTML, "<b>color:</b> #000000", "label shows correct color");
    assert.equal(panel._controls["color"].colorLabel.style.backgroundColor, "rgb(0, 0, 0)", "background of color label is black");

    // set red
    panel.setValue("color", "#ff0000");
    assert.equal(panel.getValue("color"), "#ff0000", "color set to red");
    assert.equal(panel._controls["color"].colorLabel.style.backgroundColor, "rgb(255, 0, 0)", "background of color label changed to right color");
    assert.equal(panel._controls["color"].label.innerHTML, "<b>color:</b> #ff0000", "label shows new color");
});

QUnit.test("listener", function(assert) {
    // flag not set
    assert.equal(flag, null, "flag not set. null");

    // listen yellow
    panel.setValue("color", "#ffff00");
    assert.equal(flag, "#ffff00", "listener set flag to yellow");

});
// endregion

//////////////////////////////////
// region  DATE
//////////////////////////////////

QUnit.module("date", {
    before:  function() {
        panel = QuickSettings.create()
            .addDate("date", "2016-01-01", listener);
    },

    afterEach: function() {
        flag = null;
    },

    after: function() {
        panel.removeControl("date");
        panel.destroy();
    }
});

QUnit.test("set and get", function(assert) {
    // initial value
    assert.equal(panel.getValue("date"), "2016-01-01", "date initialized to 2016-01-01");

    // set string
    panel.setValue("date", "2099-12-12");
    assert.equal(panel.getValue("date"), "2099-12-12", "date set to 2099-12-12 with date string");

    // set date
    var date = new Date();
    panel.setValue("date", date);
    assert.equal(panel.getValue("date").substr(0, 4), date.getFullYear(), "date set with date object, today's year");
    assert.equal(panel.getValue("date").substr(5, 2), date.getMonth() + 1, "date set with date object, today's month");
    assert.equal(panel.getValue("date").substr(8, 2), date.getDate(), "date set with date object, today's date");
});

QUnit.test("listener", function(assert) {
    // flag not set
    assert.equal(flag, null, "flag not set. null");

    // listen date
    panel.setValue("date", "1964-10-20");
    assert.equal(flag, "1964-10-20", "flag set date to my birthday");

    // set date
    var date = new Date();
    panel.setValue("date", date);
    assert.equal(flag.substr(0, 4), date.getFullYear(), "flag set with date object, today's date");
    assert.equal(flag.substr(5, 2), date.getMonth() + 1, "flag set with date object, today's date");
    assert.equal(flag.substr(8, 2), date.getDate(), "flag set with date object, today's date");
});
// endregion

//////////////////////////////////
// region  DROPDOWN
//////////////////////////////////

QUnit.module("dropdown", {
    before:  function() {
        panel = QuickSettings.create()
            .addDropDown("dropdown", ["one", "two", "three"], listener);
    },

    beforeEach: function() {
        flag = null;
    },

    after: function() {
        panel.removeControl("dropdown");
        panel.destroy();
    }
});

QUnit.test("set and get", function(assert) {
    // initial value
    assert.equal(panel.getValue("dropdown").index, 0, "initial index 0");
    assert.equal(panel.getValue("dropdown").value, "one", "initial value one");

    // set index
    panel.setValue("dropdown", 1);
    assert.equal(panel.getValue("dropdown").index, 1, "index set to 1");
    assert.equal(panel.getValue("dropdown").value, "two", "value changed to two");

    // set index
    panel.setValue("dropdown", {index:  2, value: "whatever"});
    assert.equal(panel.getValue("dropdown").index, 2, "index changed to 2 with object");
    assert.equal(panel.getValue("dropdown").value, "three", "value changed to three");
});

QUnit.test("listener", function(assert) {
    // flag not set
    assert.equal(flag, null, "flag not set, null");

    // listen date
    panel.setValue("dropdown", 1);
    assert.equal(flag.index, 1, "listener set flag.index to 1");
    assert.equal(flag.value, "two", "listener set flag.value to two");

    panel.setValue("dropdown", {index: 2, value: "whatever"});
    assert.equal(flag.index, 2, "listener set flag.index to 2");
    assert.equal(flag.value, "three", "listener set flag.value to three");
});
// endregion

//////////////////////////////////
// region  ELEMENT
//////////////////////////////////

// NOTHING  YET
// endregion

//////////////////////////////////
// region  FILE CHOOSER
//////////////////////////////////

// NOTHING  YET
// endregion

//////////////////////////////////
// region  HTML
//////////////////////////////////

QUnit.module("html", {
    before:  function() {
        panel = QuickSettings.create()
            .addHTML("html", "this is the html");
    },

    after: function() {
        panel.removeControl("html");
        panel.destroy();
    }
});

QUnit.test("set and get", function(assert) {
    // initial value
    assert.equal(panel.getValue("html"), "this is the html", "initial html value set");

    // set value
    panel.setValue("html", "some different html");
    assert.equal(panel.getValue("html"), "some different html", "html value changed");

});
// endregion

//////////////////////////////////
// region  IMAGE
//////////////////////////////////

QUnit.module("image", {
    before:  function() {
        panel = QuickSettings.create()
            .addImage("image", "http://bit-101.com/image.jpg");
    },

    after: function() {
        panel.removeControl("image");
        panel.destroy();
    }
});

QUnit.test("set and get", function(assert) {
    // initial value
    assert.equal(panel.getValue("image"), "http://bit-101.com/image.jpg", "initial url set");

    // set value
    panel.setValue("image", "http://bit-101.com/image.png");
    assert.equal(panel.getValue("image"), "http://bit-101.com/image.png", "new url set");

});
// endregion

//////////////////////////////////
// region  NUMBER
//////////////////////////////////

QUnit.module("number", {
    before:  function() {
        panel = QuickSettings.create()
            .addRange("number", 0, 100, 0, 1, listener);
    },

    beforeEach: function() {
        flag = null;
    },

    after: function() {
        panel.removeControl("number");
        panel.destroy();
    }
});

QUnit.test("set and get", function(assert) {

    // initial value
    assert.equal(panel.getValue("number"), 0, "initial value 0");

    // set value
    panel.setValue("number", 50);
    assert.equal(panel.getValue("number"), 50, "value set to 50");
});

QUnit.test("max and min",function(assert) {

    // set value beyond max
    panel.setValue("number", 101);
    assert.equal(panel.getValue("number"), 100, "value set beyond max, clamped to max");

    // set value beyond min
    panel.setValue("number", -1);
    assert.equal(panel.getValue("number"), 0, "value set beyond min. clamped to min");

    // set min above current value
    panel.setRangeParameters("number", 1, 100, 1);
    assert.equal(panel.getValue("number"), 1, "min reset value to 1");

    // set max below current value
    panel.setValue("number", 100);
    panel.setRangeParameters("number", 1, 99, 1);
    assert.equal(panel.getValue("number"), 99, "max reset value to 99");

});

QUnit.test("listener", function(assert) {
    // initial value
    assert.equal(flag, null, "flag unset. null");

    panel.setValue("number", 50);
    assert.equal(flag, 50, "listener set flag to 50");

    // if setting max changes value, listener should run
    panel.setNumberParameters("number", 0, 40, 1);
    assert.equal(flag, 40, "max caused listener to set flag to 40");

    // if setting min changes value, listener should run
    panel.setValue("number", 0);
    panel.setNumberParameters("number", 40, 100, 1);
    assert.equal(flag, 40, "min caused listener to set flag to 40");
});
// endregion

//////////////////////////////////
// region  PASSWORD
//////////////////////////////////

QUnit.module("password", {
    before:  function() {
        panel = QuickSettings.create()
            .addPassword("password", "foo", listener);
    },

    beforeEach: function() {
        flag = null;
    },

    after: function() {
        panel.removeControl("password");
        panel.destroy();
    }
});

QUnit.test("set and get", function(assert) {
    // initial value
    assert.equal(panel.getValue("password"), "foo", "initial value foo");

    // set value
    panel.setValue("password", "bar");
    assert.equal(panel.getValue("password"), "bar", "value changed to bar");

});

QUnit.test("listener", function(assert) {
    // initial value
    assert.equal(flag, null, "flag unset. null");

    // set string
    panel.setValue("password", "bar");
    assert.equal(flag, "bar", "listener changed flag to bar");
});
// endregion

//////////////////////////////////
// region  PROGRESSBAR
//////////////////////////////////

QUnit.module("progress", {
    before:  function() {
        panel = QuickSettings.create()
            .addProgressBar("progress", 100, 0);
    },

    after: function() {
        panel.removeControl("progress");
        panel.destroy();
    }
});

QUnit.test("set and get", function(assert) {
    // initial value
    assert.equal(panel.getValue("progress"), 0, "initial value 0");

    // set value
    panel.setValue("progress", 50);
    assert.equal(panel.getValue("progress"), 50, "value changed to 50");

    // set value beyond max
    panel.setValue("progress", 101);
    assert.equal(panel.getValue("progress"), 100, "value clamped to max");

    // set max below value
    panel.setProgressMax("progress", 50);
    assert.equal(panel.getValue("progress"), 50, "value clamped to new max");

    // set value below 0
    panel.setValue("progress", -1);
    assert.equal(panel.getValue("progress"), 0, "value clamped to min");

});
// endregion

//////////////////////////////////
// region  RANGE
//////////////////////////////////

QUnit.module("range", {
    before:  function() {
        panel = QuickSettings.create()
            .addRange("range", 0, 100, 0, 1, listener);
    },

    beforeEach: function() {
        flag = null;
    },

    after: function() {
        panel.removeControl("range");
        panel.destroy();
    }
});

QUnit.test("set and get", function(assert) {

    // initial value
    assert.equal(panel.getValue("range"), 0, "initial value 0");

    // set value
    panel.setValue("range", 50);
    assert.equal(panel.getValue("range"), 50, "value set to 50");
});

QUnit.test("minand max", function(assert) {
    // set value beyond max
    panel.setValue("range", 101);
    assert.equal(panel.getValue("range"), 100, "value clamped to max");

    // set value beyond min
    panel.setValue("range", -1);
    assert.equal(panel.getValue("range"), 0, "value clamped to min");

    // set min above current value
    panel.setRangeParameters("range", 1, 100, 1);
    assert.equal(panel.getValue("range"), 1, "new min. value clamped");

    // set max below current value
    panel.setValue("range", 100);
    panel.setRangeParameters("range", 1, 99, 1);
    assert.equal(panel.getValue("range"), 99, "new max. value clamped");

});

QUnit.test("listener", function(assert) {
    // initial value
    assert.equal(flag, null, "flag unset. null");

    panel.setValue("range", 50);
    assert.equal(flag, 50, "listener set flag to 50");

    // if setting max changes value, listener should run
    panel.setNumberParameters("range", 0, 40, 1);
    assert.equal(flag, 40, "max set flag to 40");

    // if setting min changes value, listener should run
    panel.setValue("range", 0);
    panel.setNumberParameters("range", 40, 100, 1);
    assert.equal(flag, 40, "setting min changes value, listener fires", "min set flag to 40");
});
// endregion

//////////////////////////////////
// region  TEXT
//////////////////////////////////

QUnit.module("text", {
    before:  function() {
        panel = QuickSettings.create()
            .addText("text", "foo", listener);
    },

    beforeEach: function() {
        flag = null;
    },

    after: function() {
        panel.removeControl("text");
        panel.destroy();
    }
});

QUnit.test("set and get", function(assert) {
    // initial value
    assert.equal(panel.getValue("text"), "foo", "initial value foo");

    // set value
    panel.setValue("text", "bar");
    assert.equal(panel.getValue("text"), "bar", "value changed to bar");

});


QUnit.test("listener", function(assert) {
    // initial value
    assert.equal(flag, null, "flag unset. null");

    // set string
    panel.setValue("text", "bar");
    assert.equal(flag, "bar", "listener changed flag to bar");
});
// endregion

//////////////////////////////////
// region  TEXTAREA
//////////////////////////////////

QUnit.module("textArea", {
    before:  function() {
        panel = QuickSettings.create()
            .addTextArea("textArea", "foo", listener);
    },

    beforeEach: function() {
        flag = null;
    },

    after: function() {
        panel.removeControl("textArea");
        panel.destroy();
    }
});

QUnit.test("set and get", function(assert) {
    // initial value
    assert.equal(panel.getValue("textArea"), "foo", "initial value foo");

    // set value
    panel.setValue("textArea", "bar");
    assert.equal(panel.getValue("textArea"), "bar", "value changed to bar");

});


QUnit.test("listener", function(assert) {
    // initial value
    assert.equal(flag, null, "flag unset. null");

    // set string
    panel.setValue("textArea", "bar");
    assert.equal(flag, "bar", "listener changed flag to bar");
});
// endregion

//////////////////////////////////
// region TIME
//////////////////////////////////

QUnit.module("time", {
    before:  function() {
        panel = QuickSettings.create()
            .addTime("time", "12:34:56", listener);
    },

    beforeEach: function() {
        flag = null;
    },

    after: function() {
        panel.removeControl("time");
        panel.destroy();
    }
});

QUnit.test("set and get", function(assert) {
    // initial value
    assert.equal(panel.getValue("time"), "12:34:56", "initial value 12:34:56");

    // set string
    panel.setValue("time", "01:02:03");
    assert.equal(panel.getValue("time"), "01:02:03", "value changed to 01:02:03");

    // set date
    var date = new Date();
    panel.setValue("time", date);
    assert.equal(panel.getValue("time").substr(0, 2), date.getHours(), "date object, hour now");
    assert.equal(panel.getValue("time").substr(3, 2), date.getMinutes(), "date object, minutes now");
    assert.equal(panel.getValue("time").substr(6, 2), date.getSeconds(), "date object, seconds now");
});

QUnit.test("listener", function(assert) {
    // flag not set
    assert.equal(flag, null, "flag not set. null");

    // listen date
    panel.setValue("time", "01:02:03");
    assert.equal(flag, "01:02:03", "flag set to new time");

    // set date
    var date = new Date();
    panel.setValue("time", date);
    assert.equal(flag.substr(0, 2), date.getHours(), "flag set with date object, hour now");
    assert.equal(flag.substr(3, 2), date.getMinutes(), "flag set with date object, minute now");
    assert.equal(flag.substr(6, 2), date.getSeconds(), "flag set with date object, seconds now");

});
// endregion

//////////////////////////////////
// region LOCAL STORAGE
//////////////////////////////////
QUnit.module("local storage", {});

QUnit.test("save and read", function(assert) {
    var panel = QuickSettings.create()
        .addRange("range", 0, 100, 0, 1)
        .saveInLocalStorage("ls_test");
    panel.setValue("range", 39);
    panel.destroy();
    panel = null

    panel = QuickSettings.create()
        .addRange("range", 0, 100, 0, 1)
        .saveInLocalStorage("ls_test");

    assert.equal(panel.getValue("range"), 39, "39 should  be read from previous instance.");

    panel.clearLocalStorage("ls_test");
    panel.destroy();

    panel = QuickSettings.create()
        .addRange("range", 0, 100, 0, 1)
        .saveInLocalStorage("ls_test");

    assert.equal(panel.getValue("range"), 0, "initial value not changed");
    panel.destroy();
});
// endregion

//////////////////////////////////
// region JSON
//////////////////////////////////
QUnit.module("json", {
    beforeEach:  function() {
        panel = QuickSettings.create()
            .addRange("range", 0, 100, 0, 1);
    },

    afterEach: function() {
        panel.destroy();
        panel = null;
    }
});

QUnit.test("get json", function(assert) {
    panel.setValue("range", 50);
    var json = panel.getValuesAsJSON(false);
    assert.equal(json.range, 50, "get json, range property has 50");

    var jsonString = panel.getValuesAsJSON(true);
    assert.equal(jsonString, '{"range":50}', "get json as string. range = 50");

});

QUnit.test("set json", function(assert) {
    panel.setValuesFromJSON({range: 99});
    assert.equal(panel.getValue("range"), 99, "set values with json, range = 99");

    panel.setValuesFromJSON('{"range":73}');
    assert.equal(panel.getValue("range"), 73, "set values with json string. range = 73");
});

// endregion