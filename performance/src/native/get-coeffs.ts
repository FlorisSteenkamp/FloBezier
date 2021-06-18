import { operators as bigFloatOperators } from "big-float-ts";
import { 
    getCoeffsBez1Bez1DdAnyBitlength, 
    getCoeffsBez1Bez2DdAnyBitlength, 
    getCoeffsBez1Bez3DdAnyBitlength, 
    getCoeffsBez2Bez1DdAnyBitlength, 
    getCoeffsBez2Bez2DdAnyBitlength, 
    getCoeffsBez2Bez3DdAnyBitlength,
    getCoeffsBez3Bez1DdAnyBitlength, 
    getCoeffsBez3Bez2DdAnyBitlength, 
    getCoeffsBez3Bez3DdAnyBitlength 
} from "../../../src/index";
import { 
    getCoeffsBez1Bez1ExactAnyBitlength,
    getCoeffsBez1Bez2ExactAnyBitlength, 
    getCoeffsBez1Bez3ExactAnyBitlength, 
    getCoeffsBez2Bez1ExactAnyBitlength, 
    getCoeffsBez2Bez2ExactAnyBitlength, 
    getCoeffsBez2Bez3ExactAnyBitlength, 
    getCoeffsBez3Bez1ExactAnyBitlength, 
    getCoeffsBez3Bez2ExactAnyBitlength, 
    getCoeffsBez3Bez3ExactAnyBitlength 
} from "../../../src/index";

const { eSign, eToDd } = bigFloatOperators;
const abs = Math.abs;


const coeffFunctionsDdAnyBitlength = [
    [getCoeffsBez1Bez1DdAnyBitlength, getCoeffsBez1Bez2DdAnyBitlength, getCoeffsBez1Bez3DdAnyBitlength],
    [getCoeffsBez2Bez1DdAnyBitlength, getCoeffsBez2Bez2DdAnyBitlength, getCoeffsBez2Bez3DdAnyBitlength],
    [getCoeffsBez3Bez1DdAnyBitlength, getCoeffsBez3Bez2DdAnyBitlength, getCoeffsBez3Bez3DdAnyBitlength]
];

const coeffFunctionsExactAnyBitlength = [
    [getCoeffsBez1Bez1ExactAnyBitlength, getCoeffsBez1Bez2ExactAnyBitlength, getCoeffsBez1Bez3ExactAnyBitlength],
    [getCoeffsBez2Bez1ExactAnyBitlength, getCoeffsBez2Bez2ExactAnyBitlength, getCoeffsBez2Bez3ExactAnyBitlength],
    [getCoeffsBez3Bez1ExactAnyBitlength, getCoeffsBez3Bez2ExactAnyBitlength, getCoeffsBez3Bez3ExactAnyBitlength]
];


/** this for testing new any bitlength way */
function getCoeffs(
        ps1: number[][], 
        ps2: number[][]): {
            coeffs: number[][];
            errBound: number[];
            getPExact: () => number[][];
        } {

    const { coeffs: coeffsDd, errBound: errBoundDd } = 
        coeffFunctionsDdAnyBitlength[ps1.length-2][ps2.length-2](ps1, ps2);

    // If the leading coefficient is too close to zero we have no choice but
    // to go to infinite precision unless the error is also zero.
    // while `|lcoef| < lcoeff error bound' -> possibly zero 'lcoef'
    if (abs(coeffsDd[0][1]) <= errBoundDd[0]) {
        // leading coefficient is too close to zero
        // go to infinite precision

        const pExact = 
            coeffFunctionsExactAnyBitlength[ps1.length-2][ps2.length-2](ps1, ps2);

        //if (pExact.length === 0) {
            // infinite intersections -> usually same K Family
            // but could also be point intersecting curve, etc.
            //return undefined;
        //}

        const coeffs_ = pExact.map(eToDd);

        return {
            coeffs: coeffs_, 
            // the error is the *low* order double times `Number.EPSILON`
            errBound: coeffs_.map(c => abs(c[0]*Number.EPSILON)),
            getPExact: () => pExact
        };
    }
    
    const getPExactAnyBitlength = 
        () => coeffFunctionsExactAnyBitlength[ps1.length-2][ps2.length-2](ps1, ps2);

    // THE BELOW NOT REQUIRED ANYMORE MAYBE
    /*
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
        const poly = getPExactAnyBitlength();
        for (let i=0; i<poly.length; i++) {
            if (eSign(poly[i]) !== 0) {
                sameKFamily = false; break;
            }
        }        
    }
    if (sameKFamily) {
        return undefined;
    }
    */

    return { coeffs: coeffsDd, errBound: errBoundDd, getPExact: getPExactAnyBitlength };
}


export { getCoeffs }
