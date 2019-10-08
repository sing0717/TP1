//MAIN
var canvas = makeCanvas("c");
var Rails = [];
var startImgElement = document.getElementById("start-image");
var endImgElement = document.getElementById("end-image");
var startTag = document.getElementById('start-image'),
    endTag = document.getElementById('end-image');
var startImg = new fabric.Image(startTag,{
    left: 100, top: 100, scaleX: 0.2, scaleY: 0.2, opacity: 0.5, visible: false}),
    endImg = new fabric.Image(endTag,{
    left: 150, top: 100, scaleX: 0.2, scaleY: 0.2, opacity: 0.5, visible: false});

canvas.add(startImg, endImg);

redRail = makeRail('red');
greenRail = makeRail('green');
blueRail = makeRail('blue');


Rails.push(greenRail);
Rails.push(blueRail);
Rails.push(redRail);

redRail.add(makeCircle(400, 30, "R1"));
redRail.add(makeCircle(400, 80, "R2"));
redRail.add(makeCircle(400, 140, "R3"));
redRail.add(makeCircle(400, 180, "R4"));
redRail.add(makeCircle(400, 280, "R5"));
redRail.add(makeCircle(400, 405, "R6"));
redRail.add(makeCircle(500, 505, "R7"));
redRail.add(makeCircle(675, 505, "R8"));
redRail.add(makeCircle(835, 505, "R9"));
redRail.curve('R6'); //R6에서 다음 정거장으로 갈때 굽어짐

greenRail.add(makeCircle(200, 40, "G1"));
greenRail.add(makeCircle(200, 140, "G2"));
greenRail.add(makeCircle(200, 270, "G3"));
greenRail.add(makeCircle(200, 405, "G4"));
greenRail.add(makeCircle(200, 505, "G5"));

greenRail.connect();
redRail.connect();
greenRail.draw();
redRail.draw();