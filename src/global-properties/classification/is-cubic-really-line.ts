import { eSign, eDiff, scaleExpansion, twoSum } from 'big-float-ts';
import { isCollinear } from "./is-collinear.js";

// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const sce = scaleExpansion;
const ediff = eDiff;
const ts = twoSum;
const esign = eSign;


/**
 * Returns `true` if the given bezier curve has all control points collinear
 * *and* it can be converted to an order 1 bezier curve (a line) such that the 
 * same `(x,y)` point is returned for the same `t` value, `false` otherwise.
 * 
 * * **exact**: not susceptible to floating point round-off
 * 
 * @param ps a cubic bezier curve given as an array of its control
 * points, e.g. `[[1,2],[3,4],[5,6],[7,8]]`
 * 
 * @doc mdx
 */
function isCubicReallyLine(ps: number[][]) {
    // note: if cubic is really a quad then
    // x3 + 3*(x1 - x2) === x0 && 
    // y3 + 3*(y1 - y2) === y0

    if (!isCollinear(ps)) { return false; }

    const [p0,p1,p2,p3] = ps;
    const [x0,y0] = p0;
    const [x1,y1] = p1;
    const [x2,y2] = p2;
    const [x3,y3] = p3;

    // convert middle two control points to single quad point
    // [
    //   (3*(x1 + x2) - (x0 + x3)) / 4, 
    //   (3*(y1 + y2) - (y0 + y3)) / 4
    // ]
    const qx1 = ediff(
        sce(ts(x1/4, x2/4), 3),
        ts(x0/4, x3/4)
    );
    const qy1 = ediff(
        sce(ts(y1/4, y2/4), 3),
        ts(y0/4, y3/4)
    )

    // is quad really line:
    //   if (x0 + x2 === 2*x1) && (y0 + y2 === 2*y1) OR
    //   if ((x0 + x2)/2 === x1) && ((y0 + y2)/2 === y1)
    
    return (
        esign(ediff(ts(x0/2, x3/2), qx1)) === 0 &&
        esign(ediff(ts(y0/2, y3/2), qy1)) === 0
    );
}


export { isCubicReallyLine }

