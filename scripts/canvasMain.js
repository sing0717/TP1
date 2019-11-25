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

transfers.push(makeCircle(480,180, "T1"));
transfers.push(makeCircle(520,250, "T2"));
transfers.push(makeCircle(610,570, "T3"));
transfers.push(makeCircle(320,580, "T4"));
transfers.push(makeCircle(300,680, "T5"));
transfers.push(makeCircle(400,680, "T6"));
transfers.push(makeCircle(700,680, "T7"));
transfers.push(makeCircle(810,270, "T8"));
transfers.push(makeCircle(830,680, "T9"));
transfers.push(makeCircle(850,750, "T10"));

branchLines.push(makeCircle(680, 330, "B3")); 
branchLines.push(makeCircle(490, 600, "B6")); 
branchLines.push(makeCircle(750, 300, "B4")); 

greenRail.add(makeCircle(170, 180, "A1"));
greenRail.add(makeCircle(280, 180, "A2"));
greenRail.add(transfers[0]);
greenRail.add(transfers[1]);
greenRail.add(makeCircle(570, 400, "A3"));
greenRail.add(transfers[2]);
greenRail.add(transfers[6]);
greenRail.add(transfers[8]);
greenRail.add(makeCircle(900, 680, "A4"));

blueRail.add(branchLines[1]);
blueRail.add(transfers[2]);
blueRail.add(makeCircle(690, 460, "B5"));
blueRail.add(branchLines[0]);
blueRail.add(branchLines[2]);
blueRail.add(transfers[7]);
blueRail.add(branchLines[2]);
blueRail.add(branchLines[0]);
blueRail.add(makeCircle(620, 280, "B2"));
blueRail.add(transfers[1]);
blueRail.add(makeCircle(370, 270, "B1"));
blueRail.add(makeCircle(235, 350, "B8"));
blueRail.add(makeCircle(235, 505, "B7"));
blueRail.add(transfers[3]);
blueRail.add(branchLines[1]);


brownRail.add(transfers[1]);
brownRail.add(makeCircle(500, 350, "C1"));
//brownRail.curve('C1');
brownRail.add(makeCircle(440, 450, "C2"));
brownRail.add(transfers[3]);
brownRail.add(transfers[4]);

redRail.add(makeCircle(150, 430, "D1"));
redRail.add(makeCircle(150, 680, "D2"));
//greenRail.add(makeCircle(300, 140, "G3"));
redRail.add(transfers[4]);
redRail.add(transfers[5]);
redRail.add(makeCircle(550, 680, "D3"));
redRail.add(transfers[6]);

yellowRail.add(transfers[5]);
yellowRail.add(makeCircle(500, 730, "E1"));
yellowRail.add(makeCircle(600, 750, "E2"));
yellowRail.add(makeCircle(690, 760, "E3"));
yellowRail.add(transfers[9]);
yellowRail.add(makeCircle(950, 740, "E4"));

orangeRail.add(transfers[0]);
orangeRail.add(makeCircle(600, 180, "F1"));
orangeRail.add(makeCircle(730, 180, "F2"));
orangeRail.add(transfers[7]);
orangeRail.add(makeCircle(900, 270, "F3"));
orangeRail.add(makeCircle(1000, 270, "F4"));
orangeRail.add(makeCircle(1000, 470, "F5"));

grayRail.add(makeCircle(810, 120, "G1"));
grayRail.add(transfers[7]);
grayRail.add(makeCircle(810, 465, "G2"));
grayRail.add(transfers[8]);
grayRail.add(transfers[9]);
grayRail.add(makeCircle(880, 780, "G3"));
grayRail.add(makeCircle(1040, 780, "G4"));

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

makeText(200,100,'출발 :  =>  도착 : ');
