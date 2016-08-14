(function() {
	var cssInjected = false,
		styles = {
			default: ".qs_main{background-color:#ddd;text-align:left;position:absolute;width:200px;font:12px sans-serif;box-shadow:5px 5px 8px rgba(0,0,0,.35);user-select:none;-webkit-user-select:none}.qs_content{background-color:#ddd;overflow-y:auto}.qs_title_bar{background-color:#fff;user-select:none;-webkit-user-select:none;cursor:pointer;padding:5px;border:1px solid #eee}.qs_container{margin:5px;padding:5px;background-color:#eee}.qs_range{width:100%;padding:0;margin:0}.qs_checkbox{margin-left:5px}.qs_checkbox_label{user-select:none;-webkit-user-select:none;cursor:default}.qs_label{margin-bottom:3px;user-select:none;-webkit-user-select:none;cursor:default}.qs_text_input{width:90%}.qs_image,.qs_progress{width:100%}.qs_textarea{resize:vertical;width:100%;padding:0;margin:0}",
			black: ".qs_main{text-align:left;position:absolute;width:200px;font:12px sans-serif;box-shadow:3px 3px 5px rgba(0,0,0,.35);user-select:none;-webkit-user-select:none;background-color:#000;border:1px solid #999;color:#ccc}.qs_content{background-color:#transparent;overflow-y:auto}.qs_title_bar{user-select:none;-webkit-user-select:none;cursor:pointer;padding:5px}.qs_container{margin:5px;padding:5px;border:1px solid #999;background-color:#000}.qs_range{width:100%;padding:0;margin:0}.qs_text_input,.qs_textarea{padding:2px;color:#ccc;border:1px solid #999}.qs_checkbox{margin-left:5px}.qs_checkbox_label{user-select:none;-webkit-user-select:none;cursor:default}.qs_label{margin-bottom:3px;user-select:none;-webkit-user-select:none;cursor:default}.qs_text_input{width:90%;background-color:#000}.qs_button,.qs_select{background-color:#000;color:#ccc;border:1px solid #999}.qs_button:active{background-color:#333}.qs_image,.qs_progress{width:100%}.qs_textarea{resize:vertical;width:100%;margin:0;background-color:#000}",
			white: ".qs_main{text-align:left;position:absolute;width:200px;font:12px sans-serif;box-shadow:3px 3px 5px rgba(0,0,0,.35);user-select:none;-webkit-user-select:none;background-color:#fff;border:1px solid #666}.qs_content{background-color:#transparent;overflow-y:auto}.qs_title_bar{user-select:none;-webkit-user-select:none;cursor:pointer;padding:5px}.qs_container{margin:5px;padding:5px;border:1px solid #666;background-color:#fff}.qs_range{width:100%;padding:0;margin:0;background-color:red}.qs_checkbox{margin-left:5px}.qs_checkbox_label{user-select:none;-webkit-user-select:none;cursor:default}.qs_label{margin-bottom:3px;user-select:none;-webkit-user-select:none;cursor:default}.qs_text_input{width:90%;padding:2px;border:1px solid #666}.qs_button,.qs_select{background-color:#fff;color:#000;border:1px solid #666}.qs_button:active{background-color:#ccc}.qs_image,.qs_progress{width:100%}.qs_textarea{resize:vertical;width:100%;padding:2px;margin:0;border:1px solid #666}",
			minimal: ".qs_main{background-color:#ddd;position:absolute;text-align:left;width:150px;font:9px sans-serif;box-shadow:5px 5px 8px rgba(0,0,0,.35);user-select:none;-webkit-user-select:none}.qs_content{background-color:#ddd;overflow-y:auto}.qs_title_bar{background-color:#fff;user-select:none;-webkit-user-select:none;cursor:pointer;padding:3px;border:1px solid #eee}.qs_container{margin:3px;padding:3px;background-color:#eee}.qs_range{-webkit-appearance:none;width:100%;padding:0;margin:0}.qs_range:focus{outline:0}.qs_range::-ms-track{border-color:transparent}.qs_range::-webkit-slider-thumb{-webkit-appearance:none;height:10px;width:10px;border-radius:0;background:#999;cursor:pointer;margin-top:0}.qs_range::-moz-range-thumb{height:10px;width:10px;border:none;border-radius:0;background:#999;cursor:pointer}.qs_range::-ms-thumb{height:10px;width:10px;border-radius:0;background:#999;cursor:pointer}.qs_range::-webkit-slider-runnable-track{width:100%;height:10px;cursor:pointer;background:#ccc;border-radius:0}.qs_range:focus::-webkit-slider-runnable-track{background:#ccc}.qs_range::-moz-range-track{width:100%;height:12px;cursor:pointer;background:#ccc;border-radius:0}.qs_range::-ms-track{width:100%;height:10px;cursor:pointer;background:0 0;color:transparent}.qs_range::-ms-fill-lower{background:#ccc;border-radius:0}.qs_range:focus::-ms-fill-lower{background:#ccc}.qs_range::-ms-fill-upper{background:#ccc;border-radius:0}.qs_range:focus::-ms-fill-upper{background:#ccc}.qs_checkbox{margin-left:2px}.qs_checkbox_label{user-select:none;-webkit-user-select:none;cursor:default}.qs_label{margin-bottom:2px;user-select:none;-webkit-user-select:none;cursor:default}.qs_color{width:40px;font:9px sans-serif;margin:0}.qs_button,.qs_select,.qs_textarea{font-size:9px}.qs_text_input{font-size:9px;width:90%}.qs_image,.qs_progress{width:100%}.qs_textarea{resize:vertical;width:100%;padding:0;margin:0}",
			minimal_dark: ".qs_main{background-color:#444;position:absolute;text-align:left;width:150px;font:9px sans-serif;color:#ccc;box-shadow:5px 5px 8px rgba(0,0,0,.35);user-select:none;-webkit-user-select:none}.qs_content{background-color:#444;overflow-y:auto}.qs_title_bar{background-color:#333;user-select:none;-webkit-user-select:none;cursor:pointer;padding:3px;border:1px solid #555}.qs_container{margin:3px;padding:3px;background-color:#333}.qs_range{-webkit-appearance:none;width:100%;padding:0;margin:0}.qs_range:focus{outline:0}.qs_range::-ms-track{border-color:transparent}.qs_range::-webkit-slider-thumb{-webkit-appearance:none;height:10px;width:10px;border-radius:0;background:#333;cursor:pointer;margin-top:0}.qs_range::-moz-range-thumb{height:10px;width:10px;border:none;border-radius:0;background:#333;cursor:pointer}.qs_range::-ms-thumb{height:10px;width:10px;border-radius:0;background:#333;cursor:pointer}.qs_range::-webkit-slider-runnable-track{width:100%;height:10px;cursor:pointer;background:#666;border-radius:0}.qs_range:focus::-webkit-slider-runnable-track{background:#666}.qs_range::-moz-range-track{width:100%;height:12px;cursor:pointer;background:#666;border-radius:0}.qs_range::-ms-track{width:100%;height:10px;cursor:pointer;background:0 0;color:transparent}.qs_range::-ms-fill-lower{background:#666;border-radius:0}.qs_range:focus::-ms-fill-lower{background:#666}.qs_range::-ms-fill-upper{background:#666;border-radius:0}.qs_range:focus::-ms-fill-upper{background:#666}.qs_checkbox{margin-left:2px}.qs_checkbox_label{user-select:none;-webkit-user-select:none;cursor:default}.qs_label{margin-bottom:2px;user-select:none;-webkit-user-select:none;cursor:default}.qs_color{width:40px;font:9px sans-serif;margin:0}.qs_button,.qs_select,.qs_textarea{font-size:9px}.qs_text_input{font-size:9px;width:90%}.qs_image,.qs_progress{width:100%}.qs_textarea{resize:vertical;width:100%;padding:0;margin:0}"
		},
		chosenStyle = "default";

	function injectCSS() {
		var qs_Styles = document.getElementById("qs_styles");
		if(qs_Styles) {
			document.head.removeChild(qs_Styles);
		}
		if(chosenStyle != "custom") {
			var styleTag = document.createElement("style");
			styleTag.id = "qs_styles";
			styleTag.innerText = styles[chosenStyle]
			document.head.appendChild(styleTag);
		}
		cssInjected = true;
	}

	var QuickSettings = {
		_version: "1.6",
		_topZ: 1,

		_panel: null,
		_titleBar: null,
		_content: null,
		_startX: 0,
		_startY: 0,
		_hidden: false,
		_collapsed: false,
		_controls: null,
		_keyCode: -1,
		_draggable: true,
		_collapsible: true,
		_snapToGrid: false,
		_gridSize: 40,
		_globalChangeHandler: null,

		setStyle: function(style) {
			chosenStyle = style || "default";
			injectCSS();
		},

		create: function(x, y, title) {
			var obj = Object.create(this);
			obj._init(x, y, title);
			return obj;
		},

		destroy: function() {
			document.body.removeChild(this._panel);
			for(var prop in this) {
				this[prop] = null;
			}
		},

		_init: function(x, y, title) {
			if(!cssInjected) {
				injectCSS();
			}
			this._bindHandlers();
			this._createPanel(x, y);
			this._createTitleBar(title || "QuickSettings");
			this._createContent();

			document.body.appendChild(this._panel);
		},

		_bindHandlers: function() {
			this._startDrag = this._startDrag.bind(this);
			this._drag = this._drag.bind(this);
			this._endDrag = this._endDrag.bind(this);
			this._doubleClickTitle = this._doubleClickTitle.bind(this);
			this._onKeyUp = this._onKeyUp.bind(this);
		},

		_createPanel: function(x, y) {
			this._panel = document.createElement("div");
			this._panel.className = "qs_main";
			this._panel.style.zIndex = ++QuickSettings._topZ;
			this.setPosition(x || 0, y || 0);
			this._controls = {};
		},

		_createTitleBar: function(text) {
			this._titleBar = document.createElement("div");
			this._titleBar.textContent = text;
			this._titleBar.className = "qs_title_bar";

			this._titleBar.addEventListener("mousedown", this._startDrag);
			this._titleBar.addEventListener("dblclick", this._doubleClickTitle);

			this._panel.appendChild(this._titleBar);
		},

		_createContent: function() {
			this._content = document.createElement("div");
			this._content.className = "qs_content";
			this._panel.appendChild(this._content);
		},

		setPosition: function(x, y) {
			this._panel.style.left = x + "px";
			this._panel.style.top = Math.max(y, 0) + "px";
			return this;
		},

		setSize: function(w, h) {
			this._panel.style.width = w + "px";
			this._content.style.width = w + "px";
			this._content.style.height = (h - this._titleBar.offsetHeight) + "px";
			return this;
		},

		setWidth: function(w) {
			this._panel.style.width = w + "px";
			this._content.style.width = w + "px";
			return this;
		},

		setDraggable: function(draggable) {
			this._draggable = draggable;
			if(this._draggable || this._collapsible) {
				this._titleBar.style.cursor = "pointer";
			}
			else {
				this._titleBar.style.cursor = "default";
			}
			return this;
		},

		setCollapsible: function(collapsible) {
			this._collapsible = collapsible;
			if(this._draggable || this._collapsible) {
				this._titleBar.style.cursor = "pointer";
			}
			else {
				this._titleBar.style.cursor = "default";
			}
			return this;
		},

		setSnapToGrid: function(value) {
			this._snapToGrid = value;
			return this;
		},

		setGridSize: function(value) {
			this._gridSize = value;
			return this;
		},

		_startDrag: function(event) {
			if(this._draggable) {
				this._panel.style.zIndex = ++QuickSettings._topZ;
				document.addEventListener("mousemove", this._drag);
				document.addEventListener("mouseup", this._endDrag);
				this._startX = event.clientX;
				this._startY = event.clientY;
			}
			event.preventDefault();
		},

		_drag: function(event) {
			var x = parseInt(this._panel.style.left),
				y = parseInt(this._panel.style.top),
				mouseX = event.clientX,
				mouseY = event.clientY;

			this.setPosition(x + mouseX - this._startX, y + mouseY - this._startY);
			this._startX = mouseX;
			this._startY = mouseY;
			event.preventDefault();
		},

		_endDrag: function(event) {
			if(this._snapToGrid) {
				var x = parseInt(this._panel.style.left),
					y = parseInt(this._panel.style.top),
					mouseX = event.clientX,
					mouseY = event.clientY;
				x = x + mouseX - this._startX;
				y = y + mouseY - this._startY;

				x = Math.round(x / this._gridSize) * this._gridSize;
				y = Math.round(y / this._gridSize) * this._gridSize;
				this.setPosition(x, y);
			}
			document.removeEventListener("mousemove", this._drag);
			document.removeEventListener("mouseup", this._endDrag);
			event.preventDefault();
		},

		_doubleClickTitle: function() {
			if(this._collapsible) {
				this.toggleCollapsed();
			}
		},

		setGlobalChangeHandler: function(handler) {
			this._globalChangeHandler = handler;
			return this;
		},

		toggleCollapsed: function() {
			if(this._collapsed) {
				this.expand();
			}
			else {
				this.collapse();
			}
			return this;
		},

		collapse: function() {
			this._panel.removeChild(this._content);
			this._collapsed = true;
			return this;
		},

		expand: function() {
			this._panel.appendChild(this._content);
			this._collapsed = false;
			return this;
		},

		hide: function() {
			this._panel.style.visibility = "hidden";
			this._hidden = true;
			return this;
		},

		show: function() {
			this._panel.style.visibility = "visible";
			this._panel.style.zIndex = ++QuickSettings._topZ;
			this._hidden = false;
			return this;
		},

		_createContainer: function() {
			var container = document.createElement("div");
			container.className = "qs_container";
			return container;
		},

		_createLabel: function(title) {
			var label = document.createElement("div");
			label.innerHTML = title;
			label.className = "qs_label";
			return label;
		},

		setKey: function(char) {
			this._keyCode = char.toUpperCase().charCodeAt(0);
			document.body.addEventListener("keyup", this.onKeyUp);
			return this;
		},

		_onKeyUp: function(event) {
			if(event.keyCode === this._keyCode) {
				this.toggleVisibility();
			}
		},

		toggleVisibility: function() {
			if(this._hidden) {
				this.show();
			}
			else {
				this.hide();
			}
			return this;
		},

		bindRange: function(title, min, max, value, step, object) {
			this.addRange(title, min, max, value, step, function(value) {
				object[title] = value;
			});
			return this;
		},

		bindNumber: function(title, min, max, value, step, object) {
			this.addNumber(title, min, max, value, step, function(value) {
				object[title] = value;
			});
			return this;
		},

		addRange: function(title, min, max, value, step, callback) {
			this._addNumber("range", title, min, max, value, step, callback);
			return this;
		}, 

		addNumber: function(title, min, max, value, step, callback) {
			this._addNumber("number", title, min, max, value, step, callback);
			return this;
		}, 

		_isIE: function() {
			if(navigator.userAgent.indexOf("rv:11") != -1) {
				return true;
			}
			if(navigator.userAgent.indexOf("MSIE") != -1) {
				return true;
			}
			return false;
		},

		_addNumber: function(type, title, min, max, value, step, callback) {
			var container = this._createContainer();

			var input = document.createElement("input");
			input.type = type;
			input.id = title;
			input.min = min || 0;
			input.max = max || 100;
			input.step = step || 1;
			input.value = value || 0;
			if(type === "range") {
				input.className = "qs_range";
			}
			else {
				input.className = "qs_text_input qs_number";
			}

			var label = this._createLabel("<b>" + title + ":</b> " + input.value);

			container.appendChild(label);
			container.appendChild(input);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: input,
				label: label,
				callback: callback
			};

			var eventName = "input";
			if(type === "range" && this._isIE()) {
				eventName = "change";
			}
			var gch = this._globalChangeHandler;
			input.addEventListener(eventName, function() {
				label.innerHTML = "<b>" + title + ":</b> " + input.value;
				if(callback) {
					callback(parseFloat(input.value));
				}
				if(gch) {
					gch();
				}
			});
		}, 

		getRangeValue: function(title) {
			return parseFloat(this._controls[title].control.value);
		},

		getNumberValue: function(title) {
			return parseFloat(this._controls[title].control.value);
		},

		setRangeValue: function(title, value) {
			return this.setNumberValue(title, value);
		},

		setNumberValue: function(title, value) {
			var control = this._controls[title];
			control.control.value = value;
			control.label.innerHTML = "<b>" + title + ":</b> " + control.control.value;
			if(control.callback) {
				control.callback(parseFloat(control.control.value));
			}
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
			return this;
		},

		setRangeParameters: function(title, min, max, step) {
			return this.setNumberParameters(title, min, max, step);
		},

		setNumberParameters: function(title, min, max, step) {
			var control = this._controls[title];
			control.control.min = min;
			control.control.max = max;
			control.control.step = step;
			return this;
		},

		bindBoolean: function(title, value, object) {
			this.addBoolean(title, value, function(value) {
				object[title] = value;
			});
			return this;
		},

		addBoolean: function(title, value, callback) {
			var container = this._createContainer();

			var label = document.createElement("label");
			label.className = "qs_checkbox_label";
			label.textContent = title;
			label.setAttribute("for", title);

			var checkbox = document.createElement("label");
			checkbox.className = "qs_checkbox";
			checkbox.setAttribute("for", title);

			var input = document.createElement("input")
			input.type = "checkbox";
			input.id = title;
			input.checked = value;

			checkbox.appendChild(input);

			var span = document.createElement("span");
			// span.textContent = title;
			checkbox.appendChild(span);

			container.appendChild(label);
			container.appendChild(checkbox);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: input,
				callback: callback
			};

			var gch = this._globalChangeHandler;
			input.addEventListener("change", function() {
				if(callback) {
					callback(input.checked);
				}
				if(gch) {
					gch();
				}
			});
			return this;
		},

		getBoolean: function(title) {
			return this._controls[title].control.checked;
		},

		setBoolean: function(title, value) {
			this._controls[title].control.checked = value;
			if(this._controls[title].callback) {
				this._controls[title].callback(value);
			}
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
			return this;
		},

		addButton: function(title, callback) {
			var container = this._createContainer();

			var button = document.createElement("input");
			button.type = "button";
			button.id = title;
			button.value = title;
			button.className = "qs_button";

			container.appendChild(button);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: button
			}

			var gch = this._globalChangeHandler;
			button.addEventListener("click", function() {
				if(callback) {
					callback(button);
				}
				if(gch) {
					gch();
				}
			});
			return this;
		},

		bindColor: function(title, color, object) {
			this.addColor(title, color, function(value) {
				object[title] = value;
			});
			return this;
		},

		addColor: function(title, color, callback) {
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + ":</b> " + color);

			var colorInput = document.createElement("input");
			try {
				colorInput.type = "color";
			}
			catch(e) {
				return this.addText(title, color, callback);
			}
			colorInput.id = title;
			colorInput.value = color || "#ff0000";
			colorInput.className = "qs_color";

			var colorLabel = document.createElement("label");
			colorLabel.setAttribute("for", title);
			colorLabel.className = "qs_color_label";
			colorLabel.style.backgroundColor = colorInput.value;

			container.appendChild(label);
			container.appendChild(colorInput);
			container.appendChild(colorLabel);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: colorInput,
				label: label,
				callback: callback
			};

			var gch = this._globalChangeHandler;
			colorInput.addEventListener("input", function() {
				label.innerHTML = "<b>" + title + ":</b> " + colorInput.value;
				colorLabel.style.backgroundColor = colorInput.value;
				if(callback) {
					callback(colorInput.value);
				}
				if(gch) {
					gch();
				}
			});
			return this;
		},

		getColor: function(title) {
			return this._controls[title].control.value;
		},

		setColor: function(title, value) {
			var control = this._controls[title];
			control.control.value = value;
			control.label.innerHTML = "<b>" + title + ":</b> " + control.control.value;
			if(control.callback) {
				control.callback(control.control.value);
			}
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
			return this;
		},

		bindText: function(title, text, object) {
			this.addText(title, text, function(value) {
				object[title] = value;
			});
			return this;
		},

		addText: function(title, text, callback) {
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + "</b>");

			var textInput = document.createElement("input");
			textInput.type = "text";
			textInput.id = title;
			textInput.value = text || "";
			textInput.className = "qs_text_input";

			container.appendChild(label);
			container.appendChild(textInput);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: textInput,
				label: label,
				callback: callback
			}

			var gch = this._globalChangeHandler;
			textInput.addEventListener("input", function() {
				if(callback) {
					callback(textInput.value);
				}
				if(gch) {
					gch();
				}
			});
			return this;
		}, 

		addPassword: function(title, text, callback) {
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + "</b>");

			var textInput = document.createElement("input");
			textInput.type = "password";
			textInput.id = title;
			textInput.value = text || "";
			textInput.className = "qs_text_input";

			container.appendChild(label);
			container.appendChild(textInput);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: textInput,
				label: label,
				callback: callback
			}

			var gch = this._globalChangeHandler;
			textInput.addEventListener("input", function() {
				if(callback) {
					callback(textInput.value);
				}
				if(gch) {
					gch();
				}
			});
			return this;
		}, 

		bindPassword: function(title, text, object) {
			this.addPassword(title, text, function(value) {
				object[title] = value;
			});
			return this;
		},



		addTextArea: function(title, text, callback) {
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + "</b>");

			var textInput = document.createElement("textarea");
			textInput.id = title;
			textInput.rows = 5;
			textInput.value = text || "";
			textInput.className = "qs_textarea";

			container.appendChild(label);
			container.appendChild(textInput);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: textInput,
				label: label,
				callback: callback
			}

			var gch = this._globalChangeHandler;
			textInput.addEventListener("input", function() {
				if(callback) {
					callback(textInput.value);
				}
				if(gch) {
					gch();
				}
			});
			return this;
		}, 

		setTextAreaRows: function(title, rows) {
			this._controls[title].control.rows = rows;
			return this;
		},

		getText: function(title) {
			return this._controls[title].control.value;
		},

		setText: function(title, text) {
			var control = this._controls[title];
			control.control.value = text;
			if(control.callback) {
				control.callback(text);
			}
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
			return this;
		},

		addDate: function(title, date, callback) {
			if(this._isIE()) {
				console.log("returning....")
				return this.addText(title, date, callback);
			}
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + "</b>");

			var dateStr;
			if(date instanceof Date) {
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				if(month < 10) month = "0" + month;
				var day = date.getDate();
				dateStr = year + "-" + month + "-" + day;
			}
			else {
				dateStr = date;
			}

			var dateInput = document.createElement("input");
			dateInput.type = "date";
			dateInput.id = title;
			dateInput.value = dateStr || "";
			dateInput.className = "qs_text_input";

			container.appendChild(label);
			container.appendChild(dateInput);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: dateInput,
				label: label,
				callback: callback
			}

			var gch = this._globalChangeHandler;
			dateInput.addEventListener("input", function() {
				if(callback) {
					callback(dateInput.value);
				}
				if(gch) {
					gch();
				}
			});
			return this;
		},

		setDate: function(title, date) {
			var control = this._controls[title];

			var dateStr;
			if(date instanceof Date) {
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				if(month < 10) month = "0" + month;
				var day = date.getDate();
				dateStr = year + "-" + month + "-" + day;
			}
			else {
				dateStr = date;
			}

			control.control.value = dateStr || "";
			if(control.callback) {
				control.callback(text);
			}
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
			return this;
		},

		bindDate: function(title, date, object) {
			this.addDate(title, date, function(value) {
				object[title] = value;
			});
			return this;
		},

		getDate: function(title) {
			var control = this._controls[title];
			return control.control.value;
		},



		addTime: function(title, time, callback) {
			if(this._isIE()) {
				return this.addText(title, time, callback);
			}

			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + "</b>");

			var timeStr;
			if(time instanceof Date) {
				var hours = time.getHours();
				if(hours < 10) hours = "0" + hours;
				var minutes = time.getMinutes() + 1;
				if(minutes < 10) minutes = "0" + minutes;
				var seconds = time.getSeconds();
				if(seconds < 10) seconds = "0" + seconds;
				timeStr = hours + ":" + minutes + ":" + seconds;
			}
			else {
				timeStr = time;
			}

			var timeInput = document.createElement("input");
			timeInput.type = "time";
			timeInput.id = title;
			timeInput.value = timeStr || "";
			timeInput.className = "qs_text_input";

			container.appendChild(label);
			container.appendChild(timeInput);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: timeInput,
				label: label,
				callback: callback
			}

			var gch = this._globalChangeHandler;
			timeInput.addEventListener("input", function() {
				if(callback) {
					callback(timeInput.value);
				}
				if(gch) {
					gch();
				}
			});
			return this;
		},

		setTime: function(title, time) {
			var control = this._controls[title];

			var timeStr;
			if(time instanceof Date) {
				var hours = time.getHours();
				if(hours < 10) hours = "0" + hours;
				var minutes = time.getMinutes() + 1;
				if(minutes < 10) minutes = "0" + minutes;
				var seconds = time.getSeconds();
				if(seconds < 10) seconds = "0" + seconds;
				timeStr = hours + ":" + minutes + ":" + seconds;
			}
			else {
				timeStr = time;
			}

			control.control.value = timeStr || "";
			if(control.callback) {
				control.callback(text);
			}
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
			return this;
		},

		getTime: function(title) {
			var control = this._controls[title];
			return control.control.value;
		},

		bindTime: function(title, time, object) {
			this.addTime(title, time, function(value) {
				object[title] = value;
			});
			return this;
		},



		addInfo: function(title, info) {
			var container = this._createContainer();
			container.innerHTML = info;
			this._controls[title] = {
				container: container
			};
			this._content.appendChild(container);
			return this;
		},

		bindDropDown: function(title, items, object) {
			this.addDropDown(title, items, function(value) {
				object[title] = value.value;
			});
			return this;
		},

		addDropDown: function(title, items, callback) {
			var container = this._createContainer();

			var bg = document.createElement("div");
			bg.className = "qs_select_bg";


			var label = this._createLabel("<b>" + title + "</b>");
			var select = document.createElement("select");
			for(var i = 0; i < items.length; i++) {
				var option = document.createElement("option");
				option.label = items[i];
				option.innerText = items[i];
				select.add(option);
			};
			var gch = this._globalChangeHandler;
			select.addEventListener("change", function() {
				var index = select.selectedIndex,
					options = select.options;

				if(callback) {
					callback({
						index: index,
						value: options[index].label
					});
				}
				if(gch) {
					gch();
				}
			});
			select.className = "qs_select";

			bg.appendChild(select);

			container.appendChild(label);
			container.appendChild(bg);
			this._content.appendChild(container);

			this._controls[title] = {
				container: container,
				control: select,
				label: label,
				callback: callback
			};
			return this;
		},

		getDropDownValue: function(title) {
			var control = this._controls[title],
				select = control.control,
				index = select.selectedIndex,
				options = select.options;
			return {
				index: index,
				value: options[index].label
			}
		},

		setDropDownIndex: function(title, index) {
			var control = this._controls[title],
				options = control.control.options;
			control.control.selectedIndex = index;
			if(control.callback) {
				control.callback({
					index: index,
					value: options[index].label
				});
			}
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
			return this;
		},

		getInfo: function(title) {
			return this._controls[title].container.innerHTML;
		},

		setInfo: function(title, info) {
			this._controls[title].container.innerHTML = info;
			return this;
		},

		addImage: function(title, imageURL) {
			var container = this._createContainer(),
				label = this._createLabel("<b>" + title + "</b>");
				img = document.createElement("img");
			img.className = "qs_image";
			img.src = imageURL;

			container.appendChild(label);
			container.appendChild(img);
			this._content.appendChild(container);

			this._controls[title] = {
				container: container,
				control: img,
				label: label
			};
			return this;
		},

		setImageURL: function(title, imageURL) {
			this._controls[title].control.src = imageURL;
			return this;
		},

		addProgressBar: function(title, max, value, valueDisplay) {
			var container = this._createContainer(),
				label = this._createLabel(""),
				progressDiv = document.createElement("div"),
				valueDiv = document.createElement("div");
			progressDiv.className = "qs_progress";
			valueDiv.className = "qs_progress_value";
			progressDiv.appendChild(valueDiv);
			valueDiv.style.width = (value / max * 100) + "%";

			if(valueDisplay === "numbers") {
				label.innerHTML = "<b>" + title + ":</b> " + value + " / " + max;
			}
			else if(valueDisplay === "percent") {
				label.innerHTML = "<b>" + title + ":</b> " + Math.round(value / max * 100) + "%";
			}
			else {
				label.innerHTML = "<b>" + title + "</b>";
			}

			container.appendChild(label);
			container.appendChild(progressDiv);
			this._content.appendChild(container);

			this._controls[title] = {
				container: container,
				control: progressDiv,
				valueDiv: valueDiv,
				valueDisplay: valueDisplay,
				label: label,
				value: value,
				max: max
			};
			return this;
		},

		getProgress: function(title) {
			return this._controls[title].control.value;
		},

		setProgress: function(title, value, max) {
			var control = this._controls[title];
			control.value = value;
			if(max) {
				control.max = max;
			}
			control.valueDiv.style.width = (control.value / control.max * 100) + "%";
			if(control.valueDisplay === "numbers") {
				control.label.innerHTML = "<b>" + title + ":</b> " + control.value + " / " + control.max;
			}
			else if(control.valueDisplay === "percent") {
				control.label.innerHTML = "<b>" + title + ":</b> " + Math.round(control.value / control.max * 100) + "%";
			}
			return this;
		},

		addElement: function(title, element) {
			var container = this._createContainer(),
				label = this._createLabel("<b>" + title + "</b>");

			container.appendChild(label);
			container.appendChild(element);
			this._content.appendChild(container);

			this._controls[title] = {
				container: container,
				label: label
			};
			return this;
		},

		addHTML: function(title, html) {
			var div = document.createElement("div");
			div.innerHTML = html;
			this.addElement(title, div);
			return this;
		},

		removeControl: function(title) {
			if(this._controls[title]){
				var container = this._controls[title].container;
			}
			if(container && container.parentElement) {
				container.parentElement.removeChild(container);
			}
			this._controls[title] = null;
			return this;
		},

		enableControl: function(title) {
			if(this._controls[title].control) {
				this._controls[title].control.disabled = false;
			}
			return this;
		},

		disableControl: function(title) {
			if(this._controls[title].control) {
				this._controls[title].control.disabled = true;
			}
			return this;
		},

		parse: function(json, scope) {
			if(typeof json === "string") {
				json = JSON.parse(json);
			}
			var panel = QuickSettings.create(json.x, json.y, json.title);
			panel.setDraggable(json.draggable == null ? true : json.draggable);
			panel.setCollapsible(json.collapsible == null ? true : json.collapsible);
			panel.setGridSize(json.gridSize || 40);
			panel.setSnapToGrid(json.snapToGrid == null ? false : json.snapToGrid);
			scope = scope || {};

			for(var i = 0; i < json.controls.length; i++) {
				var control = json.controls[i];
				switch(control.type) {
					case "range":
						panel.addRange(control.title, control.min || 0, control.max || 100, control.value || control.min || 0, control.step || 1, scope[control.callback]);
						break;

					case "number":
						panel.addNumber(control.title, control.min || 0, control.max || 100, control.value || control.min || 0, control.step || 1, scope[control.callback]);
						break;

					case "boolean":
						panel.addBoolean(control.title, control.value,  scope[control.callback]);
						break;

					case "button":
						panel.addButton(control.title, scope[control.callback]);
						break;

					case "color":
						panel.addColor(control.title, control.value,  scope[control.callback]);
						break;

					case "text":
						panel.addText(control.title, control.value,  scope[control.callback]);
						break;

					case "password":
						panel.addPassword(control.title, control.value,  scope[control.callback]);
						break;

					case "textarea":
					case "textArea":
						panel.addTextArea(control.title, control.value,  scope[control.callback]);
						break;

					case "date":
						panel.addDate(control.title, control.value,  scope[control.callback]);
						break;

					case "time":
						panel.addTime(control.title, control.value,  scope[control.callback]);
						break;

					case "info":
						panel.addInfo(control.title, control.value);
						break;

					case "dropdown":
					case "dropDown":
						panel.addDropDown(control.title, control.value, scope[control.callback]);
						break;

					case "image":
						panel.addImage(control.title, control.value);
						break;

					case "progressbar":
					case "progressBar":
						panel.addProgressBar(control.title, control.max || 100, control.value || 0, control.valueDisplay);
						break;

					case "html":
						panel.addHTML(control.title, control.value);
						break;

				}
			}
			return panel;
		}
	};

	if (typeof define === "function" && define.amd) {
	    define(QuickSettings);
	} else {
	   window.QuickSettings = QuickSettings;
	}

}());
