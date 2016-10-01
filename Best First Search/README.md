Best First Search is an informed search algorithm which uses an evaluation function f(n) to select
the next best node to explore.

It has two special cases: (1) Greedy and (2) A*.

(1) Greedy Best First Search uses a heuristic function h(n), such as computeManhattanDistance, for this purpose.  The heuristic function is the evaluation function for Greedy Best First Search, f(n) = h(n).

(2) In the case of A*, the evaluation function is comprised of a heuristic function and the cost of the path taken so far.  When A* is implemented using the graph search algorithm and the heuristic is consistent, A* is optimal.  