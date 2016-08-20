(function() {
	////////////////////////////////////////////////////////////////////////////////
	// PRIVATE/STATIC DATA AND FUNCTIONS
	////////////////////////////////////////////////////////////////////////////////
	var cssInjected = false,
		css = "${css}"; // will be injected with default css

	function injectCSS() {
		var styleTag = document.createElement("style");
		styleTag.innerText = css;
		document.head.appendChild(styleTag);
		cssInjected = true;
	}

	////////////////////////////////////////////////////////////////////////////////
	// MAIN MODULE DEFINITION
	////////////////////////////////////////////////////////////////////////////////
	var QuickSettings = {
		_version: "2.0",
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


		////////////////////////////////////////////////////////////////////////////////
		// GENERAL INIT FUNCTIONS
		////////////////////////////////////////////////////////////////////////////////
		useExtStyleSheet: function() {
			cssInjected = true;
		},

		create: function(x, y, title, parent) {
			var obj = Object.create(this);
			obj._init(x, y, title, parent);
			return obj;
		},

		destroy: function() {
			if(this._panel.parentElement) {
				this._panel.parentElement.removeChild(this._panel);
			}
			for(var prop in this) {
				this[prop] = null;
			}
		},

		_init: function(x, y, title, parent) {
			if(!cssInjected) {
				injectCSS();
			}
			this._bindHandlers();
			this._createPanel(x, y, parent);
			this._createTitleBar(title || "QuickSettings");
			this._createContent();

		},

		_bindHandlers: function() {
			this._startDrag = this._startDrag.bind(this);
			this._drag = this._drag.bind(this);
			this._endDrag = this._endDrag.bind(this);
			this._doubleClickTitle = this._doubleClickTitle.bind(this);
			this._onKeyUp = this._onKeyUp.bind(this);
		},

		////////////////////////////////////////////////////////////////////////////////
		// VALUE FUNCTIONS
		////////////////////////////////////////////////////////////////////////////////
		getValuesAsJSON: function(asString) {
			var json = {};
			for(var title in this._controls) {
				var control = this._controls[title];
				switch(control.type) {
					case "color":
					case "date":
					case "password":
					case "text":
					case "textarea":
					case "time":
						json[title] = control.control.value;
						break;
					
					case "number":
					case "range":
						json[title] = parseFloat(control.control.value);
						break;

					case "boolean":
						json[title] = control.control.checked;
						break;

					case "dropdown":
						var select = control.control,
							options = select.options,
							index = select.selectedIndex,
							option = options[index];
						json[title] = option.label;
						break;
				}
			}
			if(asString) {
				json = JSON.stringify(json);
			}
			return json;
		},

		////////////////////////////////////////////////////////////////////////////////
		// CREATION FUNCTIONS
		////////////////////////////////////////////////////////////////////////////////
		_createPanel: function(x, y, parent) {
			this._panel = this._createElement("div", "qs_main", parent || document.body);
			this._panel.style.zIndex = ++QuickSettings._topZ;
			this.setPosition(x || 0, y || 0);
			this._controls = {};
		},

		_createTitleBar: function(text) {
			this._titleBar = this._createElement("div", "qs_title_bar", this._panel);
			this._titleBar.textContent = text;

			this._titleBar.addEventListener("mousedown", this._startDrag);
			this._titleBar.addEventListener("dblclick", this._doubleClickTitle);

		},

		_createContent: function() {
			this._content = this._createElement("div", "qs_content", this._panel);
		},

		_createElement: function(type, className, parent) {
			var element = document.createElement(type);
			if(!element) return;
			if(className) {
				element.className = className;
			}
			if(parent) {
				parent.appendChild(element);
			}
			return element;
		},

		_createContainer: function() {
			var container = this._createElement("div", "qs_container");
			container.addEventListener("focus", function() {
				this.className += " qs_container_selected";
			}, true);
			container.addEventListener("blur", function() {
				var index = this.className.indexOf(" qs_container_selected");
				if(index > -1) {
					this.className = this.className.substr(0, index);
				}
			}, true);
			this._content.appendChild(container);
			return container;
		},

		_createLabel: function(title, container) {
			var label = this._createElement("div", "qs_label", container);
			label.innerHTML = title;
			return label;
		},

		////////////////////////////////////////////////////////////////////////////////
		// SIZE AND POSITION FUNCTIONS
		////////////////////////////////////////////////////////////////////////////////
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

		setHeight: function(h) {
			this._content.style.height = (h - this._titleBar.offsetHeight) + "px";
			return this;
		},

		////////////////////////////////////////////////////////////////////////////////
		// DRAG AND DROP FUNCTIONS
		////////////////////////////////////////////////////////////////////////////////
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

		setSnapToGrid: function(value) {
			this._snapToGrid = value;
			return this;
		},

		setGridSize: function(value) {
			this._gridSize = value;
			return this;
		},

		////////////////////////////////////////////////////////////////////////////////
		// CHANGE HANDLER FUNCTIONS
		////////////////////////////////////////////////////////////////////////////////
		setGlobalChangeHandler: function(handler) {
			this._globalChangeHandler = handler;
			return this;
		},

		_callGCH: function() {
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
		},

		////////////////////////////////////////////////////////////////////////////////
		// VISIBILITY FUNCTIONS
		////////////////////////////////////////////////////////////////////////////////
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

		toggleVisibility: function() {
			if(this._hidden) {
				this.show();
			}
			else {
				this.hide();
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

		toggleCollapsed: function() {
			if(this._collapsed) {
				this.expand();
			}
			else {
				this.collapse();
			}
			return this;
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

		_doubleClickTitle: function() {
			if(this._collapsible) {
				this.toggleCollapsed();
			}
		},


		////////////////////////////////////////////////////////////////////////////////
		// CONTROL FUNCTIONS
		////////////////////////////////////////////////////////////////////////////////
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
			if(this._controls[title]) {
				this._controls[title].control.disabled = false;
			}
			return this;
		},

		disableControl: function(title) {
			if(this._controls[title]) {
				this._controls[title].control.disabled = true;
			}
			return this;
		},

		overrideStyle: function(title, style, value) {
			if(this._controls[title]) {
				this._controls[title].control.style[style] = value;
			}
		},


		////////////////////////////////////////////////////////////////////////////////
		// JSON PARSER
		////////////////////////////////////////////////////////////////////////////////

		parse: function(json, parent, scope) {
			if(typeof json === "string") {
				json = JSON.parse(json);
			}
			var panel = QuickSettings.create(json.x, json.y, json.title, parent);
			panel.setDraggable(json.draggable == null ? true : json.draggable);
			panel.setCollapsible(json.collapsible == null ? true : json.collapsible);
			panel.setGridSize(json.gridSize || 40);
			panel.setSnapToGrid(json.snapToGrid == null ? false : json.snapToGrid);
			if(json.width) {
				panel.setWidth(json.width);
			}
			if(json.height) {
				panel.setHeight(json.height);
			}
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
		},


		////////////////////////////////////////////////////////////////////////////////
		// PLATFORM TESTS
		////////////////////////////////////////////////////////////////////////////////
		_isIE: function() {
			if(navigator.userAgent.indexOf("rv:11") != -1) {
				return true;
			}
			if(navigator.userAgent.indexOf("MSIE") != -1) {
				return true;
			}
			return false;
		},

		_isSafari: function() {
			var userAgent = navigator.userAgent.toLowerCase();
			if(userAgent.indexOf("chrome") > -1 ||
				userAgent.indexOf("firefox") > -1 ||
				userAgent.indexOf("epiphany") > -1) {
				return false;
			}
			if(userAgent.indexOf('safari/') > -1) {
				return true;
			}
			return false;
		},

		_isEdge: function() {
			var userAgent = navigator.userAgent.toLowerCase();
			return userAgent.indexOf("edge") > -1;
		},







		//==========================================================================================
		//==========================================================================================
		// CONTROL CREATION AND MANAGEMENT FUNCTIONS
		//==========================================================================================
		//==========================================================================================

		////////////////////////////////////////////////////////////////////////////////
		// RANGE (SLIDER)
		////////////////////////////////////////////////////////////////////////////////
		addRange: function(title, min, max, value, step, callback) {
			return this._addNumber("range", title, min, max, value, step, callback);
		},

		addNumber: function(title, min, max, value, step, callback) {
			return this._addNumber("number", title, min, max, value, step, callback);
		},

		_addNumber: function(type, title, min, max, value, step, callback) {
			var container = this._createContainer();

			var label = this._createLabel("", container);

			var className = type === "range" ? "qs_range" : "qs_text_input qs_number";
			var input = this._createElement("input", className, container);
			input.type = type;
			input.id = title;
			input.min = min || 0;
			input.max = max || 100;
			input.step = step || 1;
			input.value = value || 0;

			label.innerHTML = "<b>" + title + ":</b> " + input.value;


			this._controls[title] = {
				type: type,
				container: container,
				control: input,
				label: label,
				callback: callback
			};

			var eventName = "input";
			if(type === "range" && this._isIE()) {
				eventName = "change";
			}
			var self = this;
			input.addEventListener(eventName, function() {
				label.innerHTML = "<b>" + title + ":</b> " + input.value;
				if(callback) {
					callback(parseFloat(input.value));
				}
				self._callGCH();
			});
			return this;
		},

		bindRange: function(title, min, max, value, step, object) {
			return this.addRange(title, min, max, value, step, function(value) {
				object[title] = value;
			});
		},

		bindNumber: function(title, min, max, value, step, object) {
			return this.addNumber(title, min, max, value, step, function(value) {
				object[title] = value;
			});
		},

		getRangeValue: function(title) {
			return this.getNumberValue(title);
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
			this._callGCH();
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


		////////////////////////////////////////////////////////////////////////////////
		// BOOLEAN (CHECKBOX)
		////////////////////////////////////////////////////////////////////////////////
		addBoolean: function(title, value, callback) {
			var container = this._createContainer();

			var label = this._createElement("label", "qs_checkbox_label", container);
			label.textContent = title;
			label.setAttribute("for", title);

			var checkbox = this._createElement("label", "qs_checkbox", container);
			checkbox.setAttribute("for", title);

			var input = this._createElement("input", null, checkbox);
			input.type = "checkbox";
			input.id = title;
			input.checked = value;


			var span = this._createElement("span", null, checkbox);

			this._controls[title] = {
				type: "boolean",
				container: container,
				control: input,
				callback: callback
			};

			var self = this;
			input.addEventListener("change", function() {
				if(callback) {
					callback(input.checked);
				}
				self._callGCH();
			});
			return this;
		},

		bindBoolean: function(title, value, object) {
			return this.addBoolean(title, value, function(value) {
				object[title] = value;
			});
		},

		getBoolean: function(title) {
			return this._controls[title].control.checked;
		},

		setBoolean: function(title, value) {
			this._controls[title].control.checked = value;
			if(this._controls[title].callback) {
				this._controls[title].callback(value);
			}
			this._callGCH();
			return this;
		},

		////////////////////////////////////////////////////////////////////////////////
		// BUTTON
		////////////////////////////////////////////////////////////////////////////////
		addButton: function(title, callback) {
			var container = this._createContainer();

			var button = this._createElement("input", "qs_button", container);
			button.type = "button";
			button.id = title;
			button.value = title;

			this._controls[title] = {
				type: "button",
				container: container,
				control: button
			}

			var self = this;
			button.addEventListener("click", function() {
				if(callback) {
					callback(button);
				}
				self._callGCH();
			});
			return this;
		},

		////////////////////////////////////////////////////////////////////////////////
		// COLOR
		////////////////////////////////////////////////////////////////////////////////
		addColor: function(title, color, callback) {
			if(this._isSafari() || this._isEdge() || this._isIE()) {
				return this.addText(title, color, callback);
			}
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + ":</b> " + color, label);

			var colorInput = this._createElement("input", "qs_color", container);
			colorInput.type = "color";
			colorInput.id = title;
			colorInput.value = color || "#ff0000";

			var colorLabel = this._createElement("label", "qs_color_label", container);
			colorLabel.setAttribute("for", title);
			colorLabel.style.backgroundColor = colorInput.value;

			this._controls[title] = {
				type: "color",
				container: container,
				control: colorInput,
				label: label,
				callback: callback
			};

			var self = this;
			colorInput.addEventListener("input", function() {
				label.innerHTML = "<b>" + title + ":</b> " + colorInput.value;
				colorLabel.style.backgroundColor = colorInput.value;
				if(callback) {
					callback(colorInput.value);
				}
				self._callGCH();
			});
			return this;
		},

		bindColor: function(title, color, object) {
			return this.addColor(title, color, function(value) {
				object[title] = value;
			});
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
			this._callGCH();
			return this;
		},

		////////////////////////////////////////////////////////////////////////////////
		// TEXT (INPUT TEXT)
		////////////////////////////////////////////////////////////////////////////////
		addText: function(title, text, callback) {
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + "</b>", container);

			var textInput = this._createElement("input", "qs_text_input", container);
			textInput.type = "text";
			textInput.id = title;
			textInput.value = text || "";
			textInput.className = "qs_text_input";

			this._controls[title] = {
				type: "text",
				container: container,
				control: textInput,
				label: label,
				callback: callback
			}

			var self = this;
			textInput.addEventListener("input", function() {
				if(callback) {
					callback(textInput.value);
				}
				self._callGCH();
			});
			return this;
		},

		bindText: function(title, text, object) {
			return this.addText(title, text, function(value) {
				object[title] = value;
			});
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
			this._callGCH();
			return this;
		},



		////////////////////////////////////////////////////////////////////////////////
		// PASSWORD (INPUT TEXT HIDDEN VALUES)
		////////////////////////////////////////////////////////////////////////////////
		addPassword: function(title, text, callback) {
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + "</b>", container);

			var textInput = this._createElement("input", "qs_text_input", container);
			textInput.type = "password";
			textInput.id = title;
			textInput.value = text || "";

			this._controls[title] = {
				type: "password",
				container: container,
				control: textInput,
				label: label,
				callback: callback
			}

			var self = this;
			textInput.addEventListener("input", function() {
				if(callback) {
					callback(textInput.value);
				}
				self._callGCH();
			});
			return this;
		}, 

		bindPassword: function(title, text, object) {
			return this.addPassword(title, text, function(value) {
				object[title] = value;
			});
		},



		////////////////////////////////////////////////////////////////////////////////
		// TEXT AREA
		////////////////////////////////////////////////////////////////////////////////
		addTextArea: function(title, text, callback) {
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + "</b>", container);

			var textInput = this._createElement("textarea", "qs_textarea", container);
			textInput.id = title;
			textInput.rows = 5;
			textInput.value = text || "";
			textInput.className = "qs_textarea";

			this._controls[title] = {
				type: "textarea",
				container: container,
				control: textInput,
				label: label,
				callback: callback
			}

			var self = this;
			textInput.addEventListener("input", function() {
				if(callback) {
					callback(textInput.value);
				}
				self._callGCH();
			});
			return this;
		}, 

		setTextAreaRows: function(title, rows) {
			this._controls[title].control.rows = rows;
			return this;
		},

		bindTextArea: function(title, text, object) {
			return this.addTextArea(title, text, function(value) {
				object[title] = value;
			});
		},


		////////////////////////////////////////////////////////////////////////////////
		// DATE INPUT
		////////////////////////////////////////////////////////////////////////////////
		addDate: function(title, date, callback) {
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

			if(this._isIE()) {
				return this.addText(title, dateStr, callback);
			}
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + "</b>", container);

			var dateInput = this._createElement("input", "qs_text_input", container);
			dateInput.type = "date";
			dateInput.id = title;
			dateInput.value = dateStr || "";

			this._controls[title] = {
				type: "date",
				container: container,
				control: dateInput,
				label: label,
				callback: callback
			}

			var self = this;
			dateInput.addEventListener("input", function() {
				if(callback) {
					callback(dateInput.value);
				}
				self._callGCH();
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
			this._callGCH();
			return this;
		},

		bindDate: function(title, date, object) {
			return this.addDate(title, date, function(value) {
				object[title] = value;
			});
		},

		getDate: function(title) {
			var control = this._controls[title];
			return control.control.value;
		},


		////////////////////////////////////////////////////////////////////////////////
		// TIME INPUT
		////////////////////////////////////////////////////////////////////////////////

		addTime: function(title, time, callback) {
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

			if(this._isIE()) {
				return this.addText(title, timeStr, callback);
			}

			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + "</b>", container);

			var timeInput = this._createElement("input", "qs_text_input", container);
			timeInput.type = "time";
			timeInput.id = title;
			timeInput.value = timeStr || "";

			this._controls[title] = {
				type: "time",
				container: container,
				control: timeInput,
				label: label,
				callback: callback
			}

			var self = this;
			timeInput.addEventListener("input", function() {
				if(callback) {
					callback(timeInput.value);
				}
				self._callGCH();
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
			this._callGCH();
			return this;
		},

		getTime: function(title) {
			var control = this._controls[title];
			return control.control.value;
		},

		bindTime: function(title, time, object) {
			return this.addTime(title, time, function(value) {
				object[title] = value;
			});
		},



		////////////////////////////////////////////////////////////////////////////////
		// INFO (READ ONLY TEXT DISPLAY)
		////////////////////////////////////////////////////////////////////////////////
		addInfo: function(title, info) {
			var container = this._createContainer();
			container.innerHTML = info;
			this._controls[title] = {
				type: "info",
				container: container
			};
			return this;
		},

		getInfo: function(title) {
			return this._controls[title].container.innerHTML;
		},

		setInfo: function(title, info) {
			this._controls[title].container.innerHTML = info;
			return this;
		},

		////////////////////////////////////////////////////////////////////////////////
		// DROPDOWN (SELECT ELEMENT)
		////////////////////////////////////////////////////////////////////////////////
		addDropDown: function(title, items, callback) {
			var container = this._createContainer();

			var label = this._createLabel("<b>" + title + "</b>", container);
			var select = this._createElement("select", "qs_select", container);
			for(var i = 0; i < items.length; i++) {
				var option = this._createElement("option");
				option.label = items[i];
				option.innerText = items[i];
				select.add(option);
			};

			var self = this;
			select.addEventListener("change", function() {
				var index = select.selectedIndex,
					options = select.options;

				if(callback) {
					callback({
						index: index,
						value: options[index].label
					});
				}
				self._callGCH();
			});

			this._controls[title] = {
				type: "dropdown",
				container: container,
				control: select,
				label: label,
				callback: callback
			};
			return this;
		},

		bindDropDown: function(title, items, object) {
			return this.addDropDown(title, items, function(value) {
				object[title] = value.value;
			});
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
			this._callGCH();
			return this;
		},

		////////////////////////////////////////////////////////////////////////////////
		// IMAGE
		////////////////////////////////////////////////////////////////////////////////
		addImage: function(title, imageURL) {
			var container = this._createContainer(),
				label = this._createLabel("<b>" + title + "</b>", container);
				img = this._createElement("img", "qs_image", container);
			img.src = imageURL;

			this._controls[title] = {
				type: "image",
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

		////////////////////////////////////////////////////////////////////////////////
		// PROGRESS BAR
		////////////////////////////////////////////////////////////////////////////////
		addProgressBar: function(title, max, value, valueDisplay) {
			var container = this._createContainer(),
				label = this._createLabel("", container),
				progressDiv = this._createElement("div", "qs_progress", container),
				valueDiv = this._createElement("div", "qs_progress_value", progressDiv);

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

			this._controls[title] = {
				type: "progressbar",
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

		////////////////////////////////////////////////////////////////////////////////
		// ELEMENT (RAW HTML ELEMENT)
		////////////////////////////////////////////////////////////////////////////////

		addElement: function(title, element) {
			var container = this._createContainer(),
				label = this._createLabel("<b>" + title + "</b>", container);

			container.appendChild(element);

			this._controls[title] = {
				type: "element",
				container: container,
				label: label
			};
			return this;
		},

		////////////////////////////////////////////////////////////////////////////////
		// HTML (HTML STRING)
		////////////////////////////////////////////////////////////////////////////////
		addHTML: function(title, html) {
			var div = this._createElement("div");
			div.innerHTML = html;
			this.addElement(title, div);
			return this;
		},

	};

	////////////////////////////////////////////////////////////////////////////////
	// EXPORT
	////////////////////////////////////////////////////////////////////////////////
	if (typeof define === "function" && define.amd) {
	    define(QuickSettings);
	} else {
	   window.QuickSettings = QuickSettings;
	}

}());
