//그래프 source: https://www.zerocho.com/category/Algorithm/post/584b9033580277001862f16c

var s_time = [];
var s_distance = [];
var s_fee = [];
var s_transferTime = [];
var s_stationCount = [];
var result = [];
var Graph = (function() {
    function Vertex(key, lineInfo) {
      this.next = null;
      this.arc = null;
      this.key = key;
      this.inTree = null;
      this.roots = " ";
      this.transferRoots = " ";
      this.transferTimes = " ";
      this.lineInfo = lineInfo;
      this.pathWay = " "; 
    }
    function Arc(distance, time, fee, dest) {
      this.nextArc = null;
      this.destination = dest;
      this.distance = distance;
      this.time = time;
      this.fee = fee;
      this.dest = dest;
      this.inTree = null;
      this.transfers = Infinity;
    }
    function Graph() {
      this.count = 0;
      this.first = null;
    }
    Graph.prototype.insertVertex = function(key, lineInfo) {
      var vertex = new Vertex(key, lineInfo);
      var last = this.first;
      if (last) {
        while (last.next !== null) {
          last = last.next;
        }
        last.next = vertex;
      } else {
        this.first = vertex;
      }
      this.count++;
    };
    Graph.prototype.deleteVertex = function(key) {
      var vertex = this.first;
      var prev = null;
      while (vertex.key !== key) {
        prev = vertex;
        vertex = vertex.next;
      }
      if (!vertex) return false;
      if (!vertex.arc) return false;
      if (prev) {
        prev.next = vertex.next;
      } else {
        this.first = vertex.next;
      }
      this.count--;
    };
    Graph.prototype.insertArc = function(distance , key, fee, fromKey, toKey, lineInfo) {
      var from = this.first;
      var to = this.first;
      while (from && from.key !== fromKey) {
        from = from.next;
      }
      while (to && to.key !== toKey) {
        to = to.next;
      }
      if (!from || !to) return false;
      var arc = new Arc(distance, key, fee, to,  lineInfo);
      var fromLast = from.arc;
      if (fromLast) {
        while (fromLast.nextArc != null) {
          fromLast = fromLast.nextArc;
        }
        fromLast.nextArc = arc;
      } else {
        from.arc = arc;
      }
    };
    Graph.prototype.deleteArc = function(fromKey, toKey) {
      var from = this.first;
      while (from !== null) {
        if (from.key === fromKey) break;
        from = from.next;
      }
      if (!from) return false;
      var fromArc = from.arc;
      var preArc;
      while (fromArc !== null) {
        if (toKey === fromArc.destination.key) break;
        preArc = fromArc;
        fromArc = fromArc.next;
      }
      if (!fromArc) return false;
      if (preArc) {
        preArc.nextArc = fromArc.nextArc;
      } else {
        from.arc = fromArc.nextArc;
      }
    };
    return Graph;
  })();

  function insertTwoWayArc(graph, distance, data ,fee , from, to) {
    graph.insertArc(distance, data, fee, from, to);
    graph.insertArc(distance , data, fee, to, from);
  }
 //////Queue
 var queue = new Queue();
  //////////////////////////////////////////////////////////////////////////////
  //다익스트라 source: https://www.zerocho.com/category/Algorithm/post/584bd46f580277001862f1af

  Graph.prototype.search = function(startKey, endKey, target){
    var from = this.first;
    var curResult = [];
    var pathWay;

    while (from) {
      //console.log(from.key);
      if (from.key === startKey) {
        break;
      }
      from = from.next;
    }
    console.log('시작점은 %s입니다', from.key);
    var temp = this.first;
    
    while (temp) { // 모든 버텍스 최단거리를 Infinity로 초기화
      temp.transfers = temp.time = temp.fee = temp.distance = Infinity;
      temp.transferTimes = temp.pathWay = temp.transferRoots = temp.roots = '';
      temp = temp.next;
    }

    
    var current;
    var arc;
    var tempWay; var checkTrans;

    temp = from;
    temp.transfers = temp.time = temp.fee = temp.distance = 0;
    temp.roots = temp.key + " ";
    temp.pathWay = temp.lineInfo;
    queue.enqueue(temp);

    while (!(queue.isEmpty())) { // 반복문을 돌며 최단 값을 찾음
      current = queue.dequeue();
      arc = current.arc;
      while (arc) {

        checkTrans = this.checkAddTransfer(current.pathWay, arc.destination.lineInfo);
        if(target === 'distance'){
          if (arc.destination.distance > current.distance + arc.distance) {
            arc.destination.time = current.time + arc.time;
            arc.destination.distance = current.distance + arc.distance;
            arc.destination.fee = current.fee + arc.fee;
            arc.destination.roots = current.roots + " " + arc.destination.key + " ";  
            
            if(checkTrans == 1){ arc.destination.transferRoots = current.transferRoots  +  " " + current.key + " " ;
              arc.destination.transferTimes = current.transferTimes + " " + current.time + " ";}
            else{ arc.destination.transferRoots = current.transferRoots;
              arc.destination.transferTimes = current.transferTimes;}

            tempWay = current.lineInfo;
            tempWay = tempWay.filter(lane => {for(check of arc.destination.lineInfo) if(lane == check) return lane});
            arc.destination.pathWay = tempWay;
            queue.enqueue(arc.destination);
          }
        }
        else if(target === 'time'){
          if (arc.destination.time > current.time + arc.time) {

            arc.destination.time = current.time + arc.time;
            arc.destination.distance = current.distance + arc.distance;
            arc.destination.fee = current.fee + arc.fee;
            arc.destination.roots = current.roots + " " + arc.destination.key + " ";

            if(checkTrans == 1){ arc.destination.transferRoots = current.transferRoots  +  " " + current.key + " " ;
              arc.destination.transferTimes = current.transferTimes + " " + current.time + " ";}
            else{ arc.destination.transferRoots = current.transferRoots;
              arc.destination.transferTimes = current.transferTimes;}

            tempWay = current.lineInfo;
            tempWay = tempWay.filter(lane => {for(check of arc.destination.lineInfo) if(lane == check) return lane});
            arc.destination.pathWay = tempWay;
            queue.enqueue(arc.destination);
          }
        }
        else if(target === 'fee'){
          if (arc.destination.fee > current.fee + arc.fee) {
            arc.destination.time = current.time + arc.time;
            arc.destination.distance = current.distance + arc.distance;
            arc.destination.fee = current.fee + arc.fee;
            arc.destination.roots = current.roots + " " + arc.destination.key + " ";

            if(checkTrans == 1){ arc.destination.transferRoots = current.transferRoots  +  " " + current.key + " " ;
              arc.destination.transferTimes = current.transferTimes + " " + current.time+ " ";}
            else{ arc.destination.transferRoots = current.transferRoots;
              arc.destination.transferTimes = current.transferTimes;}
            
            tempWay = current.lineInfo;
            tempWay = tempWay.filter(lane => {for(check of arc.destination.lineInfo) if(lane == check) return lane});
            arc.destination.pathWay = tempWay;
            queue.enqueue(arc.destination);
          }
        }
        else if(target === 'transfer'){
          if (arc.destination.fee > current.fee + arc.fee) {
            arc.destination.time = current.time + arc.time;
            arc.destination.distance = current.distance + arc.distance;
            arc.destination.fee = current.fee + arc.fee;
            arc.destination.roots = current.roots + " " + arc.destination.key + " ";
            if(checkTrans == 0){
            tempWay = current.lineInfo;
            tempWay = tempWay.filter(lane => {for(check of arc.destination.lineInfo) if(lane == check) return lane});
            arc.destination.pathWay = tempWay;
            queue.enqueue(arc.destination);
            }
          }
        }
        arc = arc.nextArc;
      }
    }
    temp = this.first;
    while (temp) {
      if(temp.key === endKey){
        if(target === 'distance'){
          console.log('%s까지의 최단거리는 %d입니다', temp.key, temp.distance);
          console.log('%s까지의 시간은 %d입니다', temp.key, temp.time);
          console.log('%s까지의 비용은 %d입니다', temp.key, temp.fee);
          console.log('%s까지의 환승루트는 %s입니다', temp.key, temp.transferRoots);
          console.log('%s까지의 환승시 시간은 %s입니다', temp.key, temp.transferTimes);
          console.log('%s까지의 루트는 %s입니다', temp.key, temp.roots);
          s_time[0]=temp.time;
          s_distance[0]=temp.distance;
          s_fee[0]=temp.fee;
          s_transferTime[0]=temp.transferTimes;
          s_stationCount[0]=temp.roots;
          curResult.push(temp.distance);
          curResult.push(temp.roots);
        }
        else if(target === 'time'){
          console.log('%s까지의 최단시간은 %d입니다', temp.key, temp.time);
          console.log('%s까지의 거리는 %d입니다', temp.key, temp.distance);
          console.log('%s까지의 비용은 %d입니다', temp.key, temp.fee);
          console.log('%s까지의 환승루트는 %s입니다', temp.key, temp.transferRoots);
          console.log('%s까지의 환승시 시간은 %s입니다', temp.key, temp.transferTimes);
          console.log('%s까지의 루트는 %s입니다', temp.key, temp.roots);
          s_time[1]=temp.time;
          s_distance[1]=temp.distance;
          s_fee[1]=temp.fee;
          s_transferTime[1]=temp.transferTimes;
          s_stationCount[1]=temp.roots;
          curResult.push(temp.time);
          curResult.push(temp.roots);
        }
        else if(target === 'fee'){
          console.log('%s까지의 최소비용은 %d입니다', temp.key, temp.fee);
          console.log('%s까지의 거리는 %d입니다', temp.key, temp.distance);
          console.log('%s까지의 시간은 %d입니다', temp.key, temp.time);
          console.log('%s까지의 환승루트는 %s입니다', temp.key, temp.transferRoots);
          console.log('%s까지의 환승시 시간은 %s입니다', temp.key, temp.transferTimes);
          console.log('%s까지의 루트는 %s입니다', temp.key, temp.roots);
          s_time[2]=temp.time;
          s_distance[2]=temp.distance;
          s_fee[2]=temp.fee;
          s_transferTime[2]=temp.transferTimes;
          s_stationCount[2]=temp.roots;
          curResult.push(temp.time);
          curResult.push(temp.roots);
        }
        else if(target === 'transfer'){
          // console.log('%s까지의 비용은 %d입니다', temp.key, temp.fee);
          // console.log('%s까지의 거리는 %d입니다', temp.key, temp.distance);
          // console.log('%s까지의 시간은 %d입니다', temp.key, temp.time);
          // console.log('%s까지의 루트는 %s입니다', temp.key, temp.roots);
          temp.roots = temp.roots.replace(endKey, '');
          temp.roots = temp.roots.slice(0,-2);
          curResult.push(temp.time);
          curResult.push(temp.distance);
          curResult.push(temp.fee);
          curResult.push(temp.roots);
        }
        return curResult;
      }
      temp = temp.next;
    }
  }
  
  Graph.prototype.shortest = function(startKey, endKey, target) {
    if(result != []){
      result.pop();
    }

    if(target=='distance') result.push(this.search(startKey, endKey, 'distance'));
    else if(target == 'time') result.push(this.search(startKey, endKey, 'time'));
    else if(target == 'fee') result.push(this.search(startKey, endKey, 'fee'));
    else result.push(' ');
    console.log(result);
    return result;
  };
  
  Graph.prototype.checkAddTransfer =  function(startNode, endNode){
    //console.log(startNode);
    //console.log(endNode);
    for(curStartLane of startNode){
      for(curEndLane of endNode){
        if(curStartLane == curEndLane){
         return 0;
       }
      }
    }
    return 1;
  };

//only for less transfers
///////////////////////////////////////////////
var transferEachLanes = [
  ['A',['T1', 'T2', 'T3', 'T7', 'T9']], //a
  ['B',['T2', 'T4', 'T3', 'T7', 'T8']], //b
  ['C', ['T2', 'T4', 'T5']], //c
  ['D',['T5', 'T6', 'T7']], //d
  ['E',['T6', 'T10']], //e
  ['F',['T1', 'T8']], //f
  ['G',['T8', 'T10']] //g
];


var transferLineInfo = [
['A','F'], //T1
['A','B','C'], //T2
['A','B'], //T3
['B','C'], //T4
['C','D'], //T5
['D','E'], //T6
['A','D'], //T7
['B','F','G'], //T8
['A','G'], //T9
['E','G'] // T10
];

var transNode = function(key, roots, count, lineInfo){
  this.key = key;
  this.roots = roots;
  this.count = count;
  this.lineInfo = lineInfo;
}
var transNodeCheck = [];
/////////////////////////////////////////////////////////
 
  Graph.prototype.lessTransfer = function(startKey, endKey){
    var from = this.first; var to = this.first;
    var temp; var current;
    var pathWay; var transNodes;
    var tempIndex; var count = 0;
    var qNode;
 
    for(i = 0; i<10; i++) transNodeCheck[i] = true;
    while (from) {
      //console.log(from.key);
      if (from.key === startKey) {
        break;
      }
      from = from.next;
    }

    while (to) {
      //console.log(from.key);
      if (to.key === endKey) {
        break;
      }
      to = to.next;
    }
    
    if(this.checkAddTransfer(from.lineInfo, to.lineInfo) ==0){
      return [from.key + " " + to.key, count];
    }
    temp = new transNode(from.key, from.key + " ", count, from.lineInfo);

    queue.enqueue(temp);
    while(!(queue.isEmpty())){
      current = queue.dequeue();
      count = current.count;
      pathWay = current.lineInfo;
      //현재 노드 라인에서
      for(var curNode of pathWay){
        //T노드들 찾기
        for(var lineCheck of transferEachLanes){
          if(lineCheck[0] == curNode){
            transNodes = lineCheck[1];
            //해당 라인 T노드들 중에서 목적지 라인이 연결된 노드가 있는지 확인
            for(var tNode of transNodes){     
              tempIndex = Number(tNode.substring(1)) - 1;
              if(this.checkAddTransfer(to.lineInfo,transferLineInfo[tempIndex]) == 0){
                //console.log(transferLineInfo[tempIndex]);
                //console.log(current.roots + " " + tNode +  " " + to.key + " : " + current.count);
                return [current.roots + " " + tNode +  " " + to.key, current.count + 1];
              }
              if(transNodeCheck[tempIndex]){
                qNode = new transNode(tNode, current.roots + " " + tNode + " ", count+1, transferLineInfo[tempIndex]);
                //console.log(qNode);
                queue.enqueue(qNode);
                transNodeCheck[tempIndex] = false;
              }
            }
          } 
        }
      }
    }
  };

  Graph.prototype.leastTransferSearch = function(startKey, endKey){
    var tempTransfer = this.lessTransfer(startKey,endKey);
    var temptransferRoots = tempTransfer[0];
    var transferEachRoots = [];
    var resultPaths = []; var resultInfo;
    var  totalTime = 0;
    var totalFee = 0; 
    var totalDistance = 0;
    var totalRoots = "";
    var totalTransferRoots = ""; 
    var totalTransferTimes = "";
    var totalTransferCount = tempTransfer[1];

    console.log(tempTransfer)
    transferEachRoots = temptransferRoots.split(' ');
    transferEachRoots = transferEachRoots.filter(item => {if(item != "") return item});
    console.log(transferEachRoots);

    for(var i = 1; i<transferEachRoots.length; i++){
      resultPaths.push([transferEachRoots[i-1], transferEachRoots[i]]);
    }

    for(var i = 0; i<resultPaths.length; i++){
      console.log(resultPaths[i][0] + " " + resultPaths[i][1]);
      resultInfo = this.search(resultPaths[i][0], resultPaths[i][1], 'transfer');
      totalTime += resultInfo[0];
      totalDistance +=resultInfo[1];
      totalFee += resultInfo[2];
      totalRoots += resultInfo[3];
      totalTransferRoots += resultPaths[i][0] + " ";
      if(i <resultPaths.length-1){totalTransferTimes += resultInfo[0] + " "};
    }
    totalTransferRoots = totalTransferRoots.replace(startKey, '').replace(endKey, '');
    totalRoots += endKey;

    console.log('%s까지의 환승횟수는 %d입니다', endKey, totalTransferCount);
    console.log('%s까지의 시간은 %d입니다', endKey, totalTime);
    console.log('%s까지의 거리는 %d입니다', endKey, totalDistance);
    console.log('%s까지의 비용은 %d입니다', endKey, totalFee);
    console.log('%s까지의 환승루트는 %s입니다', endKey, totalTransferRoots);
    console.log('%s까지의 환승시 시간은 %s입니다', endKey, totalTransferTimes);
    console.log('%s까지의 루트는 %s입니다', endKey, totalRoots);
    s_time[3]=totalTime;
    s_distance[3]=totalDistance;
    s_fee[3]=totalFee;
    s_transferTime[3]=totalTransferTimes;
    s_stationCount[3]=totalRoots;
    return totalRoots;
  };
