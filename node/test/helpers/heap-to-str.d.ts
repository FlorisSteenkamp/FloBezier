import { Heap } from "../../src/simultaneous-properties/hausdorff-distance/heap.js";
declare function heapToStr<T>(nodeToStrFunc: (node: T) => string): (heap: Heap<T>) => string;
export { heapToStr };
