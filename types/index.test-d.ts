import QuickSettings, { QuickSettingsPanel, AnyModel, DropDownSelection } from "quicksettings";

/**
 * QuickSettings module tests
 * Verify validity of typings for the exported module
 */

// QuickSettings.create
QuickSettings.create(); // $ExpectType QuickSettingsPanel<Record<string, any>>
QuickSettings.create(100); // $ExpectType QuickSettingsPanel<Record<string, any>>
QuickSettings.create(100, 200); // $ExpectType QuickSettingsPanel<Record<string, any>>
QuickSettings.create(100, 200, "Test Panel", document.createElement("div")); // $ExpectType QuickSettingsPanel<Record<string, any>>

// QuickSettings.useExtStyleSheet
QuickSettings.useExtStyleSheet(); // $ExpectType void

// Test QuickSettingsPanel setup
interface TestModel {
  testString: string;
  testNumber: number;
  testBoolean: boolean;
  testDate: string | Date;
}

const testModelFull: TestModel = {
  testString: "foo",
  testNumber: 10,
  testBoolean: true,
  testDate: new Date()
};

const qsAnyModel = QuickSettings.create();
const qsTestModel = QuickSettings.create<TestModel>();

/**
 * QuickSettingsPanel - Model independent methods
 * Verified the typings of methods that are independent of the model of a panel
 * e.g., saveInLocalStorage('name'), show(), hide() etc.
 *
 * Each method is tested with the `qsAnyModel` and `qsTestModel` and the return type
 * is asserted to be the concrete type of the QuickSettingsPane
 */

// QuickSettingsPanel.saveInLocalStorage
qsAnyModel.saveInLocalStorage("foo"); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.saveInLocalStorage("foo"); // $ExpectType QuickSettingsPanel<TestModel>

// QuickSettingsPanel.saveInLocalStorage
qsAnyModel.clearLocalStorage("foo"); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.clearLocalStorage("foo"); // $ExpectType QuickSettingsPanel<TestModel>

// QuickSettingsPanel.setPosition
qsAnyModel.setPosition(100, 100); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.setPosition(100, 100); // $ExpectType QuickSettingsPanel<TestModel>

// QuickSettingsPanel.setSize
qsAnyModel.setSize(100, 100); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.setSize(100, 100); // $ExpectType QuickSettingsPanel<TestModel>

// QuickSettingsPanel.setWidth
qsAnyModel.setWidth(100); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.setWidth(100); // $ExpectType QuickSettingsPanel<TestModel>

// QuickSettingsPanel.setHeight
qsAnyModel.setHeight(100); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.setHeight(100); // $ExpectType QuickSettingsPanel<TestModel>

// QuickSettingsPanel.setDraggable
qsAnyModel.setDraggable(true); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.setDraggable(true); // $ExpectType QuickSettingsPanel<TestModel>

// QuickSettingsPanel.show
qsAnyModel.show(); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.show(); // $ExpectType QuickSettingsPanel<TestModel>

// QuickSettingsPanel.hide
qsAnyModel.hide(); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.hide(); // $ExpectType QuickSettingsPanel<TestModel>

// QuickSettingsPanel.toggleVisibility
qsAnyModel.toggleVisibility(); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.toggleVisibility(); // $ExpectType QuickSettingsPanel<TestModel>

// QuickSettingsPanel.setCollapsible
qsAnyModel.setCollapsible(true); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.setCollapsible(true); // $ExpectType QuickSettingsPanel<TestModel>

// QuickSettingsPanel.collapse
qsAnyModel.collapse(); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.collapse(); // $ExpectType QuickSettingsPanel<TestModel>

// QuickSettingsPanel.expand
qsAnyModel.expand(); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.expand(); // $ExpectType QuickSettingsPanel<TestModel>

// QuickSettingsPanel.toggleCollapsed
qsAnyModel.toggleCollapsed(); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.toggleCollapsed(); // $ExpectType QuickSettingsPanel<TestModel>

// QuickSettingsPanel.setKey
qsAnyModel.setKey("h"); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.setKey("h"); // $ExpectType QuickSettingsPanel<TestModel>

// QuickSettingsPanel.showAllTitle
qsAnyModel.showAllTitles(); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.showAllTitles(); // $ExpectType QuickSettingsPanel<TestModel>

// QuickSettingsPanel.showAllTitled
qsAnyModel.hideAllTitles(); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.hideAllTitles(); // $ExpectType QuickSettingsPanel<TestModel>

/**
 * QuickSettingsPanel – Model mutation / retrieval / save methods
 * Verified the typings of methods related to settings / retrieving / saving
 * the model of a panel.
 *
 * All calls are performed on `qsAnyModel` and `qsTestModel` and the validity of
 * the passed in model data or properties is made sure.
 */

// QuickSettingsPanel.setGlobalChangeHandler
qsAnyModel.setGlobalChangeHandler((model: AnyModel) => {}); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsAnyModel.setGlobalChangeHandler((model: string) => {}); // $ExpectError
qsTestModel.setGlobalChangeHandler((model: TestModel) => {}); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.setGlobalChangeHandler((model: { testNumber: number; testBoolean: boolean; testDate: string | Date }) => {}); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.setGlobalChangeHandler((model: { foo: string }) => {}); // $ExpectError

// QuickSettingsPanel.getValue
qsAnyModel.getValue("testString"); // $ExpectType any
qsTestModel.getValue("testString"); // $ExpectType string
qsTestModel.getValue("testNumber"); // $ExpectType number
qsTestModel.getValue("testDate"); // $ExpectType string | Date

// QuickSettingsPanel.setValue
qsAnyModel.setValue("testString", "foo"); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsAnyModel.setValue("testString", 10); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.setValue("testString", "foo"); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.setValue("testString", 10); // $ExpectError

// QuickSettingsPanel.getValueAsJSON
qsAnyModel.getValuesAsJSON(true); // $ExpectType string
qsAnyModel.getValuesAsJSON(false); // $ExpectType Record<string, any>
qsAnyModel.getValuesAsJSON(); // $ExpectType Record<string, any>
qsTestModel.getValuesAsJSON(true); // $ExpectType string
qsTestModel.getValuesAsJSON(false); // $ExpectType TestModel
qsTestModel.getValuesAsJSON(); // $ExpectType TestModel

// QuickSettingsPanel.setValuesFromJSON
qsAnyModel.setValuesFromJSON('{ "foo": "bar" }'); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsAnyModel.setValuesFromJSON({ foo: "bar" }); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.setValuesFromJSON('{ "foo": "bar" }'); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.setValuesFromJSON({ foo: "bar" }); // $ExpectError
qsTestModel.setValuesFromJSON(testModelFull); // $ExpectType QuickSettingsPanel<TestModel>

/**
 * QuickSettingsPanel – Field modification methods
 * Verifies the typings of methods relating to modifying fields like `enableControl('foo')`,
 * `hideTitle('foo')` or `overrideStyle('foo', 'color', '#fff')`. These methods typically
 * receive the name of a field.
 *
 * The methods are called on `qsAnyModel` with an arbitrary name and on `qsTestModel` with a
 * key from the model and another arbitrary key which should cause an error.
 */

// QuickSettingsPanel.removeControl
qsAnyModel.removeControl("foo"); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.removeControl("testString"); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.removeControl("foo"); // $ExpectError

// QuickSettingsPanel.enableControl
qsAnyModel.enableControl("foo"); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.enableControl("testString"); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.enableControl("foo"); // $ExpectError

// QuickSettingsPanel.disableControl
qsAnyModel.disableControl("foo"); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.disableControl("testString"); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.disableControl("foo"); // $ExpectError

// QuickSettingsPanel.hideControl
qsAnyModel.hideControl("foo"); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.hideControl("testString"); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.hideControl("foo"); // $ExpectError

// QuickSettingsPanel.showControl
qsAnyModel.showControl("foo"); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.showControl("testString"); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.showControl("foo"); // $ExpectError

// QuickSettingsPanel.overrideStyle
qsAnyModel.overrideStyle("foo", "color", "#fff"); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.overrideStyle("testString", "color", "#fff"); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.overrideStyle("foo", "color", "#fff"); // $ExpectError

// QuickSettingsPanel.hideTitle
qsAnyModel.hideTitle("foo"); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.hideTitle("testString"); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.hideTitle("foo"); // $ExpectError

// QuickSettingsPanel.showTitle
qsAnyModel.showTitle("foo"); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.showTitle("testString"); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.showTitle("foo"); // $ExpectError

/**
 * QuickSettingsPanel – Field creation methods
 * Verified the typings of methods that add fields with a callback or by calling the
 * corresponding `bind` method to attach a field to an object.
 *
 * These methods are called on `qsAnyModel` and `qsModelTest` with the objectives of verifying that:
 * -  only keys from the model type are accepted whose type corresponds to
 *    the type of the field (e.g., `addText(title)` expects a title which is mapped to a string in the model)
 *    This does not apply to `qsAnyModel` where all keys are expected
 * -  the callbacks passed to `add` methods have the correct argument type for `value`
 * -  the `bind` methods expect an object to bind to which contains a property named after the `title` argument
 *    and has the type of the respective field (e.g. `bindText('foo', 'bar')` is expected to receive an object
 *    extending `{ foo: string; }`)
 */

// QuickSettingsPanel.addBoolean
qsAnyModel.addBoolean("foo", true, (value: boolean) => {}); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsAnyModel.addBoolean("foo", 10, (value: number) => {}); // $ExpectError

qsTestModel.addBoolean("testBoolean", true, (value: boolean) => {}); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.addBoolean("foo", true, (value: boolean) => {}); // $ExpectError
qsTestModel.addBoolean("testNumber", true, (value: boolean) => {}); // $ExpectError
qsTestModel.addBoolean("testBoolean", 10, (value: number) => {}); // $ExpectError

// QuickSettingsPanel.bindBoolean
qsAnyModel.bindBoolean("foo", true, { foo: false }); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsAnyModel.bindBoolean("foo", true, { baz: false }); // $ExpectError
qsAnyModel.bindBoolean("foo", 10, { foo: 10 }); // $ExpectError

qsTestModel.bindBoolean("testBoolean", true, { testBoolean: false }); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.bindBoolean("foo", true, { foo: false }); // $ExpectError
qsTestModel.bindBoolean("testBoolean", true, { foo: false }); // $ExpectError
qsTestModel.bindBoolean("testBoolean", 10, { testBoolean: 10 }); // $ExpectError

// QuickSettingsPanel.addText
qsAnyModel.addText("foo", "bar", (value: string) => {}); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsAnyModel.addText("foo", 10, (value: number) => {}); // $ExpectError

qsTestModel.addText("testString", "bar", (value: string) => {}); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.addText("foo", "bar", (value: string) => {}); // $ExpectError
qsTestModel.addText("testNumber", "bar", (value: string) => {}); // $ExpectError
qsTestModel.addText("testString", 10, (value: number) => {}); // $ExpectError

// QuickSettingsPanel.bindText
qsAnyModel.bindText("foo", "bar", { foo: "bar" }); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsAnyModel.bindText("foo", "bar", { baz: "bar" }); // $ExpectError
qsAnyModel.bindText("foo", 10, { foo: 10 }); // $ExpectError

qsTestModel.bindText("testString", "bar", { testString: "baz" }); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.bindText("foo", "bar", { baz: "bar" }); // $ExpectError
qsTestModel.bindText("testString", "bar", { foo: "bar" }); // $ExpectError
qsTestModel.bindText("testString", 10, { testString: 10 }); // $ExpectError

// QuickSettingsPanel.addColor
qsAnyModel.addColor("foo", "bar", (value: string) => {}); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsAnyModel.addColor("foo", 10, (value: number) => {}); // $ExpectError

qsTestModel.addColor("testString", "bar", (value: string) => {}); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.addColor("foo", "bar", (value: string) => {}); // $ExpectError
qsTestModel.addColor("testNumber", "bar", (value: string) => {}); // $ExpectError
qsTestModel.addColor("testString", 10, (value: number) => {}); // $ExpectError

// QuickSettingsPanel.bindColor
qsAnyModel.bindColor("foo", "bar", { foo: "bar" }); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsAnyModel.bindColor("foo", "bar", { baz: "bar" }); // $ExpectError
qsAnyModel.bindColor("foo", 10, { foo: 10 }); // $ExpectError

qsTestModel.bindColor("testString", "bar", { testString: "baz" }); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.bindColor("foo", "bar", { baz: "bar" }); // $ExpectError
qsTestModel.bindColor("testString", "bar", { foo: "bar" }); // $ExpectError
qsTestModel.bindColor("testString", 10, { testString: 10 }); // $ExpectError

// QuickSettingsPanel.addPassword
qsAnyModel.addPassword("foo", "bar", (value: string) => {}); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsAnyModel.addPassword("foo", 10, (value: number) => {}); // $ExpectError

qsTestModel.addPassword("testString", "bar", (value: string) => {}); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.addPassword("foo", "bar", (value: string) => {}); // $ExpectError
qsTestModel.addPassword("testNumber", "bar", (value: string) => {}); // $ExpectError
qsTestModel.addPassword("testString", 10, (value: number) => {}); // $ExpectError

// QuickSettingsPanel.bindPassword
qsAnyModel.bindPassword("foo", "bar", { foo: "bar" }); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsAnyModel.bindPassword("foo", "bar", { baz: "bar" }); // $ExpectError
qsAnyModel.bindPassword("foo", 10, { foo: 10 }); // $ExpectError

qsTestModel.bindPassword("testString", "bar", { testString: "baz" }); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.bindPassword("foo", "bar", { baz: "bar" }); // $ExpectError
qsTestModel.bindPassword("testString", "bar", { foo: "bar" }); // $ExpectError
qsTestModel.bindPassword("testString", 10, { testString: 10 }); // $ExpectError

// QuickSettingsPanel.addTextArea
qsAnyModel.addTextArea("foo", "bar", (value: string) => {}); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsAnyModel.addTextArea("foo", 10, (value: number) => {}); // $ExpectError

qsTestModel.addTextArea("testString", "bar", (value: string) => {}); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.addTextArea("foo", "bar", (value: string) => {}); // $ExpectError
qsTestModel.addTextArea("testNumber", "bar", (value: string) => {}); // $ExpectError
qsTestModel.addTextArea("testString", 10, (value: number) => {}); // $ExpectError

// QuickSettingsPanel.bindTextArea
qsAnyModel.bindTextArea("foo", "bar", { foo: "bar" }); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsAnyModel.bindTextArea("foo", "bar", { baz: "bar" }); // $ExpectError
qsAnyModel.bindTextArea("foo", 10, { foo: 10 }); // $ExpectError

qsTestModel.bindTextArea("testString", "bar", { testString: "baz" }); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.bindTextArea("foo", "bar", { baz: "bar" }); // $ExpectError
qsTestModel.bindTextArea("testString", "bar", { foo: "bar" }); // $ExpectError
qsTestModel.bindTextArea("testString", 10, { testString: 10 }); // $ExpectError

// QuickSettingsPanel.setTextAreaRows
qsAnyModel.setTextAreaRows("foo", 10); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.setTextAreaRows("testString", 10); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.setTextAreaRows("foo", 10); // $ExpectError

// QuickSettingsPanel.addDate
{
  qsAnyModel.addDate("myDateProperty", "2019-12-30", (value: string) => {}); // $ExpectType QuickSettingsPanel<Record<string, any>>
  qsAnyModel.addDate("myDateProperty", new Date("2019-12-30"), (value: Date) => {}); // $ExpectType QuickSettingsPanel<Record<string, any>>
  qsAnyModel.addDate("myDateProperty", "2019-12-30", (value: Date) => {}); // $ExpectError
  qsAnyModel.addDate("myDateProperty", new Date(), (value: string) => {}); // $ExpectError

  interface TestModelDate {
    testString: string;
    testDate: Date;
    testDateOrString: Date | string;
  }

  const qsTestModelDate = QuickSettings.create<TestModelDate>();
  qsTestModelDate.addDate("testString", "2019-12-30", (value: string) => {}); // $ExpectType QuickSettingsPanel<TestModelDate>
  qsTestModelDate.addDate("testString", new Date("2019-12-30"), (value: Date) => {}); // $ExpectError
  qsTestModelDate.addDate("testDate", "2019-12-30", (value: string) => {}); // $ExpectError
  qsTestModelDate.addDate("testDateOrString", "2019-12-30", (value: string) => {});
  qsTestModelDate.addDate("testDateOrString", new Date("2019-12-30"), (value: Date) => {});
  qsTestModelDate.addDate("testDateOrString", new Date("2019-12-30"), (value: string) => {}); // $ExpectError
  qsTestModelDate.addDate("testDateOrString", "2019-12-31", (value: Date) => {}); // $ExpectError
}

// QuickSettingsPanel.bindDate
{
  // $ExpectType QuickSettingsPanel<Record<string, any>>
  qsAnyModel.bindDate("myDateProperty", "2019-12-30", {
    myDateProperty: "2019-12-31"
  });

  // $ExpectType QuickSettingsPanel<Record<string, any>>
  qsAnyModel.bindDate("myDateProperty", new Date("2019-12-30"), {
    myDateProperty: new Date()
  });

  // $ExpectError
  qsAnyModel.bindDate("myDateProperty", "2019-12-30", { myDateProperty: new Date() });

  // $ExpectError
  qsAnyModel.bindDate("myDateProperty", new Date(), { myDateProperty: "2019-12-31" });

  // $ExpectError
  qsAnyModel.bindDate("myDateProperty", new Date(), { foo: new Date() });

  interface TestModelDate {
    testString: string;
    testDate: Date;
    testDateOrString: Date | string;
  }

  const qsTestModelDate = QuickSettings.create<TestModelDate>();
  qsTestModelDate.bindDate("testString", "2019-12-30", {
    testString: "2019-12-31"
  });

  // $ExpectError
  qsTestModelDate.bindDate("testString", new Date("2019-12-30"), { testString: new Date() });

  // $ExpectError
  qsTestModelDate.bindDate("testDate", "2019-12-30", { testDate: "2019-12-30" });

  // $ExpectType QuickSettingsPanel<TestModelDate>
  qsTestModelDate.bindDate("testDateOrString", "2019-12-30", { testDateOrString: "2019-12-31" });

  // $ExpectType QuickSettingsPanel<TestModelDate>
  qsTestModelDate.bindDate("testDateOrString", new Date("2019-12-30"), { testDateOrString: new Date() });

  // $ExpectError
  qsTestModelDate.bindDate("testDateOrString", new Date("2019-12-30"), { testDateOrString: "2019-12-31" });

  // $ExpectError
  qsTestModelDate.bindDate("testDateOrString", "2019-12-31", { testDateOrString: new Date() });
}

// QuickSettingsPanel.addTime
{
  qsAnyModel.addTime("myDateProperty", "01:00:00", (value: string) => {}); // $ExpectType QuickSettingsPanel<Record<string, any>>
  qsAnyModel.addTime("myDateProperty", new Date("01:00:00"), (value: Date) => {}); // $ExpectType QuickSettingsPanel<Record<string, any>>
  qsAnyModel.addTime("myDateProperty", "01:00:00", (value: Date) => {}); // $ExpectError
  qsAnyModel.addTime("myDateProperty", new Date(), (value: string) => {}); // $ExpectError

  interface TestModelDate {
    testString: string;
    testDate: Date;
    testDateOrString: Date | string;
  }

  const qsTestModelDate = QuickSettings.create<TestModelDate>();
  qsTestModelDate.addTime("testString", "01:00:00", (value: string) => {}); // $ExpectType QuickSettingsPanel<TestModelDate>
  qsTestModelDate.addTime("testString", new Date("01:00:00"), (value: Date) => {}); // $ExpectError
  qsTestModelDate.addTime("testDate", "01:00:00", (value: string) => {}); // $ExpectError
  qsTestModelDate.addTime("testDateOrString", "01:00:00", (value: string) => {});
  qsTestModelDate.addTime("testDateOrString", new Date("01:00:00"), (value: Date) => {});
  qsTestModelDate.addTime("testDateOrString", new Date("01:00:00"), (value: string) => {}); // $ExpectError
  qsTestModelDate.addTime("testDateOrString", "02:00:00", (value: Date) => {}); // $ExpectError
}


// QuickSettingsPanel.bindTime
{
  // $ExpectType QuickSettingsPanel<Record<string, any>>
  qsAnyModel.bindTime("myDateProperty", "01:00:00", {
    myDateProperty: "02:00:00"
  });

  // $ExpectType QuickSettingsPanel<Record<string, any>>
  qsAnyModel.bindTime("myDateProperty", new Date("01:00:00"), {
    myDateProperty: new Date()
  });

  // $ExpectError
  qsAnyModel.bindTime("myDateProperty", "01:00:00", { myDateProperty: new Date() });

  // $ExpectError
  qsAnyModel.bindTime("myDateProperty", new Date(), { myDateProperty: "02:00:00" });

  // $ExpectError
  qsAnyModel.bindTime("myDateProperty", new Date(), { foo: new Date() });

  interface TestModelDate {
    testString: string;
    testDate: Date;
    testDateOrString: Date | string;
  }

  const qsTestModelDate = QuickSettings.create<TestModelDate>();
  qsTestModelDate.bindTime("testString", "01:00:00", {
    testString: "02:00:00"
  });

  // $ExpectError
  qsTestModelDate.bindTime("testString", new Date("01:00:00"), { testString: new Date() });

  // $ExpectError
  qsTestModelDate.bindTime("testDate", "01:00:00", { testDate: "01:00:00" });

  // $ExpectType QuickSettingsPanel<TestModelDate>
  qsTestModelDate.bindTime("testDateOrString", "01:00:00", { testDateOrString: "02:00:00" });

  // $ExpectType QuickSettingsPanel<TestModelDate>
  qsTestModelDate.bindTime("testDateOrString", new Date("01:00:00"), { testDateOrString: new Date() });

  // $ExpectError
  qsTestModelDate.bindTime("testDateOrString", new Date("01:00:00"), { testDateOrString: "02:00:00" });

  // $ExpectError
  qsTestModelDate.bindTime("testDateOrString", "02:00:00", { testDateOrString: new Date() });
}

// QuickSettingsPanel.addDropDown
{
  interface TestModelDropDown {
    testString: string;
    testNumber: number;
    testStringOrNumber: string | number;
    testComplex: {
      foo: string;
    };
  }

  const qsDropDown = QuickSettings.create<TestModelDropDown>();

  // $ExpectType QuickSettingsPanel<TestModelDropDown>
  qsDropDown.addDropDown("testString", ["one", "two", "three"], (value: DropDownSelection<string>) => {});
  qsDropDown.addDropDown(
    "testString",
    [
      { label: "Opt 1", value: "one" },
      { label: "Opt 2", value: "two" },
      { label: "Opt 3", value: "3" }
    ],
    (value: DropDownSelection<string>) => {}
  );

  // $ExpectType QuickSettingsPanel<TestModelDropDown>
  qsDropDown.addDropDown("testNumber", [1, 2, 3], (value: DropDownSelection<number>) => {});

  // $ExpectType QuickSettingsPanel<TestModelDropDown>
  qsDropDown.addDropDown(
    "testNumber",
    [
      { label: "Opt 1", value: 1 },
      { label: "Opt 2", value: 2 },
      { label: "Opt 3", value: 3 }
    ],
    (value: DropDownSelection<number>) => {}
  );

  // $ExpectType QuickSettingsPanel<TestModelDropDown>
  qsDropDown.addDropDown("testStringOrNumber", [1, "two", 3], (value: DropDownSelection<string | number>) => {});

  // $ExpectType QuickSettingsPanel<TestModelDropDown>
  qsDropDown.addDropDown(
    "testStringOrNumber",
    [
      { label: "Opt 1", value: 1 },
      { label: "Opt 2", value: "two" },
      { label: "Opt 3", value: 3 }
    ],
    (value: DropDownSelection<string | number>) => {}
  );

  // $ExpectType QuickSettingsPanel<TestModelDropDown>
  qsDropDown.addDropDown(
    "testComplex",
    [
      { label: "Opt 1", value: { foo: "one" } },
      { label: "Opt 2", value: { foo: "two" } },
      { label: "Opt 3", value: { foo: "three" } }
    ],
    (value: DropDownSelection<{ foo: string }>) => {}
  );

  // $ExpectType QuickSettingsPanel<TestModelDropDown>
  qsDropDown.addDropDown("testString", ["one", { label: "Opt 2", value: "two" }, "three"], (value: DropDownSelection<string>) => {});

  // $ExpectError
  qsDropDown.addDropDown("testString", [1, 2, 3], (value: DropDownSelection<number>) => {});
  // $ExpectError
  qsDropDown.addDropDown("testNumber", ["one", "two", "three"], (value: DropDownSelection<string>) => {});
  // $ExpectError
  qsDropDown.addDropDown("testString", [1, "two", 3], (value: DropDownSelection<string | number>) => {});
  // $ExpectError
  qsDropDown.addDropDown("testComplex", [{ foo: "one" }, { foo: "two" }, { foo: "three" }], (value: DropDownSelection<{ foo: string }>) => {});
  // $ExpectError
  qsDropDown.addDropDown("testString", ["one", { label: "Opt 2", value: 2 }, "three"], (value: DropDownSelection<string>) => {});
}

// QuickSettingsPanel.bindDropDown
{
  interface TestModelDropDown {
    testString: string;
    testNumber: number;
    testStringOrNumber: string | number;
    testComplex: {
      foo: string;
    };
  }

  const qsDropDown = QuickSettings.create<TestModelDropDown>();

  // $ExpectType QuickSettingsPanel<TestModelDropDown>
  qsDropDown.bindDropDown("testString", ["one", "two", "three"], { testString: "one" });
  qsDropDown.bindDropDown(
    "testString",
    [
      { label: "Opt 1", value: "one" },
      { label: "Opt 2", value: "two" },
      { label: "Opt 3", value: "3" }
    ],
    {
      testString: "one"
    }
  );

  // $ExpectType QuickSettingsPanel<TestModelDropDown>
  qsDropDown.bindDropDown("testNumber", [1, 2, 3], { testNumber: 10 });

  // $ExpectError
  qsDropDown.bindDropDown("testNumber", [1, 2, 3], { testNumber: "foo" });

  // $ExpectType QuickSettingsPanel<TestModelDropDown>
  qsDropDown.bindDropDown(
    "testNumber",
    [
      { label: "Opt 1", value: 1 },
      { label: "Opt 2", value: 2 },
      { label: "Opt 3", value: 3 }
    ],
    {
      testNumber: 10
    }
  );

  // $ExpectType QuickSettingsPanel<TestModelDropDown>
  qsDropDown.bindDropDown("testStringOrNumber", [1, "two", 3], { testStringOrNumber: 1 });

  // $ExpectType QuickSettingsPanel<TestModelDropDown>
  qsDropDown.bindDropDown("testStringOrNumber", [1, "two", 3], { testStringOrNumber: "two" });

  // $ExpectType QuickSettingsPanel<TestModelDropDown>
  qsDropDown.bindDropDown(
    "testStringOrNumber",
    [
      { label: "Opt 1", value: 1 },
      { label: "Opt 2", value: "two" },
      { label: "Opt 3", value: 3 }
    ],
    { testStringOrNumber: 1 }
  );

  // $ExpectType QuickSettingsPanel<TestModelDropDown>
  qsDropDown.bindDropDown(
    "testComplex",
    [
      { label: "Opt 1", value: { foo: "one" } },
      { label: "Opt 2", value: { foo: "two" } },
      { label: "Opt 3", value: { foo: "three" } }
    ],
    { testComplex: { foo: "bar" } }
  );

  // $ExpectType QuickSettingsPanel<TestModelDropDown>
  qsDropDown.bindDropDown("testString", ["one", { label: "Opt 2", value: "two" }, "three"], { testString: "foo" });

  // $ExpectError
  qsDropDown.bindDropDown("testString", [1, 2, 3], { testString: "foo" });
  // $ExpectError
  qsDropDown.bindDropDown("testNumber", ["one", "two", "three"], { testNumber: 10 });
  // $ExpectError
  qsDropDown.bindDropDown("testString", [1, "two", 3], { testString: "foo" });
  // $ExpectError
  qsDropDown.bindDropDown("testComplex", [{ foo: "one" }, { foo: "two" }, { foo: "three" }], { testComplex: { foo: "bar" } });
  // $ExpectError
  qsDropDown.bindDropDown("testString", ["one", { label: "Opt 2", value: 2 }, "three"], { testString: "foo" });
}
