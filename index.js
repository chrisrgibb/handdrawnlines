
var noise = new Simple1DNoise();
noise.setAmplitude(2);
noise.setScale(0.05);



var canvas = document.getElementById('canvas');
var scale = 1;
var renderer = new Renderer(canvas, scale);
renderer.render([]);


canvas.addEventListener('mousedown', function(e){
    // user is starting to draw a shape
	var x = e.offsetX / scale | 0;
	var y = e.offsetY / scale | 0;
	drawingState.start(x, y);

});

canvas.addEventListener('mouseup', function(e){
    // user has finished drawing a shape
	var x = e.offsetX / scale | 0;
	var y = e.offsetY / scale | 0;

	drawingState.end(x, y);

	drawingState.shapes.push(drawingState.getCurrentShape());

	drawingState.reset();
	renderer.currentShape = null;
	renderer.render(drawingState.shapes);
});

canvas.addEventListener('mousemove', function(e){
    if(!drawingState.drawing) {
        // the user isn't trying to draw anything at the moment
        return;
    }
    var x = e.offsetX / scale | 0;
    var y = e.offsetY / scale | 0;
    drawingState.x2 = x;
    drawingState.y2 = y;
    // draw the shape the user is trying to draw.
    renderer.currentShape = drawingState.getCurrentShape();

    renderer.render(drawingState.shapes);
});

document.getElementById('noise-amplitude').addEventListener('change', function(e){
	// debugger;
	var val = parseInt(this.value);
	noise.setAmplitude(val);
    renderer.render(drawingState.shapes);
});

document.getElementById('noise-scale').addEventListener('change', function(e){
	// debugger;
	var val = parseFloat(this.value);
	noise.setScale(val);
    renderer.render(drawingState.shapes);
});



document.getElementById('buttons').addEventListener('click', function(e){
    // clear the borders of the buttons
	for(var i = 0; i < this.children.length; i++){
		this.children[i].style.border = "";
	}
	if(e.target.id === 'buttons'){
        // a button hasn't been selected
		return;
	}
	e.target.style.border = "1px red solid";
	drawingState.selected = e.target.id;
});

// line is selected by default so make it look like its selected
document.getElementById('line').style.border = "1px red solid";
