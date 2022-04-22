import { getCoeffsBez1Bez1Dd } from './double-double/get-coeffs-bez1-bez1-dd.js';
import { getCoeffsBez2Bez1Dd } from './double-double/get-coeffs-bez2-bez1-dd.js';
import { getCoeffsBez3Bez1Dd } from './double-double/get-coeffs-bez3-bez1-dd.js';
import { getCoeffsBez1Bez2Dd } from './double-double/get-coeffs-bez1-bez2-dd.js';
import { getCoeffsBez2Bez2Dd } from './double-double/get-coeffs-bez2-bez2-dd.js';
import { getCoeffsBez3Bez2Dd } from './double-double/get-coeffs-bez3-bez2-dd.js';
import { getCoeffsBez1Bez3Dd } from './double-double/get-coeffs-bez1-bez3-dd.js';
import { getCoeffsBez2Bez3Dd } from './double-double/get-coeffs-bez2-bez3-dd.js';
import { getCoeffsBez3Bez3Dd } from './double-double/get-coeffs-bez3-bez3-dd.js';
import { getCoeffsBez1Bez1Exact } from './exact/get-coeffs-bez1-bez1-exact.js';
import { getCoeffsBez2Bez1Exact } from './exact/get-coeffs-bez2-bez1-exact.js';
import { getCoeffsBez3Bez1Exact } from './exact/get-coeffs-bez3-bez1-exact.js';
import { getCoeffsBez1Bez2Exact } from './exact/get-coeffs-bez1-bez2-exact.js';
import { getCoeffsBez2Bez2Exact } from './exact/get-coeffs-bez2-bez2-exact.js';
import { getCoeffsBez3Bez2Exact } from './exact/get-coeffs-bez3-bez2-exact.js';
import { getCoeffsBez1Bez3Exact } from './exact/get-coeffs-bez1-bez3-exact.js';
import { getCoeffsBez2Bez3Exact } from './exact/get-coeffs-bez2-bez3-exact.js';
import { getCoeffsBez3Bez3Exact } from './exact/get-coeffs-bez3-bez3-exact.js';


const coeffFunctionsDd = [
    [getCoeffsBez1Bez1Dd, getCoeffsBez1Bez2Dd, getCoeffsBez1Bez3Dd],
    [getCoeffsBez2Bez1Dd, getCoeffsBez2Bez2Dd, getCoeffsBez2Bez3Dd],
    [getCoeffsBez3Bez1Dd, getCoeffsBez3Bez2Dd, getCoeffsBez3Bez3Dd]
];

const coeffFunctionsExact = [
    [getCoeffsBez1Bez1Exact, getCoeffsBez1Bez2Exact, getCoeffsBez1Bez3Exact],
    [getCoeffsBez2Bez1Exact, getCoeffsBez2Bez2Exact, getCoeffsBez2Bez3Exact],
    [getCoeffsBez3Bez1Exact, getCoeffsBez3Bez2Exact, getCoeffsBez3Bez3Exact]
];


/**
 * Returns an object with properties containing (1) the coefficients (in double-double
 * precision) of a polynomial in 1 variable whose roots are the parameter values 
 * (of the second curve) of the intersection points of two given order 1, 2 or 3 bezier curves (i.e. lines, 
 * quadratic and cubic bezier curves), (2) the coefficientwise error bound of the polyomial, 
 * and (3) a function that returns the *exact* polynomial coefficients as 
 * [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) expansions.
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * double-double precision floating point numbers from highest to lowest power, 
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * if there is an infinite number of intersections `undefined` is returned
 * * intermediate calculations are done in double-double precision with 
 * fallback to infinite precision (bar underflow / overflow)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc mdx
 */
function getCoeffsBezBez(
        ps1: number[][], 
        ps2: number[][]): { 
            coeffs: number[][], 
            errBound: number[], 
            getPExact: () => number[][] 
        } {

    const { coeffs, errBound } = 
        coeffFunctionsDd[ps1.length-2][ps2.length-2](ps1, ps2);

    const getPExact = 
        () => coeffFunctionsExact[ps1.length-2][ps2.length-2](ps1, ps2);

    return { coeffs, errBound, getPExact };
}


export { getCoeffsBezBez }
