var canvas = new fabric.Canvas("c");//캔버스 조작을 위한 canvas 객체를 생성합니다.
fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';//canvas를 중앙으로 고정시켜줍니다.
var startSelect = true, endSelect = true;//시작, 끝 노드를 선택했는지 선택합니다. 총 2개의 노드를 전부 클릭했을경우 
                                         // 더이상 다른 노드를 클릭하지 못하게 하는 체크용 변수입니다.                                                 
var switcher = new Array();//각 역 노드가 선택되었는지를 체크합니다. 0이면 논체크 1이면 체크

for (var i = 0; i < 10; i++) {
    switcher[i] = 0;
}
//Canvas에 그릴 원에 해당하는 Circle 객체를 생성하고 그 객체를 반환하는 생성 함수입니다.
//매개변수 left, top은 각각 원의 x y 좌표 위치입니다.
function makeCircle(left, top) {
    //fabric.circle 객체를 생성합니다.
    var c = new fabric.Circle({
        left: left,//x위치
        top: top,//y위치
        strokeWidth: 5,//테두리의 굵기
        radius: 10,//원의 반지름 크기
        fill: 'white',//안쪽 색
        stroke: 'gray',//테두리의 색
        selectable: false,
        lockMovementX: true,
        lockMovementY: true,//움직이지 않게 고정

    });
    c.hasControls = c.hasBorders = false;

    return c;
}

//canvas에 그릴 선에 해당하는 Line 객체를 생성하고 그 객체를 반환합니다.
function makeLine(coords) {
    //fabric.Line 객체를 생성하고 반환합니다.
    return new fabric.Line(coords, {
        fill: 'red',//선의 색
        stroke: 'red',//선 테두리의 색
        strokeWidth: 5,//선 테두리의 굵기
        evented: false,
        selectable: false,
        lockMovementX: true,
        lockMovementY: true,//움직이지 않게 고정
    })
}

//makeLine 함수를 이용하여 라인들을 만듭니다.
var line1 = makeLine([200, 100, 200, 150]),
    line2 = makeLine([200, 150, 200, 200]),
    line3 = makeLine([200, 200, 200, 250]),
    line4 = makeLine([200, 250, 200, 300]),
    line5 = makeLine([200, 300, 200, 350]),
    line6 = makeLine([200, 350, 200, 400]);

//실제 캔버스에 라인들을 추가하여 그려줍니다.
canvas.add(line1, line2, line3, line4, line4, line5, line6);

//곡선을 그리기 위한 사각형 영역을 지정하고 곡선을 그려줍니다.
var Cline = new fabric.Path('M 200 400 Q 200, 500 400, 500', { fill: '', stroke: 'red', strokeWidth: 5, evented: false, objectCaching: false });
var Cline2 = new fabric.Path('M 200 400 C 200, 500 400, 500, 400, 500', { fill: '', stroke: 'red', strokeWidth: 5, evented: false, 
selectable: false, objectCaching: false, lockMovementX: true, lockMovementY: true, hasControls: false});

canvas.add(Cline2);

//원들을 생성합니다. line1.get('x1'): line1 선의 x1 좌표값을 가져옵니다." 
var circle1 = makeCircle(line1.get('x1'), line1.get('y1'));
    circle2 = makeCircle(line2.get('x1'), line2.get('y1')),
    circle3 = makeCircle(line3.get('x1'), line3.get('y1')),
    circle4 = makeCircle(line4.get('x1'), line4.get('y1')),
    circle5 = makeCircle(line5.get('x1'), line5.get('y1')),
    circle6 = makeCircle(line6.get('x1'), line6.get('y1')),
    circle7 = makeCircle(line6.get('x2'), line6.get('y2'));
    circle8 = makeCircle(400, 500);

canvas.add(circle1, circle2, circle3, circle4, circle5, circle6, circle7, circle8);

//텍스트가 담겨있는 이미지 박스를 생성합니다. fabric.Text('텍스트값'. {left: x값, top: y값, fontSize: 글자크기})
var text1 = new fabric.Text('R1', { left: line1.get('x1') + 30, top: line1.get('y1'), fontSize: 20 , selectable: false}),
    text2 = new fabric.Text('R2', { left: line2.get('x1') + 30, top: line2.get('y1'), fontSize: 20 , selectable: false })
    text3 = new fabric.Text('R3', { left: line3.get('x1') + 30, top: line3.get('y1'), fontSize: 20 , selectable: false })
    text4 = new fabric.Text('R4', { left: line4.get('x1') + 30, top: line4.get('y1'), fontSize: 20 , selectable: false })
    text5 = new fabric.Text('R5', { left: line5.get('x1') + 30, top: line5.get('y1'), fontSize: 20 , selectable: false })
    text6 = new fabric.Text('R6', { left: line6.get('x1') + 30, top: line6.get('y1'), fontSize: 20 , selectable: false })
    text7 = new fabric.Text('R7', { left: line6.get('x2') + 30, top: line6.get('y2'), fontSize: 20 , selectable: false });
    text8 = new fabric.Text('R8', { left: 400, top: 500 - 30, fontSize: 20 , selectable: false });
canvas.add(text1, text2, text3, text4, text5, text6, text7, text8);


function mouseClickEvent(element, nodeName, nodeNum){
    if (startSelect || endSelect) {
        if (startSelect) { 
            document.getElementById("start").value = nodeName; startSelect = false;
            startImg.set('left', element.get('left')+ 25); startImg.set('top', element.get('top')- 25); startImg.set('visible',true); 
            canvas.requestRenderAll();
        }
        else if (endSelect && switcher[nodeNum] != 1) { 
            document.getElementById("end").value = nodeName; endSelect = false; 
            endImg.set('left', element.get('left')+ 25); endImg.set('visible', true);
            endImg.set('top', element.get('top')- 25); canvas.requestRenderAll();
        }
        if (switcher[nodeNum] == 0) { 
            element.set('stroke', 'green'); 
            canvas.requestRenderAll(); switcher[nodeNum] = 1;
        }
        else if(!(startSelect || endSelect)){ 
            element.set('stroke', 'gray'); canvas.requestRenderAll(); 
            switcher[nodeNum] = 0; 
        }
        console.log('clicked'); console.log(switcher[nodeNum]);
    }
}
//도형객체.on('이벤트 동작(마우스클릭등) mousedown=마우스를 누를때', function(){}: {}안의 코드를 실행합니다.(이름없는 함수 정의))
circle1.on('mousedown', function () {mouseClickEvent(this, 'R1', 0);});
circle2.on('mousedown', function () {mouseClickEvent(this, 'R2', 1);});
circle3.on('mousedown', function () {mouseClickEvent(this, 'R3', 2);});
circle4.on('mousedown', function () {mouseClickEvent(this, 'R4', 3);});
circle5.on('mousedown', function () {mouseClickEvent(this, 'R5', 4);});
circle6.on('mousedown', function () {mouseClickEvent(this, 'R6', 5);});
circle7.on('mousedown', function () {mouseClickEvent(this, 'R7', 6);});
circle8.on('mousedown', function () {mouseClickEvent(this, 'R8', 7);});

var startImgElement = document.getElementById("start-image");
var endImgElement = document.getElementById("end-image");

var startTag = document.getElementById('start-image'),
    endTag = document.getElementById('end-image');
var startImg = new fabric.Image(startTag,{
    left: 100, top: 100, scaleX: 0.2, scaleY: 0.2, opacity: 0.5, visible: false}),
    endImg = new fabric.Image(endTag,{
    left: 150, top: 100, scaleX: 0.2, scaleY: 0.2, opacity: 0.5, visible: false});

canvas.add(startImg, endImg);


