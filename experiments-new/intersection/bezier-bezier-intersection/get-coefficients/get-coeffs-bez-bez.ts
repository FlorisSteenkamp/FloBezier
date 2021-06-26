import { getCoeffsBez1Bez1DdWithRunningError47 } from './double-double/get-coeffs-bez1-bez1-dd-with-running-error-47';
import { getCoeffsBez2Bez1DdWithRunningError47 } from './double-double/get-coeffs-bez2-bez1-dd-with-running-error-47';
import { getCoeffsBez3Bez1DdWithRunningError47 } from './double-double/get-coeffs-bez3-bez1-dd-with-running-error-47';
import { getCoeffsBez1Bez2DdWithRunningError47 } from './double-double/get-coeffs-bez1-bez2-dd-with-running-error-47';
import { getCoeffsBez2Bez2DdWithRunningError47 } from './double-double/get-coeffs-bez2-bez2-dd-with-running-error-47';
import { getCoeffsBez3Bez2DdWithRunningError47 } from './double-double/get-coeffs-bez3-bez2-dd-with-running-error-47';
import { getCoeffsBez1Bez3DdWithRunningError47 } from './double-double/get-coeffs-bez1-bez3-dd-with-running-error-47';
import { getCoeffsBez2Bez3DdWithRunningError47 } from './double-double/get-coeffs-bez2-bez3-dd-with-running-error-47';
import { getCoeffsBez3Bez3DdWithRunningError47 } from './double-double/get-coeffs-bez3-bez3-dd-with-running-error-47';
import { getCoeffsBez1Bez1Exact47 } from './exact/get-coeffs-bez1-bez1-exact-47';
import { getCoeffsBez2Bez1Exact47 } from './exact/get-coeffs-bez2-bez1-exact-47';
import { getCoeffsBez3Bez1Exact47 } from './exact/get-coeffs-bez3-bez1-exact-47';
import { getCoeffsBez1Bez2Exact47 } from './exact/get-coeffs-bez1-bez2-exact-47';
import { getCoeffsBez2Bez2Exact47 } from './exact/get-coeffs-bez2-bez2-exact-47';
import { getCoeffsBez3Bez2Exact47 } from './exact/get-coeffs-bez3-bez2-exact-47';
import { getCoeffsBez1Bez3Exact47 } from './exact/get-coeffs-bez1-bez3-exact-47';
import { getCoeffsBez2Bez3Exact47 } from './exact/get-coeffs-bez2-bez3-exact-47';
import { getCoeffsBez3Bez3Exact47 } from './exact/get-coeffs-bez3-bez3-exact-47';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";

const { eSign } = bigFloatOperators;


const abs = Math.abs;
//const coeffFunctionsDouble = [
//    [getCoeffsBez1Bez1, getCoeffsBez1Bez2, getCoeffsBez1Bez3],
//    [getCoeffsBez2Bez1, getCoeffsBez2Bez2, getCoeffsBez2Bez3],
//    [getCoeffsBez3Bez1, getCoeffsBez3Bez2, getCoeffsBez3Bez3]
//];
const coeffFunctionsDd = [
    [getCoeffsBez1Bez1DdWithRunningError47, getCoeffsBez1Bez2DdWithRunningError47, getCoeffsBez1Bez3DdWithRunningError47],
    [getCoeffsBez2Bez1DdWithRunningError47, getCoeffsBez2Bez2DdWithRunningError47, getCoeffsBez2Bez3DdWithRunningError47],
    [getCoeffsBez3Bez1DdWithRunningError47, getCoeffsBez3Bez2DdWithRunningError47, getCoeffsBez3Bez3DdWithRunningError47]
];
const coeffFunctionsExact = [
    [getCoeffsBez1Bez1Exact47, getCoeffsBez1Bez2Exact47, getCoeffsBez1Bez3Exact47],
    [getCoeffsBez2Bez1Exact47, getCoeffsBez2Bez2Exact47, getCoeffsBez2Bez3Exact47],
    [getCoeffsBez3Bez1Exact47, getCoeffsBez3Bez2Exact47, getCoeffsBez3Bez3Exact47]
];


/**
 * Returns an object with properties containing (1) the coefficients (in double-double
 * precision) of a polynomial in 1 variable whose roots are the parameter values 
 * of the intersection points of two given order 1, 2 or 3 bezier curves (i.e. lines, 
 * quadratic and cubic bezier curves), (2) the coefficientwise error bound of the polyomial, 
 * and (3) a function that returns the *exact* polynomial coefficients as Shewchuck expansions.
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * double-double precision floating point numbers from highest to lowest power, 
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:** the coordinates of the given bezier curves must be 
 * 47-bit aligned
 * * if all polynomial coefficients are exactly zero `undefined` is returned
 * so that is easy to check if the two curves are actually identical 
 * algebraically (i.e. provided endpoints are ignored)
 * * intermediate calculations are done in double-double precision and this is
 * reflected in the output coefficient-wise error bound (which is approximately 
 * `n * (Number.EPSILON**2) * the condition number`, where roughly `1 < n < 100` and 
 * depends on the specific calculation, e.g. the order of the bezier curves)
 * * the error bound returned need **not** be scaled before use
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc mdx
 */
function getCoeffsBezBez47(
        ps1: number[][], 
        ps2: number[][]): { 
            coeffs: number[][], 
            errBound: number[], 
            getPExact: () => number[][] } {

    const { coeffs, errBound } = coeffFunctionsDd[ps1.length-2][ps2.length-2](ps1, ps2);
    //const { coeffs, errBound } = coeffFunctionsDouble[ps1.length-2][ps2.length-2](ps1, ps2);

    const getPExact = () => coeffFunctionsExact[ps1.length-2][ps2.length-2](ps1, ps2);

    // check if all coefficients are zero, 
    // i.e. the two curves are possibly in the same k-family
    let possiblySameKFamily = true;
    for (let i=0; i<coeffs.length; i++) {
        if (abs(coeffs[i][1]) - errBound[i] > 0) {
            possiblySameKFamily = false; break;
        }
    }
    let sameKFamily = false;
    if (possiblySameKFamily) {
        sameKFamily = true;
        const poly = getPExact();
        for (let i=0; i<poly.length; i++) {
            if (eSign(poly[i]) !== 0) {
                sameKFamily = false; break;
            }
        }        
    }
    
    if (sameKFamily) {
        return undefined;
    }

    return { coeffs, errBound, getPExact };
}


export { getCoeffsBezBez47 }
