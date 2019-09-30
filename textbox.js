//더미 함수들입니다.
var createtextbox = document.createElement("INPUT");
createtextbox.setAttribute("type", "text");

function showData (form) {
    var showData= document.getElementById("startBox");
    showData.value = '';
}

//선택한 노드값들을 모두 초기화시켜줍니다.(모든 노드 회색, 텍스트박스 값 비워줌)
function Init(){
    startSelect = true;
    endSelect = true;
    endImg.set('visible', false);
    startImg.set('visible', false);
    document.getElementById("startBox").value = '';
    document.getElementById("endBox").value = '';
    for(var i = 0; i<10; i++) switcher[i] = 0;
    circle1.set('stroke', 'gray');
    circle2.set('stroke', 'gray');
    circle3.set('stroke', 'gray');
    circle4.set('stroke', 'gray');
    circle5.set('stroke', 'gray');
    circle6.set('stroke', 'gray');
    circle7.set('stroke', 'gray');
    circle8.set('stroke', 'gray');
    canvas.requestRenderAll();
}

