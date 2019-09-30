//canvas Constructor
function makeCanvas(name){
    var canvas = new fabric.Canvas(name);
    fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
    return canvas;
}

//Rail Creator
function makeRail(LineColor){
    var nodes = [];
    var opts = [];
    var lines = [];

    nodes.add = function(obj){nodes.push(obj);};
    nodes.curve = function(name){opts.push(name);};
    nodes.connect = function(){
        var i, j = 0;
        for(i = 0;i<nodes.length - 1;i++)
            if(typeof opts[j] !== 'undefined' && opts[j] == nodes[i].name)
                lines.push(makeLine(LineColor, nodes[i], nodes[i+1], true));
            else
                lines.push(makeLine(LineColor,nodes[i],nodes[i+1], false));
    };
    nodes.draw = function(){
        var i;
        for(i = 0;i<lines.length;i++)
            canvas.add(lines[i]);
        for(i = 0 ;i < nodes.length;i++)
            canvas.add(nodes[i], nodes[i].Text);
    };
    
    return nodes;
}

//textCreator for circle
function makeText(circle){
}

//Easier Circle
function makeCircle(x, y, name) {
    var c = new fabric.Circle({
        left: x,//x위치
        top: y,//y위치
        strokeWidth: 5,//테두리의 굵기
        radius: 10,//원의 반지름 크기
        fill: 'white',//안쪽 색
        stroke: 'gray',//테두리의 색
        lockMovementX: true,
        lockMovementY: true,//움직이지 않게 고정
    });
    c.hasControls = c.hasBorders = false;
    c.selected = false;
    c.name = name;
    c.Text = new fabric.Text(name, {left: x+30, top: y, fontSize: 20});

    c.on('mousedown', function(){
        if (canvas.startSelected == null) {
            document.getElementById('start').value = c.name;
            canvas.startSelected = c;
            c.set('stroke', 'green');
        }else if(canvas.startSelected == c){
            document.getElementById('start').value = '';
            canvas.startSelected.set('stroke', 'gray');
            canvas.startSelected = null;
            c.set('stroke', 'gray');
        }else if(canvas.endSelected == c){
            document.getElementById('end').value = '';
            canvas.endSelected = null;
            c.set('stroke', 'gray');
        }else if (canvas.endSelected == null) {
            document.getElementById('end').value = c.name;
            canvas.endSelected = c;
            c.set('stroke', 'green');
        }else{
            document.getElementById('end').value = c.name;
            canvas.endSelected.set('stroke', 'gray');
            canvas.endSelected = c;
            c.set('stroke', 'green');
        }
        canvas.requestRenderAll();
    });
    c.toString = function() {return x + ' ' + y;};
    return c;
}


//easier makeline
function makeLine(LineColor,startCircle, endCircle, curve) {
    var info =  {
        fill: LineColor,//선의 색
        stroke: LineColor,//선 테두리의 색
        strokeWidth: 5,//선 테두리의 굵기
        evented: false,
        lockMovementX: true,
        lockMovementY: true,//움직이지 않게 고정
    };

    if(!curve)
        return new fabric.Line(new Array(startCircle.left, startCircle.top, endCircle.left, endCircle.top), info);
    info.fill = '';
    curvePoint = String(new Array(startCircle.left, endCircle.top));
    return new fabric.Path(String('M '+startCircle.toString() + ' C ' +curvePoint+' '+curvePoint+ ' ' + endCircle.toString()), info);
}


//MAIN
var canvas = makeCanvas("c");

rail = makeRail('red');
rail.add(makeCircle(200, 30, "R1"));
rail.add(makeCircle(200, 80, "R2"));
rail.add(makeCircle(200, 140, "R3"));
rail.add(makeCircle(200, 180, "R4"));
rail.add(makeCircle(200, 280, "R5"));
rail.add(makeCircle(200, 405, "R6"));
rail.add(makeCircle(300, 505, "R7"));
rail.add(makeCircle(475, 505, "R8"));
rail.add(makeCircle(635, 505, "R9"));

rail.curve('R6'); //R6에서 다음 정거장으로 갈때 굽어짐

rail.connect();
rail.draw();