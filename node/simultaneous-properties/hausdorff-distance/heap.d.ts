/**
 * see [Wikipedia](https://en.wikipedia.org/wiki/Heap_(data_structure))
 *
 * @internal
 */
declare class Heap<T> {
    private compare;
    heap: T[];
    constructor(compare: (a: T, b: T) => number);
    insert(t: T): void;
    popMax(): T;
    private swimDown;
    swapMax(t: T): void;
    static getParentIdx(i: number): number;
    static getLeftChild(i: number): number;
    static getRightChild(i: number): number;
}
export { Heap };
