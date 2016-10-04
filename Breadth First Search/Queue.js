var frontier = {
	N : 0,
	front : null,
	back  : null,
	isEmpty : function() {return this.N === 0;},
	enqueue : function(node) {
		if (node === null || node === undefined) {
			console.log("Error: attempt to enqueue invalid node."); 
			return;
		}
		if (this.front === null) {
			this.front = node;
			this.back = this.front;
		}
		else {
			var prevLastNode = this.back;
			prevLastNode.next = node;
			this.back = node;
		}
		this.N++;		
	},
	dequeue : function() {
		if (!this.isEmpty()) {
			var currentBoard = this.front.currBoard;       // Just save value
			var previousBoard = this.front.prevBoard;
			this.front = this.front.next;                  // Overwrite previous first node
			this.N--;
			if (this.front == null) {
				this.back = null;
			}
		 	return makeNode(currentBoard, previousBoard);  // Make new node with value, and next as null
		} else {
			console.log("Error: queue underflow.");
			process.exit(0);
		}
	}
	
};