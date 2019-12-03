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
      temp.transferRoots = temp.roots = '';
      temp = temp.next;
    }

    
    var current;
    var arc;
    var tempWay; var checkTrans;

    temp = from;
    temp.transfers = temp.time = temp.fee = temp.distance = 0;
    temp.roots = temp.key + " ";
    temp= from.key.substring(0,1) == 'T' ? [from, from.lineInfo] : [from, [from.key.substring(0,1)]];
    queue.enqueue(temp);

    while (!(queue.isEmpty())) { // 반복문을 돌며 최단 값을 찾음
      current = queue.dequeue();
      pathWay = current[1];
      current = current[0];

      arc = current.arc;
      while (arc) {
        checkTrans = this.checkAddTransfer(pathWay, arc.destination);
        
        if(target === 'distance'){
          if (arc.destination.distance > current.distance + arc.distance) {
            arc.destination.time = current.time + arc.time;
            arc.destination.distance = current.distance + arc.distance;
            arc.destination.roots = current.roots + " " + arc.destination.key + " ";
            checkTrans == 1 ? arc.destination.transferRoots = current.transferRoots  +  " " + current.key + " " : arc.destination.transferRoots = current.transferRoots;
            if(arc.destination.key.substring(0,1) == 'T'){
              if(current.key.substring(0,1) == 'T') pathWay = current.lineInfo;
              //console.log('beforeF: ' + pathWay);
              //console.log(arc.destination.lineInfo);
              tempWay = pathWay.filter(lane => {for(check of arc.destination.lineInfo) if(lane == check) return lane});
              //console.log('filtered: ' + tempWay);
            }
            else{
              tempWay = [arc.destination.key.substring(0,1)];
            }
            queue.enqueue([arc.destination, tempWay]);
            //console.log(arc.destination.roots);
          }
        }
        else if(target === 'time'){
          if (arc.destination.time > current.time + arc.time) {
            arc.destination.time = current.time + arc.time;
            arc.destination.roots = current.roots + " " + arc.destination.key + " ";
            checkTrans == 1 ? arc.destination.transferRoots = current.transferRoots  +  " " + current.key + " " : arc.destination.transferRoots = current.transferRoots;
            if(arc.destination.key.substring(0,1) == 'T'){
              if(current.key.substring(0,1) == 'T') pathWay = current.lineInfo;
              //console.log('beforeF: ' + pathWay);
              //console.log(arc.destination.lineInfo);
              tempWay = pathWay.filter(lane => {for(check of arc.destination.lineInfo) if(lane == check) return lane});
              //console.log('filtered: ' + tempWay);
            }
            else{
              tempWay = [arc.destination.key.substring(0,1)];
            }
            queue.enqueue([arc.destination, tempWay]);
            //console.log(arc.destination.roots);
          }
        }
        else if(target === 'fee'){
          if (arc.destination.fee > current.fee + arc.fee) {
            arc.destination.time = current.time + arc.time;
            arc.destination.fee = current.fee + arc.fee;
            arc.destination.roots = current.roots + " " + arc.destination.key + " ";
            checkTrans == 1 ? arc.destination.transferRoots = current.transferRoots  +  " " + current.key + " " : arc.destination.transferRoots = current.transferRoots;
            if(arc.destination.key.substring(0,1) == 'T'){
              if(current.key.substring(0,1) == 'T') pathWay = current.lineInfo;
              //console.log('beforeF: ' + pathWay);
              //console.log(arc.destination.lineInfo);
              tempWay = pathWay.filter(lane => {for(check of arc.destination.lineInfo) if(lane == check) return lane});
              //console.log('filtered: ' + tempWay);
            }
            else{
              tempWay = [arc.destination.key.substring(0,1)];
            }
            queue.enqueue([arc.destination, tempWay]);
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
          console.log('%s까지의 시간은 %d입니다', temp.key, temp.time);
          console.log('%s까지의 환승루트는 %s입니다', temp.key, temp.transferRoots);
          console.log('%s까지의 루트는 %s입니다', temp.key, temp.roots);
          s_value[1]=temp.time;
          s_time[1]=temp.time;
          s_stationCount[1]=temp.roots;
          curResult.push(temp.time);
          curResult.push(temp.roots);
        }
        else if(target === 'fee'){
          console.log('%s까지의 최단비용은 %d입니다', temp.key, temp.fee);
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
  
  Graph.prototype.shortest = function(startKey, endKey) {
    if(result != []){
      result.pop();result.pop();result.pop();
    }
    result.push(this.search(startKey, endKey, 'distance'));
    result.push(this.search(startKey, endKey, 'time'));
    result.push(this.search(startKey, endKey, 'fee'));
    return result;
  };
  
  Graph.prototype.checkAddTransfer =  function(startNode, endNode){
    endNode = endNode.key.substring(0,1) == 'T' ? endNode.lineInfo : [endNode.key.substring(0,1)];
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
      temp.transferRoots = temp.roots = '';
      temp = temp.next;
    }

    var current;
    var arc;
    var curTransfer;
    var tempWay; var checkTrans;

    temp = from;
    temp.transfers = 0;
    temp.roots = temp.key + " ";
    temp= from.key.substring(0,1) == 'T' ? [from, from.lineInfo] : [from, [from.key.substring(0,1)]];
    queue.enqueue(temp);
    //console.log(temp);
  

    while(!(queue.isEmpty())){
      current = queue.dequeue();
      pathWay = current[1];
      current = current[0];
      //console.log(current);

      arc = current.arc;
      while(arc){
          checkTrans = this.checkAddTransfer(pathWay, arc.destination);
          curTransfer = current.transfers + checkTrans;

          if(arc.destination.transfers > curTransfer){
            arc.destination.time = current.time + arc.time;
            arc.destination.transfers = curTransfer;
            arc.destination.roots = current.roots + " " + arc.destination.key + " ";
            //console.log(checkTrans);
            //console.log(current.key);
            checkTrans == 1 ? arc.destination.transferRoots = current.transferRoots  +  " " + current.key + " " : arc.destination.transferRoots = current.transferRoots;
            //console.log(arc.destination.transferRoots);
            //console.log(arc.destination.roots);
            if(arc.destination.key.substring(0,1) == 'T'){
              if(current.key.substring(0,1) == 'T') pathWay = current.lineInfo;
              //console.log('beforeF: ' + pathWay);
              //console.log(arc.destination.lineInfo);
              tempWay = pathWay.filter(lane => {for(check of arc.destination.lineInfo) if(lane == check) return lane});
              //console.log('filtered: ' + tempWay);
            }
            else{
              tempWay = [arc.destination.key.substring(0,1)];
            }
            queue.enqueue([arc.destination, tempWay]);

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

