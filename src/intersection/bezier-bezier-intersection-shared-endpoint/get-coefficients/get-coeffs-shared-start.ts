import { getCoeffsBez1Bez1SharedStartDd } from './double-double/get-coeffs-bez1-bez1-shared-start-dd.js';
import { getCoeffsBez1Bez2SharedStartDd } from './double-double/get-coeffs-bez1-bez2-shared-start-dd.js';
import { getCoeffsBez1Bez3SharedStartDd } from './double-double/get-coeffs-bez1-bez3-shared-start-dd.js';
import { getCoeffsBez2Bez1SharedStartDd } from './double-double/get-coeffs-bez2-bez1-shared-start-dd.js';
import { getCoeffsBez2Bez2SharedStartDd } from './double-double/get-coeffs-bez2-bez2-shared-start-dd.js';
import { getCoeffsBez2Bez3SharedStartDd } from './double-double/get-coeffs-bez2-bez3-shared-start-dd.js';
import { getCoeffsBez3Bez1SharedStartDd } from './double-double/get-coeffs-bez3-bez1-shared-start-dd.js';
import { getCoeffsBez3Bez2SharedStartDd } from './double-double/get-coeffs-bez3-bez2-shared-start-dd.js';
import { getCoeffsBez3Bez3SharedStartDd } from './double-double/get-coeffs-bez3-bez3-shared-start-dd.js';
import { getCoeffsBez1Bez1SharedStartExact } from './exact/get-coeffs-bez1-bez1-shared-start-exact.js';
import { getCoeffsBez1Bez2SharedStartExact } from './exact/get-coeffs-bez1-bez2-shared-start-exact.js';
import { getCoeffsBez1Bez3SharedStartExact } from './exact/get-coeffs-bez1-bez3-shared-start-exact.js';
import { getCoeffsBez2Bez1SharedStartExact } from './exact/get-coeffs-bez2-bez1-shared-start-exact.js';
import { getCoeffsBez2Bez2SharedStartExact } from './exact/get-coeffs-bez2-bez2-shared-start-exact.js';
import { getCoeffsBez2Bez3SharedStartExact } from './exact/get-coeffs-bez2-bez3-shared-start-exact.js';
import { getCoeffsBez3Bez1SharedStartExact } from './exact/get-coeffs-bez3-bez1-shared-start-exact.js';
import { getCoeffsBez3Bez2SharedStartExact } from './exact/get-coeffs-bez3-bez2-shared-start-exact.js';
import { getCoeffsBez3Bez3SharedStartExact } from './exact/get-coeffs-bez3-bez3-shared-start-exact.js';


const coeffFunctionsDd = [
    [getCoeffsBez1Bez1SharedStartDd, getCoeffsBez1Bez2SharedStartDd, getCoeffsBez1Bez3SharedStartDd],
    [getCoeffsBez2Bez1SharedStartDd, getCoeffsBez2Bez2SharedStartDd, getCoeffsBez2Bez3SharedStartDd],
    [getCoeffsBez3Bez1SharedStartDd, getCoeffsBez3Bez2SharedStartDd, getCoeffsBez3Bez3SharedStartDd]
];

const coeffFunctionsExact = [
    [getCoeffsBez1Bez1SharedStartExact, getCoeffsBez1Bez2SharedStartExact, getCoeffsBez1Bez3SharedStartExact],
    [getCoeffsBez2Bez1SharedStartExact, getCoeffsBez2Bez2SharedStartExact, getCoeffsBez2Bez3SharedStartExact],
    [getCoeffsBez3Bez1SharedStartExact, getCoeffsBez3Bez2SharedStartExact, getCoeffsBez3Bez3SharedStartExact]
];


/**
 * Returns the polynomial (in double-double precision, including a
 * coefficientwise error bound, still to be multiplied by `γγ3`, and a function
 * returning the exact polynomial) whose roots are the parameter values of the
 * intersection points of `ps2` with `ps1`, *given that they start at the same
 * point*, with the known root at `t = 0` divided out (twice if the curves are
 * tangent at the shared point), i.e. `f₁(ps2(t))/t` (or `f₁(ps2(t))/t²`)
 * where `f₁` is the implicit form of `ps1`.
 *
 * * the counterpart of [[getCoeffsBezBez]] for curves sharing their start
 * point (see e.g. [[getCoeffsBez3Bez3SharedStartDd]] for details)
 *
 * * **precondition:** `ps1[0]` and `ps2[0]` must be exactly equal
 * * **precondition:** if `tangent` is `true` the `t` coefficient of
 * `f₁(ps2(t))` must be exactly zero (e.g. if the curves are tangent at the
 * shared point)
 *
 * @param ps1 an order 1, 2 or 3 bezier curve
 * @param ps2 an order 1, 2 or 3 bezier curve with `ps2[0]` equal to `ps1[0]`
 * @param tangent if `true` then `t²` is divided out (instead of `t`)
 *
 * @internal
 */
function getCoeffsSharedStart(
        ps1: number[][],
        ps2: number[][],
        tangent: boolean): {
            coeffs: number[][],
            errBound: number[],
            getPExact: () => number[][]
        } {

    const fDd = coeffFunctionsDd[ps1.length-2][ps2.length-2];
    const fExact = coeffFunctionsExact[ps1.length-2][ps2.length-2];

    const { coeffs, errBound } = fDd(ps1, ps2);

    if (!tangent) {
        return { coeffs, errBound, getPExact: () => fExact(ps1, ps2) };
    }

    // the constant term is (exactly) zero - divide out another `t`
    const n = coeffs.length - 1;

    return {
        coeffs: coeffs.slice(0, n),
        errBound: errBound.slice(0, n),
        getPExact: () => fExact(ps1, ps2).slice(0, n)
    };
}


export { getCoeffsSharedStart }
