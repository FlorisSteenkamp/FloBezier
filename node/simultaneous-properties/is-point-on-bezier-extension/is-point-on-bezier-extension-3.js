import { getImplicitForm3 } from "../../implicit-form/double/get-implicit-form3.js";
import { getImplicitForm3ErrorCounters } from "../../implicit-form/get-error-counters/get-implicit-form3-error-counters.js";
import { getImplicitForm3DdWithRunningError } from "../../implicit-form/double-double/get-implicit-form3-dd-with-running-error.js";
import { getImplicitForm3Exact } from "../../implicit-form/exact/get-implicit-form3-exact.js";
import { γ, γγ } from '../../error-analysis/error-analysis.js';
// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
import { ddMultDd, ddAddDd } from "double-double";
import { expansionProduct, fastExpansionSum, eSign, eEstimate, eToDd } from 'big-float-ts';
const qmq = ddMultDd;
const qaq = ddAddDd;
const epr = expansionProduct;
const fes = fastExpansionSum;
const sign = eSign;
const estimate = eEstimate;
const etodd = eToDd;
const abs = Math.abs;
const γ1 = γ(1);
const γγ3 = γγ(3);
/**
 * Returns `true` if the given point is on the given cubic bezier curve where
 * the parameter, `t`, is allowed to extend to `±∞`, i.e. if `t ∈ (-∞, +∞)`,
 * `false` otherwise.
 *
 * @param ps a cubic bezier curve
 * @param p a point with coordinates given as [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * expansions; if only double precision coordinates need to be provided then
 * wrap them in a one element array, e.g. for a point with `x` and `y` coordinates
 * of `1` and `2` set `p === [[1],[2]]`.
 *
 * @internal
 */
function isPointOnBezierExtension3(ps, p) {
    const [xe, ye] = p;
    const lenX = xe.length;
    const lenY = ye.length;
    const x = xe[lenX - 1]; // get higest order double
    const y = ye[lenY - 1]; // ...
    const isDouble = (lenX === 1 && lenY === 1);
    //---- first pre-filter
    {
        // The below takes about 1.2 micro-seconds on a 1st gen i7 and Chrome 79
        const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = getImplicitForm3(ps);
        const { vₓₓₓ_, // <11>
        vₓₓᵧ_, // <12>
        vₓᵧᵧ_, // <12>
        vᵧᵧᵧ_, // <11>
        vₓₓ_, // <19>
        vₓᵧ_, // <18>
        vᵧᵧ_, // <19>
        vₓ_, // <22>
        vᵧ_, // <22>
        v_ // <24>
         } = getImplicitForm3ErrorCounters(ps);
        // In the below a a postfix underscore means 
        // an error bound (>= absolute value)
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // const h =
        //   vₓₓₓ*x*x*x + vₓₓᵧ*x*x*y + vₓᵧᵧ*x*y*y + vᵧᵧᵧ*y*y*y + 
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;
        // group the terms to reduce error, e.g. v usually has the highest bitlength
        // const h = 
        //    (
        //        ((vₓₓₓxxx + vₓₓᵧxxy) + (vₓᵧᵧxyy + vᵧᵧᵧyyy)) + 
        //        (vₓₓxx + vₓᵧxy + vᵧᵧyy)
        //    ) + 
        //    (
        //        (vₓx + vᵧy) + 
        //        v
        //    );
        const xx = x * x;
        const yy = y * y;
        const h = (((vₓₓₓ * (xx * x) + vₓₓᵧ * (xx * y)) +
            (vₓᵧᵧ * (x * yy) + vᵧᵧᵧ * (yy * y))) +
            ((vₓₓ * xx + vₓᵧ * (x * y)) + vᵧᵧ * yy)) +
            ((vₓ * x + vᵧ * y) +
                v);
        //-------------------
        // Error calculation
        //-------------------
        // In the below, if x is given as a double then the error counter on
        // x would be 0, i.e. <0>x, else it would be <1>x. We represent the
        // error counter with a <D> so that for a point with double precion 
        // coordinates we have <D> = <0> else <D> = <1>. Same is true for y.
        // `0` if we have only double precision coordinates, `1` otherwise
        const D = isDouble ? 0 : 1;
        const x_ = abs(x); // <D>x
        const y_ = abs(y); // <D>y
        const xx_ = x_ * x_; // <2D+1>xx
        const xy_ = x_ * y_; // <2D+1>xy
        const yy_ = y_ * y_; // <2D+1>yy
        // <D+26>h <-- <D+26>(<2D+24>(<3D+17>(<3D+16> + <3D+16>) + <2D+23>) + <D+25>(<D+24> + <24>))
        const h_ = (
        // <3D+16> <-- <3D+16>((<3D+14>(<11>vₓₓₓ*<3D+2>(xx*x)) + <3D+15>(<12>vₓₓᵧ*<3D+2>(xx*y)))) +
        (vₓₓₓ_ * (xx_ * x_) + vₓₓᵧ_ * (xx_ * y_)) +
            // <3D+16> <-- <3D+16>((<3D+15>(<12>vₓᵧᵧ*<3D+2>(x*yy)) + <3D+14>(<11>vᵧᵧᵧ*<3D+2>(yy*y)))) +
            (vₓᵧᵧ_ * (x_ * yy_) + vᵧᵧᵧ_ * (yy_ * y_)) +
            // <2D+23> <-- <2D+23>(<2D+22>(<2D+21>(<19>vₓₓ*<2D+1>xx) + <2D+20>(<18>vₓᵧ*<2D+1>(x*y))) + <2D+20>(<18>vᵧᵧ*<2D+1>yy))
            ((vₓₓ_ * xx_ + vₓᵧ_ * (xy_)) + vᵧᵧ_ * yy_)) +
            (
            // <24> <-- <D+24>(<D+23>(<22>vₓ*<D>x) + <D+23>(<22>vᵧ*<D>y))
            (vₓ_ * x_ + vᵧ_ * y_) +
                // <24>
                v_);
        // if the error is not too high too discern `h` away from zero
        if ((D + 26) * γ1 * h_ < abs(h)) {
            return false; // <-- prefilter applied
        }
    }
    // error too high - let's try double-double precision
    {
        // The below takes about 15 micro-seconds on a 1st gen i7 and Chrome 79
        const { coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v }, errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ } } = getImplicitForm3DdWithRunningError(ps);
        const _vₓₓₓ = abs(vₓₓₓ[1]);
        const _vₓₓᵧ = abs(vₓₓᵧ[1]);
        const _vₓᵧᵧ = abs(vₓᵧᵧ[1]);
        const _vᵧᵧᵧ = abs(vᵧᵧᵧ[1]);
        // In the below a prefix underscore on a variable means absolute value, 
        // a postfix underscore means error bound (before multiplication by gamma).
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // const h =
        //   vₓₓₓ*x*x*x + vₓₓᵧ*x*x*y + vₓᵧᵧ*x*y*y + vᵧᵧᵧ*y*y*y + 
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;
        const xd = etodd(xe);
        const yd = etodd(ye);
        const _x = abs(x);
        const _y = abs(y);
        // we're multiplying by `γγ3` at the end but the error `x_` is only `γγ1`
        // and hence we need to divide the error by 3.
        const x_ = _x / 3;
        const y_ = _y / 3;
        const xx = qmq(xd, xd);
        const _xx = xx[1];
        const xx_ = 2 * (_x * x_ + _xx);
        const xxx = qmq(xd, xx);
        const _xxx = abs(xxx[1]);
        const xxx_ = _x * xx_ + x_ * _xx + 2 * _xxx;
        const yy = qmq(yd, yd);
        const _yy = yy[1];
        const yy_ = 2 * (_y * y_ + _yy);
        const yyy = qmq(yd, yy);
        const _yyy = abs(yyy[1]);
        const yyy_ = _y * yy_ + y_ * _yy + 2 * _yyy;
        const xxy = qmq(yd, xx);
        const _xxy = abs(xxy[1]);
        const xxy_ = _y * xx_ + y_ * _xx + 2 * _xxy;
        const xyy = qmq(xd, yy);
        const _xyy = abs(xyy[1]);
        const xyy_ = _x * yy_ + x_ * _yy + 2 * _xyy;
        const xy = qmq(xd, yd);
        const _xy = abs(xy[1]);
        const xy_ = _x * y_ + x_ * _y + 2 * _xy;
        const vₓₓₓxxx = qmq(vₓₓₓ, xxx);
        const vₓₓₓxxx_ = _vₓₓₓ * xxx_ + vₓₓₓ_ * _xxx + 2 * abs(vₓₓₓxxx[1]);
        const vₓₓᵧxxy = qmq(vₓₓᵧ, xxy);
        const vₓₓᵧxxy_ = _vₓₓᵧ * xxy_ + vₓₓᵧ_ * _xxy + 2 * abs(vₓₓᵧxxy[1]);
        const vₓᵧᵧxyy = qmq(vₓᵧᵧ, xyy);
        const vₓᵧᵧxyy_ = _vₓᵧᵧ * xyy_ + vₓᵧᵧ_ * _xyy + 2 * abs(vₓᵧᵧxyy[1]);
        const vᵧᵧᵧyyy = qmq(vᵧᵧᵧ, yyy);
        const vᵧᵧᵧyyy_ = _vᵧᵧᵧ * yyy_ + vᵧᵧᵧ_ * _yyy + 2 * abs(vᵧᵧᵧyyy[1]);
        const vₓₓxx = qmq(vₓₓ, xx);
        const vₓₓxx_ = abs(vₓₓ[1]) * xx_ + vₓₓ_ * _xx + 2 * abs(vₓₓxx[1]);
        const vₓᵧxy = qmq(vₓᵧ, xy);
        const vₓᵧxy_ = abs(vₓᵧ[1]) * xy_ + vₓᵧ_ * _xy + 2 * abs(vₓᵧxy[1]);
        const vᵧᵧyy = qmq(vᵧᵧ, yy);
        const vᵧᵧyy_ = abs(vᵧᵧ[1]) * yy_ + vᵧᵧ_ * _yy + 2 * abs(vᵧᵧyy[1]);
        const vₓx = qmq(xd, vₓ);
        const vₓx_ = abs(vₓ[1]) * x_ + vₓ_ * _x + 2 * abs(vₓx[1]);
        const vᵧy = qmq(yd, vᵧ);
        const vᵧy_ = abs(vᵧ[1]) * y_ + vᵧ_ * _y + 2 * abs(vᵧy[1]);
        // group the terms to reduce error, e.g. v usually has the highest bitlength
        //const h = 
        //    (
        //        ((vₓₓₓxxx + vₓₓᵧxxy) + (vₓᵧᵧxyy + vᵧᵧᵧyyy)) + 
        //        (vₓₓxx + vₓᵧxy + vᵧᵧyy)
        //    ) + 
        //    (
        //        (vₓx + vᵧy) + 
        //        v
        //    );
        const q1 = qaq(vₓₓₓxxx, vₓₓᵧxxy);
        const q1_ = vₓₓₓxxx_ + vₓₓᵧxxy_ + abs(q1[1]);
        const q2 = qaq(vₓᵧᵧxyy, vᵧᵧᵧyyy);
        const q2_ = vₓᵧᵧxyy_ + vᵧᵧᵧyyy_ + abs(q2[1]);
        const q3 = qaq(q1, q2);
        const q3_ = q1_ + q2_ + abs(q3[1]);
        const q4 = qaq(vₓₓxx, vₓᵧxy);
        const q4_ = vₓₓxx_ + vₓᵧxy_ + abs(q4[1]);
        const q5 = qaq(q4, vᵧᵧyy);
        const q5_ = q4_ + vᵧᵧyy_ + abs(q5[1]);
        const q6 = qaq(q3, q5);
        const q6_ = q3_ + q5_ + abs(q6[1]);
        const q7 = qaq(vₓx, vᵧy);
        const q7_ = vₓx_ + vᵧy_ + abs(q7[1]);
        const q8 = qaq(q7, v);
        const q8_ = q7_ + v_ + abs(q8[1]);
        const h = qaq(q6, q8);
        const h_ = q6_ + q8_ + abs(h[1]);
        // if the error is not too high too discern h away from zero
        if (γγ3 * h_ < abs(estimate(h))) {
            return false; // <-- prefilter applied
        }
    }
    // error still too high - const's go exact
    {
        // The below takes about 155 micro-seconds on a 1st gen i7 and Chrome 79
        const implictForm = getImplicitForm3Exact(ps);
        if (implictForm === undefined) {
            // all ps are the same point
            return isDouble && x === ps[0][0] && y === ps[0][1];
        }
        if (!implictForm.hasOwnProperty('vₓₓₓ')) {
            implictForm.vₓₓₓ = [0];
            implictForm.vₓₓᵧ = [0];
            implictForm.vₓᵧᵧ = [0];
            implictForm.vᵧᵧᵧ = [0];
        }
        if (!implictForm.hasOwnProperty('vₓₓ')) {
            implictForm.vₓₓ = [0];
            implictForm.vₓᵧ = [0];
            implictForm.vᵧᵧ = [0];
        }
        let { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = implictForm;
        // `h` (say height) is the the result of evaluating the implicit 
        // equation; if it is 0 we are on the curve, else we're not.
        // const h =
        //   vₓₓₓ*x*x*x + vₓₓᵧ*x*x*y + vₓᵧᵧ*x*y*y + vᵧᵧᵧ*y*y*y + 
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;
        const xx = epr(xe, xe); // <= error free
        const xxx = epr(xe, xx);
        const yy = epr(ye, ye); // <= error free
        const yyy = epr(ye, yy);
        const xxy = epr(ye, xx);
        const xyy = epr(xe, yy);
        const xy = epr(xe, ye); // <= error free
        const vₓₓₓxxx = epr(vₓₓₓ, xxx);
        const vₓₓᵧxxy = epr(vₓₓᵧ, xxy);
        const vₓᵧᵧxyy = epr(vₓᵧᵧ, xyy);
        const vᵧᵧᵧyyy = epr(vᵧᵧᵧ, yyy);
        const vₓₓxx = epr(vₓₓ, xx);
        const vₓᵧxy = epr(vₓᵧ, xy);
        const vᵧᵧyy = epr(vᵧᵧ, yy);
        const vₓx = epr(xe, vₓ);
        const vᵧy = epr(ye, vᵧ);
        const q1 = fes(vₓₓₓxxx, vₓₓᵧxxy);
        const q2 = fes(vₓᵧᵧxyy, vᵧᵧᵧyyy);
        const q3 = fes(q1, q2);
        const q4 = fes(vₓₓxx, vₓᵧxy);
        const q5 = fes(q4, vᵧᵧyy);
        const q6 = fes(q3, q5);
        const q7 = fes(vₓx, vᵧy);
        const q8 = fes(q7, v);
        const h = fes(q6, q8);
        return sign(h) === 0; // <= calculation was exact
    }
}
export { isPointOnBezierExtension3 };
//# sourceMappingURL=is-point-on-bezier-extension-3.js.map