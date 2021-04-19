import { inversion01Precise } from "./inversion-01";
import { RootInterval, createRootExact } from "flo-poly";
import { squaredDistanceBetween } from "flo-vector2d";
import { eEstimate } from "big-float-ts";
import { evaluate_anyBitlength_exact } from "../local-properties-at-t/t-to-xy/any-bitlength/exact/evaluate-any-bitlength-exact";


/**
 * Returns the t pairs where the endpoints of the two given same-k-family curves 
 * overlap.
 * 
 * * **precondition**: the two given curves must be in the same k-family.
 * 
 * @param ps1 an order 1,2 or 3 bezier curve
 * @param ps2 another order 1,2 or 3 bezier curve
 * @param minD an error bound given as a distance
 * 
 * @doc
 */
function getEndpointIntersections(
        ps1: number[][],
        ps2: number[][],
        minD: number): RootInterval[][] {

    let p1S = ps1[0];
    let p1E = ps1[ps1.length-1];
    let p2S = ps2[0];
    let p2E = ps2[ps2.length-1];
    
    /** closest point on ps2 from p1S */
    let t2S1 = inversion01Precise(ps2, p1S);
    let t2E1 = inversion01Precise(ps2, p1E);
    let t1S2 = inversion01Precise(ps1, p2S);
    let t1E2 = inversion01Precise(ps1, p2E);

    let riPairs: RootInterval[][] = [];
    let minD2S1 = squaredDistanceBetween(evaluate_anyBitlength_exact(ps2, t2S1).map(eEstimate), p1S)
    if (t2S1 && minD2S1 < minD) {
        riPairs.push([
            createRootExact(0), // TODO - multiplicity should be +infinity ??
            createRootExact(t2S1)  // TODO - multiplicity should be +infinity ??
        ]);
    }
    let minD2E1 = squaredDistanceBetween(evaluate_anyBitlength_exact(ps2, t2E1).map(eEstimate), p1E)
    if (t2E1 && minD2E1 < minD) {
        riPairs.push([
            createRootExact(1), // TODO - multiplicity should be +infinity ??
            createRootExact(t2E1), // TODO - multiplicity should be +infinity ??
        ]);
    }
    let minD1S2 = squaredDistanceBetween(evaluate_anyBitlength_exact(ps1, t1S2).map(eEstimate), p2S)
    if (t1S2 && minD1S2 < minD) {
        riPairs.push([
            createRootExact(t1S2), // TODO - multiplicity should be +infinity ??
            createRootExact(0), // TODO - multiplicity should be +infinity ??
        ]);
    }
    let minD1E2 = squaredDistanceBetween(evaluate_anyBitlength_exact(ps1, t1E2).map(eEstimate), p2E)
    if (t1E2 && minD1E2 < minD) {
        riPairs.push([
            createRootExact(t1E2), // TODO - multiplicity should be +infinity ??
            createRootExact(1), // TODO - multiplicity should be +infinity ??
        ]);
    }

    return riPairs;
}


export { getEndpointIntersections }
