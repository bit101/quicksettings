/*

type: required
title: required
value: string, number for most. bool for boolean, array for dropdown. not used in button
min: number for range, number
max: number for range, number, progressbar
step: number for range
callback: string

*/


(function() {
	var json = {
	    "title": "test",
	    "x": 400,
	    "y": 30,
	    "draggable": true,
	    "collapsible": true,
	    "snapToGrid": true,
	    "gridSize": 100,
	    "controls": [
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
	            "title": "boolean test",
	            "value": true
	        },
	        {
	            "type": "button",
	            "title": "button test"
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
	            "value": "whatever"
	        },
	        {
	            "type": "date",
	            "title": "date test",
	            "value": "2016-10-11"
	        },
	        {
	            "type": "time",
	            "title": "time test",
	            "value": "12:34"
	        },
	        {
	            "type": "info",
	            "title": "info test",
	            "value": "some info"
	        },
	        {
	            "type": "dropdown",
	            "title": "dropdown test",
	            "value": [
	                "one",
	                "two",
	                "three",
	                "...",
	                "profit!"
	            ]
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
	            "showNumbers": true
	        },
	        {
	            "type": "html",
	            "title": "html test",
	            "value": "<i>this</i> is <u>html</u><ul><li>one</li><li>two</li><li>three</li></ul>"
	        }
	    ]
	};

	document.getElementById("code").innerHTML = "<pre>" + JSON.stringify(json, null, "    ") + "</pre>";
	var controller = {
		onRange: function(value) {
			panel.setProgress("progressbar test", value)
		},
		onColor: function(value) {
			document.body.style.backgroundColor = value;
		}
	};

	var panel = QuickSettings.parse(json, controller);
})();