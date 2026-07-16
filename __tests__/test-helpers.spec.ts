import { describe, expect, it } from '@jest/globals';
import { closeTo } from './helpers/close-to.js';
import { HH } from './helpers/hausdorff-distance-naive.js';
import { heapToStr } from './helpers/heap-to-str.js';
import { Heap } from '../src/simultaneous-properties/heap.js';
import { squares } from 'squares-rng';
import { toGrid } from './helpers/to-grid.js';
import { allTrue, subtractShewchuk } from './helpers/map.js';


const { POSITIVE_INFINITY: inf } = Number;


describe('helpers', function() {
    it('should make sure the test helpers work as intended',
    function() {
        {
            expect(inf).toBeNearly(2**4, inf);
        }
        {
            expect(inf).toBeNearly([2**4], inf);
        }
        {
            const e = 2;
            const a = { a: [1,1] };
            expect(closeTo(1)(e,a)).toEqual(false);
        }

        {
            const e = [2];
            const a = { a: [1,1] };
            expect(closeTo(1)(e,a)).toEqual(false);
        }

        {
            const e = [2];
            const a = [2,3];
            expect(closeTo(1)(e,a)).toEqual(false);
        }

        {
            const e = [[2]];
            const a = [[[8]]];
            expect(closeTo(1)(e,a)).toEqual(false);
        }

        {
            const e = { a: [1,1] };
            const a = 8;
            expect(closeTo(1)(e,a)).toEqual(false);
        }

        {
            const e = { a: [1,1] };
            const a = { a: [1,1], b: [2] };
            expect(closeTo(1)(e,a)).toEqual(false);
        }

        {
            const e = { a: [1,1] };
            const a = { a: 1 };
            expect(closeTo(1)(e,a)).toEqual(false);
        }

        {
            const e = Symbol();
            const a = { a: 1 };
            expect(closeTo(1)(e as any,a)).toEqual(false);
        }

        {
            const A = [[-1,2],[1,2]];
            const B = [[0,1],[1,0]];

            const hh = HH(A,B,0.1);
            expect(hh).toEqual(2);
        }

        {
            const heap = new Heap<number>((a,b) => a - b);

            const toStr = heapToStr<number>(v => v.toString());
            expect(toStr(heap)).toEqual('');

            const len = 10;
            for (let i=0; i<len; i++) {
                const v = squares(i)%100;
                heap.insert(v);
            }
                
            expect(toStr(heap)).toEqual('85(81(63(2)[61])[42(10)])[73(16)[30]]');
        }

        {
            expect(toGrid(1.2,2,1)).toEqual(0);
        }

        {
            expect(() => subtractShewchuk([1,2],{ a: [3,4] })).toThrow();
            expect(() => subtractShewchuk(1 as any, 3 as any)).toThrow();
        }

        {
            const r1 = allTrue({ a: [true,false] });
            expect(r1).toEqual(false);

            const r2 = allTrue({ a: [true,true] });
            expect(r2).toEqual(true);

            expect(() => allTrue([1 as any, 2 as any])).toThrow();
        }
    });
});


