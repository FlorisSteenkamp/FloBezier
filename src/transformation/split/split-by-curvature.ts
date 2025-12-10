import { curviness } from '../../global-properties/curviness.js';
import { fromTo } from './from-to.js';


/**
 * Split the order 0,1,2 or 3 bezier curve into pieces (given as an array of 
 * parameter `t` values) such that each piece is flat within a given tolerance 
 * given by the `curviness` function.
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param maxCurviness optional; defaults to `0.4 radians`; maximum curviness
 * (must be > 0) as calculated using 
 * the `curviness` function (which measures the total angle in radians formed 
 * by the vectors formed by the ordered control points)
 * @param minTSpan optional; defaults to `2**-16`; the minimum `t` span that 
 * can be returned for a bezier piece; necessary for cubics otherwise a curve
 * with a cusp would cause an infinite loop
 * 
 * @doc mdx
 */
 function splitByCurvature(
        ps: number[][], 
        maxCurviness = 0.4,
        minTSpan = 2**-16): number[] {

    const tsS = [0];
    const tsE = [1];
    while (true) {
        const tS = tsS[tsS.length - 1];
        const tE = tsE[tsE.length - 1];
        const ps_ = fromTo(ps, tS, tE);
        const c = curviness(ps_);
        if ((c <= maxCurviness) || tE - tS <= minTSpan) {
            tsS.push(tsE.pop()!);
            if (tE === 1) { return tsS; }
            continue;
        }

        const t = (tS + tE)/2;

        tsE.push(t);
    }
}


export { splitByCurvature }
