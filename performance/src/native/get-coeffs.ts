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
