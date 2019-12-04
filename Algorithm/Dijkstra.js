//그래프 source: https://www.zerocho.com/category/Algorithm/post/584b9033580277001862f16c
var s_value = [];
var s_time = [];
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
 var qqtest;
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
      temp.pathWay = temp.transferRoots = temp.roots = '';
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
      console.log(current);
      arc = current.arc;
      while (arc) {

        checkTrans = this.checkAddTransfer(current.pathWay, arc.destination.lineInfo);
        if(target === 'distance'){
          if (arc.destination.distance > current.distance + arc.distance) {
            arc.destination.time = current.time + arc.time;
            arc.destination.distance = current.distance + arc.distance;
            arc.destination.fee = current.fee + arc.fee;
            arc.destination.roots = current.roots + " " + arc.destination.key + " ";
            //if(checkTrans) console.log(current.lineInfo + " => " + arc.destination.lineInfo);
  
            arc.destination.transferRoots = checkTrans == 1 ?  current.transferRoots  +  " " + current.key + " " : current.transferRoots;
              //console.log('Start: ' + current.key + " => "+ 'End: ' + arc.destination.key);
              //console.log('beforeWay: ' + pathWay);
              tempWay = current.lineInfo;
              //console.log('beforeCurrent: ' + pathWay);
              //console.log(arc.destination.lineInfo);
              tempWay = tempWay.filter(lane => {for(check of arc.destination.lineInfo) if(lane == check) return lane});
              arc.destination.pathWay = tempWay;
              console.log('filtered: ' + tempWay);
            

            queue.enqueue(arc.destination);
          }
        }
        else if(target === 'time'){
          if (arc.destination.time > current.time + arc.time) {

            arc.destination.time = current.time + arc.time;
            arc.destination.distance = current.distance + arc.distance;
            arc.destination.fee = current.fee + arc.fee;
            arc.destination.roots = current.roots + " " + arc.destination.key + " ";
            checkTrans == 1 ? arc.destination.transferRoots = current.transferRoots  +  " " + current.key + " " : arc.destination.transferRoots = current.transferRoots;

            console.log(current.pathWay);
            tempWay = current.lineInfo;
            tempWay = tempWay.filter(lane => {for(check of arc.destination.lineInfo) if(lane == check) return lane});
            console.log(tempWay);
            arc.destination.pathWay = tempWay;
            queue.enqueue(arc.destination);
            //console.log(arc.destination.roots);
          }
        }
        else if(target === 'fee'){
          if (arc.destination.fee > current.fee + arc.fee) {
            arc.destination.time = current.time + arc.time;
            arc.destination.distance = current.distance + arc.distance;
            arc.destination.fee = current.fee + arc.fee;
            arc.destination.roots = current.roots + " " + arc.destination.key + " ";
            checkTrans == 1 ? arc.destination.transferRoots = current.transferRoots  +  " " + current.key + " " : arc.destination.transferRoots = current.transferRoots;
            tempWay = current.lineInfo;
            tempWay = tempWay.filter(lane => {for(check of arc.destination.lineInfo) if(lane == check) return lane});
            arc.destination.pathWay = tempWay;
            queue.enqueue(arc.destination);
            //console.log(arc.destination.roots);
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
          console.log('%s까지의 루트는 %s입니다', temp.key, temp.roots);
          s_value[0]=temp.distance;
          s_time[0]=temp.time;
          s_stationCount[0]=temp.roots;
          curResult.push(temp.distance);
          curResult.push(temp.roots);
        }
        else if(target === 'time'){
          console.log('%s까지의 최단시간은 %d입니다', temp.key, temp.time);
          console.log('%s까지의 거리는 %d입니다', temp.key, temp.distance);
          console.log('%s까지의 비용은 %d입니다', temp.key, temp.fee);
          console.log('%s까지의 환승루트는 %s입니다', temp.key, temp.transferRoots);
          console.log('%s까지의 루트는 %s입니다', temp.key, temp.roots);
          s_value[1]=temp.time;
          s_time[1]=temp.time;
          s_stationCount[1]=temp.roots;
          curResult.push(temp.time);
          curResult.push(temp.roots);
        }
        else if(target === 'fee'){
          console.log('%s까지의 최소비용은 %d입니다', temp.key, temp.fee);
          console.log('%s까지의 거리는 %d입니다', temp.key, temp.distance);
          console.log('%s까지의 시간은 %d입니다', temp.key, temp.time);
          console.log('%s까지의 환승루트는 %s입니다', temp.key, temp.transferRoots);
          console.log('%s까지의 루트는 %s입니다', temp.key, temp.roots);
          s_value[2]=temp.fee;
          s_time[2]=temp.time;
          s_stationCount[2]=temp.roots;
          curResult.push(temp.time);
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

  Graph.prototype.lessTransfer = function(startKey, endKey){
    var from = this.first;
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
      temp.pathWay = temp.transferRoots = temp.roots = '';
      temp = temp.next;
    }

    var current;
    var arc;
    var curTransfer;
    var tempWay; var checkTrans;

    temp = from;
    temp.transfers = 0;
    temp.roots = temp.key + " ";
    temp.pathWay = temp.lineInfo;
    queue.enqueue(temp);
    //console.log(temp);
  

    while(!(queue.isEmpty())){
      current = queue.dequeue();
      //console.log(current);

      arc = current.arc;
      while(arc){
          checkTrans = this.checkAddTransfer(current.pathWay, arc.destination.lineInfo);
          curTransfer = current.transfers + checkTrans;
          if(current.key == 'T2'  && arc.destination.key == 'B1') console.log(curTransfer);
          if(arc.destination.transfers > curTransfer){
            
            arc.destination.time = current.time + arc.time;
            arc.destination.transfers = curTransfer;
            arc.destination.roots = current.roots + " " + arc.destination.key + " ";
            //console.log(checkTrans);
            //console.log(current.key);
            checkTrans == 1 ? arc.destination.transferRoots = current.transferRoots  +  " " + current.key + " " : arc.destination.transferRoots = current.transferRoots;
            //console.log(arc.destination.transferRoots);
            //console.log(arc.destination.roots);
            tempWay = current.lineInfo;
            tempWay = tempWay.filter(lane => {for(check of arc.destination.lineInfo) if(lane == check) return lane});
            arc.destination.pathWay = tempWay;
            queue.enqueue(arc.destination);

          }
        arc = arc.nextArc;
      }
    }
    temp = this.first;
    while(temp){
      if(temp.key == endKey){
        console.log('%s까지의 최단환승수는 %d입니다', temp.key, temp.transfers);
        console.log('%s까지의 환승루트는 %s입니다', temp.key, temp.transferRoots);
        console.log('%s까지의 루트는 %s입니다', temp.key, temp.roots);
        s_value[3]=temp.transfers;
        s_time[3]=0;
        s_stationCount[3]=temp.roots;
        return temp.roots;
      }
      temp = temp.next;
    }
  };

