import { 
    getCoeffsBez1Bez1Dd,
    getCoeffsBez1Bez2Dd, 
    getCoeffsBez1Bez3Dd, 
    getCoeffsBez2Bez1Dd, 
    getCoeffsBez2Bez2Dd, 
    getCoeffsBez2Bez3Dd,
    getCoeffsBez3Bez1Dd, 
    getCoeffsBez3Bez2Dd, 
    getCoeffsBez3Bez3Dd 
} from "../../../src/index.js";
import { 
    getCoeffsBez1Bez1Exact,
    getCoeffsBez1Bez2Exact, 
    getCoeffsBez1Bez3Exact, 
    getCoeffsBez2Bez1Exact, 
    getCoeffsBez2Bez2Exact, 
    getCoeffsBez2Bez3Exact, 
    getCoeffsBez3Bez1Exact, 
    getCoeffsBez3Bez2Exact, 
    getCoeffsBez3Bez3Exact 
} from "../../../src/index.js";


const coeffFunctionsDdAnyBitlength = [
    [getCoeffsBez1Bez1Dd, getCoeffsBez1Bez2Dd, getCoeffsBez1Bez3Dd],
    [getCoeffsBez2Bez1Dd, getCoeffsBez2Bez2Dd, getCoeffsBez2Bez3Dd],
    [getCoeffsBez3Bez1Dd, getCoeffsBez3Bez2Dd, getCoeffsBez3Bez3Dd]
];

const coeffFunctionsExactAnyBitlength = [
    [getCoeffsBez1Bez1Exact, getCoeffsBez1Bez2Exact, getCoeffsBez1Bez3Exact],
    [getCoeffsBez2Bez1Exact, getCoeffsBez2Bez2Exact, getCoeffsBez2Bez3Exact],
    [getCoeffsBez3Bez1Exact, getCoeffsBez3Bez2Exact, getCoeffsBez3Bez3Exact]
];


/** this for testing new any bitlength way */
function getCoeffs(
        ps1: number[][], 
        ps2: number[][]): {
            coeffs: number[][];
            errBound: number[];
            getPExact: () => number[][];
        } {

    const { coeffs, errBound } = 
        coeffFunctionsDdAnyBitlength[ps1.length-2][ps2.length-2](ps1, ps2);

    const getPExactAnyBitlength = 
        () => coeffFunctionsExactAnyBitlength[ps1.length-2][ps2.length-2](ps1, ps2);

    // THE BELOW NOT REQUIRED ANYMORE MAYBE
    /*
    // check if all coefficients are zero, 
    // i.e. the two curves are possibly in the same k-family
    let possiblyInfiniteXs = true;
    for (let i=0; i<coeffs.length; i++) {
        if (abs(coeffs[i][1]) - errBound[i] > 0) {
            possiblyInfiniteXs = false; break;
        }
    }
    let infiniteXs = false;
    if (possiblyInfiniteXs) {
        infiniteXs = true;
        const poly = getPExactAnyBitlength();
        for (let i=0; i<poly.length; i++) {
            if (eSign(poly[i]) !== 0) {
                infiniteXs = false; break;
            }
        }        
    }
    if (infiniteXs) {
        return undefined;
    }
    */

    return { coeffs, errBound, getPExact: getPExactAnyBitlength };
}


export { getCoeffs }
