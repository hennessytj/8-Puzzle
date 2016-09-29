// Algorithm
//--------------------------------------------------------------------
// assign to node object (initBoard, 0, null) NOTE: state = board configuration
// insert node into MinPQ
// while (true)
// removeMin() from MinPQ
// insert(All neighboring states from above call to removeMin()) into
//		MinPQ
// Repeat until removeMin() node.board is goal state
// Optimization: don't insert neighbor if its board posn is same as 
//		previous state.
//
// NOTE: board = state, node = current state, heurisitic value, and 
// previous state
//
// Basic concept: Algorithm takes an initial board turns it into a node
// inserts it into a minimum priority queue called frontier.  The node
// with the highest priority is removed from the frontier and is expanded.
// Expanded means to generate all possible neighboring states.  In this case,
// the neighboring states are all possible positions the blank tile 
// can be moved to.
// 
// Dependencies: Frontier.js

// Variables with global scope
// Puzzle of size 9 is really a 3x3 board
var PuzzleSize = 9;

// Board configurations represent state
var goal = [1, 2, 3, 4, 5, 6, 7, 8, 0];
var init = [2, 4, 3, 1, 0, 6, 7, 5, 8];

var exploredStates = [];

// Search functions
// ----------------
// printBoard -> takes a board and prints it out neatly
// TODO: Make scalable to any N-Puzzle
function printBoard(board) {
	console.log(board[0] + " " + board[1] + " " + board[2]);
	console.log(board[3] + " " + board[4] + " " + board[5]);
	console.log(board[6] + " " + board[7] + " " + board[8]);
	console.log();
}

// computeHammingDistance -> takes a board configuration and determines
// the total number of tiles out of place, including zero
// Inspired by Dr. Graham CSC 447 AI
function computeHammingDistance(board) {
	var count = 0;
	for (var i = 0; i < PuzzleSize; i++) {
		if (board[i] !== goal[i]) count++;
	}
	return count;
}

// TODO: Manhattan Distance function
function computeManhattanDistance(board) {
	// Compute actual number of moves each
	// tile is out of place
}

// isGoalState -> takes board (aka state) and returns true if it is goal state otherwise false
function isGoalState(board) {
	return computeHammingDistance(board) === 0;
}

// makeNode -> takes current board configuration, hamming distance, and previous board configuration
// and stores those values into a node object
// TODO: rename hammingDist property to heuristicValue
function makeNode(currentBoard, previousBoard) {
	return newNode = {
		currBoard : currentBoard,
		prevBoard : previousBoard,
		hammingDist : computeHammingDistance(currentBoard)	
	};
}

// findTilePosition -> find tile in board
// Adapated from Dr. Graham CSC 447 AI
function findTilePosition(board, tile) {
	for (var i = 0; i < PuzzleSize; i++) {
		if (board[i] === tile) {
			return i;
		}
	}
	return -1; // Tile not found
}

// swap -> exchange two elements
// Adapated from Dr. Graham CSC 447 AI
function swap(board, i, j) {
	// Make defensive copy, aka shallow copy into new array variable
	var result = board.slice();
	result[i] = board[j];
	result[j] = board[i];
	return result;	
}

// isIdentical -> compares two boards
function isIdentical(board1, board2) {
	if (board1 === null || board2 === null) return false;
	if (board1 === undefined ||
	    board2 === undefined)				return false;
	if (board1.length !== board2.length)    return false;
	for (var i = 0; i < board1.length; i++) {
		if (board1[i] !== board2[i]) 		return false;
	}
	return true;
}

function isSolvable(board) {
	// Determine total number of inversions
	// if num of inversions is even return true
	// else return false
	// For now assume true
	return true;
}

function inExplored(board) {
	if (exploredStates.length === 0) return false;
	// If a state is matched return true
	for (var i = 0; i < exploredStates.length; i++)
		if (isIdentical(exploredStates[i], board)) return true;
	return false;
}

// expand -> take a board and generate all neighbor states (i.e., board configurations)
// Adapated from Dr. Graham CSC 447 AI
// Will attempt to move the blank tile left, right, up, and down.  If the move is
// possible it will add the integer position to an array which will be used later
// in swapping elements.  An array of neighboring board arrays is returned.
function expand(board) {
	var blank = findTilePosition(board, 0);
	var tiles = [];
	// Board is NxN, where PuzzleSize = N^2, thus N = Math.sqrt(PuzzleSize)
	var k = Math.floor(Math.sqrt(PuzzleSize));
	var result;
	// tile note found
	if (blank === -1) {
		console.log("Error: Tile not found on board");
		process.exit(0); 
	}
	// Attempt to move blank tile left
	if (blank - k >= 0) 			tiles.push(blank - k);
	// Attempt to move blank tile right
	if (blank + k <= k * k - 1) 	tiles.push(blank + k);
	// Attempt to move blank tile down
	if (Math.floor((blank - 1) / k) === Math.floor(blank / k)) tiles.push(blank - 1);
	// Attempt to move blank tile up
	if (Math.floor((blank + 1) / k) === Math.floor(blank / k)) tiles.push(blank + 1);
	// Swap the blank for each possible new board produced and return them
	result = tiles.map(function(t){return swap(board, t, blank);});
	return result;
} 

function addNeighborsToFrontier(board) {
	var neighborStates = expand(board);
	for (var i = 0; i < neighborStates.length; i++) {
		var nextNode = makeNode(neighborStates[i], board);
		frontier.insert(nextNode);
	}
}

/********************** AIMA GRAPH SEARCH PSEUDOCODE **********************
function GRAPH-SEARCH(problem) returns a solution, or failure
 initialize the frontier using the initial state of problem
 initialize the explored set to be empty
 loop do
   if the frontier is empty then return failure
   choose a leaf node and remove it from the frontier
   if the node contains a goal state then return the corresponding solution
   add the node to the explored set
   expand the chosen node, adding the resulting nodes to the frontier
    only if not in the frontier or explored set
****************************************************************************/
// bestFirstSearch -> general search algorithm adapted to BFS
// problem is the initial state (aka board configuration)
function bestFirstSearch(problem) {
	if (!isSolvable(problem)) {
		console.log("Unsolvable!");
		process.exit(0);
	}
	frontier.insert(makeNode(problem, null));
	while (!frontier.isEmpty()) {
		var node = frontier.remove();
		if (inExplored(node.currBoard)) continue;
		printBoard(node.currBoard);
		exploredStates.push(node.currBoard);
		if (isGoalState(node.currBoard)) return true;
		addNeighborsToFrontier(node.currBoard);
	}
	return false;
}

// Test BFS function
var solutionFound = bestFirstSearch(init);
console.log(solutionFound);
