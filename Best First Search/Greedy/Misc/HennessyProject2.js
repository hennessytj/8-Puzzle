// 8-puzzle by Timothy Hennessy
// www.cs.princeton.edu/courses/archive/spr10/cos226/assignments/8puzzle

// node consists of three elements:
//		1. board posn (current config aka state)
//		2. hamming distance (in addition use this for A* - num of moves to reach board posn)
//		3. previous state
// 		E.g., initial node->(initialBoard, 0, null)->MinPQ

// Goals for implementing:
//		-Best first Search - don't consider number of moves in priority, just heuristic
//		-A* - moves made so far + h(n) for priority
//		-Implement and compare each heurisitic:
//			-hamming distance as h1(n)
//			-manhattan distance as h2(n)

// How priority is determined:
//		h1(n) or h2(n) and moves made so far

