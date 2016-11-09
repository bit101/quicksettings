window.onload = function() {

	var panel1 = QuickSettings.create(10, 10, "Panel 1")
		.addRange("Range", 0, 100, 30, 1, function(value) { output("Range", value)})
		.addNumber("Number", 0, 100, 50, 1, function(value) { output("Number", value)})
		.addColor("Color", "#ff0000", function(value) { output("Color", value)})
		.addBoolean("Boolean", true, function(value) { output("Boolean", value)})
		.addText("Text", "some text", function(value) { output("Text", value)})
		.addTextArea("TextArea", "a whole bunch of text can go here", function(value) { output("TextArea", value)})
		.addButton("Button", function(value) { output("Button", "clicked")})
;

	var canvas = document.createElement("canvas"),
		context = canvas.getContext("2d");
	canvas.width = 100;
	canvas.height = 100;
	context.beginPath();
	context.fillStyle = "red";
	context.arc(50, 50, 50, 0, Math.PI * 2);
	context.fill();

	var panel2 = QuickSettings.create(250, 10, "Panel 2")
		.addDropDown("DropDown", ["one", "two", "three"], function(value) { output("DropDown", value.value)})
		.addImage("Image", "boyhowdy.jpg")
		.addProgressBar("ProgressBar", 100, 50)
		.addElement("Element (canvas)", canvas);

	var panel3 = QuickSettings.create(490, 10, "Panel3")
		.addHTML("HTML", "<b>bold</b> <u>underline</u> <i>italic</i><ol><li>one</li><li>two</li><li>three</li>")
		.addPassword("Password", "12345678", function(value) { output("Password", value)})
		.addDate("Date", "2016-07-11", function(value) { output("Date", value)})
		.addTime("Time", "06:03:25", function(value) { output("Time", value)});

	var panel4 = QuickSettings.create(730, 10, "Output Panel")
		.addTextArea("Output");


	function output(name, value) {
		panel4.setValue("Output", name + " : " + value);
	}
}
