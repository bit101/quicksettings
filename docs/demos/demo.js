window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		numCircles = 20,
		size = 30,
		radius = height / 3,
		lineWidth = 4,
		strokeColor = "#ff0000",
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


	var settings = QuickSettings.create(20, 20, "Settings");
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

	var settings2 = QuickSettings.create(width - 250, 20, "Other Stuff");

	settings2.addText("Random Text", "hello world");
	settings2.addHTML("info", "Turn it off and back on again");
	settings2.setKey("s");

	settings2.addDropDown("Choices", ["Cat", "Dog", "Iguana"], function(value) {
		var images = [
		"https://www.petfinder.com/wp-content/uploads/2012/11/99233806-bringing-home-new-cat-632x475.jpg",
		"http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg",
		"http://www.thepetmatchmaker.com/wp-content/uploads/2014/02/Grumpy_green_iguana_by_GlobalGraphic-1.jpg"
		];
		settings2.setValue("Random Animal Image", images[value.index]);
	});
	settings2.addBoolean("Dropdown enabled", true, function(value) {
		if(value) {
			settings2.enableControl("Choices");
		}
		else {
			settings2.disableControl("Choices");
		}
	});

	settings2.addImage("Random Animal Image", "https://www.petfinder.com/wp-content/uploads/2012/11/99233806-bringing-home-new-cat-632x475.jpg");

	var progress = 0;
	settings2.addProgressBar("Progress", 100, 0);
	setInterval(function() {
		settings2.setValue("Progress", progress);
		progress++;
		progress %= 100;
	}, 1000 / 15);

	var div = document.createElement("div");
	div.style.width = "200px";
	div.style.height = "50px";
	div.style.padding = "10px";
	div.style.backgroundColor = "#ffccff";
	div.innerHTML = "I am a div";
	settings2.addElement("Raw Element", div);
	settings2.setWidth(240);
	settings2.addTextArea("Text Area", "I'm even resizable!");


}
