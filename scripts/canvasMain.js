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

canvas.add(startImg, endImg);

redRail = makeRail('red');
greenRail = makeRail('green');
blueRail = makeRail('blue');
yellowRail = makeRail('yellow');
brownRail = makeRail('brown');


Rails.push(greenRail);
Rails.push(blueRail);
Rails.push(redRail);
Rails.push(yellowRail);
Rails.push(brownRail);

transfers.push(makeCircle(420,170, "T2"));
transfers.push(makeCircle(220,500, "T4"));
transfers.push(makeCircle(200,600, "T5"));
transfers.push(makeCircle(300,600, "T6"));
transfers.push(makeCircle(600,600, "T7"));
transfers.push(makeCircle(700,670, "T10"));

brownRail.add(transfers[0]);
brownRail.add(makeCircle(400, 270, "C1"));
//brownRail.curve('C1');
brownRail.add(makeCircle(340, 370, "C2"));
brownRail.add(transfers[1]);
brownRail.add(transfers[2]);

blueRail.add(makeCircle(135, 270, "B8"));
blueRail.add(makeCircle(135, 425, "B7"));
blueRail.add(transfers[1]);
blueRail.add(makeCircle(390, 520, "B6"));

yellowRail.add(transfers[3]);
yellowRail.add(makeCircle(400, 650, "E1"));
yellowRail.add(makeCircle(500, 670, "E2"));
yellowRail.add(makeCircle(590, 680, "E3"));
yellowRail.add(transfers[5]);
yellowRail.add(makeCircle(800, 660, "E4"));
//greenRail.curve('R1'); //R6에서 다음 정거장으로 갈때 굽어짐

redRail.add(makeCircle(50, 350, "D1"));
redRail.add(makeCircle(50, 600, "D2"));
//greenRail.add(makeCircle(300, 140, "G3"));
redRail.add(transfers[2]);
redRail.add(transfers[3]);
redRail.add(makeCircle(450, 600, "D3"));
redRail.add(transfers[4]);


greenRail.connect();
redRail.connect();
yellowRail.connect();
brownRail.connect();
blueRail.connect();

greenRail.draw();
redRail.draw();
yellowRail.draw();
brownRail.draw();
blueRail.draw();

var textbox = new fabric.Textbox('', {
  left: 200,
  top: 50,
  width: 300,
  fontSize: 20
});
canvas.add(textbox).setActiveObject(textbox);