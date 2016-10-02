function makeNode(value) {
	if (value === null || value === undefined) {
		console.log("Error: cannot make node."); 
		return;
	}
	return newNode = {
		value : value,
		next  : null
	};
}

var queue = {
	N : 0,
	front : null,
	back  : null,
	isEmpty : function() {return this.N === 0;},
	enqueue : function(node) {
		if (node === null || node === undefined) {
			console.log("Error: attempt to enqueue invalid ndoe."); 
			return;
		}
		var oldFirst = this.front;
		this.front = node;
		this.front.next = oldFirst;
		this.N++;		
	},
	dequeue : function() {
		if (!this.isEmpty()) {
			var value = this.front.value; // Just save value
			this.front = this.front.next; // Overwrite previous first node
			this.N--;
		 	return makeNode(value);       // Make new node with value, and next as null
		} else {
			console.log("Error: queue underflow.");
			process.exit(0);
		}
	}
	
};