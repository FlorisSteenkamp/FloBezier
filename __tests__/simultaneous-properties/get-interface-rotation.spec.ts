import { describe, expect, it } from '@jest/globals';
import { fromTo as fromToVect } from 'flo-vector2d';
import { getInterfaceRotation } from '../../src/index.js';
import { getRandomCubic, getRandomQuad } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';


const { abs, PI: 𝜋 } = Math;


function getRotationAround(ps: number[][]) {
    let total = 0;
    for (let i=0; i<ps.length; i++) {
        const pa = ps[i];
        const pb = ps[(i+1)%ps.length];
        const pc = ps[(i+2)%ps.length];
        const v1 = fromToVect(pa,pb);
        const v2 = fromToVect(pb,pc);
        const r = getInterfaceRotation(v1,v2);
        total += r;
    }

    return total;
}


describe('getInterfaceRotation', function() {
    it('it should correctly return the rotation difference between some vectors',
    function() {
        for (let seed=0; seed<5; seed++) {
            const ps = getRandomQuad(seed);  // representing a triangle
            const r = getRotationAround(ps);
            expect(abs(r)).toBeNearly(2**4, 2*𝜋);
        }

        for (let seed=0; seed<5; seed++) {
            const ps = [...getRandomCubic(seed), ...getRandomCubic(seed)];
            const ps_ = randomRotateAndTranslate(seed)(ps);

            const r = getRotationAround(ps);
            const r_ = getRotationAround(ps_);
            
            expect(r).toBeNearly([2**6], r_);
        }

        // some edge cases
        {
            const v1 = [0,0];
            const v2 = [2,2];
            expect(getInterfaceRotation(v1,v2)).toEqual(0);
            expect(getInterfaceRotation(v2,v1)).toEqual(0);
        }
    });
});
