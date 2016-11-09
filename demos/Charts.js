var Charts = {
    lineChart: {
        create: function() {
            var obj = Object.create(this);
            obj.init();
            return obj;
        },

        init: function() {
            this.canvas = document.createElement("canvas");
            this.context = this.canvas.getContext("2d");
            this.canvas.width = this.width = 180;
            this.canvas.height = this.height = 120;
            this.backgroundColor = "white";
            this.lineWidth = 0.5;
            this.strokeStyle = "black";
        },

        getElement: function() {
            return this.canvas;
        },

        setData: function(data) {
            this.data = data;
            this.min = Math.min.apply(null, this.data);
            this.max = Math.max.apply(null, this.data);
            this.draw();
            return this;
        },

        draw: function() {
            this.context.fillStyle = this.backgroundColor
            this.context.fillRect(0, 0, this.width, this.height);
            this.context.beginPath();
            this.context.strokeStyle = this.strokeStyle;
            this.context.lineWidth = this.lineWidth;
            for(var i = 0; i < data.length; i++) {
                var val = data[i],
                    x = this.width / (data.length - 1) * i,
                    y = this.height - (val - this.min) / (this.max - this.min) * this.height;
                this.context.lineTo(x, y);
            }
            this.context.stroke();
        },

        setSize: function(w, h) {
            this.canvas.width = this.width = w;
            this.canvas.height = this.height = h;
            this.draw();
            return this;
        },

        setLineWidth: function(width) {
            this.lineWidth = width;
            this.draw();
            return this;
        },

        setStrokeStyle: function(style) {
            this.strokeStyle = style;
            this.draw();
            return this;
        },

        setBackgroundColor: function(color) {
            this.backgroundColor = color;
            this.draw();
            return this;
        }
    },

    barChart: {
        create: function() {
            var obj = Object.create(this);
            obj.init();
            return obj;
        },

        init: function() {
            this.canvas = document.createElement("canvas");
            this.context = this.canvas.getContext("2d");
            this.canvas.width = this.width = 180;
            this.canvas.height = this.height = 120;
            this.spacing = 1;
            this.backgroundColor = "white";
            this.barColor = "black";
        },

        getElement: function() {
            return this.canvas;
        },

        setData: function(data) {
            this.data = data;
            this.min = Math.min.apply(null, this.data);
            this.max = Math.max.apply(null, this.data);
            this.draw();
            return this;
        },

        draw: function() {
            this.context.fillStyle = this.backgroundColor;
            this.context.fillRect(0, 0, this.width, this.height);
            this.context.fillStyle = this.barColor;
            var barWidth = this.width / data.length - this.spacing;
            for(var i = 0; i < data.length; i++) {
                var val = data[i],
                    x = (barWidth + this.spacing) * i,
                    h = (val - this.min) / (this.max - this.min) * this.height,
                    y = this.height - h;
                this.context.fillRect(x, y, barWidth, h);
            }
        },

        setSize: function(w, h) {
            this.canvas.width = this.width = w;
            this.canvas.height = this.height = h;
            this.draw();
            return this;
        },

        setBackgroundColor: function(color) {
            this.backgroundColor = color;
            this.draw();
            return this;
        },

        setSpacing: function(spacing) {
            this.spacing = spacing;
            this.draw();
            return this;
        },

        setBarColor: function(color) {
            this.barColor = color;
            this.draw();
            return this;
        }
    },

    pieChart: {
        create: function() {
            var obj = Object.create(this);
            obj.init();
            return obj;
        },

        init: function() {
            this.canvas = document.createElement("canvas");
            this.context = this.canvas.getContext("2d");
            this.canvas.width = this.width = 180;
            this.canvas.height = this.height = 180;
            this.backgroundColor = "white";
            this.innerRadius = 0;
            this.colors = [
                "#5DA5DA",
                "#FAA43A",
                "#60BD68",
                "#F17CB0",
                "#B2912F",
                "#B276B2",
                "#DECF3F",
                "#F15854",
                "#4D4D4D"
            ];
        },

        getElement: function() {
            return this.canvas;
        },

        setData: function(data) {
            this.data = data;
            if(this.sort) {
                this.data.sort(function(a, b) { return b - a});
            }
            this.total = 0;
            for(var i = 0; i < this.data.length; i++) {
                this.total += this.data[i];
            }
            this.draw();
            return this;
        },

        draw: function() {
            if(!this.data) return;

            this.context.fillStyle = this.backgroundColor;
            this.context.fillRect(0, 0, this.width, this.height);
            this.context.fillStyle = this.barColor;
            var radius = Math.min(this.width, this.height) / 2 - 5;

            this.context.save();
            this.context.translate(this.width / 2, this.height / 2);
            for(var i = 0; i < this.data.length; i++) {
                var val = this.data[i],
                    arc = val / this.total * Math.PI * 2;
                this.context.fillStyle = this.colors[i % this.colors.length];
                this.context.beginPath();
                this.context.moveTo(0, 0);
                this.context.arc(0, 0, radius, 0, arc);
                this.context.closePath();
                this.context.fill();
                this.context.rotate(arc);
            }
            if(this.innerRadius) {
                this.context.beginPath();
                this.context.fillStyle = this.backgroundColor;
                this.context.moveTo(0, 0);
                this.context.arc(0, 0, this.innerRadius, 0, Math.PI * 2);
                this.context.fill();
            }
            this.context.restore();
        },

        setSize: function(w, h) {
            this.canvas.width = this.width = w;
            this.canvas.height = this.height = h;
            this.draw();
            return this;
        },

        setBackgroundColor: function(color) {
            this.backgroundColor = color;
            this.draw();
            return this;
        },

        setColors: function(colors) {
            this.colors = colors;
            this.draw();
            return this;
        },

        setDonut: function(radius) {
            this.innerRadius = radius;
            this.draw();
            return this;
        },

        setSort: function(value) {
            this.sort = value;
            return this;
        }
    }


}