import { Heap } from "../../src/simultaneous-properties/hausdorff-distance/heap.js";


function heapToStr<T>(nodeToStrFunc: (node: T) => string) {
    return (heap: Heap<T>): string => {

        if (heap.heap.length === 0) { return ''; }

        let heapStr = '';
        f(0);

        return heapStr;

        function f(nodeIdx: number | undefined): void {
            //if (nodeIdx === undefined) { 
            //    return; 
            //}

            heapStr += nodeToStrFunc(heap.heap[nodeIdx]);

            const leftIdx = Heap.getLeftChild(nodeIdx);
            const rightIdx = Heap.getRightChild(nodeIdx);
            const left = heap.heap[leftIdx];
            const right = heap.heap[rightIdx];
            // if leaf node, then return
            if (left === undefined && right === undefined) {
                return;
            }

            // left subtree
            if (left !== undefined) {
                heapStr += '(';
                f(leftIdx);
                heapStr += ')';
            }

            // right subtree
            if (right !== undefined) {
                heapStr += '[';
                f(rightIdx);
                heapStr += ']';
            }
        }
    }
}


export { heapToStr }