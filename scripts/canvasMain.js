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
var transfers = [];
var branchLines = [];

canvas.add(startImg, endImg);

redRail = makeRail('red');
greenRail = makeRail('green');
blueRail = makeRail('blue');
yellowRail = makeRail('yellow');
brownRail = makeRail('brown');
orangeRail = makeRail('orange');
greenRail = makeRail('green');
grayRail = makeRail('gray');

Rails.push(greenRail);
Rails.push(blueRail);
Rails.push(redRail);
Rails.push(yellowRail);
Rails.push(brownRail);
Rails.push(orangeRail);
Rails.push(greenRail);
Rails.push(grayRail);

transfers.push(makeCircle(380,80, "T1"));
transfers.push(makeCircle(420,150, "T2"));
transfers.push(makeCircle(510,470, "T3"));
transfers.push(makeCircle(220,480, "T4"));
transfers.push(makeCircle(200,580, "T5"));
transfers.push(makeCircle(300,580, "T6"));
transfers.push(makeCircle(600,580, "T7"));
transfers.push(makeCircle(710,170, "T8"));
transfers.push(makeCircle(730,580, "T9"));
transfers.push(makeCircle(750,650, "T10"));

branchLines.push(makeCircle(580, 230, "B3")); 
branchLines.push(makeCircle(390, 500, "B6")); 
branchLines.push(makeCircle(650, 200, "B4")); 

greenRail.add(makeCircle(70, 80, "A1"));
greenRail.add(makeCircle(180, 80, "A2"));
greenRail.add(transfers[0]);
greenRail.add(transfers[1]);
greenRail.add(makeCircle(470, 300, "A3"));
greenRail.add(transfers[2]);
greenRail.add(transfers[6]);
greenRail.add(transfers[8]);
greenRail.add(makeCircle(800, 580, "A4"));

blueRail.add(branchLines[1]);
blueRail.add(transfers[2]);
blueRail.add(makeCircle(590, 360, "B5"));
blueRail.add(branchLines[0]);
blueRail.add(branchLines[2]);
blueRail.add(transfers[7]);
blueRail.add(branchLines[2]);
blueRail.add(branchLines[0]);
blueRail.add(makeCircle(520, 180, "B2"));
blueRail.add(transfers[1]);
blueRail.add(makeCircle(270, 170, "B1"));
blueRail.add(makeCircle(135, 250, "B8"));
blueRail.add(makeCircle(135, 405, "B7"));
blueRail.add(transfers[3]);
blueRail.add(branchLines[1]);


brownRail.add(transfers[1]);
brownRail.add(makeCircle(400, 250, "C1"));
//brownRail.curve('C1');
brownRail.add(makeCircle(340, 350, "C2"));
brownRail.add(transfers[3]);
brownRail.add(transfers[4]);

redRail.add(makeCircle(50, 330, "D1"));
redRail.add(makeCircle(50, 580, "D2"));
//greenRail.add(makeCircle(300, 140, "G3"));
redRail.add(transfers[4]);
redRail.add(transfers[5]);
redRail.add(makeCircle(450, 580, "D3"));
redRail.add(transfers[6]);

yellowRail.add(transfers[5]);
yellowRail.add(makeCircle(400, 630, "E1"));
yellowRail.add(makeCircle(500, 650, "E2"));
yellowRail.add(makeCircle(590, 660, "E3"));
yellowRail.add(transfers[9]);
yellowRail.add(makeCircle(850, 640, "E4"));

orangeRail.add(transfers[0]);
orangeRail.add(makeCircle(500, 80, "F1"));
orangeRail.add(makeCircle(630, 80, "F2"));
orangeRail.add(transfers[7]);
orangeRail.add(makeCircle(800, 170, "F3"));
orangeRail.add(makeCircle(900, 170, "F4"));
orangeRail.add(makeCircle(900, 370, "F5"));

grayRail.add(makeCircle(710, 20, "G1"));
grayRail.add(transfers[7]);
grayRail.add(makeCircle(710, 365, "G2"));
grayRail.add(transfers[8]);
grayRail.add(transfers[9]);
grayRail.add(makeCircle(780, 680, "G3"));
grayRail.add(makeCircle(940, 680, "G4"));

orangeRail.connect();
greenRail.connect();
redRail.connect();
yellowRail.connect();
brownRail.connect();
blueRail.connect();
greenRail.connect();
grayRail.connect();

orangeRail.draw();
greenRail.draw();
redRail.draw();
yellowRail.draw();
brownRail.draw();
blueRail.draw();
greenRail.draw();
grayRail.draw();

var txtBox = makeText(10,10,'출발:   =>  도착:   ');
canvas.add(txtBox);
canvas.requestRenderAll();