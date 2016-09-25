var Renderer = function (canvas, scale) {
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
	this.backgroundColor = "#fff";
	this.width = 640;
	this.height = 480;
    this.scale = scale || 1;
    this.ctx.scale(this.scale, this.scale);
    this.shapes = [];
    this.currentShape = null;

	this.render = function(){
		var ctx = this.ctx;
        ctx.imageSmoothingEnabled = false
        // clear screen
		ctx.fillStyle = this.backgroundColor;
		ctx.fillRect(0, 0, 640, 480);

        // use black pen
		ctx.fillStyle = 'black';

        this.shapes.forEach(this.drawShape, this);
        if (this.currentShape){ 
            this.drawShape(this.currentShape);
        }
	};

    this.drawShape = function(shape){
        var d = shape.dimensions;
        if(shape.type === "line"){

            this.drawLine(d.x0, d.y0, d.x1, d.y1);
        } else if (shape.type === "circle") {
            this.drawCircle(d.x, d.y, d.r);
        } else if (shape.type === "square") {
            this.drawSquare(d.x ,d.y, d.w, d.h);
        }
    }

    this.addShape = function(shape){
        this.shapes.push(shape);
    };

    this.drawLine = function line(x0, y0, x1, y1){
        var dx = Math.abs(x1-x0);
        var dy = Math.abs(y1-y0);
        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;
        var err = dx-dy;

        while(true){
            setPixel(x0,y0); 

            if ((x0==x1) && (y0==y1)) break;
            var e2 = 2*err;
            if (e2 >-dy){ err -= dy; x0  += sx; }
            if (e2 < dx){ err += dx; y0  += sy; }
        }
    }

    this.drawCircle = function(x0, y0, radius) {
        var x = radius;
        var y = 0;
        var err = 0;
        while(x >= y){
            setPixel(x + x0, y + y0);
            setPixel(x0 + y, y0 + x);
            setPixel(x0 - y, y0 + x);
            setPixel(x0 - x, y0 + y);
            setPixel(x0 - x, y0 - y);
            setPixel(x0 - y, y0 - x);
            setPixel(x0 + y, y0 - x);
            setPixel(x0 + x, y0 - y);
            
            y += 1;
            err += 1 + 2 * y;
            if(2 * (err - x) + 1 > 0) {
                x -=1;
                err += 1 - 2 * x;
            }   
        }
    }

    this.drawSquare = function(x, y, w, h){
        renderer.drawLine(x, y, x + w, y);
        renderer.drawLine(x + w, y, x + w, y + h);
        renderer.drawLine(x+1, y + h, x + w, y + h);
        renderer.drawLine(x, y, x, y + h);
    }

	function plot (x, y, ctx) {
		ctx.fillRect(x, y, 1, 1);
	}

    var ctx = this.ctx;

    var setPixel = function(x, y){
        var xOffset = noise.getVal(y) // * 2 - 1;
        var yoffset = noise.getVal(x) //* 2 - 1;

        return plot(x + xOffset, y + yoffset, ctx);
    }
}