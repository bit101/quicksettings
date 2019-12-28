import { expectType, expectError } from "tsd";
import QuickSettings, { QuickSettingsPanel } from "./quicksettings";

// create
expectType<QuickSettingsPanel>(QuickSettings.create());
expectType<QuickSettingsPanel>(QuickSettings.create(100));
expectType<QuickSettingsPanel>(QuickSettings.create(100, 200));
expectType<QuickSettingsPanel>(
  QuickSettings.create(100, 200, "Test Panel", document.createElement("div"))
);

// useExtStyleSheet
expectType<void>(QuickSettings.useExtStyleSheet());

// Get value generic
const qsGeneric = QuickSettings.create();
expectType<unknown>(qsGeneric.getValue("foo"));
