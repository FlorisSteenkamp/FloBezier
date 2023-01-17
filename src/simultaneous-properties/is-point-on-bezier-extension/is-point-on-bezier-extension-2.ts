import { getImplicitForm2 } from "../../implicit-form/double/get-implicit-form2.js";
import { getImplicitForm2ErrorCounters } from "../../implicit-form/get-error-counters/get-implicit-form2-error-counters.js";
import { getImplicitForm2DdWithRunningError } from "../../implicit-form/double-double/get-implicit-form2-dd-with-running-error.js";
import { getImplicitForm2Exact } from "../../implicit-form/exact/get-implicit-form2-exact.js";
import { γ, γγ } from '../../error-analysis/error-analysis.js';

// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
import { ddMultDd, ddAddDd } from "double-double";
import { expansionProduct, fastExpansionSum, eSign, eEstimate, eToDd } from 'big-float-ts';
import { ImplicitFormExact2 } from "../../implicit-form/implicit-form-types.js";

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
 * Returns `true` if the given point is on the given quadratic bezier curve where 
 * the parameter `t` is allowed to extend to ±infinity, i.e. `t` is an element of 
 * `[-∞, +∞]`, `false` otherwise.
 * 
 * @param ps a quadratic bezier curve
 * @param p a point with coordinates given as [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) 
 * expansions; if only double precision coordinates need to be provided then 
 * wrap them in a one element array, e.g. for a point with `x` and `y` coordinates 
 * of `1` and `2` set `p === [[1],[2]]`.
 * 
 * @internal
 */
 function isPointOnBezierExtension2(
        ps: number[][], p: number[][]): boolean {

    const [xe,ye] = p;
    const lenX = xe.length;
    const lenY = ye.length;
    const x = xe[lenX-1];  // get higest order double
    const y = ye[lenY-1];  // ...
    const isDouble = (lenX === 1 && lenY === 1)

    //---- first pre-filter
    {
        const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = getImplicitForm2(ps);
        const { 
            vₓₓ_,  // <5>
            vₓᵧ_,  // <5>
            vᵧᵧ_,  // <5>
            vₓ_,   // <8>
            vᵧ_,   // <8>
            v_     // <10>
        } = getImplicitForm2ErrorCounters(ps);
        
        // In the below a a postfix underscore means 
        // an error bound (>= absolute value)
        
        // `h` (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.

        
        // In the below, if x is given as a double then the error counter on
        // x would be 0, i.e. <0>x, else it would be <1>x. We represent the
        // error counter with a <D> so that for a point with double precion 
        // coordinates we have <D> = <0> else <D> = <1>. Same is true for y.

        // `0` if we have only double precision coordinates, `1` otherwise
        const D = isDouble ? 0 : 1;

        const x_ = abs(x);  // <D>x
        const y_ = abs(y);  // <D>y
        const xx_ = x_*x_;  // <2D+1>xx
        const xy_ = x_*y_;  // <2D+1>xy
        const yy_ = y_*y_;  // <2D+1>yy

        // group the terms to reduce error, e.g. v usually has the highest bitlength
        const h = 
            (
                (
                    (vₓₓ*x*x + vₓᵧ*x*y) + 
                    vᵧᵧ*y*y
                ) + 
                (
                    vₓ*x + vᵧ*y
                )
            ) + 
            v;

        // <D+12>h <-- <D+12>(<D+11>(<2D+9>(<2D+8> + <2D+7>) + <D+10>) + <10>);
        const h_ = 
            (
                (
                    // <2D+8>(<2D+7>(<5>vₓₓ*<2D+1>(xx)) + <2D+7>(<5>vₓᵧ*<2D+1>(xy)))
                    (vₓₓ_*xx_ + vₓᵧ_*xy_) + 
                    // <2D+7>(<5>vᵧᵧ*<2D+1>(xy))
                    vᵧᵧ_*yy_
                ) + (
                    // <D+10>(<D+9>(<8>vₓ*<D>x) + <D+9>(<8>vᵧ*<D>y))
                    vₓ_*x_ + vᵧ_*y_
                )
            ) + 
            // <10>v
            v_;


        // if the error is not too high too discern h away from zero
        if ((D+12)*γ1*h_ < abs(h)) {
            return false; // <-- prefilter applied
        }
    }

    // error too high - const's try double-double precision
    {
        const { 
            coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
            errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
        } = getImplicitForm2DdWithRunningError(ps);
        
        // In the below a prefix underscore on a variable means absolute value, 
        // a postfix underscore means error bound (before multiplication by gamma).
        
        // h (say height) is the the result of evaluating the implicit equation; if
        // it is 0 we are on the curve, else we're not.
        // const h =
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;

        const xd = etodd(xe);
        const yd = etodd(ye);

        const _x = abs(x);
        const _y = abs(y);

        // we're multiplying by `γγ3` at the end but the error `x_` is only `γγ1`
        // and hence we need to divide the error by 3.
        const x_ = _x/3;
        const y_ = _y/3;

        const xx = qmq(xd,xd);
        const _xx = xx[1];
        const xx_ = 2*(_x*x_ + _xx);
        const yy = qmq(yd,yd);
        const _yy = yy[1];
        const yy_ = 2*(_y*y_ + _yy);
        const xy = qmq(xd,yd);
        const _xy = abs(xy[1]);
        const xy_ = _x*y_ + x_*_y + 2*_xy;
        const vₓₓxx = qmq(vₓₓ,xx);
        const vₓₓxx_ = abs(vₓₓ[1])*xx_ + vₓₓ_*_xx + 2*abs(vₓₓxx[1]);
        const vₓᵧxy = qmq(vₓᵧ,xy);
        const vₓᵧxy_ = abs(vₓᵧ[1])*xy_ + vₓᵧ_*_xy + 2*abs(vₓᵧxy[1]);
        const vᵧᵧyy = qmq(vᵧᵧ,yy);
        const vᵧᵧyy_ = abs(vᵧᵧ[1])*yy_ + vᵧᵧ_*_yy + 2*abs(vᵧᵧyy[1]);
        const vₓx = qmq(xd,vₓ);
        const vₓx_ = abs(vₓ[1])*x_ + vₓ_*_x + 2*abs(vₓx[1]);
        const vᵧy = qmq(yd,vᵧ);
        const vᵧy_ = abs(vᵧ[1])*y_ + vᵧ_*_y + 2*abs(vᵧy[1]);

        // group the terms to reduce error, e.g. v usually has the highest bitlength
        //const h = 
        //    (
        //      ((vₓₓxx + vₓᵧxy) + vᵧᵧyy) + 
        //      (vₓx + vᵧy)
        //    ) + 
        //    v;

        const q4 = qaq(vₓₓxx,vₓᵧxy);
        const q4_ = vₓₓxx_ + vₓᵧxy_ + abs(q4[1]);
        const q5 = qaq(q4,vᵧᵧyy);
        const q5_ = q4_ + vᵧᵧyy_ + abs(q5[1]);
        const q7 = qaq(vₓx,vᵧy);
        const q7_ = vₓx_ + vᵧy_ + abs(q7[1]);
        const q8 = qaq(q5,q7);
        const q8_ = q5_ + q7_ + abs(q8[1]);
        const h = qaq(q8,v);
        const h_ = q8_ + v_ + abs(h[1]);

        // if the error is not too high too discern h away from zero
        if (γγ3*h_ < abs(estimate(h))) {
            return false; // <-- prefilter applied
        }
    }

    // error still too high - let's go exact
    {
        const implictForm = getImplicitForm2Exact(ps);

        if (implictForm === undefined) {
            // all ps are the same point
            return isDouble && x === ps[0][0] && y === ps[0][1];
        }

        if (!implictForm.hasOwnProperty('vₓₓ')) {
            (implictForm as ImplicitFormExact2).vₓₓ = [0];
            (implictForm as ImplicitFormExact2).vₓᵧ = [0];
            (implictForm as ImplicitFormExact2).vᵧᵧ = [0];
        }

        const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = implictForm as ImplicitFormExact2;
        
        // h (say height) is the the result of evaluating the implicit equation; 
        // if it is 0 we are on the curve, else we're not.
        // const h =
        //   vₓₓ*x*x + vₓᵧ*x*y + vᵧᵧ*y*y + vₓ*x + vᵧ*y + v;

        const h = fes(
            fes(
                fes(
                    epr(vₓₓ,epr(xe,xe)),
                    epr(vₓᵧ,epr(xe,ye))
                ),
                epr(vᵧᵧ,epr(ye,ye))
            ),
            fes(
                fes(
                    epr(xe,vₓ),
                    epr(ye,vᵧ)
                ),
                v
            )
        );

        return sign(h) === 0;  // <= calculation was exact
    }
}


export { isPointOnBezierExtension2 }
