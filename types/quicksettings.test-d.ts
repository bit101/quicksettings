import { expectType, expectError } from "tsd";

import QuickSettings, { QuickSettingsPanel, AnyValue, AnyModel, ChangeHandler } from "./quicksettings";

// QuickSettings.create
expectType<QuickSettingsPanel>(QuickSettings.create());
expectType<QuickSettingsPanel>(QuickSettings.create(100));
expectType<QuickSettingsPanel>(QuickSettings.create(100, 200));
expectType<QuickSettingsPanel>(QuickSettings.create(100, 200, "Test Panel", document.createElement("div")));

// QuickSettings.useExtStyleSheet
expectType<void>(QuickSettings.useExtStyleSheet());

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
expectType<AnyValue>(qsAnyModel.getValue("testString"));
expectType<string>(qsTestModel.getValue("testString"));
expectType<number>(qsTestModel.getValue("testNumber"));
expectType<string | Date>(qsTestModel.getValue("testDate"));

// QuickSettingsPanel.setValue
expectType<typeof qsAnyModel>(qsAnyModel.setValue("testString", "foo"));
expectType<typeof qsAnyModel>(qsAnyModel.setValue("testString", 10));
expectType<typeof qsTestModel>(qsTestModel.setValue("testString", "foo"));
expectError(qsTestModel.setValue("testString", 10));

// QuickSettingsPanel.getValueAsJSON
expectType<string>(qsAnyModel.getValuesAsJSON(true));
expectType<AnyModel>(qsAnyModel.getValuesAsJSON(false));
expectType<AnyModel>(qsAnyModel.getValuesAsJSON());
expectType<string>(qsTestModel.getValuesAsJSON(true));
expectType<TestModel>(qsTestModel.getValuesAsJSON(false));
expectType<TestModel>(qsTestModel.getValuesAsJSON());

// QuickSettingsPanel.setValuesFromJSON
expectType<typeof qsAnyModel>(qsAnyModel.setValuesFromJSON('{ "foo": "bar" }'));
expectType<typeof qsAnyModel>(qsAnyModel.setValuesFromJSON({ foo: "bar" }));
expectType<typeof qsTestModel>(qsTestModel.setValuesFromJSON('{ "foo": "bar" }'));
expectError(qsTestModel.setValuesFromJSON({ foo: "bar" }));
expectType<typeof qsTestModel>(qsTestModel.setValuesFromJSON(testModelFull));

// QuickSettingsPanel.setGlobalChangeHandler
expectType<typeof qsAnyModel>(qsAnyModel.setGlobalChangeHandler((model: AnyModel) => {}));
expectError(qsAnyModel.setGlobalChangeHandler((model: string) => {}));
expectType<typeof qsTestModel>(qsTestModel.setGlobalChangeHandler((model: TestModel) => {}));
expectType<typeof qsTestModel>(qsTestModel.setGlobalChangeHandler((model: Omit<TestModel, "testString">) => {}));
expectError(qsTestModel.setGlobalChangeHandler((model: { foo: string }) => {}));

// QuickSettingsPanel.disableControl
expectType<(title: string) => typeof qsAnyModel>(qsAnyModel.disableControl);
expectType<(title: keyof TestModel) => typeof qsTestModel>(qsTestModel.disableControl);
expectType<typeof qsAnyModel>(qsAnyModel.disableControl("foo"));
expectType<typeof qsTestModel>(qsTestModel.disableControl("testString"));
expectError(qsTestModel.disableControl("foo"));

// QuickSettingsPanel.addText
expectType<(title: string, value: string, callback?: ChangeHandler<string>) => typeof qsAnyModel>(qsAnyModel.addText);
expectType<typeof qsAnyModel>(qsAnyModel.addText("foo", "bar", (value: string) => {}));
expectError<typeof qsAnyModel>(qsAnyModel.addText("foo", 10, (value: number) => {}));

expectType<(title: "testString", value: string, callback?: ChangeHandler<string>) => typeof qsTestModel>(
  qsTestModel.addText
);
expectType<typeof qsTestModel>(qsTestModel.addText("testString", "bar", (value: string) => {}));
expectError<typeof qsTestModel>(qsTestModel.addText("foo", "bar", (value: string) => {}));
expectError<typeof qsTestModel>(qsTestModel.addText("testNumber", "bar", (value: string) => {}));
expectError<typeof qsTestModel>(qsTestModel.addText("testString", 10, (value: number) => {}));

// QuickSettingsPanel.bindText
expectType<typeof qsAnyModel>(qsAnyModel.bindText("foo", "bar", { foo: "bar" }));
expectError(qsAnyModel.bindText("foo", "bar", { baz: "bar" }));
expectError(qsAnyModel.bindText("foo", 10, { foo: 10 }));

expectType<typeof qsTestModel>(qsTestModel.bindText("testString", "bar", { testString: "baz" }));
expectError(qsTestModel.bindText("foo", "bar", { baz: "bar" }));
expectError(qsTestModel.bindText("testString", "bar", { foo: "bar" }));
expectError(qsTestModel.bindText("testString", 10, { testString: 10 }));

// QuickSettingsPanel.addDate
{
  expectType<typeof qsAnyModel>(qsAnyModel.addDate("myDateProperty", "2019-12-30", (value: string) => {}));
  expectType<typeof qsAnyModel>(qsAnyModel.addDate("myDateProperty", new Date("2019-12-30"), (value: Date) => {}));
  expectError(qsAnyModel.addDate("myDateProperty", "2019-12-30", (value: Date) => {}));
  expectError(qsAnyModel.addDate("myDateProperty", new Date(), (value: string) => {}));

  interface TestModelDate {
    testString: string;
    testDate: Date;
    testDateOrString: Date | string;
  }

  const qsTestModelDate = QuickSettings.create<TestModelDate>();
  expectType<typeof qsTestModelDate>(qsTestModelDate.addDate("testString", "2019-12-30", (value: string) => {}));
  expectError(qsTestModelDate.addDate("testString", new Date("2019-12-30"), (value: Date) => {}));
  expectError(qsTestModelDate.addDate("testDate", "2019-12-30", (value: string) => {}));
  expectType(qsTestModelDate.addDate("testDateOrString", "2019-12-30", (value: string) => {}));
  expectType(qsTestModelDate.addDate("testDateOrString", new Date("2019-12-30"), (value: Date) => {}));
  expectError(qsTestModelDate.addDate("testDateOrString", new Date("2019-12-30"), (value: string) => {}));
  expectError(qsTestModelDate.addDate("testDateOrString", "2019-12-31", (value: Date) => {}));
}

// QuickSettingsPanel.bindDate
{
  expectType<typeof qsAnyModel>(qsAnyModel.bindDate("myDateProperty", "2019-12-30", { myDateProperty: "2019-12-31" }));
  expectType<typeof qsAnyModel>(
    qsAnyModel.bindDate("myDateProperty", new Date("2019-12-30"), { myDateProperty: new Date() })
  );
  expectError(qsAnyModel.bindDate("myDateProperty", "2019-12-30", { myDateProperty: new Date() }));
  expectError(qsAnyModel.bindDate("myDateProperty", new Date(), { myDateProperty: "2019-12-31" }));
  expectError(qsAnyModel.bindDate("myDateProperty", new Date(), { foo: new Date() }));

  interface TestModelDate {
    testString: string;
    testDate: Date;
    testDateOrString: Date | string;
  }

  const qsTestModelDate = QuickSettings.create<TestModelDate>();
  expectType<typeof qsTestModelDate>(
    qsTestModelDate.bindDate("testString", "2019-12-30", { testString: "2019-12-31" })
  );
  expectError(qsTestModelDate.bindDate("testString", new Date("2019-12-30"), { testString: new Date() }));
  expectError(qsTestModelDate.bindDate("testDate", "2019-12-30", { testDate: "2019-12-30" }));
  expectType(qsTestModelDate.bindDate("testDateOrString", "2019-12-30", { testDateOrString: "2019-12-31" }));
  expectType(qsTestModelDate.bindDate("testDateOrString", new Date("2019-12-30"), { testDateOrString: new Date() }));
  expectError(qsTestModelDate.bindDate("testDateOrString", new Date("2019-12-30"), { testDateOrString: "2019-12-31" }));
  expectError(qsTestModelDate.bindDate("testDateOrString", "2019-12-31", { testDateOrString: new Date() }));
}
