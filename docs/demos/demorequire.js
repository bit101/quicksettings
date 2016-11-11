require(["quicksettings"], function (QuickSettings) {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		numCircles = 20,
		size = 30,
		radius = height / 3,
		lineWidth = 4,
		strokeColor = "green",
		fillColor = "#ffff00",
		drawStroke = true,
		drawFill = true;


	draw();

	function draw() {
		context.clearRect(0, 0, width, height);
		for(var i = 0; i < numCircles; i++) {
			var angle = Math.PI * 2 / numCircles * i;
			context.beginPath();
			context.strokeStyle = strokeColor;
			context.fillStyle = fillColor;
			context.lineWidth = lineWidth;
			context.arc(width / 2 + Math.cos(angle) * radius, height / 2 + Math.sin(angle) * radius, size, 0, Math.PI * 2);
			if(drawFill) {
				context.fill();
			}
			if(drawStroke) {
				context.stroke();
			}

		}
	}


	var settings = QuickSettings.create(0, 0, "Settings");
	settings.addRange("CircleCount", 3, 30, numCircles, 1, function(value) {
		numCircles = value;
		draw();
	});
	settings.addRange("Size", 1, 100, size, 1, function(value) {
		size = value;
		draw();
	});
	settings.addRange("Radius", 0, height / 2, radius, 1, function(value) {
		radius = value;
		draw();
	});
	settings.addColor("Fill Color", fillColor, function(color) {
		fillColor = color;
		draw();
	});
	settings.addColor("Stroke Color", strokeColor, function(color) {
		strokeColor = color;
		draw();
	});
	settings.addBoolean("Stroke", true, function(value) {
		drawStroke = value;
		draw();
	});
	settings.addBoolean("Fill", true, function(value) {
		drawFill = value;
		draw();
	});
	settings.addButton("Clear", function() {
		context.clearRect(0, 0, width, height);
	});
	settings.setKey("s");
	// document.body.addEventListener("mousemove", function(event) {
	// 	if(event.clientX < 200) {
	// 		settings.expand();
	// 	}
	// 	else {
	// 		settings.collapse();
	// 	}
	// });
	// settings.setDraggable(false);
	// settings.setSize(200, 200);

});