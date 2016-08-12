(function() {

	var jsonText = document.getElementById("json"),
		btn = document.getElementById("makeit"),
		killBtn = document.getElementById("killit"),
		panel;

	killBtn.addEventListener("click", function() {
		if(panel) {
			panel.destroy();
			panel = null;
		}
	});

	btn.addEventListener("click", function() {
		if(panel) {
			panel.destroy();
			panel = null;
		}
		var json = jsonText.value;
		panel = QuickSettings.parse(json, null);
	});


})();