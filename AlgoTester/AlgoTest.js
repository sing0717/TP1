var graph = new Graph();
graph.insertVertex('R1');
graph.insertVertex('R2');
graph.insertVertex('R3');
graph.insertVertex('R4');
graph.insertVertex('R5');
graph.insertVertex('R6');

graph.insertVertex('B1');
graph.insertVertex('B2');
graph.insertVertex('B3');


insertTwoWayArc(graph, 1, 'R1', 'R2');
insertTwoWayArc(graph, 1.2, 'R2', 'R3');
insertTwoWayArc(graph, 0.8, 'R3', 'R4');
insertTwoWayArc(graph, 2, 'R4', 'R5');
insertTwoWayArc(graph, 2.5, 'R5', 'R6');

insertTwoWayArc(graph, 0.6, 'B1', 'B2');
insertTwoWayArc(graph, 2.2, 'B2', 'R3');
insertTwoWayArc(graph, 2, 'R3', 'B3');



graph.shortest('R1', 'B3');