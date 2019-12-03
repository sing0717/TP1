//MAIN
var canvas = makeCanvas("c");
var Rails = [];
var startImgElement = document.getElementById("start-image");
var endImgElement = document.getElementById("end-image");
var startTag = document.getElementById('start-image'),
    endTag = document.getElementById('end-image');
var imgElement = document.getElementById('transfers-image');
var sideTransfersImg = new fabric.Image(imgElement,{
    top: 100,
    left: 150,
    scaleX: 0.3,
    scaleY: 0.4,
    opacity: 0.8,
    selectable : false
});
var startImg = new fabric.Image(startTag,{
    left: 100, top: 100, scaleX: 0.2, scaleY: 0.2, opacity: 0.5, visible: false}),
    endImg = new fabric.Image(endTag,{
    left: 150, top: 100, scaleX: 0.2, scaleY: 0.2, opacity: 0.5, visible: false});
var transfers = [];
var branchLines = [];

var imgElement = document.getElementById('transfers-image');

	
	

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

transfers.push(makeCircle(350,180, "T1"));
transfers.push(makeCircle(450,260, "T2"));
transfers.push(makeCircle(550,500, "T3"));
transfers.push(makeCircle(350,500, "T4"));
transfers.push(makeCircle(350,580, "T5"));
transfers.push(makeCircle(450,580, "T6"));
transfers.push(makeCircle(650,500, "T7"));
transfers.push(makeCircle(850,260, "T8"));
transfers.push(makeCircle(850,500, "T9"));
transfers.push(makeCircle(850,640, "T10"));

branchLines.push(makeCircle(650, 340, "B3")); 
branchLines.push(makeCircle(450, 500, "B6")); 
branchLines.push(makeCircle(750, 260, "B4")); 

greenRail.add(makeCircle(150, 180, "A1"));
greenRail.add(makeCircle(250, 180, "A2"));
greenRail.add(transfers[0]);
greenRail.add(transfers[1]);
greenRail.add(makeCircle(450, 380, "A3"));
greenRail.add(transfers[2]);
greenRail.add(transfers[6]);
greenRail.add(transfers[8]);
greenRail.add(makeCircle(950, 500, "A4"));

blueRail.add(branchLines[1]);
blueRail.add(transfers[2]);
blueRail.add(makeCircle(650, 420, "B5"));
blueRail.add(branchLines[0]);
blueRail.add(branchLines[2]);
blueRail.add(transfers[7]);
blueRail.add(branchLines[2]);
blueRail.add(branchLines[0]);
blueRail.add(makeCircle(550, 260, "B2"));
blueRail.add(transfers[1]);
blueRail.add(makeCircle(350, 260, "B1"));
blueRail.add(makeCircle(250, 340, "B8"));
blueRail.add(makeCircle(250, 420, "B7"));
blueRail.add(transfers[3]);
blueRail.add(branchLines[1]);


brownRail.add(transfers[1]);
brownRail.add(makeCircle(350, 340, "C1"));
brownRail.add(makeCircle(350, 420, "C2"));
brownRail.add(transfers[3]);
brownRail.add(transfers[4]);

redRail.add(makeCircle(150, 580, "D1"));
redRail.add(makeCircle(250, 580, "D2"));
redRail.add(transfers[4]);
redRail.add(transfers[5]);
redRail.add(makeCircle(550, 580, "D3"));
redRail.add(transfers[6]);

yellowRail.add(transfers[5]);
yellowRail.add(makeCircle(550, 640, "E1"));
yellowRail.add(makeCircle(650, 640, "E2"));
yellowRail.add(makeCircle(750, 640, "E3"));
yellowRail.add(transfers[9]);
yellowRail.add(makeCircle(950, 640, "E4"));

orangeRail.add(transfers[0]);
orangeRail.add(makeCircle(550, 180, "F1"));
orangeRail.add(makeCircle(700, 180, "F2"));
orangeRail.add(transfers[7]);
orangeRail.add(makeCircle(950, 340, "F3"));
orangeRail.add(makeCircle(1050, 420, "F4"));
orangeRail.add(makeCircle(1050, 500, "F5"));

grayRail.add(makeCircle(950, 180, "G1"));
grayRail.add(transfers[7]);
grayRail.add(makeCircle(850, 380, "G2"));
grayRail.add(transfers[8]);
grayRail.add(transfers[9]);
grayRail.add(makeCircle(950, 720, "G3"));
grayRail.add(makeCircle(1050, 720, "G4"));

//Rail.line(nameCirlce, nameCircle, CurvePoint);

orangeRail.line("T1", "F1");
orangeRail.line("F1", "F2");
orangeRail.line("F2", "T8", "850, 175 850, 245");//700, 180-5  850, 260-25
orangeRail.line("T8", "F3", "850, 255 850, 335");//850, 260-5  950 340-5
orangeRail.line("F3", "F4", "1050, 335 1050, 415");//950, 340-5  1050, 420-5
orangeRail.line("F4", "F5");

greenRail.line("A1", "A2");
greenRail.line("A2", "T1");
greenRail.line("T1", "T2", "450, 175 450, 255");//350, 180-5  450, 260-5
greenRail.line("T2", "A3");
greenRail.line("A3", "T3", "450, 375 450, 495");//450, 380-5  550, 500-5
greenRail.line("T3", "T7");
greenRail.line("T7", "T9");
greenRail.line("T9", "A4");

redRail.line("D1", "D2");
redRail.line("D2", "T5");
redRail.line("T5", "T6");
redRail.line("T6", "D3");
redRail.line("D3", "T7", "650, 575 650, 495");//550, 580-5  650, 500-5

yellowRail.line("T6", "E1", "450, 555 450, 635");//450, 560-5  550, 640-5
yellowRail.line("E1", "E2");
yellowRail.line("E2", "E3");
yellowRail.line("E3", "T10");
yellowRail.line("T10", "E4");

brownRail.line("T2","C1", "350, 255 350, 335");//450, 260-5  350, 340-5
brownRail.line("C1","C2");
brownRail.line("C2","T4");
brownRail.line("T4","T5");

blueRail.line("B1", "T2");
blueRail.line("T2", "B2");
blueRail.line("B2", "B3", "650, 255 650 335");//550, 260-5  650, 340-5
blueRail.line("B3", "B4", "650, 335 650, 255");//650, 340-5  750, 260-5
blueRail.line("B3", "B5");
blueRail.line("B4", "T8");
blueRail.line("B5", "T3", "650, 415 650 495");//650, 420-5  550, 500-5 
blueRail.line("T3", "B6");
blueRail.line("B6", "T4");
blueRail.line("T4", "B7", "250, 495 250, 415");//350, 500-5  250, 420-5
blueRail.line("B7", "B8");
blueRail.line("B8", "B1", "250, 335 250, 255");//250, 340-5  350, 260-5

grayRail.line("G1", "T8", "850, 175 850, 255");//950, 180-5  850, 260-5
grayRail.line("T8", "G2");
grayRail.line("G2", "T9");
grayRail.line("T9", "T10");
grayRail.line("T10", "G3", "850, 655 850, 735");//850, 660-5  950, 740-5
grayRail.line("G3", "G4");

orangeRail.draw();
redRail.draw();
yellowRail.draw();
brownRail.draw();
blueRail.draw();
greenRail.draw();
grayRail.draw();


canvas.add(startImg, endImg);
canvas.add(sideTransfersImg);
makeText(200,100,'출발 :  =>  도착 : ');
