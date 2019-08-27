
import { subtract, add, multiply, allRoots } from 'flo-poly';
import * as Vector from 'flo-vector2d';
import { getX } from './get-x';
import { getY } from './get-y';
import { evaluate } from './evaluate/evaluate';
import { closestPointOnBezier } from './closest-point-on-bezier';
import { splitByMaxCurveLength } from './split-by-max-curve-length';


function hausdorffDistanceCandidates(
        ps1: number[][], 
        ps2: number[][],
        maxLength: number): { p1: number[], p2: number[], d: number }[] {

    let ts = splitByMaxCurveLength(ps1, maxLength);
    let candidates: { p1: number[], p2: number[], d: number }[] = [];

    for (let i=0; i<ts.length; i++) {
        let t = ts[i];
        let p = evaluate(ps1, t);
        let v = closestPointOnBezier(ps2, p);
        candidates.push({
            p1: p,
            p2: v.p,
            d: Vector.distanceBetween(p, v.p)
        });
    }

    return candidates;
}


/**
 * Calculates and returns an approximation to the one-sided Hausdorff distance 
 * from ps1 to ps2 between two bezier curves.
 * @param ps1 
 * @param ps2 
 * @param maxLength The first curve (ps1) will be split into pieces such that
 * each piece is shorter than maxLength. All endpoints of the smaller curves
 * are then used to check the distance to the other curve. The max of these
 * are given as an estimate of the Hausdorff distance.
 */
function hausdorffDistance(
        ps1: number[][], 
        ps2: number[][],
        maxLength: number): number {

    let candidates = hausdorffDistanceCandidates(ps1, ps2, maxLength);

    let maxD = Number.NEGATIVE_INFINITY;
    for (let candidate of candidates) {
        if (candidate.d > maxD) {
            maxD = candidate.d;
        }
    }

    return maxD;
}


/**
 * TODO: incomplete - but exact (bar numerical imprecision) calculation
 * @param ps1 
 * @param ps2 
 */
function hausdorffDistance_(
        ps1: number[][], 
        ps2: number[][]): number {

    let candidates = hausdorffDistanceCandidates_(ps1, ps2);

    let maxD = Number.NEGATIVE_INFINITY;
    for (let candidate of candidates) {
        if (candidate.d > maxD) {
            maxD = candidate.d;
        }
    }

    return maxD;
}


/**
 * TODO - incomplete
 * See https://pdfs.semanticscholar.org/dca1/1890c5377ec0bc3b4e252c1d2f438ffa92a2.pdf
 * Calculates and returns the one-sided Hausdorff distance from ps1 to ps2 
 * between two bezier curves. The result is given as an array of a pair of
 * candidate points.
 */ 
function hausdorffDistanceCandidates_(
        ps1: number[][], 
        ps2: number[][]): { p1: number[], p2: number[], d: number }[] {

    let len1 = ps1.length;
    let ps1s = ps1[0];
    let ps1e = ps1[len1-1];

    let len2 = ps2.length;
    let ps2s = ps2[0];
    let ps2e = ps2[len2-1];

    let candidates: { p1: number[], p2: number[], d: number }[] = [];

    // Endpoints
    {
        let { p, t } = closestPointOnBezier(ps2, ps1s);
        candidates.push({
            p1: ps1s,
            p2: p,
            d: Vector.distanceBetween(ps1s, p)
        });
    }
    {
        let { p, t } = closestPointOnBezier(ps2, ps1e);
        candidates.push({
            p1: ps1e,
            p2: p,
            d: Vector.distanceBetween(ps1e, p)
        });
    }


    // 3.3.1 Intersection with a point-point bisector
    {
        let x_t = getX(ps1);
        let y_t = getY(ps1);
        
        let u = ps2s[0];
        let v = ps2s[1];
        let w = ps2e[0];
        let z = ps2e[1];

        let A = subtract(x_t, [u]);
        let B = subtract(y_t, [v]);
        let C = subtract(x_t, [w]);
        let D = subtract(y_t, [z]);

        let E = add(multiply(A,A), multiply(B,B));
        let F = add(multiply(C,C), multiply(D,D));

        let G = subtract(E, F);

        candidates.push(...allRoots(G, 0, 1).map(t => {
            let p1 = evaluate(ps1, t);
            let p2 = ps2s;
            return { p1, p2, d: Vector.distanceBetween(p1,p2) }
        }));
    }


    // 3.3.2 Intersection with a point-curve bisector - start endpoint
    {
        let xa_t = getX(ps1);
        let ya_t = getY(ps1);
        let xb_s = getX(ps2);
        let yb_s = getY(ps2);
        
        // FAIL - we need to solve systems of polynomial equations - too hard
        // But in future use Sylvester matrix, etc. to solve - even for systems
        // with 3 or more equations there exist algorithms
        // Alternatively, in case of quad beziers, use the actual self-bisector 
        // to intersect - it is just a line
    }

    return candidates;
}


/**
 * TODO - incomplete
 * Calculates and returns an estimate of the one-sided Hausdorff distance 
 * (from ps1 to ps2) between two acute quadratic bezier curves, 2 lines or a 
 * quad and a line.
 * @param ps1 A cubic bezier
 * @param ps2 Another cubic bezier
 * @param tolerance flatness tolerance - in units
 *//*
function hausdorffDistance(
        ps1: number[][], 
        ps2: number[][],
        tolerance: number) {

    if (ps1.length === 2 && ps2.length === 2) {
        // From line 1 to line 2 - so check endpoints only
        let p1 = closestPointOnLine(ps2, ps1[0]);
        let p2 = closestPointOnLine(ps2, ps1[1]);

        let d1 = Vector.distanceBetween(p1.p, ps1[0]);
        let d2 = Vector.distanceBetween(p2.p, ps1[1]);

        return Math.max(d1, d2);
    }

    if (ps1.length === 2 && ps2.length === 3) {
        // From a line to a quad

    }

    if (ps1.length === 3 && ps2.length === 2) {
        // From a quad to a line
    }

    if (ps1.length === 3 && ps2.length === 3) {
        // From a quad to a quad
    }
}
*/


export { hausdorffDistance, hausdorffDistanceCandidates }
