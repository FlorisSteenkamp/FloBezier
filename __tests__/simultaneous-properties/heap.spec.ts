import { describe, expect, it } from '@jest/globals';
import { Heap } from '../../src/simultaneous-properties/heap.js';


describe('Heap', function() {
    it('should pop elements in order of the compare function', function() {
        let s = 39;
        const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };

        const heap = new Heap<number>((a, b) => a - b);
        const xs = Array.from({ length: 200 }, () => Math.floor(rnd()*50));
        for (const x of xs) { heap.insert(x); }

        const popped: number[] = [];
        while (heap.heap.length > 0) { popped.push(heap.popMax()!); }

        expect(popped).toEqual(xs.slice().sort((a, b) => b - a));
    });

    it('should return `undefined` when popping an empty heap (and remain empty)', function() {
        const heap = new Heap<number>((a, b) => a - b);
        expect(heap.popMax()).toBeUndefined();
        expect(heap.heap.length).toEqual(0);

        heap.insert(1);
        expect(heap.popMax()).toEqual(1);
        expect(heap.popMax()).toBeUndefined();
        expect(heap.heap.length).toEqual(0);
    });
});
