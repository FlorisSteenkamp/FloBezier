import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { clone, fromPowerBasis } from '../src/index.js';
import { nearly } from './helpers/chai-extend-nearly.js';
import { getRandomBezier, getRandomCubic } from './helpers/get-random-bezier.js';
import { closeTo } from './helpers/close-to.js';
import { HH } from './helpers/hausdorff-distance-naive.js';
import { heapToStr } from './helpers/heap-to-str.js';
import { Heap } from '../src/simultaneous-properties/hausdorff-distance/heap.js';
import { squares } from 'squares-rng';
import { toGrid } from './helpers/to-grid.js';
import { allTrue, map, subtractShewchuk } from './helpers/map.js';

use(nearly);
const { POSITIVE_INFINITY: inf } = Number;


describe('helpers', function() {
	it('should make sure the test helpers work as intended',
	function() {
        {
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(inf).to.be.nearly(2**4, inf);
        }
        {
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(inf).to.be.nearly([2**4], inf);
        }
		{
            const e = 2;
            const a = { a: [1,1] };
            expect(closeTo(1)(e,a)).to.be.false;
        }

        {
            const e = [2];
            const a = { a: [1,1] };
            expect(closeTo(1)(e,a)).to.be.false;
        }

        {
            const e = [2];
            const a = [2,3];
            expect(closeTo(1)(e,a)).to.be.false;
        }

        {
            const e = [[2]];
            const a = [[[8]]];
            expect(closeTo(1)(e,a)).to.be.false;
        }

        {
            const e = { a: [1,1] };
            const a = 8;
            expect(closeTo(1)(e,a)).to.be.false;
        }

        {
            const e = { a: [1,1] };
            const a = { a: [1,1], b: [2] };
            expect(closeTo(1)(e,a)).to.be.false;
        }

        {
            const e = { a: [1,1] };
            const a = { a: 1 };
            expect(closeTo(1)(e,a)).to.be.false;
        }

        {
            const e = Symbol();
            const a = { a: 1 };
            expect(closeTo(1)(e as any,a)).to.be.false;
        }

        {
            const A = [[-1,2],[1,2]];
			const B = [[0,1],[1,0]];

            const hh = HH(A,B,0.1);
            expect(hh).to.eql(2);
        }

        {
            const heap = new Heap<number>((a,b) => a - b);

            const toStr = heapToStr<number>(v => v.toString());
            expect(toStr(heap)).to.eql('');

			const len = 10;
			for (let i=0; i<len; i++) {
				const v = squares(i)%100;
				heap.insert(v);
			}
				
            expect(toStr(heap)).to.eql('85(81(63(2)[61])[42(10)])[73(16)[30]]');
        }

        {
            expect(toGrid(1.2,2,1)).to.eql(0);
        }

        {
            expect(() => subtractShewchuk([1,2],{ a: [3,4] })).to.throw();
            expect(() => subtractShewchuk(1 as any, 3  as any)).to.throw();
        }

        {
            const r1 = allTrue({ a: [true,false] });
            expect(r1).to.be.false;

            const r2 = allTrue({ a: [true,true] });
            expect(r2).to.be.true;

            expect(() => allTrue([1 as any, 2 as any])).to.throw();
        }
	});
});


