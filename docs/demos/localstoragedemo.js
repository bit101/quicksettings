window.onload = function() {
	var settings = QuickSettings.create(20, 20, "Settings")
		.addRange("range", 0, 100, 50, 1)
		.addText("text", "hello world")
		.addColor("color", "#ff0000")
		.addBoolean("boolean", true)
		.addHTML("info", "Change values, refresh page. Your custom values will have been retained via local storage.")
		.saveInLocalStorage("localstoragedemo");

}
