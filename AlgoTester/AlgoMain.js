var graph = new Graph();

graph.insertVertex('A1');
graph.insertVertex('A2');
graph.insertVertex('A3');
graph.insertVertex('A4');

graph.insertVertex('B1');
graph.insertVertex('B2');
graph.insertVertex('B3');
graph.insertVertex('B4'); 
graph.insertVertex('B5');
graph.insertVertex('B6');
graph.insertVertex('B7');
graph.insertVertex('B8');

graph.insertVertex('C1');
graph.insertVertex('C2');

graph.insertVertex('D1');
graph.insertVertex('D2');
graph.insertVertex('D3');

graph.insertVertex('E1');
graph.insertVertex('E2');
graph.insertVertex('E3');
graph.insertVertex('E4');

graph.insertVertex('F1');
graph.insertVertex('F2');
graph.insertVertex('F3');
graph.insertVertex('F4');
graph.insertVertex('F5');

graph.insertVertex('G1');
graph.insertVertex('G2');
graph.insertVertex('G3');
graph.insertVertex('G4');

graph.insertVertex('T1');
graph.insertVertex('T2');
graph.insertVertex('T3');
graph.insertVertex('T4');
graph.insertVertex('T5');
graph.insertVertex('T6');
graph.insertVertex('T7');
graph.insertVertex('T8');
graph.insertVertex('T9');
graph.insertVertex('T10');

insertTwoWayArc(graph, 2, 'A1', 'A2');
insertTwoWayArc(graph, 3, 'A2', 'T1');
insertTwoWayArc(graph, 2, 'T1', 'T2');
insertTwoWayArc(graph, 3.2, 'T2', 'A3');
insertTwoWayArc(graph, 3.3, 'A3', 'T3');
insertTwoWayArc(graph, 2.8, 'T3', 'T7');
insertTwoWayArc(graph, 2, 'T7', 'T9');
insertTwoWayArc(graph, 1, 'T9', 'A4');

insertTwoWayArc(graph, 2.7, 'B1', 'T2');
insertTwoWayArc(graph, 2.2, 'T2', 'B2');
insertTwoWayArc(graph, 2, 'B2', 'B3');
insertTwoWayArc(graph, 2.3, 'B3', 'B5');
insertTwoWayArc(graph, 1.5, 'B3', 'B4');
insertTwoWayArc(graph, 1.3, 'B4', 'T8');
insertTwoWayArc(graph, 2.5, 'B5', 'T3');
insertTwoWayArc(graph, 2.6, 'T3', 'B6');
insertTwoWayArc(graph, 3, 'B6', 'T4');
insertTwoWayArc(graph, 1, 'T4', 'B7');
insertTwoWayArc(graph, 1.5, 'B7', 'B8');
insertTwoWayArc(graph, 2, 'B8', 'B1');

insertTwoWayArc(graph, 1.7, 'T2', 'C1');
insertTwoWayArc(graph, 2, 'C1', 'C2');
insertTwoWayArc(graph, 1.5, 'C2', 'T4');
insertTwoWayArc(graph, 1, 'T4', 'T5');

insertTwoWayArc(graph, 2.6, 'D1', 'D2');
insertTwoWayArc(graph, 2, 'D2', 'T5');
insertTwoWayArc(graph, 1, 'T5', 'T6');
insertTwoWayArc(graph, 1.6, 'T6', 'D3');
insertTwoWayArc(graph, 3, 'D3', 'T7');

insertTwoWayArc(graph, 2.6, 'T6', 'E1');
insertTwoWayArc(graph, 3, 'E1', 'E2');
insertTwoWayArc(graph, 4, 'E2', 'E3');
insertTwoWayArc(graph, 3, 'E3', 'T10');
insertTwoWayArc(graph, 2, 'T10', 'E4');

insertTwoWayArc(graph, 4, 'T1', 'F1');
insertTwoWayArc(graph, 4, 'F1', 'F2');
insertTwoWayArc(graph, 2, 'F2', 'T8');
insertTwoWayArc(graph, 2.5, 'T8', 'F3');
insertTwoWayArc(graph, 2.5, 'F3', 'F4');
insertTwoWayArc(graph, 4, 'F4', 'F5');

insertTwoWayArc(graph, 2, 'G1', 'T8');
insertTwoWayArc(graph, 2.9, 'T8', 'G2');
insertTwoWayArc(graph, 2.7, 'G2', 'T9');
insertTwoWayArc(graph, 2, 'T9', 'T10');
insertTwoWayArc(graph, 2, 'T10', 'G3');
insertTwoWayArc(graph, 3, 'G3', 'G4');