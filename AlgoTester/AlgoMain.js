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

insertTwoWayArc(graph, 2, 2, 100, 'A1', 'A2');
insertTwoWayArc(graph, 2.6, 3, 130, 'A2', 'T1');
insertTwoWayArc(graph, 1.8, 2, 90, 'T1', 'T2');
insertTwoWayArc(graph, 3.2, 3.2, 150, 'T2', 'A3');
insertTwoWayArc(graph, 2.5, 3.3, 160, 'A3', 'T3');
insertTwoWayArc(graph, 3, 2.8, 120, 'T3', 'T7');
insertTwoWayArc(graph, 1.7, 2, 100, 'T7', 'T9');
insertTwoWayArc(graph, 1.3, 1, 60, 'T9', 'A4');

insertTwoWayArc(graph, 2.5, 2.7, 70, 'B1', 'T2');
insertTwoWayArc(graph, 2.3, 2.2, 60, 'T2', 'B2');
insertTwoWayArc(graph, 2.2, 2, 50, 'B2', 'B3');
insertTwoWayArc(graph, 2.5, 2.3, 70, 'B3', 'B5');
insertTwoWayArc(graph, 1.6, 1.5, 50, 'B3', 'B4');
insertTwoWayArc(graph, 1.5, 1.3, 40, 'B4', 'T8');
insertTwoWayArc(graph, 2.8, 2.5, 70, 'B5', 'T3');
insertTwoWayArc(graph, 2.9, 2.6, 90, 'T3', 'B6');
insertTwoWayArc(graph, 3, 3, 100, 'B6', 'T4');
insertTwoWayArc(graph, 1.4, 1, 40, 'T4', 'B7');
insertTwoWayArc(graph, 1.2, 1.5, 40, 'B7', 'B8');
insertTwoWayArc(graph, 2, 2, 60, 'B8', 'B1');

insertTwoWayArc(graph, 4, 1.7, 210, 'T2', 'C1');
insertTwoWayArc(graph, 4.2, 2, 220, 'C1', 'C2');
insertTwoWayArc(graph, 3.6, 1.5, 200, 'C2', 'T4');
insertTwoWayArc(graph, 3.3, 1, 200, 'T4', 'T5');

insertTwoWayArc(graph, 3, 2.6, 120, 'D1', 'D2');
insertTwoWayArc(graph, 2, 2, 90, 'D2', 'T5');
insertTwoWayArc(graph, 1.4, 1, 80, 'T5', 'T6');
insertTwoWayArc(graph, 2, 1.6, 100, 'T6', 'D3');
insertTwoWayArc(graph, 2.6, 3, 150, 'D3', 'T7');

insertTwoWayArc(graph, 3, 2.6, 120, 'T6', 'E1');
insertTwoWayArc(graph, 3.4, 3, 130, 'E1', 'E2');
insertTwoWayArc(graph, 3.5, 4, 150, 'E2', 'E3');
insertTwoWayArc(graph, 3, 3, 120, 'E3', 'T10');
insertTwoWayArc(graph, 3, 3, 120, 'T10', 'E4');

insertTwoWayArc(graph, 4, 4, 150, 'T1', 'F1');
insertTwoWayArc(graph, 3.7, 4, 140, 'F1', 'F2');
insertTwoWayArc(graph, 2, 2, 100, 'F2', 'T8');
insertTwoWayArc(graph, 3, 2.5, 120, 'T8', 'F3');
insertTwoWayArc(graph, 2.9, 2.5, 120, 'F3', 'F4');
insertTwoWayArc(graph, 4.2, 4, 160, 'F4', 'F5');

insertTwoWayArc(graph, 2.3, 2, 150, 'G1', 'T8');
insertTwoWayArc(graph, 3.7, 2.9, 220, 'T8', 'G2');
insertTwoWayArc(graph, 3.8, 2.7, 210, 'G2', 'T9');
insertTwoWayArc(graph, 2, 2, 160, 'T9', 'T10');
insertTwoWayArc(graph, 190, 2, 130, 'T10', 'G3');
insertTwoWayArc(graph, 3, 3, 190, 'G3', 'G4');