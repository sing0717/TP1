var graph = new Graph();
graph.insertVertex('A');
graph.insertVertex('B');
graph.insertVertex('C');
graph.insertVertex('D');
graph.insertVertex('E');
graph.insertVertex('F');
insertTwoWayArc(graph, 6, 'A', 'B');
insertTwoWayArc(graph, 3, 'A', 'C');
insertTwoWayArc(graph, 2, 'B', 'C');
insertTwoWayArc(graph, 5, 'B', 'D');
insertTwoWayArc(graph, 3, 'C', 'D');
insertTwoWayArc(graph, 4, 'C', 'E');
insertTwoWayArc(graph, 2, 'D', 'E');
insertTwoWayArc(graph, 3, 'D', 'F');
insertTwoWayArc(graph, 5, 'E', 'F');
graph.shortest('A', 'F');