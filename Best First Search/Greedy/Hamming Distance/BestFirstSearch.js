// Dependencies: Frontier.js HeuristicFunctions.js

// Variables with global scope
// Puzzle of size 9 is really a 3x3 board
var PuzzleSize = 9;
var nodesGenerated = 0;

// Board configurations represent state
var goal = [1, 2, 3, 4, 5, 6, 7, 8, 0];
//var init = [2, 4, 3, 1, 0, 6, 7, 5, 8];
//var init = [4, 2, 3, 6, 0, 1, 7, 5, 8];
//var init = [0, 8, 7, 6, 5, 4, 3, 2, 1];
var init = [8, 0, 6, 7, 5, 4, 3, 1, 2];
//var init = [0, 1, 3, 4, 2, 5, 7, 8, 6];
// new
//var init = [0, 3, 1, 2, 4, 5, 7, 8, 6];
//var init = [0, 3, 1, 7, 2, 5, 4, 8, 6];
/*  
    Initial         Goal
    2 4 3           1 2 3
    1 0 6    ==>    4 5 6
    7 5 8           7 8 0
*/

var exploredStates = [];
var solution = [];

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

// isGoalState -> takes board (aka state) and returns true if it is goal state otherwise false
function isGoalState(board) {
	return computeHammingDistance(board) === 0;
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
	var inversionCount = 0;
	var n = board.length;
	for (var i = 0; i < n - 1; i++) {
		for (var j = i + 1; j < n; j++) {
			if (board[i] === 0 || board[j] === 0) continue;
			if (board[i] > board[j]) inversionCount++;
		}
	}
	// Only solvable when num of inversions is even multiple
	return (inversionCount % 2) === 0;
}

function inExplored(board) {
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


// makeNode -> takes current board configuration, hamming distance, and previous board configuration
// and stores those values into a node object
function makeNode(currentBoard, previousBoard) {
	nodesGenerated++;    // Increment global variable
	return newNode = {
		currBoard : currentBoard,
		prevBoard : previousBoard,
		heuristic : computeHammingDistance(currentBoard)	
	};
}

function addNeighborsToFrontier(board) {
	var neighborStates = expand(board);
	for (var i = 0; i < neighborStates.length; i++) {
		if (inExplored(neighborStates[i])) continue;
		if (isIdentical(board, neighborStates[i])) continue;
		var nextNode = makeNode(neighborStates[i], board);
		frontier.insert(nextNode);
	}
}

function printSolution(node) {
	var numMoves = 1;
	printBoard(node.currBoard);
	var n = node;
	while (n.prevBoard !== null) {
	    for (var i = 0; i < solution.length; i++) {
		    if (isIdentical(n.prevBoard, solution[i].currBoard)) {
			    n = solution[i];
		    }
		}
		printBoard(n.currBoard);
		numMoves++;
	}
	console.log("Path length = " + numMoves);
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
    var numNodesExplored = 0;
	if (!isSolvable(problem)) {
		console.log("Unsolvable!");
		process.exit(0);
	}
	frontier.insert(makeNode(problem, null));
	while (!frontier.isEmpty()) {
		var node = frontier.remove();
		numNodesExplored++;
		exploredStates.push(node.currBoard);
		solution.push(node);
		if (isGoalState(node.currBoard)) { 
			printSolution(node);
			console.log("Nodes expanded  = " + numNodesExplored); 
			console.log("Nodes generated = " + nodesGenerated);
			return true; 
		}
		addNeighborsToFrontier(node.currBoard);
	}
	return false;
}

// Test BFS function
bestFirstSearch(init);

