import { inversion01Precise } from "./inversion-01";
import { RootInterval, createRootExact } from "flo-poly";
import { squaredDistanceBetween } from "flo-vector2d";
import { eEstimate } from "big-float-ts";
import { evaluateExact } from "../local-properties-at-t/t-to-xy/exact/evaluate-exact";


/**
 * Returns the parameter `t` values where the endpoints of the two 
 * given *algebraically identical* curves overlap.
 * 
 * * **precondition:** the two given curves must be *algebraically identical*
 * (i.e. in the same k-family, in other words identical except possibly for
 * endpoints).
 * 
 * @param ps1 an order 1,2 or 3 bezier curve
 * @param ps2 another order 1,2 or 3 bezier curve
 * @param minD an error bound given as a distance
 * 
 * @doc mdx
 */
function getEndpointIntersections(
        ps1: number[][],
        ps2: number[][],
        minD: number): RootInterval[][] {

    const p1S = ps1[0];
    const p1E = ps1[ps1.length-1];
    const p2S = ps2[0];
    const p2E = ps2[ps2.length-1];
    
    /** closest point on ps2 from p1S */
    const t2S1 = inversion01Precise(ps2, p1S);
    const t2E1 = inversion01Precise(ps2, p1E);
    const t1S2 = inversion01Precise(ps1, p2S);
    const t1E2 = inversion01Precise(ps1, p2E);

    const riPairs: RootInterval[][] = [];
    const minD2S1 = squaredDistanceBetween(evaluateExact(ps2, t2S1).map(eEstimate), p1S)
    //console.log(t2S1, minD2S1)
    //if (t2S1 && minD2S1 < minD) {
    if (t2S1 !== undefined && minD2S1 < minD) {
        riPairs.push([
            createRootExact(0), // TODO - multiplicity should be +infinity ??
            createRootExact(t2S1)  // TODO - multiplicity should be +infinity ??
        ]);
    }
    const minD2E1 = squaredDistanceBetween(evaluateExact(ps2, t2E1).map(eEstimate), p1E)
    //console.log(t2E1, minD2E1)
    //if (t2E1 && minD2E1 < minD) {
    if (t2E1 !== undefined && minD2E1 < minD) {
        riPairs.push([
            createRootExact(1), // TODO - multiplicity should be +infinity ??
            createRootExact(t2E1), // TODO - multiplicity should be +infinity ??
        ]);
    }
    const minD1S2 = squaredDistanceBetween(evaluateExact(ps1, t1S2).map(eEstimate), p2S)
    //console.log(t1S2, minD1S2)
    //if (t1S2 && minD1S2 < minD) {
    if (t1S2 !== undefined && minD1S2 < minD) {
        riPairs.push([
            createRootExact(t1S2), // TODO - multiplicity should be +infinity ??
            createRootExact(0), // TODO - multiplicity should be +infinity ??
        ]);
    }
    const minD1E2 = squaredDistanceBetween(evaluateExact(ps1, t1E2).map(eEstimate), p2E)
    //console.log(t1E2, minD1E2)
    //if (t1E2 && minD1E2 < minD) {
    if (t1E2 !== undefined && minD1E2 < minD) {
        riPairs.push([
            createRootExact(t1E2), // TODO - multiplicity should be +infinity ??
            createRootExact(1), // TODO - multiplicity should be +infinity ??
        ]);
    }

    //console.log(riPairs)
    return riPairs;
}


export { getEndpointIntersections }
