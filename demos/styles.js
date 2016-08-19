
(function() {

	var controller = {
		onStyle: function(data) {
			var styleTag = document.getElementById("qs_styles");
			if(data.value === "defaultStyle") {
				styleTag.href = "../quicksettings.css";
			}
			else {
				styleTag.href = "../quicksettings_" + data.value + ".css";
			}
		},
		onRange: function(value) {
			panel.setProgress("progressbar test", value);
		},

		onColor: function(value) {
			document.body.style.backgroundColor = value;
		}
	};

	var json = {
	    "title": "test",
	    "x": 20,
	    "y": 20,
	    "draggable": true,
	    "collapsible": true,
	    "snapToGrid": true,
	    "gridSize": 100,
	    "controls": [
			{
				"type": "dropdown",
				"title": "style",
				"value": [
					"defaultStyle",
					"black",
					"white",
					"tiny",
					"tiny_white",
					"tiny_black"
				],
				"callback": "onStyle"
			},
	        {
	            "type": "range",
	            "title": "range test",
	            "min": 0,
	            "max": 100,
	            "value": 50,
	            "step": 1,
	            "callback": "onRange"
	        },
	        {
	            "type": "number",
	            "title": "number test",
	            "min": 0,
	            "max": 100,
	            "callback": "onRange"
	        },
	        {
	            "type": "boolean",
	            "title": "Boolean test",
	            "value": true,
	        },
	        {
	            "type": "button",
	            "title": "button test",
	        },
	        {
	            "type": "color",
	            "title": "color test",
	            "value": "#ffff00",
	            "callback": "onColor"
	        },
	        {
	            "type": "text",
	            "title": "text test",
	            "value": "whatever"
	        },
	        {
	            "type": "password",
	            "title": "password test",
	            "value": "whatever"
	        },
	        {
	            "type": "textarea",
	            "title": "text area test",
	            "value": navigator.userAgent
	        },
	        {
	            "type": "date",
	            "title": "date test",
	            "value": new Date()
                // "value": "2016-08-14"
	        },
	        {
	            "type": "time",
	            "title": "time test",
				// "value": "12:34"
				"value": new Date()
	        },
	        {
	            "type": "info",
	            "title": "info test",
	            "value": "some info"
	        },
	        {
	            "type": "image",
	            "title": "image test",
	            "value": "http://d39kbiy71leyho.cloudfront.net/wp-content/uploads/2016/05/09170020/cats-politics-TN.jpg"
	        },
	        {
	            "type": "progressbar",
	            "title": "progressbar test",
	            "max": 100,
	            "value": 50,
	            "valueDisplay": "percent"
	        },
	        {
	            "type": "html",
	            "title": "html test",
	            "value": "<i>this</i> is <u>html</u><ul><li>one</li><li>two</li><li>three</li></ul>"
	        }
	    ]
	};
	QuickSettings.useExtStyleSheet();
	var panel = QuickSettings.parse(json, null, controller);

})();