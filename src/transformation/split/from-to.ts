import { fromTo3 as fromTo3_ } from './from-to/from-to-3.js';
import { fromTo2 as fromTo2_ } from './from-to/from-to-2.js';
import { fromTo1 as fromTo1_ } from './from-to/from-to-1.js';

const fromTo3 = fromTo3_;
const fromTo2 = fromTo2_;
const fromTo1 = fromTo1_;


/**
 * Returns a bezier curve that starts and ends at the given `t` parameters.
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 * 
 * @doc mdx
 */
 function fromTo(
        ps: number[][], 
        tS: number, 
        tE: number): number[][] {

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
        return ps;
    }

    throw new Error('The given bezier curve must be of order <= 3.');
}


export { fromTo }
