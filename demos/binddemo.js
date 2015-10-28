window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;


	var circle = {
		radius: 50,
		startAngle: 0,
		endAngle: Math.PI * 2,
		fill: false,
		fillStyle: "#ffff00",
		text: "hello",
		choice: "one"
	};


	var settings = QuickSettings.create();
	settings.setGlobalChangeHandler(draw);
	settings.bindRange("radius", 0, 100, 50, 1, circle);
	settings.bindRange("startAngle", 0, Math.PI * 2, 0, 0.01, circle);
	settings.bindRange("endAngle", 0, Math.PI * 2, Math.PI * 2, 0.01, circle);
	settings.bindBoolean("fill", false, circle);
	settings.bindColor("fillStyle", "#ffff00", circle);
	settings.bindText("text", "hello", circle);
	settings.bindDropDown("choice", ["one", "two", "three"], circle);


	draw();

	function draw() {
		context.fillStyle = circle.fillStyle;
		context.lineWidth = 10;
		context.clearRect(0, 0, width, height);
		context.beginPath();
		context.arc(width / 2, height / 2, circle.radius, circle.startAngle, circle.endAngle);
		if(circle.fill) {
			context.fill();
		}
		context.stroke();

		context.fillStyle = "#000000";
		context.fillText(circle.text, width / 2, height / 2);
		context.fillText(circle.choice, width / 2, height / 2 + 20);
	}

}
