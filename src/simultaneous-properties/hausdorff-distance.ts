
import { closestPointOnBezier } from './closest-point-on-bezier/closest-point-on-bezier';
import { splitByMaxCurveLength } from '../transformation/split-merge-clone/split-by-max-curve-length';
import { distanceBetween } from 'flo-vector2d';
import { evalDeCasteljau } from '../local-properties-at-t/t-to-xy/eval-de-casteljau';


function hausdorffDistanceCandidates(
        ps1: number[][], 
        ps2: number[][],
        maxLength: number): { p1: number[], p2: number[], d: number }[] {

    let ts = splitByMaxCurveLength(ps1, maxLength);
    let candidates: { p1: number[], p2: number[], d: number }[] = [];

    for (let i=0; i<ts.length; i++) {
        let t = ts[i];
        let p = evalDeCasteljau(ps1, t);
        let v = closestPointOnBezier(ps2, p);
        candidates.push({
            p1: p,
            p2: v.p,
            d: distanceBetween(p, v.p)
        });
    }

    return candidates;
}


/**
 * Calculates and returns an approximation to the one-sided Hausdorff distance 
 * from ps1 to ps2 between two bezier curves.
 * 
 * @param ps1 
 * @param ps2 
 * @param maxLength The first curve (ps1) will be split into pieces such that
 * each piece is shorter than maxLength. All endpoints of the smaller curves
 * are then used to check the distance to the other curve. The max of these
 * are given as an estimate of the Hausdorff distance.
 * 
 * @doc
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


export { hausdorffDistance, hausdorffDistanceCandidates }
