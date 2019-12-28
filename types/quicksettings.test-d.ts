import { expectType, expectError } from "tsd";
import QuickSettings, {
  QuickSettingsPanel,
  AnyValue,
  AnyModel
} from "./quicksettings";

// QuickSettings.create
expectType<QuickSettingsPanel>(QuickSettings.create());
expectType<QuickSettingsPanel>(QuickSettings.create(100));
expectType<QuickSettingsPanel>(QuickSettings.create(100, 200));
expectType<QuickSettingsPanel>(
  QuickSettings.create(100, 200, "Test Panel", document.createElement("div"))
);

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
expectType<typeof qsTestModel>(
  qsTestModel.setValuesFromJSON('{ "foo": "bar" }')
);
expectError(qsTestModel.setValuesFromJSON({ foo: "bar" }));
expectType<typeof qsTestModel>(qsTestModel.setValuesFromJSON(testModelFull));

// QuickSettingsPanel.setGlobalChangeHandler
expectType<typeof qsAnyModel>(
  qsAnyModel.setGlobalChangeHandler((nextModel: AnyModel) => {})
);
expectError(qsAnyModel.setGlobalChangeHandler((nextModel: string) => {}));
expectType<typeof qsTestModel>(
  qsTestModel.setGlobalChangeHandler((nextModel: TestModel) => {})
);
expectType<typeof qsTestModel>(
  qsTestModel.setGlobalChangeHandler(
    (nextModel: Omit<TestModel, "testString">) => {}
  )
);
expectError(qsTestModel.setGlobalChangeHandler((nextModel: AnyModel) => {}));
expectError(
  qsTestModel.setGlobalChangeHandler((nextModel: { foo: string }) => {})
);

// QuickSettingsPanel.disableControl
expectType<(title: string) => typeof qsAnyModel>(qsAnyModel.disableControl);
expectType<(title: keyof TestModel) => typeof qsTestModel>(
  qsTestModel.disableControl
);
expectType<typeof qsAnyModel>(qsAnyModel.disableControl("foo"));
expectType<typeof qsTestModel>(qsTestModel.disableControl("testString"));
expectError(qsTestModel.disableControl("foo"));
