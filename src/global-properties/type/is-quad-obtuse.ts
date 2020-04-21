
import { fromTo, dot } from "flo-vector2d";


/** 
 * Returns true if the given quadratic bezier is obtuse, false otherwise (i.e.
 * false if acute). 
 * Obtuse here is defined as follows: Let the quad form a triangle through its 
 * control points P0, P1, P2 where P0 and P2 are the endpoints. If both interior
 * angles ∠P0 and ∠P2 are <= 90 degrees then the quad is considered acute,
 * otherwise it is considered obtuse.
 */
function isQuadObtuse(ps: number[][]) {
    let v0 = fromTo(ps[0], ps[1]);
    let v1 = fromTo(ps[1], ps[2]);
    let v2 = fromTo(ps[2], ps[0]);

    let angleP0Obtuse = dot(v2, v0) > 0;
    let angleP2Obtuse = dot(v1, v2) > 0;

    return angleP0Obtuse || angleP2Obtuse;
}


export { isQuadObtuse }
    