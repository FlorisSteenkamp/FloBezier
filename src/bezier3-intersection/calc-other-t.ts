
import { squaredDistanceBetween } from 'flo-vector2d';
import { evaluate } from '../evaluate/evaluate';
import { tsAtX } from '../ts-at-x';
import { tsAtY } from '../ts-at-y';
import { closestPointOnBezier } from '../closest-point-on-bezier';
import { distanceBetween } from 'flo-vector2d';


/**
 * Calculates the t-value of the closest point on Q to P(t).
 * @param δ
 * @param t
 * @param P 
 * @param Q 
 *//*
function calcOtherT(t: number, P: number[][], Q: number[][]) {

    // Get some length measure on P and Q
    // Get some length measure on P and Q
    let max = Math.max(
        Math.abs(P[0][0]), 
        Math.abs(P[0][1]), 
        Math.abs(P[1][0]), 
        Math.abs(P[1][1]), 
        Math.abs(P[2][0]), 
        Math.abs(P[2][1]), 
        Math.abs(P[3][0]), 
        Math.abs(P[3][1]),
        Math.abs(Q[0][0]), 
        Math.abs(Q[0][1]), 
        Math.abs(Q[1][0]), 
        Math.abs(Q[1][1]), 
        Math.abs(Q[2][0]), 
        Math.abs(Q[2][1]), 
        Math.abs(Q[3][0]), 
        Math.abs(Q[3][1])
    );

    let pp = evaluate(P)(t);
    let [x,y] = pp;

    let tqsh = tsAtY(Q,y);
    let tqsv = tsAtX(Q,x);
    if (!tqsh.length && !tqsv.length) { return undefined; }

    let tqs = [...tqsh, ...tqsv];

    let bestT: number = undefined;
    let bestD = Number.POSITIVE_INFINITY;
    for (let tq of tqs) {
        let pq = evaluate(Q)(tq);
        let d = squaredDistanceBetween(pp,pq);
        if (d < bestD) {
            bestD = d;
            bestT = tq;
        }
    }

    // If the best distance > the max allowed tolerance then no intersection
    // occured - this happens only in special cases where clipping occured at
    // the endpoint of a curve.
    let maxTolerance = 256 * 24*Number.EPSILON * max;
    if (bestD > maxTolerance*maxTolerance) {
        return undefined;
    }

    return bestT;
}*/


function calcOtherT(t: number, P: number[][], Q: number[][]) {

    // Get some length measure on P and Q
    let max = 0;
    for (let p of P) {
        if (max < Math.abs(p[0])) { max = Math.abs(p[0]); }
        if (max < Math.abs(p[1])) { max = Math.abs(p[1]); }
    }
    for (let p of Q) {
        if (max < Math.abs(p[0])) { max = Math.abs(p[0]); }
        if (max < Math.abs(p[1])) { max = Math.abs(p[1]); }
    }

    let p = evaluate(P)(t);
    let p_ = closestPointOnBezier(Q, p);
    
    let d = squaredDistanceBetween(p, p_.p);
    let maxTolerance = 4 * 16 * 24*Number.EPSILON * max;
    //console.log(Math.sqrt(d), maxTolerance);
    if (d > maxTolerance*maxTolerance) {
        return undefined;
    }

    return p_.t;
}


export { calcOtherT }
