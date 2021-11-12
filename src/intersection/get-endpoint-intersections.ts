import { createRootExact } from "flo-poly";
import { tFromXY } from '../local-properties-to-t/t-from-xy.js';import { tFromXY } from '../local-properties-to-t/t-from-xy.jsimport { tFromXY } from '../local-properties-to-t/t-from-xy.js
import { X } from "./bezier-bezier-intersection/x";
import { getIntervalBox } from "../global-properties/bounds/get-interval-box/get-interval-box";


/**
 * Returns the parameter `t` values where the endpoints of the two 
 * given *algebraically identical* curves overlap.
 * 
 * * **precondition:** the two given curves must be *algebraically identical*
 * (i.e. in the same k-family, in other words identical except possibly for
 * endpoints). This can be checked for by calling [[areBeziersInSameKFamily]].
 * * **precondition:** neither bezier curve may be of order 1 (a point)
 * 
 * @param ps1 an order 1,2 or 3 bezier curve
 * @param ps2 another order 1,2 or 3 bezier curve
 * @param minD an error bound given as a distance
 * 
 * @doc mdx
 */
function getEndpointIntersections(
        ps1: number[][],
        ps2: number[][]): X[][] {

    const p1S = ps1[0];
    const p1E = ps1[ps1.length-1];
    const p2S = ps2[0];
    const p2E = ps2[ps2.length-1];
    
    // // keep TypeScript happy; `tFromXY` cannot return `undefined` at this stage
    const t2S1 = tFromXY(ps2, p1S)!;
    const t2E1 = tFromXY(ps2, p1E)!;
    const t1S2 = tFromXY(ps1, p2S)!;
    const t1E2 = tFromXY(ps1, p2E)!;

    const xs: X[][] = [];

    xs.push(
        ...t2S1.map<X[]>(ri => {
            const box = getIntervalBox(ps2, [ri.tS, ri.tE]);
            return [
                { ri: createRootExact(0), kind: 5, box },
                { ri, kind: 5, box }
            ]
        }),
        ...t2E1.map<X[]>(ri => {
            const box = getIntervalBox(ps2, [ri.tS, ri.tE]);
            return [
                { ri: createRootExact(1), kind: 5, box },
                { ri, kind: 5, box }
            ]
        }),
        ...t1S2.map<X[]>(ri => {
            const box = getIntervalBox(ps1, [ri.tS, ri.tE]);
            return [
                { ri, kind: 5, box },
                { ri: createRootExact(0), kind: 5, box }
            ]
        }),
        ...t1E2.map<X[]>(ri => {
            const box = getIntervalBox(ps1, [ri.tS, ri.tE]);
            return [
                { ri, kind: 5, box },
                { ri: createRootExact(1), kind: 5, box }
            ]
        })
    );
   
    return xs;
}


export { getEndpointIntersections }
