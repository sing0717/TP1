var sideCanvas;

var ssc = [];
var ssc_trans = [];
var sideCircle = [];
var sideLine = [];
var sideText = [];
var sideColor = [];
var c_c = 0;

function makeSideCanvas(){
	sideCanvas = new fabric.Canvas('s');
}
function SideColorCheck(color1, color2){
	if(color1.charAt(0)=="A"){
		return "green";
	}
	else if(color1.charAt(0)=="B"){
		return "blue";
	}
	else if(color1.charAt(0)=="C"){
		return "brown";
	}
	else if(color1.charAt(0)=="D"){
		return "red";
	}
	else if(color1.charAt(0)=="E"){
		return "#E5E500";
	}
	else if(color1.charAt(0)=="F"){
		return "orange";
	}
	else if(color1.charAt(0)=="G"){
		return "gray";
	}
	else{
		if(color2.charAt(0)=="A"){
			return "green";
		}
		else if(color2.charAt(0)=="B"){
			return "blue";
		}
		else if(color2.charAt(0)=="C"){
			return "brown";
		}
		else if(color2.charAt(0)=="D"){
			return "red";
		}
		else if(color2.charAt(0)=="E"){
			return "#E5E500";
		}
		else if(color2.charAt(0)=="F"){
			return "orange";
		}
		else if(color2.charAt(0)=="G"){
			return "gray";
		}
		else{
			if(color1=="T1"&&color2=="T2"){ return "green"; }
			else if(color1=="T2"&&color2=="T1"){ return "green"; }
			else if(color1=="T4"&&color2=="T5"){ return "brown"; }
			else if(color1=="T5"&&color2=="T4"){ return "brown"; }
			else if(color1=="T5"&&color2=="T6"){ return "red"; }
			else if(color1=="T6"&&color2=="T5"){ return "red"; }
			else if(color1=="T3"&&color2=="T7"){ return "green"; }
			else if(color1=="T7"&&color2=="T3"){ return "green"; }
			else if(color1=="T7"&&color2=="T9"){ return "green"; }
			else if(color1=="T9"&&color2=="T7"){ return "green"; }
			else if(color1=="T9"&&color2=="T10"){ return "gray"; }
			else if(color1=="T10"&&color2=="T9"){ return "gray"; }
			else{
				return "white";
			}
		}
	}
}
function sideTime(i){
	var side_time = String(Math.round(s_time[i]*10)/10.0);
	return side_time;
}
function sideValue(i){
	var side_value = String(Math.round(s_value[i]*10)/10.0);
	return side_value;
}
function sideStation(i){
	var stationValue = s_stationCount[i].replace(/  /gi," ");
	ssc = stationValue.split(" "); 
	stationValue = ssc.length-2;
	return stationValue;
}
function sidePrint(spNum){
	if(c_c > 0){
		sideClear();
	}
	if(spNum==1){
		s_text1 = " 최소시간 : " +sideValue(1)+ "분";
	}
	else if(spNum==0){
		s_text1 = " 최소거리 : " +sideValue(0)+ "km";
	}
	else if(spNum==2){
		s_text1 = " 최소비용 : " +sideValue(2)+ "원";
	}
	else{ 
		s_text1 = " 최소환승 : " +sideValue(3)+ "개";
	}
	var simgElement = document.getElementById('transfer-image');
	var imgElement = document.getElementById('transfers-image');
	sideTransImg = new fabric.Image(simgElement,{}); //?
	sideTransfersImg = new fabric.Image(imgElement,{
		top: 25,
		left: 160,
		scaleX: 0.4,
		scaleY: 0.4,
		opacity: 0.8,
		selectable : false
	});
	sideCanvas.add(sideTransfersImg);
	sideMainText = new fabric.Text(sideStation(spNum)+"개 역 ( "+sideTime(spNum)+"분 )"+ s_text1, {
		top: 25,
		left: 160,
		fontSize: 20,
		lockMovementX: true,
		lockMovementY: true,
		selectable : false});
	if(canvas.startSelected!=null && canvas.endSelected!=null){
		s_j = 1;
		s_c = 1;
		ssc_trans = [];
		ssc_color = [];
		ssc_trans[0] = ssc[0];
		ssc_color[0] = SideColorCheck(ssc[0],ssc[1]);
		for(i=2; i< ssc.length-1; i++){
			if(SideColorCheck(ssc[i-2],ssc[i-1]) != SideColorCheck(ssc[i-1],ssc[i])){
				ssc_color[s_c] = SideColorCheck(ssc[i-1],ssc[i]);
				s_c++;
			}
		}
		for(s_i = 1; s_i < ssc.length-2; s_i++){
			if(ssc[s_i-1].charAt(0) != ssc[s_i+1].charAt(0)){
				if(ssc[s_i].charAt(0) == "T"){
					if(ssc[s_i-1].charAt(0) != "T" && ssc[s_i+1].charAt(0) != "T"){
						ssc_trans[s_j] = ssc[s_i];
						s_j++;}

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
						if(ssc[s_i+1] != "T9"){
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
						if(ssc[s_i-1] != "T9"){
							ssc_trans[s_j] = ssc[s_i];
							s_j++;}}

					else if(ssc[s_i-1] == "T7" && ssc[s_i] == "T9"){
						if(ssc[s_i+1].charAt(0) != "A"){
							ssc_trans[s_j] = ssc[s_i];
							s_j++;}}
					else if(ssc[s_i] == "T7" && ssc[s_i+1] == "T9"){
						if(ssc[s_i-1] != "T3"){
							ssc_trans[s_j] = ssc[s_i];
							s_j++;}}
					else if(ssc[s_i-1] == "T9" && ssc[s_i] == "T7"){
						if(ssc[s_i-1] != "T3"){
							ssc_trans[s_j] = ssc[s_i];
							s_j++;}}						
					else if(ssc[s_i] == "T9" && ssc[s_i+1] == "T7"){
						if(ssc[s_i-1].charAt(0) != "A"){
							ssc_trans[s_j] = ssc[s_i];
							s_j++;}}

					else if(ssc[s_i-1] == "T9" && ssc[s_i] == "T10"){
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
			}
			else{
				if(ssc[s_i-1] == "T4" && ssc[s_i] == "T5"){
					if(ssc[s_i+1] == "T6"){
						ssc_trans[s_j] = ssc[s_i];
						s_j++;}}
				if(ssc[s_i-1] == "T6" && ssc[s_i] == "T5"){
					if(ssc[s_i+1] == "T4"){
						ssc_trans[s_j] = ssc[s_i];
						s_j++;}}

				if(ssc[s_i-1] == "T7" && ssc[s_i] == "T9"){
					if(ssc[s_i+1] == "T10"){
						ssc_trans[s_j] = ssc[s_i];
						s_j++;}}
				if(ssc[s_i-1] == "T10" && ssc[s_i] == "T9"){
					if(ssc[s_i+1] == "T7"){
						ssc_trans[s_j] = ssc[s_i];
						s_j++;}}						
			}
		}
		ssc_trans[s_j] = ssc[ssc.length-2];
		
		for(i=0; i<=s_j; i++){
			if(i==0){
				sideCircle[i] = new fabric.Circle({
					top: 70,
					left: 150,
					strokeWidth: 5.5,
					radius: 15,
					fill: 'yellow',
					stroke: ssc_color[i],
					lockMovementX: true,
					lockMovementY: true,
					selectable : false
				});
				sideText[i] = new fabric.Text(ssc_trans[i], {
					top: sideCircle[i].get('top'),
					left: sideCircle[i].get('left')+50,
					fontSize: 20,
					lockMovementX: true,
					lockMovementY: true,
					selectable : false
				});
			}
			else if(i==s_j){
				sideCircle[i] = new fabric.Circle({
					top: sideCircle[i-1].get('top')+50,
					left: sideCircle[i-1].get('left'),
					strokeWidth: 5.5,
					radius: 15,
					fill: 'yellow',
					stroke: ssc_color[s_j-1],
					lockMovementX: true,
					lockMovementY: true,
					selectable : false
				});
				sideLine[i-1] = new fabric.Line([sideCircle[i-1].get('left'),
												 sideCircle[i-1].get('top')+17, 
												 sideCircle[i].get('left'), 
												 sideCircle[i].get('top')-15], {
					strokeWidth: 7.5,
					stroke: ssc_color[s_j-1],
					selectable : false
				});
				sideText[i] = new fabric.Text(ssc_trans[i], {
					top: sideCircle[i].get('top'),
					left: sideCircle[i].get('left')+50,
					fontSize: 20,
					lockMovementX: true,
					lockMovementY: true,
					selectable : false
				});
			}
			else{
				sideCircle[i] = new fabric.Circle({
					top: sideCircle[i-1].get('top')+50,
					left: sideCircle[i-1].get('left'),
					strokeWidth: 5.5,
					radius: 15,
					fill: "white",
					stroke: ssc_color[i-1],
					lockMovementX: true,
					lockMovementY: true,
					selectable : false
				});
				sideLine[i-1] = new fabric.Line([sideCircle[i-1].get('left'),
												 sideCircle[i-1].get('top')+17, 
												 sideCircle[i].get('left'), 
												 sideCircle[i].get('top')-15], {
					strokeWidth: 7.5,
					stroke: ssc_color[i-1],
					selectable : false
				});
				sideText[i] = new fabric.Text(ssc_trans[i], {
					top: sideCircle[i].get('top'),
					left: sideCircle[i].get('left')+50,
					fontSize: 20,
					lockMovementX: true,
					lockMovementY: true,
					selectable : false
				});
			}
		}
		sHour = document.getElementById('hourSelect').value;
		sMinute = document.getElementById('minuteSelect').value;
		sHour = sHour.replace(/[^0-9]/g,"");
		sMinute = sMinute.replace(/[^0-9]/g,"");
		sAfterHour = sHour;
		if(document.getElementById('timeSelect').value == "출발시간"){
			sAfterMinute = Math.round(sMinute) + Math.round(sideTime(spNum));
			if(sAfterMinute>=60){
				if(sAfterHour==23){
					sAfterHour = String(Math.round(sAfterHour) - 23);
					sAfterMinute = String(sAfterMinute - 60);
				}
				else{
					sAfterHour = String(Math.round(sAfterHour) + 1);
					sAfterMinute = String(sAfterMinute - 60);
				}
			}
		}
		else{
			sAfterMinute = sMinute;
			sMinute = Math.round(sAfterMinute) - Math.round(sideTime(spNum));
			if(sMinute<0){
				if(sHour==0){
					sHour = String(Math.round(sAfterHour) + 23);
					sMinute = String(60 + sMinute);
				}
				else{
					sHour = String(Math.round(sAfterHour) - 1);
					sMinute = String(60 + sMinute);
				}
			}
		}
		if(1){
			sideTimeStart = new fabric.Text(sHour+"시 "+sMinute+"분", {
				top: sideCircle[0].get('top'),
				left: sideCircle[0].get('left')-80,
				fontSize: 20,
				lockMovementX: true,
				lockMovementY: true,
				selectable : false
			});
			sideTimeEnd = new fabric.Text(sAfterHour+"시 "+sAfterMinute+"분", {
				top: sideCircle[s_j].get('top'),
				left: sideCircle[s_j].get('left')-80,
				fontSize: 20,
				lockMovementX: true,
				lockMovementY: true,
				selectable : false
			});
		}
		else{
			sideTimeStart = new fabric.Text(sHour+"시 "+sMinute+"분", {
				top: sideCircle[0].get('top'),
				left: sideCircle[0].get('left')-80,
				fontSize: 20,
				lockMovementX: true,
				lockMovementY: true,
				selectable : false
			});
			sideTimeEnd = new fabric.Text(sAfterHour+"시 "+sAfterMinute+"분", {
				top: sideCircle[s_j].get('top'),
				left: sideCircle[s_j].get('left')-80,
				fontSize: 20,
				lockMovementX: true,
				lockMovementY: true,
				selectable : false
			});
		}

		sideCanvas.add(sideTimeStart);
		sideCanvas.add(sideTimeEnd);
		sideCanvas.add(sideMainText);
		for(i=0; i<=s_j; i++){
			if(i==0){
				sideCanvas.add(sideCircle[i]);
				sideCanvas.add(sideText[i]);
			}
			else if(i==s_j){
				sideCanvas.add(sideCircle[i]);
				sideCanvas.add(sideLine[i-1]);
				sideCanvas.add(sideText[i]);
			}
			else{
				sideCanvas.add(sideCircle[i]);
				sideCanvas.add(sideLine[i-1]);
				sideCanvas.add(sideText[i]);
			}
		}
		for(i=0; i<s_j-1; i++){
			sideTransImg[i] = new fabric.Image(simgElement,{
				top: sideCircle[i].get('top')+50,
				left: sideCircle[i].get('left'),
				scaleX: 0.04275,
				scaleY: 0.04275,
				opacity: 0.8,
				selectable : false
			});
			sideCanvas.add(sideTransImg[i]);
		}
		c_c += 1;
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
	for(i=0; i<s_j-1; i++){
		sideCanvas.remove(sideTransImg[i]);
	}
	sideCanvas.remove(sideTimeStart);
	sideCanvas.remove(sideTimeEnd);
	c_c = 0;
} 
