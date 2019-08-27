
import * as Vector from 'flo-vector2d';

import { evaluate } from './evaluate/evaluate';
import { lineIntersection } from './line-intersection';
import { normal   } from './normal';


/**
 * Check if the two given cubic beziers are nearly coincident everywhere along
 * a finite stretch and returns the coincident stretch (if any), otherwise 
 * returns undefined.
 * @param P - A cubic bezier curve.
 * @param Q - Another cubic bezier curve.
 * @param δ - An indication of how closely the curves should stay to
 * each other before considered coincident.
 */
function coincident(
        P: number[][], 
        Q: number[][], 
        δ: number = 1e-6): { p: number[], q: number[] } {

    let PtoQs = [0.01,0.99].map(i => calcPointAndNeighbor(P,Q,i));
    let QtoPs = [0.01,0.99].map(i => calcPointAndNeighbor(Q,P,i));

    // Check if start and end points are coincident.
    let tStartQ = 0.01;
    let tEndQ   = 0.99;
    let tStartP = 0.01;
    let tEndP   = 0.99;

    if (PtoQs[0].d <= δ) { tStartQ = PtoQs[0].t; } 
    if (PtoQs[1].d <= δ) { tEndQ   = PtoQs[1].t; }
    if (QtoPs[0].d <= δ) { tStartP = QtoPs[0].t; } 
    if (QtoPs[1].d <= δ) { tEndP   = QtoPs[1].t; }

    if (tStartP > tEndP) { [tStartP, tEndP] = [tEndP, tStartP]; }
    if (tStartQ > tEndQ) { [tStartQ, tEndQ] = [tEndQ, tStartQ];	}

    let tSpanP = tEndP - tStartP;
    let tSpanQ = tEndQ - tStartQ;

    // We must check at least 10 points to ensure entire curve is coincident, 
    // otherwise we may simply have found intersection points. We cannot simply 
    // check the control points for closeness since well seperated control 
    // points does not necessarily translate into well seperated curves.

    // If the overlapping part is smaller than 1/10 (a heuristical value) then
    // do not consider pieces overlapping.
    if (tSpanP < 0.1 && tSpanQ < 0.1) {
        return undefined;
    }

    let res = true;
    for (let i=0; i<10; i++) {
        let t = tStartP + tSpanP*(i/10);
        let { d } = calcPointAndNeighbor(P,Q,t);
        if (d > δ) {
            return undefined;
        }
    }

    return { p: [tStartP, tEndP], q: [tStartQ, tEndQ] };
}


function calcPointAndNeighbor(P: number[][], Q: number[][], t: number) {
    // TODO - must also check crossing of normals - for if two curves open
    // at endpoints and stop essentially at same point.
    let pp1 = evaluate(P)(t);
    let normalVector = normal(P)(t);
    let pp2 = Vector.translate(pp1,normalVector);
    let ts = lineIntersection(Q, [pp1,pp2]);

    let bestT = undefined;
    let bestQ = undefined;
    let bestD = Number.POSITIVE_INFINITY;
    for (let t of ts) {
        let q = evaluate(Q)(t);
        let d = Vector.distanceBetween(q, pp1);
        if (d < bestD) {
            bestT = t;
            bestQ = q;
            bestD = d;
        }
    }
    return { t: bestT, p: bestQ, d: bestD };
}


export { coincident }
