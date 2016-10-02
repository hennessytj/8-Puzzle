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

var stack = {
	N : 0,
	front : null,
	isEmpty : function() {return this.N === 0;},
	push : function(node) {
		if (node === null || node === undefined) {
			console.log("Error: attempt to push invalid ndoe."); 
			return;
		}
		var oldFirst = this.front;
		this.front = node;
		this.front.next = oldFirst;
		this.N++;		
	},
	pop : function() {
		if (!this.isEmpty()) {
			var value = this.front.value; // Just save value
			this.front = this.front.next; // Overwrite previous first node
			this.N--;
		 	return makeNode(value);       // Make new node with value, and next as null
		} else {
			console.log("Error: stack underflow.");
			process.exit(0);
		}
	}	
};