/**
 * see [Wikipedia](https://en.wikipedia.org/wiki/Heap_(data_structure))
 */
class Heap {
    constructor(compare) {
        this.compare = compare;
        this.heap = [];
    }
    insert(t) {
        const heap = this.heap;
        heap.push(t);
        // Swim up
        let i = heap.length - 1;
        while (true) {
            const parentIdx = (i - 1 - (i + 1) % 2) / 2;
            if (parentIdx === -1) {
                return;
            }
            const parent = heap[parentIdx];
            if (this.compare(t, parent) < 0) {
                break;
            }
            // Swap and update indexes and variables
            heap[parentIdx] = t;
            heap[i] = parent;
            i = parentIdx;
        }
    }
    popMax() {
        const heap = this.heap;
        const maxT = heap[0];
        heap[0] = heap[heap.length - 1];
        heap.length--;
        this.swimDown();
        return maxT;
    }
    swimDown() {
        const heap = this.heap;
        const len = heap.length;
        let i = 0;
        // Swim down
        while (true) {
            const leftIdx = 2 * i + 1;
            if (leftIdx >= len) {
                break; // there's no left or right child
            }
            const rightIdx = 2 * i + 2;
            const swapIdx = (rightIdx >= len) || (this.compare(heap[leftIdx], heap[rightIdx]) > 0)
                ? leftIdx
                : rightIdx;
            const swapChild = heap[swapIdx];
            const parent = heap[i];
            if (this.compare(parent, swapChild) > 0) {
                break;
            }
            // Swap and update indexes
            heap[swapIdx] = parent;
            heap[i] = swapChild;
            i = swapIdx;
        }
    }
    swapMax(t) {
        this.heap[0] = t;
        this.swimDown();
    }
    // prefer inlining?
    //public static getParentIdx(i: number) { return (i - 1 - (i+1)%2)/2; }
    static getLeftChild(i) { return 2 * i + 1; }
    static getRightChild(i) { return 2 * i + 2; }
}
export { Heap };
//# sourceMappingURL=heap.js.map