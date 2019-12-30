import QuickSettings, { QuickSettingsPanel, AnyModel, DropDownSelection } from "quicksettings";

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

// QuickSettingsPanel.setGlobalChangeHandler
qsAnyModel.setGlobalChangeHandler((model: AnyModel) => {}); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsAnyModel.setGlobalChangeHandler((model: string) => {}); // $ExpectError
qsTestModel.setGlobalChangeHandler((model: TestModel) => {}); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.setGlobalChangeHandler((model: { testNumber: number; testBoolean: boolean; testDate: string | Date }) => {}); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.setGlobalChangeHandler((model: { foo: string }) => {}); // $ExpectError

// QuickSettingsPanel.disableControl
qsAnyModel.disableControl("foo"); // $ExpectType QuickSettingsPanel<Record<string, any>>
qsTestModel.disableControl("testString"); // $ExpectType QuickSettingsPanel<TestModel>
qsTestModel.disableControl("foo"); // $ExpectError

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
