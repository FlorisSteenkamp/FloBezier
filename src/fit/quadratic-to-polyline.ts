import { evalDeCasteljau } from '../local-properties-at-t/evaluate/double/eval-de-casteljau.js';
import { splitByDeviationFromStraightLine_Quad } from '../transformation/split/split-by-deviation-from-straight-line-quad.js';

const { abs, max } = Math;


/**
 * Transforms the given quadratic bezier curve into a polyline approximation to
 * within a given tolerance and returns the result.
 * 
 * @param ps a quadratic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1]]`
 * @param tolerance defaults to `2**-10` of the maximum coordinate of the given
 * bezier curve (also if `0` is given since a polyline can't approximate a 
 * curved bezier with zero error); a tolerance given as the maximum Hausdorff 
 * distance allowed between the polyline and the bezier curve
 * 
 * @doc mdx
 */
function quadraticToPolyline(
        ps: number[][],
        tolerance?: number): number[][] {

    if (tolerance === undefined || tolerance === 0) {
        const [[x0,y0],[x1,y1],[x2,y2]] = ps;
        const maxCoordinate = max(abs(x0),abs(y0), abs(x1),abs(y1), abs(x2),abs(y2));
        tolerance = maxCoordinate * 2**-10;
    }

    const ts = splitByDeviationFromStraightLine_Quad(ps, tolerance);
    return ts.map(t => evalDeCasteljau(ps, t));
}


export { quadraticToPolyline }
