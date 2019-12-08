//canvas Constructor
function makeCanvas(name){
    var canvas = new fabric.Canvas(name);
    canvas.endSelected = null;
    canvas.startSelected = null;
    fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
    return canvas;
}

//Rail Creator
function makeRail(LineColor){
    var nodes = [];
    var lines = [];

    nodes.add = function(obj){nodes.push(obj);};

    nodes.line = function(startCircle, endCircle, curvePoint=null){
        startNode = null;
        endNode = null;
        for(i = 0;i<nodes.length;i++){
            if(nodes[i].name == startCircle){
                startNode = nodes[i];
            }
            if(nodes[i].name == endCircle){
                endNode = nodes[i];
            }
        }
        if(startNode == null || endNode == null){
            return;
        }
        lines.push(makeLine(startNode, endNode, curvePoint));
    };

    nodes.getNode = function(name){
        for(var i = 0; i < nodes.length; i++){
            if(nodes[i].name == name)
                return nodes[i];
        }
        return null;
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
            nodes[i].set('stroke', 'gray'), nodes[i].set('fill', 'white');
    };

    return nodes;
}

function makeText(x, y, nameT) {
	var textbox = new fabric.Textbox(nameT, {
	  id: 'textbox',
	  left: x,
	  top: y,
	  width: 300,
      fontSize: 20,
      lockMovementX: true,
      lockMovementY: true,
      hasControls: false,
      evented: false,
      selectable: false

    });
	canvas.add(textbox).renderAll();
    canvas.add(textbox).setActiveObject(textbox);
    
    return textbox;
}

function makeText_02(x, y, nameT) {
	var textbox_02 = new fabric.Textbox(nameT, {
	  id: 'textbox_02',
	  left: x,
	  top: y,
	  width: 300,
      fontSize: 20,
      lockMovementX: true,
      lockMovementY: true,
      hasControls: false,
      evented: false,
      selectable: false
    });
	canvas.add(textbox_02).renderAll();
    canvas.add(textbox_02).setActiveObject(textbox_02);
    
    return textbox_02;
}


//Easier Circle
function makeCircle(x, y, name) {
    var c = new fabric.Circle({
        left: x,//x위치
        top: y,//y위치
        strokeWidth: 5,//테두리의 굵기
        radius: 12,//원의 반지름 크기
        fill: 'white',//안쪽 색
        stroke: 'gray',//테두리의 색
        lockMovementX: true,
        lockMovementY: true,//움직이지 않게 고정
        selectable : false
    });
    c.hasControls = c.hasBorders = false;
    c.selected = false;
    c.name = name;
    c.Text = new fabric.Text(name, {left: x+25, top: y-15, fontSize: 20, lockMovementX: true, lockMovementY: true, selectable: false});
    c.Text.hasControls = false;

    c.on('modified', function(){
        canvas.renderAll();
    });
    c.on('mousedown', function(){
        if (canvas.startSelected == null && canvas.endSelected != c) {
            document.getElementById('start').value = c.name;			
            var txtBox = canvas.getItem('textbox');
            var txtBox_02 = canvas.getItem('textbox_02');
            txtBox.set({ text : document.getElementById('start').value  });
            txtBox_02.set({ text :  document.getElementById('end').value });
            canvas.startSelected = c; c.selected = true;
            c.set('stroke', 'green');
            startImg.set('left', c.get('left')); startImg.set('top', c.get('top')- 30); startImg.set('visible',true); 
        }else if(canvas.startSelected == c){
            document.getElementById('start').value = '';
			var txtBox = canvas.getItem('textbox');
            var txtBox_02 = canvas.getItem('textbox_02');
            txtBox.set({ text : document.getElementById('start').value  });
            txtBox_02.set({ text : document.getElementById('end').value });
            canvas.startSelected.set('stroke', 'gray');
            canvas.startSelected = null; c.selected = false;
            c.set('stroke', 'gray');
            startImg.set('left', c.get('left')); startImg.set('top', c.get('top')- 30); startImg.set('visible',false);
        }else if(canvas.endSelected == c){
            document.getElementById('end').value = '';
			var txtBox = canvas.getItem('textbox');
            var txtBox_02 = canvas.getItem('textbox_02');
            txtBox.set({ text : document.getElementById('start').value  });
            txtBox_02.set({ text : document.getElementById('end').value });
            canvas.endSelected = null;
            c.set('stroke', 'gray'); c.selected = false;
            endImg.set('left', c.get('left')); endImg.set('visible', false);endImg.set('top', c.get('top')- 30);
        }else if (canvas.endSelected == null) {
            document.getElementById('end').value = c.name;
			var txtBox = canvas.getItem('textbox');
            var txtBox_02 = canvas.getItem('textbox_02');
            txtBox.set({ text : document.getElementById('start').value  });
            txtBox_02.set({ text :document.getElementById('end').value });
            canvas.endSelected = c; c.selected = true;
            c.set('stroke', 'green');
            endImg.set('left', c.get('left')); endImg.set('visible', true);endImg.set('top', c.get('top')- 30);
        }else{
            document.getElementById('end').value = c.name;
			var txtBox = canvas.getItem('textbox');
            var txtBox_02 = canvas.getItem('textbox_02');
            txtBox.set({ text : document.getElementById('start').value  });
            txtBox_02.set({ text :document.getElementById('end').value });
            canvas.endSelected.set('stroke', 'gray'); c.selected = true;
            canvas.endSelected = c;
            c.set('stroke', 'green');
            endImg.set('left', c.get('left')); endImg.set('visible', true);endImg.set('top', c.get('top')- 30);
        }
    });
    c.toString = function() {return x + ' ' + y;};
    return c;
}



canvasScale = 1;	
SCALE_FACTOR = 1.1;	

function zoomIn() {	
    canvasScale = canvasScale * SCALE_FACTOR;	
    canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);	
    canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);	

    var objects = canvas.getObjects();	

	for (i=0; i<objects.length; i++) {	

        objects[i].scaleX = objects[i].scaleX * SCALE_FACTOR;	
        objects[i].scaleY = objects[i].scaleY * SCALE_FACTOR;	
        objects[i].left = objects[i].left * SCALE_FACTOR;	
        objects[i].top = objects[i].top * SCALE_FACTOR;	

        for(j=i+1; j<objects.length; j++){	
            if(objects[i].left == objects[j].left){	
                if(objects[i].top == objects[j].top){	
                    for(k=j+1; k<objects.length; k++){	
                        if(objects[j].left == objects[k].left){	
                            if(objects[j].top == objects[k].top){	

                                objects[i].scaleX = objects[i].scaleX * SCALE_FACTOR;	
                                objects[i].scaleY = objects[i].scaleY * SCALE_FACTOR;	
                                objects[i].left = objects[i].left * SCALE_FACTOR;	
                                objects[i].top = objects[i].top * SCALE_FACTOR;	
                            }	
                        }	
                    }	
                    objects[i].scaleX = objects[i].scaleX * (1 / SCALE_FACTOR);	
                    objects[i].scaleY = objects[i].scaleY * (1 / SCALE_FACTOR);	
                    objects[i].left = objects[i].left * (1 / SCALE_FACTOR);	
                    objects[i].top = objects[i].top * (1 / SCALE_FACTOR);	
                }	
            }	
        }	
        objects[i].setCoords();	
    }	
	canvas.renderAll();	
}	

function zoomOut (){	

    canvasScale = canvasScale / SCALE_FACTOR;	
    canvas.setHeight(canvas.getHeight() * (1 / SCALE_FACTOR));	
    canvas.setWidth(canvas.getWidth() * (1 / SCALE_FACTOR));	

    var objects = canvas.getObjects();	
    for (i=0; i<objects.length; i++) {	

        objects[i].scaleX = objects[i].scaleX * (1 / SCALE_FACTOR);	
        objects[i].scaleY = objects[i].scaleY * (1 / SCALE_FACTOR);	
        objects[i].left = objects[i].left * (1 / SCALE_FACTOR);	
        objects[i].top = objects[i].top * (1 / SCALE_FACTOR);	

        for(j=i+1; j<objects.length; j++){	
            if(objects[i].left == objects[j].left){	
                if(objects[i].top == objects[j].top){	
                    for(k=j+1; k<objects.length; k++){	
                        if(objects[j].left == objects[k].left){	
                            if(objects[j].top == objects[k].top){	

                                objects[i].scaleX = objects[i].scaleX * (1 / SCALE_FACTOR);	
                                objects[i].scaleY = objects[i].scaleY * (1 / SCALE_FACTOR);	
                                objects[i].left = objects[i].left * (1 / SCALE_FACTOR);	
                                objects[i].top = objects[i].top * (1 / SCALE_FACTOR);	
                            }	
                        }	
                    }	
                    objects[i].scaleX = objects[i].scaleX * SCALE_FACTOR;	
                    objects[i].scaleY = objects[i].scaleY * SCALE_FACTOR;	
                    objects[i].left = objects[i].left * SCALE_FACTOR;	
                    objects[i].top = objects[i].top * SCALE_FACTOR;	
                }	
            }	
        }	
        objects[i].setCoords();        	
    }            	
    canvas.renderAll();	
}

//easier makeline
function makeLine(startCircle, endCircle, curvePoint) {
    var info =  {
        evented: false,
        lockMovementX: true,
        lockMovementY: true, //움직이지 않게 고정
        selectable : false
    };

    var Line;
    if(curvePoint == null){
        Line = new fabric.Line(new Array(startCircle.left, startCircle.top, endCircle.left, endCircle.top), info);
    }else{
        Line = new fabric.Path(String('M '+startCircle.toString() + ' C ' +curvePoint+ ' ' + endCircle.toString()), info);
    }
    Line.paint = function(color){Line.set('fill', color);if(curvePoint!=null){Line.set('fill','');}Line.set('stroke',color);};
    Line.resize = function(size){Line.set('strokeWidth', size);};
    Line.redraw = function(color, size){Line.paint(color);Line.resize(size);};
    Line.hasControls = false;
    return Line;
}

function InitRails(rails, canvas){
    if(canvas.startSelected!=null)
        canvas.startSelected.set('stroke', 'gray');
    if(canvas.endSelected != null)
        canvas.endSelected.set('stroke', 'gray');
    canvas.startSelected = null;
    canvas.endSelected = null;
    document.getElementById('start').value = '';
    document.getElementById('end').value = '';
    endImg.set('visible', false);
    startImg.set('visible', false);
    for(var i = 0; i < rails.length; i++)
        rails[i].init();
    canvas.requestRenderAll();
    return true;
}

function changeTextData(source, pointName = "none"){
    var element;
    if(document.getElementById('start').value == "" && canvas.startSelected !== null){
        console.log("zz");
        startImg.set('visible',false); canvas.startSelected.set('stroke', 'gray');
        canvas.startSelected.selected = false; canvas.startSelected = null;
    }
    else if(document.getElementById('end').value == "" && canvas.endSelected !== null){
        console.log("zz");
        endImg.set('visible',false); canvas.endSelected.set('stroke', 'gray');
        canvas.startSelected.selected = false; canvas.endSelected = null;
    }
    {
        element = getNodeElement(source, document.getElementById('start').value);
        console.log(element);
        if(element != null){
            for(let i = 0; i<Rails.length; i++)
                Rails[i].init();
            element.set('stroke', 'green');
            if(canvas.endSelected !== null) canvas.endSelected.set('stroke', 'green');
            if(element.selected !== true){
                console.log("cc");
                if(canvas.startSelected !== null)canvas.startSelected.set('stroke', 'gray'), canvas.startSelected.selected = false;
                element.set('stroke', 'green'); 
                element.selected = true; canvas.startSelected =  element; document.getElementById('start').value = element.name;
                startImg.set('left', element.get('left')+ 25); startImg.set('top', element.get('top')- 25); startImg.set('visible',true); 
            }
        }
    }
    {
        element = getNodeElement(source, document.getElementById('end').value);
        console.log(element);
        if(element != null){
            for(var i = 0; i<Rails.length; i++)
                Rails[i].init();
            element.set('stroke', 'green');
            if(canvas.startSelected !== null) canvas.startSelected.set('stroke', 'green');
            if(element.selected !== true){
                console.log("cc");
                if(canvas.endSelected !== null) canvas.endSelected.set('stroke', 'gray'), canvas.endSelected.selected = false; 
                element.set('stroke', 'green');
                element.selected = true; canvas.endSelected = element; document.getElementById('end').value = element.name;
                endImg.set('left', element.get('left')+ 25); endImg.set('top', element.get('top')- 25); endImg.set('visible',true); 
            }
        }
    }
     
    canvas.requestRenderAll();
}
function getNodeElement(source, name){
    var Result;
    for(var i = 0; i<source.length; i++){
        Result = source[i].getNode(name);
        if(Result  != null){
            return Result;
        }
    }
    return null;
}

function showResultPath(source, paths){
    var strArray= paths.split(' ');
    var Element;
    for(var i = 0; i<Rails.length; i++)
        Rails[i].init();
    for(i = 0; i<strArray.length; i++){
        Element = getNodeElement(source, strArray[i]);
        if(Element != null){
            Element.set('fill', 'yellow');
        }
    }
}

function Submit(source, target){
    if(canvas.startSelected==null){
        alert('출발역을 선택해 주세요.');
        return;
    }
    if(canvas.endSelected==null){
        alert('종착역을 선택해 주세요.');
        return;
    }
    var inputData;
    if(target === 'distance'){
        inputData = graph.shortest(document.getElementById('start').value, document.getElementById('end').value, 'distance');
        inputData = inputData[0][1];
        console.log(inputData);
    }
    else if(target === 'time'){
        inputData = graph.shortest(document.getElementById('start').value, document.getElementById('end').value, 'time');
        console.log(inputData);
        inputData = inputData[0][1];
        console.log(inputData);
    }
    else if(target === 'fee'){
        inputData = graph.shortest(document.getElementById('start').value, document.getElementById('end').value, 'fee');
        inputData = inputData[0][1];
        console.log(inputData);
    }
    else if(target === 'transfer'){
        inputData = graph.leastTransferSearch(document.getElementById('start').value, document.getElementById('end').value);
        console.log(inputData);
    }
    showResultPath(source,inputData);
    canvas.requestRenderAll();
}

fabric.Canvas.prototype.getItem  = function(id) {
  var object = null,
      objects = this.getObjects();

  for (var i = 0, len = this.size(); i < len; i++) {
    if (objects[i].id && objects[i].id === id) {
      object = objects[i];
      break;
    }
  }

  return object;
};

function swapInput(){
    var tempText = document.getElementById('start').value;
    var tempMatrix = [];
    document.getElementById('start').value = document.getElementById('end').value;
    document.getElementById('end').value = tempText;
    tempMatrix[0] = startImg.get('left'); tempMatrix[1] = startImg.get('top');
    startImg.set('left', endImg.get('left')); startImg.set('top', endImg.get('top'));
    endImg.set('left', tempMatrix[0]); endImg.set('top', tempMatrix[1]);
    canvas.requestRenderAll();
}