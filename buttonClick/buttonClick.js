function buttonClick(x,source){
    if(x=='mTime'){
        if(canvas.startSelected==null){
            alert('출발역을 선택해 주세요.');
            return;
        }
        if(canvas.endSelected==null){
            alert('종착역을 선택해 주세요.');
            return;
        }
        var inputData = graph.shortest(document.getElementById('start').value, document.getElementById('end').value);
        showResultPath(source,inputData);
        canvas.requestRenderAll();
    }else if(x==mTrans){

    }else if(x==mMoney){
        
    }
}