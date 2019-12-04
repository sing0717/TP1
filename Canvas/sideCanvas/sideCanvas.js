var sideCanvas;

var ssc = [];
var ssc_trans = [];
var s_t_time = [];
var sideCircle = [];
var sideLine = [];
var sideText = [];
var sideColor = [];
var sMidHour = [];
var sMidMinute = [];
var sideTimeMid = [];
var c_c = 0;
var sBarImgElement;

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
function sideDistance(i){
	var side_distance = String(Math.round(s_distance[i]*10)/10.0);
	return side_distance;
}
function sideFee(i){
	var side_fee = String(Math.round(s_fee[i]*10)/10.0);
	return side_fee;
}
function sideStation(i){
	var stationValue = s_stationCount[i].replace(/  /gi," ");
	ssc = stationValue.split(" "); 
	stationValue = ssc.length-2;
	return stationValue;
}
function sideTransferTime(i){
	var transferTimeValue = s_transferTime[i].replace(/  /gi," ");
	s_t_time = transferTimeValue.split(" "); 
	transferTimeValue = s_t_time.length-2;
	return transferTimeValue;
}
function sidePrint(spNum){
	if(c_c > 0){
		sideClear();
	}
	var s_x = sideStation(spNum); //?
	//var s_x = sideTransferTime(i); //?
	var s_x = sideTime(spNum); //?
	//var s_x = sideDistance(spNum); //?
	//var s_x = sideFee(spNum); //?
	if(spNum==1){
		sBarImgElement = document.getElementById('time-image');
		s_text1 = String(sideTime(spNum));
		s_text2 = String(sideStation(spNum));
		s_text3 = String(sideFee(spNum));
		s_text4 = String(sideDistance(spNum));
	}
	else if(spNum==0){
		sBarImgElement = document.getElementById('distance-image');
		s_text1 = String(sideDistance(spNum));
		s_text2 = String(sideStation(spNum));
		s_text3 = String(sideTime(spNum));
		s_text4 = String(sideFee(spNum));
	}
	else if(spNum==2){
		sBarImgElement = document.getElementById('fee-image');
		s_text1 = String(sideFee(spNum));
		s_text2 = String(sideStation(spNum));
		s_text3 = String(sideTime(spNum));
		s_text4 = String(sideDistance(spNum));
	}
	else{ 
		sBarImgElement = document.getElementById('transfers-image');
		s_text1 = String(sideStation(spNum)); //sideValue(3);
		s_text2 = String(sideTime(spNum));
		s_text3 = String(sideFee(spNum));
		s_text4 = String(sideDistance(spNum));
	}
	var simgElement = document.getElementById('transfer-image');
	sideTransImg = new fabric.Image(simgElement,{}); //?
	//sideBarImg = new fabric.Image(sBarImgElement,{}); //?
	
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
		sideMainText1 = new fabric.Text(s_text1, {
			top: 32.5,
			left: 40,
			fontSize: 25,
			lockMovementX: true,
			lockMovementY: true,
			selectable : false
		});
		sideMainText2 = new fabric.Text(s_text2, {
			top: 36.5,
			left: 150,
			fontSize: 15,
			lockMovementX: true,
			lockMovementY: true,
			selectable : false
		});
		sideMainText3 = new fabric.Text(s_text3, {
			top: 36.5,
			left: 210,
			fontSize: 15,
			lockMovementX: true,
			lockMovementY: true,
			selectable : false
		});
		sideMainText4 = new fabric.Text(s_text4, {
			top: 36.5,
			left: 260,
			fontSize: 15,
			lockMovementX: true,
			lockMovementY: true,
			selectable : false
		});

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
		if(document.getElementById('timeSelect').value == "출발시간"){
			sAfterHour = sHour;
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
			if(sideTransferTime(spNum) >= 1){
				sMidHour[0] = sHour;
				sMidMinute[0] = sMinute;
				for(i=1; i<=sideTransferTime(spNum) ;i++){
					sMidHour[i] = sMidHour[0];
					sMidMinute[i] = String(Math.round(sMidMinute[0]) + Math.round(s_t_time[i]));
					if(sMidMinute[i]>=60){
						if(sMidHour[i]==23){
							sMidHour[i] = String(Math.round(sMidHour[i]) - 23);
							sMidMinute[i] = String(Math.round(sMidMinute[i]) - 60);
						}
						else{
							sMidHour[i] = String(Math.round(sMidHour[i]) + 1);
							sMidMinute[i] = String(Math.round(sMidMinute[i]) - 60);
						}
					}
				}
			}
		}
		else if(document.getElementById('timeSelect').value == "도착시간"){
			sAfterHour = sHour;
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
			if(sideTransferTime(spNum) >= 1){
				sMidHour[0] = sHour;
				sMidMinute[0] = sMinute;
				for(i=1; i<=sideTransferTime(spNum) ;i++){
					sMidHour[i] = sMidHour[0];
					sMidMinute[i] = String(Math.round(sMidMinute[0]) + Math.round(s_t_time[i]));
					if(sMidMinute[i]<0){
						if(sMidHour[i]==0){
							sMidHour[i] = String(Math.round(sMidHour[i]) - 23);
							sMidMinute[i] = String(Math.round(sMidMinute[i]) - 60);
						}
						else{
							sMidHour[i] = String(Math.round(sMidHour[i]) + 1);
							sMidMinute[i] = String(Math.round(sMidMinute[i]) - 60);
						}
					}
				}
			}
		}

		if(sideTransferTime(spNum) >= 1){
			sideTimeStart = new fabric.Text(sHour+"시 "+sMinute+"분", {
				top: sideCircle[0].get('top'),
				left: sideCircle[0].get('left')-80,
				fontSize: 20,
				lockMovementX: true,
				lockMovementY: true,
				selectable : false
			});
			for(i=1; i<=sideTransferTime(spNum) ;i++){
				sideTimeMid[i-1] = new fabric.Text(sMidHour[i]+"시 "+sMidMinute[i]+"분", {
					top: sideCircle[i].get('top'),
					left: sideCircle[i].get('left')-80,
					fontSize: 20,
					lockMovementX: true,
					lockMovementY: true,
					selectable : false
				});
			}
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
		for(i=0; i<sideTransferTime(spNum) ;i++){
			sideCanvas.add(sideTimeMid[i]);
		}

		sideCanvas.add(sideTimeEnd);
		
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
		sideBarImg = new fabric.Image(sBarImgElement,{
			top: 25,
			left: 160,
			scaleX: 0.4,
			scaleY: 0.4,
			opacity: 1,
			selectable : false
		});
		sideCanvas.add(sideBarImg);
		sideCanvas.add(sideMainText1);
		sideCanvas.add(sideMainText2);
		sideCanvas.add(sideMainText3);
		sideCanvas.add(sideMainText4);
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
	sideCanvas.remove(sideBarImg);
	sideCanvas.remove(sideMainText1);
	sideCanvas.remove(sideMainText2);
	sideCanvas.remove(sideMainText3);
	sideCanvas.remove(sideMainText4);
	sideCanvas.remove(sideTimeStart);
	for(i=0; i<sideTimeMid.length; i++){
		sideCanvas.remove(sideTimeMid[i]);
	}
	sideCanvas.remove(sideTimeEnd);
	c_c = 0;
} 
