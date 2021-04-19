import { operators } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const { twoProduct, eDiff, fastExpansionSum, eSign } = operators;

const u = Number.EPSILON / 2;
const abs = Math.abs;


/**
 * Returns true if the given bezier curve is really a quadratic curve.
 * 
 * * **exact:** for any bitlength of the coefficients
 * 
 * @param ps a cubic bezier curve
 * 
 * @doc
 */
function isCubicReallyQuad(ps: number[][]) {
    let [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps;

    // the if in the line below is unrolled
    //if ((x3 + 3*x1) - (x0 + 3*x2) === 0 && 
    //    (y3 + 3*y1) - (y0 + 3*y2) === 0) {

    // Calculate an approximation of the above with error bounds and use it as
    // a fast filter.
    let u1 = 3*x1;
    let u1_ = abs(3*x1);  // the absolute error in u1
    let u2 = x3 + u1;
    let u2_ = u1_ + abs(u2);  // the absolute error in u2
    let v1 = 3*x2;
    let v1_ = abs(3*x2);  // the absolute error in v1
    let v2 = x0 + v1;
    let v2_ = v1_ + abs(v2);  // the absolute error in v2
    let w = u2 - v2;
    let w_ = u*(u2_ + v2_ + abs(w));  // the absolute error in w

    // if w cannot possibly be zero, i.e. if the error is smaller than the value
    if (abs(w) - w_ > 0) {
        //console.log('fast filtered 1');
        return false;
    }

    let q1 = 3*y1;
    let q1_ = abs(3*y1);  // the absolute error in q1
    let q2 = y3 + q1;
    let q2_ = q1_ + abs(q2);  // the absolute error in q2
    let r1 = 3*y2;
    let r1_ = abs(3*y2);  // the absolute error in r1
    let r2 = y0 + r1;
    let r2_ = r1_ + abs(r2);  // the absolute error in r2
    let s = q2 - r2;
    let s_ = u*(q2_ + r2_ + abs(s));  // the absolute error in s

    if (abs(s) - s_ > 0) {
        //console.log('fast filtered 2');
        return false;
    }

    //console.log('unable to filter - go slow and exact')

    return (
        eSign(eDiff(
            fastExpansionSum([x3], twoProduct(3,x1)),
            fastExpansionSum([x0], twoProduct(3,x2))
        )) === 0 &&
        eSign(eDiff(
            fastExpansionSum([y3], twoProduct(3,y1)),
            fastExpansionSum([y0], twoProduct(3,y2))
        )) === 0
    );
}


export { isCubicReallyQuad }
