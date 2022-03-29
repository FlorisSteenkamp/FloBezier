import { createRootExact } from "flo-poly";
import type { X } from "../bezier-bezier-intersection/x.js";
import { getIntervalBox } from "../../global-properties/bounds/get-interval-box/get-interval-box.js";
import { tFromXY } from "../../local-properties-to-t/t-from-xy.js";


/**
 * Returns the intersection range (given as 2 pairs of intersections (`X`s) with 
 * the intersection of `ps1` always the first entry of each pair) where the 
 * endpoints of the two given *algebraically identical* curves 
 * overlap (provided they overlap).
 * 
 * * **precondition:** the two given curves must be *algebraically identical*
 * (i.e. identical except possibly for endpoints). This can be checked for by 
 * calling [[areBeziersInSameKFamily]]. TODO
 * * **precondition:** both bezier curves must be quadratic
 * * **precondition**: not all bezier control points collinear
 * 
 * @param psA an order 2 (quadratic) bezier curve
 * @param psB another order 2 bezier curve
 * 
 * @internal
 */
 function getEndpointIntersections2(
        psA: number[][],
        psB: number[][]): X[][] {

    const A0 = psA[0];
    const A1 = psA[psA.length-1];
    const B0 = psB[0];
    const B1 = psB[psB.length-1];

    // Since the bezier curves are quadratic (and control points are not 
    // collinear) we don't have to worry about self-intersection.

    let tA_B0 = tFromXY(psA, B0);//?
    let tA_B1 = tFromXY(psA, B1);//?
    let tB_A0 = tFromXY(psB, A0);//?
    let tB_A1 = tFromXY(psB, A1);//?

    // Check for exact endpoint overlap
    if (A0[0] === B0[0] && A0[1] == B0[1]) {
        // `A` and `B` starting points are identical
        tA_B0 = [ { tS: 0, tE: 0, multiplicity: 1 } ]
        tB_A0 = [ { tS: 0, tE: 0, multiplicity: 1 } ]
    }
    if (A0[0] === B1[0] && A0[1] == B1[1]) {
        // `A` starting and `B` ending points are identical
        tA_B1 = [ { tS: 0, tE: 0, multiplicity: 1 } ]
        tB_A0 = [ { tS: 1, tE: 1, multiplicity: 1 } ]
    }
    if (A1[0] === B0[0] && A1[1] == B0[1]) {
        // `A` ending and `B` starting points are identical
        tA_B0 = [ { tS: 1, tE: 1, multiplicity: 1 } ]
        tB_A1 = [ { tS: 0, tE: 0, multiplicity: 1 } ]
    }
    if (A1[0] === B1[0] && A1[1] == B1[1]) {
        // `A` ending and `B` ending points are identical
        tA_B1 = [ { tS: 1, tE: 1, multiplicity: 1 } ]
        tB_A1 = [ { tS: 1, tE: 1, multiplicity: 1 } ]
    }

    tA_B0//?
    tA_B1//?
    tB_A0//?
    tB_A1//?

    const xs: X[][] = [];
    
    // TODO - kind: 5 -> kind: 4 where apprioriate

    xs.push(
        ...tA_B0.map<X[]>(ri => {
            const box = getIntervalBox(psA, [ri.tS, ri.tE]);
            return [
                { ri, kind: 5, box },
                { ri: createRootExact(0), kind: 5, box }
            ]
        }),
        ...tA_B1.map<X[]>(ri => {
            const box = getIntervalBox(psA, [ri.tS, ri.tE]);
            return [
                { ri, kind: 5, box },
                { ri: createRootExact(1), kind: 5, box }
            ]
        }),
        ...tB_A0.map<X[]>(ri => {
            const box = getIntervalBox(psB, [ri.tS, ri.tE]);
            return [
                { ri: createRootExact(0), kind: 5, box },
                { ri, kind: 5, box }
            ]
        }),
        ...tB_A1.map<X[]>(ri => {
            const box = getIntervalBox(psB, [ri.tS, ri.tE]);
            return [
                { ri: createRootExact(1), kind: 5, box },
                { ri, kind: 5, box }
            ]
        })
    );

    // nope - check at t === 0.25 and 0.75 to use either tS or tE
    xs.sort((a,b) => { 
        return a[0].ri.tS - b[0].ri.tS 
    });

    // return combineXs(xs);

    return xs;//?

    //if (xs.length === 0) { 
    //    return []; 
    //}
    //const ri1 = xs[0][0].ri;
    //const tS1 = ri1.tS;
    //const ri2 = xs[1][0].ri;
    //const tS2 = ri2.tS;
    //return tS1 <= tS2 ? xs : [xs[1],xs[0]];
}


function combineXs(xs: X[][]) {
    const xs_: X[][] = [];

    const lastT = Number.NEGATIVE_INFINITY;
    for (let i=0; i<xs.length; i++) {
        
    }
}


export { getEndpointIntersections2 }
