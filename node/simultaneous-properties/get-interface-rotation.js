import { twoProduct } from "double-double";
import { ddAddDd as ddAddDd_ } from "double-double";
import { ddDiffDd as ddDiffDd_ } from "double-double";
import { toUnitVector } from "flo-vector2d";
const tp = twoProduct;
const ddAddDd = ddAddDd_;
const ddDiffDd = ddDiffDd_;
const { PI: 𝜋, asin, acos } = Math;
/**
 * Returns the rotation angle (-𝜋 <= θ <= 𝜋 *guaranteed*) from some vector to
 * another vector considering them to both start at the same point.
 *
 * If one of the vectors is the zero vector then `0` is returned.
 *
 * It can also be imagined that the 2nd vector starts where the 1st one ends.
 *
 * Intermediate calculations are done in double precision in a numerically
 * stable manner.
 *
 * @param a the first 2d vector given as `[x,y]` where `x` and `y` are the
 * coordinates, e.g. `[2,3]`
 * @param b the second 2d vector
 */
function getInterfaceRotation(a, b) {
    if ((a[0] === 0 && a[1] === 0) ||
        (b[0] === 0 && b[1] === 0)) {
        return 0; // zero vector
    }
    const c = toUnitVector(a);
    const d = toUnitVector(b);
    // let cross_ = c[0]*d[1] - c[1]*d[0];
    // let dot_   = c[0]*d[0] + c[1]*d[1];
    let cross_ = ddDiffDd(tp(c[0], d[1]), tp(c[1], d[0]))[1];
    let dot_ = ddAddDd(tp(c[0], d[0]), tp(c[1], d[1]))[1];
    // clip `dot_` and `cross_` to ensure `acos` and `asin` exists. (The -1 and
    // +1 might be overstepped due to inexact calculations during the calls to
    // `toUnitVector` and is not avoidable in double precision)
    if (cross_ < -1) {
        cross_ = -1;
    }
    if (cross_ > +1) {
        cross_ = +1;
    }
    if (dot_ < -1) {
        dot_ = -1;
    }
    if (dot_ > +1) {
        dot_ = +1;
    }
    // if `sgn >= 0` then the dot product is numerically more stable, else
    // the cross product is more stable...
    // const sgn = c[0]*c[1]*d[0]*d[1];
    // ...however, then `acos` and `asin` is much less stable
    const θ = dot_ >= 0
        ? cross_ >= 0
            ? dot_ <= 0.5 ? +acos(dot_) : asin(cross_) // 1st quadrant
            : dot_ <= 0.5 ? -acos(dot_) : asin(cross_) // 4th quadrant
        : cross_ >= 0
            ? dot_ >= -0.5 ? +acos(dot_) : +𝜋 - asin(cross_) // 2nd quadrant
            : dot_ >= -0.5 ? -acos(dot_) : -𝜋 - asin(cross_); // 3rd quadrant
    return θ;
}
export { getInterfaceRotation };
//# sourceMappingURL=get-interface-rotation.js.map