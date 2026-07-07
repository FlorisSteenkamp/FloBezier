import { describe, expect, it } from '@jest/globals';
import { distanceBetween } from 'flo-vector2d';
import { getRandomBezier } from '../../helpers/get-random-bezier.js';
import { evalDeCasteljau, length, totalLength } from '../../../src/index.js';


function approxLengthByLineSegs(
        ps: number[][], 
        pieceCount: number) {

    let total = 0;
    let prevP = ps[0];
    for (let i=0; i<pieceCount; i++) {
        const t = (i+1)/pieceCount;
        const p = evalDeCasteljau(ps, t);
        const l = distanceBetween(prevP, p);
        prevP = p;
        total += l;
    }

    return total;
}


describe('length', function() {
    it('it should return a reasonable approximate length (between two `t` values) of some cubic bezier curves', 
    function() {
        const count = 15;
        const getRandomBezier_ = getRandomBezier(128,53);
        for (let order=0; order<=3; order++) {
            for (let i=0; i<count; i++) {
                const ps = getRandomBezier_(order as 0|1|2|3)(i);

                const l1 = length([0,0.3], ps, 1.01, 64);
                const l2 = length([0.3,1], ps, 1.01, 64);
                const l = l1 + l2;

                const tl = totalLength(ps);

                const ll = approxLengthByLineSegs(ps, 2**6);

                expect(tl).toBeNearly(2**4, l);
                expect(ll).toBeNearly(2**40, l);
            }
        }

        {
            expect(length([0,1],[[1,1],[1,1]])).toEqual(0);
            expect(length([0,1],[[1,1],[1,1],[1,1]])).toEqual(0);
            expect(length([0,1],[[1,1],[1,1],[1,1],[1,1]])).toEqual(0);
            const p = [2,3];
            expect(() => length([0,1],[p,p,p,p,p,p])).toThrow();

            expect(() => totalLength([p,p,p,p,p,p])).toThrow();
        }
    });
});
