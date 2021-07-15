import { compareCurvaturesAtInterface } from "./compare-curvatures-at-interface";
import { getDegenerateInterfaceCcw } from './get-degenerate-interface-ccw';
import { dot } from './dot';
import { cross } from './cross';


/**
 * Returns a positive value if the second bezier curve (of order 1, 2 or 3) 
 * curves anti-clockwise with respect to the first at the point where the first 
 * bezier curve ends and the second one starts. Returns a negative number if 
 * the turn is clockwise. Returns 0 otherwise, unless either curve degenerates
 * to a point.
 * 
 * The algorithm is a generalization of `ccw` (counter-clockwise), a.k.a 
 * `orient2d`.
 * 
 * * **precondition:** the given curve endpoints coincide as described.
 * * **precondition:** TODO underflow/overflow
 * 
 * @param psI The incoming bezier that ends at the interface
 * @param psO The outgoing bezier that starts at the interface
 * 
 * @doc
 */
// TODO - currently only working for cubic curves - implement other orders too
function getInterfaceCcw(
        psI: number[][], 
        psO: number[][]) {

    // Reverse incoming curve to conceptually simplify algorithm.
    // We then also need to invert the sign of the result, i.e `-/+ <--> +/-`
    const ps1 = psI.slice().reverse();
    const ps2 = psO;

    const p10 = ps1[0];
    const p11 = ps1[1];
    const p12 = ps1[2];
    const p13 = ps1[3];

    const p20 = ps2[0];
    const p21 = ps2[1];
    const p22 = ps2[2];
    const p23 = ps2[3];

    const [x10,y10] = p10;
    const [x11,y11] = p11;
    const [x12,y12] = p12;
    const [x13,y13] = p13;

    const [x20,y20] = p20;
    const [x21,y21] = p21;
    const [x22,y22] = p22;
    const [x23,y23] = p23;

    // a precondition is: `(x10 === x20 && y10 === y20)`

    const t1x = x11 - x10;  // tangent x-coordinate
    const t1y = y11 - y10;  // tangent y-coordinate
	const t2x = x21 - x20;  // tangent x-coordinate
    const t2y = y21 - y20;  // tangent y-coordinate

    if ((t1x === 0 && t1y === 0) || (t2x === 0 && t2y === 0)) {
        return getDegenerateInterfaceCcw([
            x10,y10,x11,y11,x12,y12,x13,y13,
            x20,y20,x21,y21,x22,y22,x23,y23,
        ]);
    }


    // The cross below is exact by adaptive infinite precision
    const nc = -cross([t1x,t1y], [t2x,t2y]);

    if (nc !== 0) {
        return nc;
    }

    /*
    const dotTangents = dot([t1x,t1y], [t2x,t2y]);
    if (dotTangents > 0) {
        // Curves go in same direction at interface - neither clock or 
        // anti-clockwise.
        // Note: The above comment is not strictly true but as this case is not
        // important for the algorithm we return 0
        return 0;
    } 
    */

    // Curves go in opposite directions at interface starting off with the exact
    // same tangent - look now at curvature to see which has the largest 
    // curvature so we can base the clock or anti-clockwise result on that

    // Look at curvature
    //return compareCurvaturesAtInterface(psI.slice().reverse(), psO);
    return compareCurvaturesAtInterface(ps1, ps2);
}


export { getInterfaceCcw }
