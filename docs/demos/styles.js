
(function() {

	var controller = {
		onStyle: function(data) {
			var styleTag = document.getElementById("qs_styles");
			if(data.value === "defaultStyle") {
				styleTag.href = "quicksettings.css";
			}
			else {
				styleTag.href = "quicksettings_" + data.value + ".css";
			}
		},
		onRange: function(value) {
			panel.setValue("progress", value);
		},

		onColor: function(value) {
			document.body.style.backgroundColor = value;
		},

		onClick: function() {
			console.log(panel.getValuesAsJSON(true));
		}
	};

	QuickSettings.useExtStyleSheet();
	var panel = QuickSettings.create(20, 20, "test")
		.setDraggable(true)
		.setCollapsible(true)
		.addDropDown("style", [
					"defaultStyle",
					"black",
					"white",
					"tiny",
					"tiny_white",
					"tiny_black"
				], controller.onStyle)
		.addRange("range", 0, 100, 50, 1, controller.onRange)
		.addNumber("number", 0, 100, 50, 1, controller.onRange)
		.addBoolean("boolean", true)
		.addButton("button", controller.onClick)
		.addColor("color", "#ffff00", controller.onColor)
		.addText("text", "whatever")
		.addPassword("password", "whatever")
		.addTextArea("text area", "whatever")
		.addDate("date", new Date())
		.addTime("time", new Date())
		.addImage("image", "http://d39kbiy71leyho.cloudfront.net/wp-content/uploads/2016/05/09170020/cats-politics-TN.jpg")
		.addProgressBar("progress", 100, 50, "percent")
		.addHTML("html", "<i>this</i> is <u>html</u><ul><li>one</li><li>two</li><li>three</li></ul>");

})();