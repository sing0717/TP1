var sideCanvas = new fabric.Canvas('s');

var ssc = [];

function sideDistance(){
	var distanceValue = String(Math.round(s_distance*10)/10.0);
	return distanceValue;
}
function sideStation(){
	var stationValue = s_stationCount.replace(/  /gi," ");
	ssc = stationValue.split(" "); 
	stationValue = ssc.length-2;
	return stationValue;
}
function sidePrint(){
	sideCircle1 = new fabric.Circle({
		top: 50,
		left: 30,
		strokeWidth: 5,
		radius: 10,
		fill: 'white',
		stroke: 'gray',
		lockMovementX: true,
		lockMovementY: true,
		selectable : false
	});
	sideCircle2 = new fabric.Circle({
		top: sideCircle1.get('top')+40,
		left: sideCircle1.get('left'),
		strokeWidth: 5,
		radius: 10,
		fill: 'white',
		stroke: 'gray',
		lockMovementX: true,
		lockMovementY: true,
		selectable : false
	});
	sideLine = new fabric.Line([sideCircle1.get('left'), sideCircle1.get('top')+10, sideCircle2.get('left'), sideCircle2.get('top')-10], {
		strokeWidth: 5,
		stroke: 'gray',
		objectCaching: false
	});
	sideText3 = new fabric.Text(sideStation()+"개 역("+sideDistance()+"분)", {
		top: 20,
		left: 120,
		fontSize: 15,
		lockMovementX: true,
		lockMovementY: true,
		selectable : false
	});
	if(canvas.startSelected!=null && canvas.endSelected!=null){
		sideCanvas = new fabric.Canvas('s');
		sideText1 = new fabric.Text(ssc[0], {
			top: sideCircle1.get('top'),
			left: sideCircle1.get('left')+45,
			fontSize: 20,
			lockMovementX: true,
			lockMovementY: true,
			selectable : false
		});
		sideText2 = new fabric.Text(ssc[ssc.length-2], {
			top: sideCircle2.get('top'),
			left: sideCircle2.get('left')+45,
			fontSize: 20,
			lockMovementX: true,
			lockMovementY: true,
			selectable : false
		});
		sideCanvas.add(sideCircle1);
		sideCanvas.add(sideCircle2);
		sideCanvas.add(sideText1);
		sideCanvas.add(sideText2);
		sideCanvas.add(sideText3);
		sideCanvas.add(sideLine);
	}
}
function sideClear(){
	sideCanvas.remove(sideCircle1);
	sideCanvas.remove(sideCircle2);
	sideCanvas.remove(sideText1);
	sideCanvas.remove(sideText2);
	sideCanvas.remove(sideText3);
	sideCanvas.remove(sideLine);
}
