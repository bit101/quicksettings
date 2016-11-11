window.onload = function() {
	var settings = QuickSettings.create(300, 0, "HTML demo");

	settings.addHTML("info", "Since all the previous demos were canvas-based, I just wanted to show that there's no dependency on canvas here.");
	settings.addHTML("info2", "Most of this is done through direct binding on the HTML objects.");
	settings.addHTML("info3", "The fontSize control needs a callback because we have to add a unit (px or whatever)");
	
	settings.bindText("title", document.title, document);
	settings.bindColor("backgroundColor", "#ffffff", document.body.style);
	settings.bindText("innerHTML", "Hello world", document.getElementsByTagName("h1")[0]);
	settings.bindDropDown("fontFamily", ["serif", "sans-serif", "monospace", "cursive"], document.body.style);

	settings.addRange("fontSize", 1, 40, 10, 1, function(value) {
		// can't bind directly, because we need to add "px" or other unit :(
		document.getElementsByTagName("p")[0].style.fontSize = value + "px";
	});


}
