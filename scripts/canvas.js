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
    nodes.getNode = function(name){
        for(var i = 0; i < nodes.length; i++){
            if(nodes[i].name == name)
                return nodes[i];
        }
        return null;
    };

    nodes.connect = function(){
        var i, j = 0;
        for(i = 0;i<nodes.length - 1;i++)
            if(typeof opts[j] !== 'undefined' && opts[j] == nodes[i].name)
                lines.push(makeLine(nodes[i], nodes[i+1], true));
            else
                lines.push(makeLine(nodes[i],nodes[i+1], false));
    };
    nodes.draw = function(){
        var i;
        for(i = 0;i<lines.length;i++){
            lines[i].redraw(LineColor, 5);
            canvas.add(lines[i]);
        }
        for(i = 0 ;i < nodes.length;i++)
            canvas.add(nodes[i], nodes[i].Text);
    };

    nodes.init = function(){
        var i;
        for(i = 0;i<lines.length;i++)
            lines[i].redraw('LineColor', 5);
        for(i = 0 ;i <nodes.length;i++)
            nodes[i].set('stroke', 'gray');
    }
    
    return nodes;
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
        selectable : false
    });
    c.hasControls = c.hasBorders = false;
    c.selected = false;
    c.name = name;
    c.Text = new fabric.Text(name, {left: x+30, top: y, fontSize: 20, lockMovementX: true, lockMovementY: true, selectable: false});
    c.Text.hasControls = false;

    c.on('mousedown', function(){
        if (canvas.startSelected == null) {
            document.getElementById('start').value = c.name;
            canvas.startSelected = c;
            c.set('stroke', 'green');
            startImg.set('left', c.get('left')+ 25); startImg.set('top', c.get('top')- 25); startImg.set('visible',true); 
        }else if(canvas.startSelected == c){
            document.getElementById('start').value = '';
            canvas.startSelected.set('stroke', 'gray');
            canvas.startSelected = null;
            c.set('stroke', 'gray');
            startImg.set('left', c.get('left')+ 25); startImg.set('top', c.get('top')- 25); startImg.set('visible',true);
        }else if(canvas.endSelected == c){
            document.getElementById('end').value = '';
            canvas.endSelected = null;
            c.set('stroke', 'gray');
            endImg.set('left', c.get('left')+ 25); endImg.set('visible', true);endImg.set('top', c.get('top')- 25);
        }else if (canvas.endSelected == null) {
            document.getElementById('end').value = c.name;
            canvas.endSelected = c;
            c.set('stroke', 'green');
            endImg.set('left', c.get('left')+ 25); endImg.set('visible', true);endImg.set('top', c.get('top')- 25);
        }else{
            document.getElementById('end').value = c.name;
            canvas.endSelected.set('stroke', 'gray');
            canvas.endSelected = c;
            c.set('stroke', 'green');
            endImg.set('left', c.get('left')+ 25); endImg.set('visible', true);endImg.set('top', c.get('top')- 25);
        }
        canvas.requestRenderAll();
    });
    c.toString = function() {return x + ' ' + y;};
    return c;
}


//easier makeline
function makeLine(startCircle, endCircle, curve) {
    var info =  {
        evented: false,
        lockMovementX: true,
        lockMovementY: true, //움직이지 않게 고정
        selectable : false
    };

    var Line;

    if(!curve){
        Line = new fabric.Line(new Array(startCircle.left, startCircle.top, endCircle.left, endCircle.top), info);
    }else{
        curvePoint = String(new Array(startCircle.left, endCircle.top));
        Line = new fabric.Path(String('M '+startCircle.toString() + ' C ' +curvePoint+' '+curvePoint+ ' ' + endCircle.toString()), info);
    }
    Line.paint = function(color){Line.set('fill', color);if(curve){Line.set('fill','');}Line.set('stroke',color);};
    Line.resize = function(size){Line.set('strokeWidth', size);};
    Line.redraw = function(color, size){Line.paint(color);Line.resize(size);};
    Line.hasControls = false;
    return Line;
}

function Init(rails, canvas){
    canvas.startSelected = canvas.endSelected = null;
    document.getElementById('start').value = '';
    document.getElementById('end').value = '';
    endImg.set('visible', false);
    startImg.set('visible', false);
    for(let i = 0; i < rails.length; i++)
        rails[i].init();
    canvas.requestRenderAll();
}

function getNodeElement(source, name){
    for(var i = 0; i<source.node.length; i++){
        if(source.node[i].name === name){
            return source.node[i];
        }
        return undefined;
    }
}
function showResultPath(source, paths){
    var strArray= paths.split(' ');
    for(var i = 0; i<strArray.length; i++){
        console.log(strArray[i]);
        getNodeElement(source, strArray[i]).set('color', 'black');        
    }
}