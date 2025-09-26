import { distanceBetween } from 'flo-vector2d';
import { closestPointOnBezier, evalDeCasteljau, splitByLength } from '../../src/index.js';


/**
 * Calculates and returns an approximation to the one-sided Hausdorff distance 
 * from ps1 to ps2 between two bezier curves in a naive way.
 * 
 * @param A 
 * @param B 
 * @param maxLength The first curve (ps1) will be split into pieces such that
 * each piece is shorter than maxLength. All endpoints of the smaller curves
 * are then used to check the distance to the other curve. The max of these
 * are given as an estimate of the Hausdorff distance.
 */
 function H(
        A: number[][], 
        B: number[][],
        maxLength: number): number {

    let ts = splitByLength(A, maxLength);
    let candidates = [];
    let maxD = Number.NEGATIVE_INFINITY;
    for (let i=0; i<ts.length; i++) {
        const t = ts[i];
        const p = evalDeCasteljau(A, t);
        const v = closestPointOnBezier(B, p);
        const d = distanceBetween(p, v.p);
        candidates.push({
            t, p1: p, p2: v, d
        });

        if (d > maxD) {
            maxD = d;
        }
    }

    return maxD;
}


/**
* Calculates and returns an approximation to the two-sided Hausdorff distance 
* in a naive way.
*/
function HH(
        A: number[][], 
        B: number[][],
        maxLength: number): number {

    return Math.max(
        H(A,B,maxLength), 
        H(B,A,maxLength)
    );
}


export { H, HH }