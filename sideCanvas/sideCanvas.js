//var sideCanvas = new fabric.Canvas('s');

var ssc = [];
var ssc_trans = [];
var sideCircle = [];
var sideLine = [];
var sideText = [];

function sideDistance(i){
	var distanceValue = String(Math.round(s_distance[i]*10)/10.0);
	return distanceValue;
}
function sideStation(i){
	var stationValue = s_stationCount[i].replace(/  /gi," ");
	ssc = stationValue.split(" "); 
	stationValue = ssc.length-2;
	return stationValue;
}
function sidePrint(i){
	if(i==1){
		s_text1 = "분 )";
	}
	else if(i==0){
		s_text1 = "km )";
	}
	else{ 
		s_text1 = "원 )";
	}
	sideMainText = new fabric.Text(sideStation(i)+"개 역 ( "+sideDistance(i)+s_text1, {
		top: 20,
		left: 120,
		fontSize: 15,
		lockMovementX: true,
		lockMovementY: true,
		selectable : false});
	if(canvas.startSelected!=null && canvas.endSelected!=null){
		s_j = 1;
		ssc_trans = [];
		ssc_trans[0] = ssc[0];
		for(s_i = 1; s_i < ssc.length-2; s_i++){
			if(ssc[s_i] == "T8"){
				if(ssc[s_i-1].charAt(0) != ssc[s_i+1].charAt(0)){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}

			else if(ssc[s_i-1] == "T1" && ssc[s_i] == "T2"){
				if(ssc[s_i+1].charAt(0) != "A"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}
			else if(ssc[s_i] == "T1" && ssc[s_i+1] == "T2"){
				if(ssc[s_i-1].charAt(0) != "A"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}

			else if(ssc[s_i-1] == "T2" && ssc[s_i] == "T1"){
				if(ssc[s_i+1].charAt(0) != "A"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}					
			else if(ssc[s_i] == "T2" && ssc[s_i+1] == "T1"){
				if(ssc[s_i-1].charAt(0) != "A"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}

			else if(ssc[s_i-1] == "T4" && ssc[s_i] == "T5"){
				if(ssc[s_i+1].charAt(0) != "C"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}
			else if(ssc[s_i] == "T4" && ssc[s_i+1] == "T5"){
				if(ssc[s_i-1].charAt(0) != "C"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}

			else if(ssc[s_i-1] == "T5" && ssc[s_i] == "T4"){
				if(ssc[s_i+1].charAt(0) != "C"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}
			else if(ssc[s_i] == "T5" && ssc[s_i+1] == "T4"){
				if(ssc[s_i-1].charAt(0) != "C"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}

			else if(ssc[s_i-1] == "T5" && ssc[s_i] == "T6"){
				if(ssc[s_i+1].charAt(0) != "D"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}
			else if(ssc[s_i] == "T5" && ssc[s_i+1] == "T6"){
				if(ssc[s_i-1].charAt(0) != "D"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}

			else if(ssc[s_i-1] == "T6" && ssc[s_i] == "T5"){
				if(ssc[s_i+1].charAt(0) != "D"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}
			else if(ssc[s_i] == "T6" && ssc[s_i+1] == "T5"){
				if(ssc[s_i-1].charAt(0) != "D"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}

			else if(ssc[s_i-1] == "T3" && ssc[s_i] == "T7"){
				if(ssc[s_i+1].charAt(0) != "A" && ssc[s_i+1] != "T9"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}
			else if(ssc[s_i] == "T3" && ssc[s_i+1] == "T7"){
				if(ssc[s_i-1].charAt(0) != "A"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}

			else if(ssc[s_i-1] == "T7" && ssc[s_i] == "T3"){
				if(ssc[s_i+1].charAt(0) != "A"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}
			else if(ssc[s_i] == "T7" && ssc[s_i+1] == "T3"){
				if(ssc[s_i-1].charAt(0) != "A" && ssc[s_i-1] != "T9"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}

			else if(ssc[s_i-1] == "T9" && ssc[s_i] == "T7"){
				if(ssc[s_i+1].charAt(0) != "A" && ssc[s_i+1] != "T3"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}
			else if(ssc[s_i] == "T7" && ssc[s_i+1] == "T9"){
				if(ssc[s_i-1].charAt(0) != "A" && ssc[s_i-1] != "T3"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}

			else if(ssc[s_i-1] == "T7" && ssc[s_i] == "T9"){
				if(ssc[s_i+1].charAt(0) != "A"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}
			else if(ssc[s_i] == "T9" && ssc[s_i+1] == "T7"){
				if(ssc[s_i-1].charAt(0) != "A"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}

			else if(ssc[s_i-1] == "T10" && ssc[s_i] == "T9"){
				if(ssc[s_i+1].charAt(0) != "G"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}
			else if(ssc[s_i] == "T9" && ssc[s_i+1] == "T10"){
				if(ssc[s_i-1].charAt(0) != "G"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}

			else if(ssc[s_i-1] == "T10" && ssc[s_i] == "T9"){
				if(ssc[s_i+1].charAt(0) != "G"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}
			else if(ssc[s_i] == "T10" && ssc[s_i+1] == "T9"){
				if(ssc[s_i-1].charAt(0) != "G"){
					ssc_trans[s_j] = ssc[s_i];
					s_j++;}}
		}
		ssc_trans[s_j] = ssc[ssc.length-2];
		
		sideCanvas = new fabric.Canvas('s');
		for(i=0; i<=s_j; i++){
			if(i==0){
				sideCircle[i] = new fabric.Circle({
					top: 45,
					left: 30,
					strokeWidth: 5,
					radius: 10,
					fill: 'yellow',
					stroke: 'gray',
					lockMovementX: true,
					lockMovementY: true,
					selectable : false
				});
				sideText[i] = new fabric.Text(ssc_trans[i], {
					top: sideCircle[i].get('top'),
					left: sideCircle[i].get('left')+45,
					fontSize: 20,
					lockMovementX: true,
					lockMovementY: true,
					selectable : false
				});
			}
			else{
				sideCircle[i] = new fabric.Circle({
					top: sideCircle[i-1].get('top')+40,
					left: sideCircle[i-1].get('left'),
					strokeWidth: 5,
					radius: 10,
					fill: "yellow",
					stroke: 'gray',
					lockMovementX: true,
					lockMovementY: true,
					selectable : false
				});
				sideLine[i-1] = new fabric.Line([sideCircle[i-1].get('left'),
												 sideCircle[i-1].get('top')+10, 
												 sideCircle[i].get('left'), 
												 sideCircle[i].get('top')-10], {
					strokeWidth: 5,
					stroke: 'gray',
					objectCaching: false
				});
				sideText[i] = new fabric.Text(ssc_trans[i], {
					top: sideCircle[i].get('top'),
					left: sideCircle[i].get('left')+45,
					fontSize: 20,
					lockMovementX: true,
					lockMovementY: true,
					selectable : false
				});
			}
		}
		sideCanvas.add(sideMainText);
		for(i=0; i<=s_j; i++){
			if(i==0){
				sideCanvas.add(sideCircle[i]);
				sideCanvas.add(sideText[i]);
			}
			else{
				sideCanvas.add(sideCircle[i]);
				sideCanvas.add(sideLine[i-1]);
				sideCanvas.add(sideText[i]);
			}
		}
	}
}
function sideClear(){
	sideCanvas.remove(sideMainText);
	for(i=0; i<=s_j; i++){
		if(i==0){
			sideCanvas.remove(sideCircle[i]);
			sideCanvas.remove(sideText[i]);
		}
		else{
			sideCanvas.remove(sideCircle[i]);
			sideCanvas.remove(sideLine[i-1]);
			sideCanvas.remove(sideText[i]);
		}
	}
}

