(function() {
	var QuickSettings = {
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
		_globalChangeHandler: null,
		_callbacks: {},

		create: function(x, y, title) {
			var obj = Object.create(this);
			obj._init(x, y, title);
			return obj;
		},

		_init: function(x, y, title) {
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
			this._panel.className = "msettings_main";
			this._panel.style.zIndex = ++QuickSettings._topZ;
			this.setPosition(x || 0, y || 0);
			this._controls = {};
		},

		_createTitleBar: function(text) {
			this._titleBar = document.createElement("div");
			this._titleBar.textContent = text;
			this._titleBar.className = "msettings_title_bar";

			this._titleBar.addEventListener("mousedown", this._startDrag);
			this._titleBar.addEventListener("dblclick", this._doubleClickTitle);

			this._panel.appendChild(this._titleBar);
		},

		_createContent: function() {
			this._content = document.createElement("div");
			this._content.className = "msettings_content";
			this._panel.appendChild(this._content);
		},

		setPosition: function(x, y) {
			this._panel.style.left = x + "px";
			this._panel.style.top = Math.max(y, 0) + "px";
		},

		setSize: function(w, h) {
			this._panel.style.width = w + "px";
			this._content.style.width = w + "px";
			this._content.style.height = (h - this._titleBar.offsetHeight) + "px";
		},

		setWidth: function(w) {
			this._panel.style.width = w + "px";
			this._content.style.width = w + "px";
		},

		setDraggable: function(draggable) {
			this._draggable = draggable;
			if(this._draggable || this._collapsible) {
				this._titleBar.style.cursor = "pointer";
			}
			else {
				this._titleBar.style.cursor = "default";
			}
		},

		setCollapsible: function(collapsible) {
			this._collapsible = collapsible;
			if(this._draggable || this._collapsible) {
				this._titleBar.style.cursor = "pointer";
			}
			else {
				this._titleBar.style.cursor = "default";
			}
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
		},

		addCallbackHandler: function (title, callback) {
			if (typeof callback !== "function")
				throw "addCallbackHandler expects a function as second argument";

			this._callbacks[title] = this._callbacks[title] || [];
			if (this._callbacks[title].indexOf(callback) !== -1) return;
			this._callbacks[title].push(callback);
		},

		removeCallbackHandler: function (title, callback) {
			var index = this._callbacks[title].indexOf(callback);
			while (index !== -1) {
				this._callbacks[title].splice(index, 1);
				var index = this._callbacks[title].indexOf(callback);
			}
		},

		_callCallbacks: function (title, event) {
			this._callbacks[title] = this._callbacks[title] || [];
			for (var k = 0; k < this._callbacks[title].length; k++) {
				this._callbacks[title][k](event);
			}
		},

		toggleCollapsed: function() {
			if(this._collapsed) {
				this.expand();
			}
			else {
				this.collapse();
			}
		},

		collapse: function() {
			this._panel.removeChild(this._content);
			this._collapsed = true;
		},

		expand: function() {
			this._panel.appendChild(this._content);
			this._collapsed = false;
		},

		hide: function() {
			this._panel.style.visibility = "hidden";
			this._hidden = true;
		},

		show: function() {
			this._panel.style.visibility = "visible";
			this._panel.style.zIndex = ++QuickSettings._topZ;
			this._hidden = false;
		},

		_createContainer: function() {
			var container = document.createElement("div");
			container.className = "msettings_container";
			return container;
		},

		_createLabel: function(title) {
			var label = document.createElement("div");
			label.innerHTML = title;
			label.className = "msettings_label";
			return label;
		},

		setKey: function(char) {
			this._keyCode = char.toUpperCase().charCodeAt(0);
			document.body.addEventListener("keyup", this.onKeyUp);
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
		},

		bindRange: function(title, min, max, value, step, object) {
			this.addRange(title, min, max, value, step, function(value) {
				object[title] = value;
			});
		},

		addControl: function (props) {
			if (typeof props.type !== "string")
				throw "AddControl needs an object with a type";

			var value = localStorage.getItem("quicksettings-" + props.title) || props.value || props.color || props.text;
			var callback = props.callback || function () {};

			switch (props.type.toLowerCase()) {
				case "range":
					this.addRange(props.title, props.min, props.max, parseFloat(value), props.step, callback);
				break;
				case "color":
					this.addColor(props.title, value, callback);
				break;
				case "boolean":
					this.addBoolean(props.title, typeof value == "string" ? value == "true" : value, callback);
				break;
				case "text":
					this.addText(props.title, value, callback);
				break;
				case "textarea":
					this.addTextArea(props);
				break;
				case "dropdown":
					this.addDropDown(props.title, props.items, callback, value);
				break;
			}

			this.addCallbackHandler(props.title, function (event) {
				localStorage.setItem("quicksettings-" + props.title, event.index || event.value);
			});
		},

		addRange: function(title, min, max, value, step, callback) {
			var container = this._createContainer();

			var range = document.createElement("input");
			range.type = "range";
			range.id = title;
			range.min = min || 0;
			range.max = max || 100;
			range.step = step || 1;
			range.value = value || 0;
			range.className = "msettings_range";

			var label = this._createLabel("<b>" + title + ":</b> " + range.value);

			container.appendChild(label);
			container.appendChild(range);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: range,
				label: label,
				callback: callback
			};

			var eventName = "input";
			if(this._isIE()) {
				eventName = "change";
			}
			var gch = this._globalChangeHandler;
			var qs = this;
			range.addEventListener(eventName, function() {
				label.innerHTML = "<b>" + title + ":</b> " + range.value;
				if(callback) {
					callback(parseFloat(range.value));
				}
				if(gch) {
					gch();
				}
				qs._callCallbacks(title, {value: parseFloat(range.value)});
			});
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

		getRangeValue: function(title) {
			return this._controls[title].control.value;
		},

		setRangeValue: function(title, value) {
			var control = this._controls[title];
			control.control.value = value;
			control.label.innerHTML = "<b>" + title + ":</b> " + control.control.value;
			if(control.callback) {
				control.callback(parseFloat(control.control.value));
			}
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
		},

		setRangeParameters: function(title, min, max, step) {
			var control = this._controls[title];
			control.control.min = min;
			control.control.max = max;
			control.control.step = step;
		},

		bindBoolean: function(title, value, object) {
			this.addBoolean(title, value, function(value) {
				object[title] = value;
			});
		},

		addBoolean: function(title, value, callback) {
			var container = this._createContainer();

			var label = document.createElement("span");
			label.className = "msettings_checkbox_label";
			label.textContent = title;

			var checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.id = title;
			checkbox.checked = value;
			checkbox.className = "msettings_checkbox";

			container.appendChild(checkbox);
			container.appendChild(label);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: checkbox,
				callback: callback
			};

			var gch = this._globalChangeHandler;
			var qs = this;
			checkbox.addEventListener("change", function() {
				if(callback) {
					callback(checkbox.checked);
				}
				if(gch) {
					gch();
				}
				qs._callCallbacks(title, {value: checkbox.checked});
			});
			label.addEventListener("click", function() {
				if(checkbox.disabled) {
					return;
				}
				checkbox.checked = !checkbox.checked;
				if(callback) {
					callback(checkbox.checked);
				}
				if(gch) {
					gch();
				}
				qs._callCallbacks(title, {value: checkbox.checked});
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
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
			this._callCallbacks(title, {value: value});
		},

		addButton: function(title, callback) {
			var container = this._createContainer();

			var button = document.createElement("input");
			button.type = "button";
			button.id = title;
			button.value = title;
			button.className = "msettings_button";

			container.appendChild(button);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: button
			}

			var gch = this._globalChangeHandler;
			var qs = this;
			button.addEventListener("click", function() {
				if(callback) {
					callback(button);
				}
				if(gch) {
					gch();
				}
				qs._callCallbacks(title, {button: button});
			});
		},

		bindColor: function(title, color, object) {
			this.addColor(title, color, function(value) {
				object[title] = value;
			});
		},

		addColor: function(title, color, callback) {
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + ":</b> " + color);

			var colorInput = document.createElement("input");
			try {
				colorInput.type = "color";
			}
			catch(e) {
				colorInput.type = "text";
			}
			colorInput.id = title;
			colorInput.value = color || "#ff0000";
			colorInput.className = "msettings_color";

			container.appendChild(label);
			container.appendChild(colorInput);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: colorInput,
				label: label,
				callback: callback
			};

			var gch = this._globalChangeHandler;
			var qs = this;
			colorInput.addEventListener("input", function() {
				label.innerHTML = "<b>" + title + ":</b> " + colorInput.value;
				if(callback) {
					callback(colorInput.value);
				}
				if(gch) {
					gch();
				}
				qs._callCallbacks(title, {value: colorInput.value});
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
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
			this._callCallbacks(title, {value: value});
		},

		bindText: function(title, text, object) {
			this.addText(title, text, function(value) {
				object[title] = value;
			});
		},

		addText: function(title, text, callback) {
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + "</b>");

			var textInput = document.createElement("input");
			textInput.type = "text";
			textInput.id = title;
			textInput.value = text || "";
			textInput.className = "msettings_text_input";

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
			var qs = this;
			textInput.addEventListener("input", function() {
				if(callback) {
					callback(textInput.value);
				}
				if(gch) {
					gch();
				}
				qs._callCallbacks(title, {value: textInput.value});
			});
		}, 

		addTextArea: function(title, text, callback) {
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + "</b>");

			var textInput = document.createElement("textarea");
			textInput.id = title;
			textInput.rows = 5;
			textInput.value = text || "";
			textInput.className = "msettings_textarea";

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
			var qs = this;
			textInput.addEventListener("input", function() {
				if(callback) {
					callback(textInput.value);
				}
				if(gch) {
					gch();
				}
				qs._callCallbacks(title, {value: textInput.value});
			});
		}, 

		setTextAreaRows: function(title, rows) {
			this._controls[title].control.rows = rows;
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
			this._callCallbacks(title, {value: text});
		},

		addInfo: function(title, info) {
			var container = this._createContainer();
			container.innerHTML = info;
			this._controls[title] = {
				container: container
			};
			this._content.appendChild(container);
		},

		bindDropDown: function(title, items, object) {
			this.addDropDown(title, items, function(value) {
				object[title] = value.value;
			});
		},

		addDropDown: function(title, items, callback, selectedIndex) {
			var container = this._createContainer();

			var label = this._createLabel("<b>" + title + "</b>");
			var select = document.createElement("select");
			for(var i = 0; i < items.length; i++) {
				var option = document.createElement("option");
				option.label = items[i];
				select.add(option);
			};
			if (selectedIndex) select.selectedIndex = selectedIndex;

			var gch = this._globalChangeHandler;
			var qs = this;
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

				qs._callCallbacks(title, {
					index: index,
					value: options[index].label
				});
			});
			select.className = "msettings_select";

			container.appendChild(label);
			container.appendChild(select);
			this._content.appendChild(container);

			this._controls[title] = {
				container: container,
				control: select,
				label: label,
				callback: callback
			};
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
			this._callCallbacks(title, {
				index: index,
				value: options[index].label
			});
		},

		getInfo: function(title) {
			return this._controls[title].container.innerHTML;
		},

		setInfo: function(title, info) {
			this._controls[title].container.innerHTML = info;
		},

		addImage: function(title, imageURL) {
			var container = this._createContainer(),
				label = this._createLabel("<b>" + title + "</b>");
				img = document.createElement("img");
			img.className = "msettings_image";
			img.src = imageURL;

			container.appendChild(label);
			container.appendChild(img);
			this._content.appendChild(container);

			this._controls[title] = {
				container: container,
				control: img,
				label: label
			};
		},

		setImageURL: function(title, imageURL) {
			this._controls[title].control.src = imageURL;
		},

		addProgressBar: function(title, max, value, showNumbers) {
			var container = this._createContainer(),
				label = this._createLabel("");
				progress = document.createElement("progress");
			progress.className = "msettings_progress";
			progress.max = max;
			progress.value = value;
			if(showNumbers) {
				label.innerHTML = "<b>" + title + ":<b> " + value + " / " + max;
			}
			else {
				label.innerHTML = "<b>" + title + "<b>";
			}

			container.appendChild(label);
			container.appendChild(progress);
			this._content.appendChild(container);

			this._controls[title] = {
				container: container,
				control: progress,
				showNumbers: showNumbers,
				label: label
			};
		},

		getProgress: function(title) {
			return this._controls[title].control.value;
		},

		setProgress: function(title, value) {
			var progress = this._controls[title].control;
			progress.value = value;
			if(this._controls[title].showNumbers) {
				this._controls[title].label.innerHTML = "<b>" + title + ":<b> " + progress.value + " / " + progress.max;
			}
			else {
				this._controls[title].label.innerHTML = "<b>" + title + "<b>";
			}
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
		},

		addHTML: function(title, html) {
			var div = document.createElement("div");
			div.innerHTML = html;
			this.addElement(title, div);
		},

		removeControl: function(title) {
			if(this._controls[title]){
				var container = this._controls[title].container;
			}
			if(container && container.parentElement) {
				container.parentElement.removeChild(container);
			}
			this._controls[title] = null;
		},

		enableControl: function(title) {
			if(this._controls[title].control) {
				this._controls[title].control.disabled = false;
			}
		},

		disableControl: function(title) {
			if(this._controls[title].control) {
				this._controls[title].control.disabled = true;
			}
		}
	};

	if (typeof define === "function" && define.amd) {
	    define(QuickSettings);
	} else {
	   window.QuickSettings = QuickSettings;
	}

}());
