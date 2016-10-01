// computeHammingDistance -> takes a board configuration and determines
// the total number of tiles out of place, including zero
// Inspired by Dr. Graham CSC 447 AI
function computeHammingDistance(board) {
	var hammingDist = 0;
	for (var i = 0; i < PuzzleSize; i++) {
		if (board[i] !== goal[i]) hammingDist++;
	}
	return hammingDist;
}

function computeManhattanDistance(board) {
	var manhattanDist = 0;
	for (var i = 0; i < PuzzleSize; i++) {
		if (board[i] === 0) continue;
		manhattanDist += numVerticalMoves(i, board, goal) +
		                 numHorizontalMoves(i, board, goal);
	}
	return manhattanDist;
}

// Finds the row number for the tile located at board[index]
function findRowNum(index) {
	var n = Math.floor(Math.sqrt(PuzzleSize));
	var row = -1;
	if (index < n)         row = 0;
	else if (index < 2*n)  row = 1;
	else                   row = 2;
	if (row === -1) console.log("Error in findRowNum()");
	return row;
}

// Takes an index and determines the row the tile resides in the current board
// and the row the tile resides in the goal state.  The absolute value of the 
// difference is the number of vertical moves.
function numVerticalMoves(index, board, goal) {
	var indexOfTileInGoalState = findTilePosition(goal, board[index]);
	var rowInGoalState = findRowNum(indexOfTileInGoalState);
	var rowInCurrentBoard = findRowNum(index);
	return Math.abs(rowInGoalState - rowInCurrentBoard);
}

// Finds the col number for the tile located at board[index]
function findColumnNum(index) {
	var n = Math.floor(Math.sqrt(PuzzleSize));
	for (var i = 0; i < n; i++) {
		if (i === index || (i + n) === index || 
		   (i + 2 * n) === index) return i;  
	}
	console.log("Error in findColumnNum()");
    return -1;	
}

function numHorizontalMoves(index, board, goal) {
	var indexOfTileInGoalState = findTilePosition(goal, board[index]);
	var colInGoalState = findColumnNum(indexOfTileInGoalState);
	var colInCurrentBoard = findColumnNum(index);
	return Math.abs(colInGoalState - colInCurrentBoard);
}