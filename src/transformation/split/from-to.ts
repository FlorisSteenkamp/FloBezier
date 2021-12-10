import { fromTo3 as fromTo3_ } from './from-to/from-to-3.js';
import { fromTo2 as fromTo2_ } from './from-to/from-to-2.js';
import { fromTo1 as fromTo1_ } from './from-to/from-to-1.js';

const fromTo3 = fromTo3_;
const fromTo2 = fromTo2_;
const fromTo1 = fromTo1_;


/**
 * Returns a bezier curve that starts and ends at the given `t` parameters 
 * including an error bound (that needs to be multiplied by `3u`, `5u` or `8u` 
 * (for lines, quadratic or cubic bezier curves respectively), 
 * where `u === Number.EPSILON/2`).
 * 
 * @param ps a bezier curve of order 0,1,2 or 3
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 * 
 * @doc
 */
 function fromTo(
        ps: number[][], 
        tS: number, 
        tE: number): { ps: number[][]; _ps: number[][]; } {

    if (ps.length === 4) {
        return fromTo3(ps, tS, tE);
    }

    if (ps.length === 3) {
        return fromTo2(ps, tS, tE);
    }

    if (ps.length === 2) {
        return fromTo1(ps, tS, tE);
    }

    if (ps.length === 1) {
        return { ps, _ps: [[0]] };
    }

    throw new Error('The given bezier curve is invalid; it must be of order 0,1,2 or 3.');
}


export { fromTo }
