import { eDiff, eSign, twoSum } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const ediff = eDiff;
const esign = eSign;
const ts = twoSum;

const u = Number.EPSILON / 2;
const abs = Math.abs;


/**
 * Returns true if the given quadratic bezier curve is really a linear curve.
 * 
 * * the required condition is met if: `x0 + x2 = 2*x1` and `y0 + y2 = 2*y1`
 * * **exact:** for any input
 * 
 * @param ps a quadratic bezier curve
 * 
 * @doc mdx
 */
function isQuadReallyLine(ps: number[][]) {
    const [[x0,y0],[x1,y1],[x2,y2]] = ps;

    //if (x0 + x2 === 2*x1) && (y0 + y2 === 2*y1)

    // Calculate an approximation of the above with error bounds and use it as
    // a fast filter.
    const q = x0 + x2;
    const _q_ = abs(q);  // the absolute error bound in q (after multipliciation by `u`)
    const w = q - 2*x1;
    const w_ = _q_ + abs(w);  // the absolute error bound in w

    // if w cannot possibly be zero, i.e. if the error is smaller than the value
    if (abs(w) - w_ > 0) {
        // fast filter passed
        return false;
    }

    const r = y0 + y2;
    const _r_ = abs(r);  // the absolute error bound in r (after multipliciation by `u`)
    const z = r - 2*y1;
    const z_ = _r_ + abs(z);  // the absolute error bound in w
    

    // if the error is smaller than the value
    if (abs(z) - z_ > 0) {
        // fast filter passed
        return false;
    }

    // unable to filter - go slow and exact

    return (
        esign(ediff(ts(x0, x2), [2*x1])) === 0 &&
        esign(ediff(ts(y0, y2), [2*y1])) === 0
    );
}


export { isQuadReallyLine }
