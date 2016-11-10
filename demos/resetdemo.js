window.onload = function() {
	var settings = QuickSettings.create(20, 20, "Settings")
		.addRange("range", 0, 100, 50, 1)
		.addText("text", "hello world")
		.addColor("color", "#ff0000")
		.addBoolean("boolean", true)
		.addButton("reset", function() {
			settings.setValuesFromJSON(defaultValues);
		});

	var defaultValues = settings.getValuesAsJSON();

}
