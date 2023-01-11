import { len, fromTo as fromToVec } from "flo-vector2d";


/**
 * For the given bernstein basis cubic bezier curve return its initial and
 * terminal speeds in the form `[s0,s1]`.
 * 
 * @param ps an order 3 (cubic) bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 */
 function getCubicSpeeds(
        ps: number[][]): number[] {

    const p0 = ps[0];
    const p1 = ps[1];
    const p2 = ps[2];
    const p3 = ps[3];

    const v = [p3[0] - p0[0], p3[1] - p0[1]];  // vector from 1st to last point
    const L = len(v);
    
    const v01 = fromToVec(p0,p1);;
    const v32 = fromToVec(p3,p2);;
    
    const s0 = 3*len(v01)/L;
    const s1 = 3*len(v32)/L;

    return [s0,s1];
}


export { getCubicSpeeds }
