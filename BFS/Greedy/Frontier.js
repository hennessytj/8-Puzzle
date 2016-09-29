// Frontier API - Minimum Priority Queue implemented using a binary heap
// (aka heap)
//
// Method	Input	Description
// ------------------------------------------------------------------
// insert   node	node is placed into minimum priority
//					queue according to heuristic value contained
//					in node
// remove	none	returns the node with the highest priority
//
// Adapated from Algorithms 4th, Ed. minimum priority queues

// TODO: Rename hammingDist to heuristicVal
// TODO: Consider adding a clear() function to empty PQ
// nodes contain - current board, heurisitc value, and previous board
var frontier = {
	MinPQ : [],
	N : 0,
	// MinPQ starts at index 1, so when N equals 0
	// MinPQ is empty and this function returns true
	isEmpty : function() { 
		return this.N === 0; 
	},
	insert : function(value) {
		// N is index of current last element
		// increment N to add new element
		this.N++;
		// insert new element at N, N again
		// is index of current last element
        this.MinPQ[this.N] = value;
		// Ensure heap order is maintained
        this.swim(this.N);
	},
	remove : function() {
		// Underflow check
        if (this.isEmpty())
        {
            console.log("Error: cannot remove, priority queue is already empty");
            return;
        }
		// Store element with highest priority to return
        var min = this.MinPQ[1];
		// Swap the highest priorty element with the last element
		// decrement N to remove from MinPQ
        this.promote(1, this.N--);
		this.MinPQ[this.N + 1] = null;
		// Ensure heap order is maintained
        this.sink(1);
		// min is highest priority element from MinPQ
        return min;
	},
	swim : function(k) {
		// k is index of element to be sunk into proper heap order
		// Node moves up heap while parent is greater
		var child = k;
		var parent = Math.floor(k / 2);
        // check for array underflow, short circuit if child <= 1 
        while (child > 1)
        {
			// The larger the hamming distance the lower the priority
			// If the child's hamming distance is larger sub heap is heap ordered
			if (this.MinPQ[child].hammingDist > this.MinPQ[parent].hammingDist) {
				break;
			}
            // child is smaller -> promote child above parent
            this.promote(child, parent);
            // child becomes new parent, adjust index and continue
            // checking heap order
            child = parent;
            parent = Math.floor(child / 2);
		}
	},
	sink : function(k) {
		// Node moves down binary heap while it is greater than children
        var parent = k;
        var child = 2 * k;    // children are located 2 * parent and 2 * parent + 1
        while (child <= this.N)
        { 
            // condition a: short circuit if child + 1 will be out of range of N
            // condition b: ensure the swapped child is smaller of the two
            if (child < this.N && (this.MinPQ[child + 1].hammingDist < this.MinPQ[child].hammingDist)) child++;
            // make sure smallest sibling is smaller than parent before swapping
            // with parent, i.e., if child is not less than parent we are done
            if (this.MinPQ[parent].hammingDist < this.MinPQ[child].hammingDist) break;
            this.promote(child, parent);
            // extra code but intent is to make it more readable
            // if child and parent swapped, child becomes parent
            parent = child;
            child = 2 * parent;
        }
	},
	// Just a fancy name for swap
	promote : function(p, q) {
		var tmp = this.MinPQ[p];
		this.MinPQ[p] = this.MinPQ[q];
		this.MinPQ[q] = tmp;
	}
};