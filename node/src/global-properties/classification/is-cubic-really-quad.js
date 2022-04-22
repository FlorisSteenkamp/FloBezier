import { twoProduct, eDiff, fastExpansionSum, eSign } from "big-float-ts";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const tp = twoProduct;
const fes = fastExpansionSum;
const esign = eSign;
const ediff = eDiff;
const u = Number.EPSILON / 2;
const abs = Math.abs;
/**
 * Returns true if the given cubic bezier curve is really a quadratic (or
 * lower order) curve.
 *
 * * **exact:** for any bitlength of the coefficients
 *
 * @param ps a cubic bezier curve
 *
 * @doc mdx
 */
function isCubicReallyQuad(ps) {
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    // The line below is unrolled (uses a toHybridQuadratic condition (points same?))
    //if ((x3 + 3*x1) - (x0 + 3*x2) === 0 && 
    //    (y3 + 3*y1) - (y0 + 3*y2) === 0) {
    // Calculate an approximation of the above with error bounds and use it as
    // a fast filter.
    const u1 = 3 * x1;
    const u1_ = abs(3 * x1); // the absolute error in u1
    const u2 = x3 + u1;
    const u2_ = u1_ + abs(u2); // the absolute error in u2
    const v1 = 3 * x2;
    const v1_ = abs(3 * x2); // the absolute error in v1
    const v2 = x0 + v1;
    const v2_ = v1_ + abs(v2); // the absolute error in v2
    const w = u2 - v2;
    const w_ = u2_ + v2_ + abs(w); // the absolute error in w
    // if w cannot possibly be zero, i.e. if the error is smaller than the value
    if (abs(w) - u * w_ > 0) {
        // fast filter 1 passed
        return false;
    }
    const q1 = 3 * y1;
    const q1_ = abs(3 * y1); // the absolute error in q1
    const q2 = y3 + q1;
    const q2_ = q1_ + abs(q2); // the absolute error in q2
    const r1 = 3 * y2;
    const r1_ = abs(3 * y2); // the absolute error in r1
    const r2 = y0 + r1;
    const r2_ = r1_ + abs(r2); // the absolute error in r2
    const s = q2 - r2;
    const s_ = q2_ + r2_ + abs(s); // the absolute error in s
    if (abs(s) - u * s_ > 0) {
        // fast filter 2 passed
        return false;
    }
    // unable to filter - go slow and exact
    return (esign(ediff(fes([x3], tp(3, x1)), fes([x0], tp(3, x2)))) === 0 &&
        esign(ediff(fes([y3], tp(3, y1)), fes([y0], tp(3, y2)))) === 0);
}
export { isCubicReallyQuad };
//# sourceMappingURL=is-cubic-really-quad.js.map