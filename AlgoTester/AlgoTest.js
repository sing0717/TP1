var graph = new Graph();
graph.insertVertex('R1');
graph.insertVertex('R2');
graph.insertVertex('R3');
graph.insertVertex('R4');
graph.insertVertex('R5');
graph.insertVertex('R6');
graph.insertVertex('R7');
graph.insertVertex('R8');
graph.insertVertex('R9');

graph.insertVertex('G1');
graph.insertVertex('G2');
graph.insertVertex('G3');
graph.insertVertex('G4');
graph.insertVertex('G5');

insertTwoWayArc(graph, 1, 'R1', 'R2');
insertTwoWayArc(graph, 1.2, 'R2', 'R3');
insertTwoWayArc(graph, 0.8, 'R3', 'R4');
insertTwoWayArc(graph, 2, 'R4', 'R5');
insertTwoWayArc(graph, 2.5, 'R5', 'R6');
insertTwoWayArc(graph, 2.5, 'R6', 'R7');
insertTwoWayArc(graph, 2.5, 'R7', 'R8');
insertTwoWayArc(graph, 2.5, 'R8', 'R9');

insertTwoWayArc(graph, 0.6, 'G1', 'G2');
insertTwoWayArc(graph, 2.2, 'G2', 'G3');
insertTwoWayArc(graph, 2, 'G3', 'G4');
insertTwoWayArc(graph, 2, 'G4', 'G5');

