
// Testing - make sure to load Frontier.js before loading BestFirstSearch.js
/*
var node = makeNode(init, null);
frontier.insert(node);
var node = makeNode(goal, init);
frontier.insert(node);
isGoalState(init);
isGoalState(goal);

// test printBoard
printBoard(goal);
printBoard(init);

// test swap
printBoard(swap(init, 0, 1));
printBoard(swap(init, 3, 4));

// test findTilePosition
printBoard(goal);
findTilePosition(goal, 1);
findTilePosition(goal, 0);
findTilePosition(goal, 9); // problem here!

// test expand function
var children = expand(init);
printBoard(init);
for (var i = 0; i < children.length; i++) {
	printBoard(children[i]);
	console.log();
}

children = expand(goal);
printBoard(goal);
for (var i = 0; i < children.length; i++) {
	printBoard(children[i]);
	console.log();
}

var b = [1,2,3,4,0,5,6,7,8];
children = expand(b);
printBoard(b);
for (var i = 0; i < children.length; i++) {
	printBoard(children[i]);
	console.log();
}

var b = [1,2,3,4,4,5,6,7,8]; // problem here!
children = expand(b);
printBoard(b);
for (var i = 0; i < children.length; i++) {
	printBoard(children[i]);
	console.log();
}

// Test inExplored
exploredStates.push([1,2,3,4,5,6,7,8,0]);
exploredStates.push([1,2,3,4,5,6,7,0,8]);
exploredStates.push([1,2,3,4,5,6,8,7,0]);
exploredStates.push([1,2,3,4,6,5,7,8,0]);
exploredStates.push([1,2,3,5,4,6,7,8,0]);
var boolRes = inExplored([1,2,3,4,5,6,7,8,0]);
console.log(boolRes);
boolRes = inExplored([2,1,3,4,5,6,7,8,0]);
console.log(boolRes);

// Test isSolvable
console.log(isSolvable([2,1,3,4,5,6,7,8,0]));
*/