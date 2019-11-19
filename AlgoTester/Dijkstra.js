//그래프 source: https://www.zerocho.com/category/Algorithm/post/584b9033580277001862f16c
var s_distance;
var s_stationCount;
var result = [];
var Graph = (function() {
    function Vertex(key) {
      this.next = null;
      this.arc = null;
      this.key = key;
      this.inTree = null;
      this.roots = " ";
    }
    function Arc(distance, time, fee, dest, capacity) {
      this.nextArc = null;
      this.destination = dest;
      this.distance = distance;
      this.time = time;
      this.fee = fee;
      this.dest = dest;
      this.capacity = capacity;
      this.inTree = null;
    }
    function Graph() {
      this.count = 0;
      this.first = null;
    }
    Graph.prototype.insertVertex = function(key) {
      var vertex = new Vertex(key);
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
    Graph.prototype.insertArc = function(distance , key, fee, fromKey, toKey, capacity) {
      var from = this.first;
      var to = this.first;
      while (from && from.key !== fromKey) {
        from = from.next;
      }
      while (to && to.key !== toKey) {
        to = to.next;
      }
      if (!from || !to) return false;
      var arc = new Arc(distance, key, fee, to, capacity);
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
    while (from) {
      //console.log(from.key);
      if (from.key === startKey) {
        break;
      }
      from = from.next;
    }
    console.log('시작점은 %s입니다', from.key);
    var temp = this.first;
    var current;
    var arc;
    while (temp) { // 모든 버텍스 최단거리를 Infinity로 초기화
      temp.time = temp.fee = temp.distance = Infinity;
      temp.visited =false;
      temp.roots = '';
      temp = temp.next;
    }
    temp = from;
    temp.time = temp.fee = temp.distance = 0;
    temp.roots = temp.key + " ";
    queue.enqueue(from);
    while (!(queue.isEmpty())) { // 반복문을 돌며 최단 값을 찾음
      current = queue.dequeue();
      arc = current.arc;
      while (arc) {
        if(target === 'distance'){
          if (arc.destination.distance > current.distance + arc.distance) {
            arc.destination.distance = current.distance + arc.distance;
            arc.destination.roots = current.roots + " " + arc.destination.key + " ";
            queue.enqueue(arc.destination);
            //console.log(arc.destination.roots);
          }
        }
        else if(target === 'time'){
          if (arc.destination.time > current.time + arc.time) {
            arc.destination.time = current.time + arc.time;
            arc.destination.roots = current.roots + " " + arc.destination.key + " ";
            queue.enqueue(arc.destination);
            //console.log(arc.destination.roots);
          }
        }
        else if(target === 'fee'){
          if (arc.destination.fee > current.fee + arc.fee) {
            arc.destination.fee = current.fee + arc.fee;            ;
            arc.destination.roots = current.roots + " " + arc.destination.key + " ";
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
          console.log('%s까지의 최단값은 %d입니다', temp.key, temp.distance);
          console.log('%s까지의 루트는 %s입니다', temp.key, temp.roots);
          s_distance=temp.distance;
          s_stationCount=temp.roots;
          curResult.push(temp.distance);
          curResult.push(temp.roots);
        }
        else if(target === 'time'){
          console.log('%s까지의 최단값은 %d입니다', temp.key, temp.time);
          console.log('%s까지의 루트는 %s입니다', temp.key, temp.roots);
          s_distance=temp.time;
          s_stationCount=temp.roots;
          curResult.push(temp.time);
          curResult.push(temp.roots);
        }
        else if(target === 'fee'){
          console.log('%s까지의 최단값은 %d입니다', temp.key, temp.fee);
          console.log('%s까지의 루트는 %s입니다', temp.key, temp.roots);
          s_distance=temp.fee;
          s_stationCount=temp.roots;
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