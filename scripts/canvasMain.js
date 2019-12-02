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
transfers.push(makeCircle(640,570, "T3"));
transfers.push(makeCircle(360,580, "T4"));
transfers.push(makeCircle(320,680, "T5"));
transfers.push(makeCircle(420,680, "T6"));
transfers.push(makeCircle(700,680, "T7"));
transfers.push(makeCircle(820,290, "T8"));
transfers.push(makeCircle(830,680, "T9"));
transfers.push(makeCircle(850,750, "T10"));

branchLines.push(makeCircle(715, 360, "B3")); 
branchLines.push(makeCircle(490, 590, "B6")); 
branchLines.push(makeCircle(740, 280, "B4")); 

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
brownRail.add(makeCircle(440, 450, "C2"));
brownRail.add(transfers[3]);
brownRail.add(transfers[4]);

redRail.add(makeCircle(150, 430, "D1"));
redRail.add(makeCircle(150, 680, "D2"));
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

// Rail.line(nameCirlce, nameCircle, CurvePoint);

orangeRail.line("T1", "F1");
orangeRail.line("F1", "F2");
orangeRail.line("F2", "T8");
orangeRail.line("T8", "F3");
orangeRail.line("F3", "F4");
orangeRail.line("F4", "F5");

greenRail.line("A1", "A2");
greenRail.line("A2", "T1");
greenRail.line("T1", "T2");
greenRail.line("T2", "A3");
greenRail.line("A3", "T3");
greenRail.line("T3", "T7");
greenRail.line("T7", "T9");
greenRail.line("T9", "A4");

redRail.line("D1", "D2");
redRail.line("D2", "T5");
redRail.line("T5", "T6");
redRail.line("T6", "D3");
redRail.line("D3", "T7");

yellowRail.line("T6", "E1");
yellowRail.line("E1", "E2");
yellowRail.line("E2", "E3");
yellowRail.line("E3", "T10");
yellowRail.line("T10", "E4");

brownRail.line("T2","C1");
brownRail.line("C1","C2");
brownRail.line("C2","T4");
brownRail.line("T4","T5");

blueRail.line("B1", "T2");
blueRail.line("T2", "B2");
blueRail.line("B2", "B3");
blueRail.line("B3", "B4");
blueRail.line("B3", "B5");
blueRail.line("B4", "T8");
blueRail.line("B5", "T3");
blueRail.line("T3", "B6");
blueRail.line("B6", "T4");
blueRail.line("T4", "B7");
blueRail.line("B7", "B8");
blueRail.line("B8", "B1");

grayRail.line("G1", "T8");
grayRail.line("T8", "G2");
grayRail.line("G2", "T9");
grayRail.line("T9", "T10");
grayRail.line("T10", "G3");
grayRail.line("G3", "G4");

orangeRail.draw();
redRail.draw();
yellowRail.draw();
brownRail.draw();
blueRail.draw();
greenRail.draw();
grayRail.draw();


canvas.add(startImg, endImg);
makeText(200,100,'출발 :  =>  도착 : ');
