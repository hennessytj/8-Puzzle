var frontier = {
	N : 0,
	front : null,
	isEmpty : function() {return this.N === 0;},
	push : function(node) {
		if (node === null || node === undefined) {
			console.log("Error: attempt to push invalid node."); 
			return;
		}
		var oldFirst = this.front;
		this.front = node;
		this.front.next = oldFirst;
		this.N++;		
	},
	pop : function() {
		if (!this.isEmpty()) {
			var currentBoard = this.front.currBoard;      // Just save value
			var previousBoard = this.front.prevBoard;
			this.front = this.front.next;                 // Overwrite previous first node
			this.N--;
		 	return makeNode(currentBoard, previousBoard); // Make new node with value, and next as null
		} else {
			console.log("Error: stack underflow.");
			process.exit(0);
		}
	}	
};