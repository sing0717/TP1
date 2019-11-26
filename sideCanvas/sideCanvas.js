var sideCanvas;

var ssc = [];
var ssc_trans = [];
var sideCircle = [];
var sideLine = [];
var sideText = [];
var c_c = 0;

function makeSideCanvas(){
	sideCanvas = new fabric.Canvas('s');
}

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
	if(c_c > 0){
		sideClear();
	}
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
		
		//sideCanvas = new fabric.Canvas('s');
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
	c_c = 0;
}

/*

var ssc = [];
var ssc_trans = [];
var s_j = 0;

for 역 갯수만큼
	if 환승역 판단
		순서 생성(순서 카운트)

for(s_i = 1; s_i < ssc.length-2; s_i++)
	if(ssc[s_i-1].charAt(0) != ssc[s_i].charAt(0))		//1. 1번 2번 다를 때
		if(ssc[s_i].charAt(0) != ssc[s_i+1].charAt(0))	//1-1. 2번 3번 다를 때
			if(ssc[s_i-1].charAt(0) != ssc[s_i+1].charAt(0))	//1-1-1. 1번 3번 다를 때
				ssc_trans[s_j] = ssc[s_i];		//2번은 환승역
				s_j++;
		else	//1-2. 2번 3번 같을 때(TT인 경우)
			if(ssc[s_i+1] == "T1" || ssc[s_i+1] == "T2")	//1-2-1. 3번이 T1 T2의 경우
				if(ssc[s_i-1].charAt(0) != "A")		//1-2-1-1. A가 아닐 때
					ssc_trans[s_j] = ssc[s_i];		//2번은 환승역
					s_j++;
			else if(ssc[s_i+1] == "T4" || ssc[s_i+1] == "T5")	//1-2-2. 3번이 T4 T5의 경우
				if(ssc[s_i-1].charAt(0) != "C")		//1-2-2-1. C가 아닐 때
					ssc_trans[s_j] = ssc[s_i];		//2번은 환승역
					s_j++;
			else if(ssc[s_i+1] == "T3" || ssc[s_i+1] == "T10")	//1-2-3. 3번이 T3 T10의 경우
			else	//1-2-2. 3번이 T1 T2의 경우
	else	//2. 1번 2번 같을 때
		if()	//2-1. 2번 3번 같을 때
			if()	//2-1-1. TTT의 경우

for 역 서클 생성(순서 카운트 만큼) 카운트 값 증가시 역 Y축 값 증가
	if 처음역인가?
		일반역 생성(고정좌표)
		역 이름 표시(x+ 역 좌표 받기)
		if 색깔 표시
	else
		if 일반역인가?
			역끼리 잇는 선 생성(전 y좌표 후 y좌표 x좌표 처음 역 값 받기)
			색깔 표시(전 역의 색깔 받기)
		else 환승 역인가?
			역끼리 잇는 선 생성(전 y좌표 후 y좌표 x좌표 처음 역 값 받기)
			색깔 표시(전 역의 색깔 + 후 역의 색깔 받기)
		if 환승역인가?
			환승역 생성(y+ 좌표)
			역 이름 표시(x+ 역 좌표 받기) + 환승 표시(x++ 역 좌표 받기)
			if 색깔 표시 (그라데이션 전 역의 색 + 후 역의 색)
		else
			일반역 생성(y+ 좌표)
			역 이름 표시(x+ 역 좌표 받기)
			if 색깔 표시

for (순서 카운트 만큼)
	역 서클 add
	역 이름 add
for (순서 카운트-1 만큼)
	역끼리 잇는 선 add
	
for (순서 카운트 만큼)
	역 서클 remove
	역 이름 remove
for (순서 카운트-1 만큼)
	역끼리 잇는 선 remove

A라인		그린
B라인		블루
C라인		브라운
D라인		레드
E라인		옐로우
F라인		오렌지
G라인		그레이

T1 <-> T2	그린
T3 <-> T7	그린
T4 <-> T5	브라운
T5 <-> T6	레드
T7 <-> T9	그린
T9 <-> T10	그레이

ssc[0].charAt(0);				배열의 첫번째
ssc[ssc.length-2].charAt(0);	배열의 마지막

s_distance[0] 최소거리
s_distance[1] 최소시간
s_distance[2] 최소비용

alert(ssc[s_i-1].charAt(0)+ssc[s_i].charAt(0)+ssc[s_i+1].charAt(0));
alert(ssc_trans);


	sideCircle1 = new fabric.Circle({
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
	sideCircle2 = new fabric.Circle({
		top: sideCircle1.get('top')+40,
		left: sideCircle1.get('left'),
		strokeWidth: 5,
		radius: 10,
		fill: "yellow",
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
		sideCanvas.add(sideMainText);
		sideCanvas.add(sideLine);

	sideCanvas.remove(sideCircle1);
	sideCanvas.remove(sideCircle2);
	sideCanvas.remove(sideText1);
	sideCanvas.remove(sideText2);
	sideCanvas.remove(sideMainText);
	sideCanvas.remove(sideLine);

	fabric.Image.fromURL(imageURL, function(oImg) {
    oImg.scale(1.0).set({
        left: 10,
        top: 10,
        stroke : 'white',
        strokeWidth : 100,
        clipTo: function (ctx) {
            ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
          }
    });
    canvas.add(oImg).setActiveObject(oImg);
    canvas.renderAll();
});
 */