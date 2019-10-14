function toggleUniform() {
	var aObject = sideCanvas.getActiveObject();
	if (aObject.type === 'activeSelection') {
		aObject.getObjects().forEach(function(obj) {
			obj.set('strokeUniform', !obj.strokeUniform);
		});
	} else {
		aObject.set('strokeUniform', !aObject.strokeUniform);
	}
	sideCanvas.requestRenderAll();
}

var sideCanvas = this.__canvas = new fabric.Canvas('s');
// create a rectangle object
var rect = new fabric.Rect({
	left: 100,
	top: 30,
	fill: '#D81B60',
	width: 50,
	height: 50,
	strokeWidth: 2,
	stroke: "#880E4F",
	rx: 10,
	ry: 10,
	angle: 45,
	scaleX: 3,
	scaleY: 3,
	hasControls: true
});

sideCanvas.add(rect);

var circle1 = new fabric.Circle({
	radius: 65,
	fill: '#039BE5',
	left: 0,
	stroke: 'red',
	strokeWidth: 3
});

var circle2 = new fabric.Circle({
	radius: 65,
	fill: '#4FC3F7',
	left: 110,
	opacity: 0.7,
	stroke: 'blue',
	strokeWidth: 3,
	strokeUniform: true
});

sideCanvas.add(circle1);
sideCanvas.add(circle2);