
var drawingState = {
	x1 : 0,
	y1 : 0,
	x2 : 0,
	y2 : 0,
	drawing : false,
	start : function(x, y) {
		this.x1 = x;
		this.y1 = y;
		this.drawing = true;
	},
	end : function(x, y) {
		this.x2 = x;
		this.y2 = y;
	},
	reset : function() {
		this.drawing = false;
		this.x1 = 0;
		this.y1 = 0;
		this.x2 = 0;
		this.y2 = 0;
	},
	getCurrentShape : function(){
        var shape = this.selected;
        if(shape === "line") {
            return {
                type : "line",
                dimensions : {
                    x0 : drawingState.x1,
                    y0 : drawingState.y1,
                    x1 : drawingState.x2, 
                    y1 : drawingState.y2
                }
            };
        } else if (drawingState.selected === "square") {
            var w = Math.abs(drawingState.x1 - drawingState.x2);
            var h = Math.abs(drawingState.y1 - drawingState.y2);
            var x0 = Math.min(drawingState.x1, drawingState.x2);
            var y0 = Math.min(drawingState.y1, drawingState.y2);

            return {
                type : "square",
                dimensions : {
                    x : x0,
                    y : y0,
                    w : w,
                    h : h
                }
            };
        } else if(drawingState.selected === "circle") {
            var w = Math.abs(drawingState.x1 - drawingState.x2);
            var h = Math.abs(drawingState.y1 - drawingState.y2);
            var x0 = Math.min(drawingState.x1, drawingState.x2);
            var y0 = Math.min(drawingState.y1, drawingState.y2);

            var xx = x0 + (w/2);
            var yy = y0 + (h/2);

            return {
                type : "circle",
                dimensions : {
                    x : xx,
                    y : yy,
                    r : w / 2
                }
            };
        }
	},
	selected : "line"
};
