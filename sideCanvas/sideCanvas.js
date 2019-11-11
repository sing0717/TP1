var sideCanvas = this.__canvas = new fabric.Canvas('s');

function sideStart(){
	var sideStartValue = document.getElementById('start').value;
	return sideStartValue;
}
function sideEnd(){
	var sideEndValue = document.getElementById('end').value;
	return sideEndValue;
}
function sideDistance(){
	var distanceValue = String(s_distance);
	return distanceValue;
}
function sideStation(){
	var stationValue = String(parseInt((s_stationCount.length+1)/4-1));
	return stationValue;
}
function sidePrint(){
	sideCircle1 = new fabric.Circle({
		top: 40,
		left: 40,
		strokeWidth: 10,
		radius: 20,
		fill: 'white',
		stroke: 'gray',
		lockMovementX: true,
		lockMovementY: true,
		selectable : false
	});
	sideCircle2 = new fabric.Circle({
		top: 120,
		left: 40,
		strokeWidth: 10,
		radius: 20,
		fill: 'white',
		stroke: 'gray',
		lockMovementX: true,
		lockMovementY: true,
		selectable : false
	});
	sideText1 = new fabric.Text(sideStart(), {
		top: 40,
		left: 100,
		fontSize: 20,
		lockMovementX: true,
		lockMovementY: true,
		selectable : false
	});
	sideText2 = new fabric.Text(sideEnd(), {
		top: 120,
		left: 100,
		fontSize: 20,
		lockMovementX: true,
		lockMovementY: true,
		selectable : false
	});
	sideText3 = new fabric.Text(sideStation()+"개 역("+sideDistance()+"분)", {
		top: 80,
		left: 125,
		fontSize: 15,
		lockMovementX: true,
		lockMovementY: true,
		selectable : false
	});
	if(canvas.startSelected!=null && canvas.endSelected!=null){
		sideCanvas.add(sideCircle1);
		sideCanvas.add(sideCircle2);
		sideCanvas.add(sideText1);
		sideCanvas.add(sideText2);
		sideCanvas.add(sideText3);
	}
}
function sideClear(){
	sideCanvas.remove(sideCircle1);
	sideCanvas.remove(sideCircle2);
	sideCanvas.remove(sideText1);
	sideCanvas.remove(sideText2);
	sideCanvas.remove(sideText3);
}

//var aaa = document.getElementById('start').value;
//document.getElementById('start').value;
/*var point = new fabric.Circle({
	top: 80,
	left: 40,
	radius: 3,
	fill: 'gray',
	lockMovementX: true,
	lockMovementY: true,
	selectable : false
});
	sideCanvas.add(sideCircle1);
	sideCanvas.add(sideCircle2);
	sideCanvas.add(sideText1);
	sideCanvas.add(sideText2);
*/
