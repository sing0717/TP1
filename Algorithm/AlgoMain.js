var graph = new Graph();

graph.insertVertex('A1', ['A']);
graph.insertVertex('A2', ['A']);
graph.insertVertex('A3', ['A']);
graph.insertVertex('A4', ['A']);

graph.insertVertex('B1', ['B']);
graph.insertVertex('B2', ['B']);
graph.insertVertex('B3', ['B']);
graph.insertVertex('B4', ['B']); 
graph.insertVertex('B5', ['B']);
graph.insertVertex('B6', ['B']);
graph.insertVertex('B7', ['B']);
graph.insertVertex('B8', ['B']);

graph.insertVertex('C1', ['C']);
graph.insertVertex('C2', ['C']);

graph.insertVertex('D1', ['D']);
graph.insertVertex('D2', ['D']);
graph.insertVertex('D3', ['D']);

graph.insertVertex('E1', ['E']);
graph.insertVertex('E2', ['E']);
graph.insertVertex('E3', ['E']);
graph.insertVertex('E4', ['E']);

graph.insertVertex('F1', ['F']);
graph.insertVertex('F2', ['F']);
graph.insertVertex('F3', ['F']);
graph.insertVertex('F4', ['F']);
graph.insertVertex('F5', ['F']);

graph.insertVertex('G1', ['G']);
graph.insertVertex('G2', ['G']);
graph.insertVertex('G3', ['G']);
graph.insertVertex('G4', ['G']);

graph.insertVertex('T1', ['A','F']);
graph.insertVertex('T2', ['A','B','C']);
graph.insertVertex('T3', ['A','B']);
graph.insertVertex('T4', ['B','C']);
graph.insertVertex('T5', ['C','D']);
graph.insertVertex('T6', ['D','E']);
graph.insertVertex('T7', ['A','D']);
graph.insertVertex('T8', ['B','F','G']);
graph.insertVertex('T9', ['A','G']);
graph.insertVertex('T10',['E','G']);

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
insertTwoWayArc(graph, 1.9, 2, 130, 'T10', 'G3');
insertTwoWayArc(graph, 3, 3, 190, 'G3', 'G4');