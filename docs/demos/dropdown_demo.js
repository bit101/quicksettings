window.onload = function() {
	var settings = QuickSettings.create(20, 20, "Settings")
		.addDropDown("DropDown", [
			{
				label: "one",
				value: 111111
			},
			{
				label: "two",
				value: document
			},
			{
				label: "three",
				value: "in the town where i was born"
			},
			{
				label: 4,
				value: {
					"foo": "bar"
				}
			},
			"five",
			"six"
		],
		function() {
			console.log(settings.getValue("DropDown"));
		});

}
