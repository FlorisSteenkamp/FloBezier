
import { center } from "./center";
import { getDistanceToLineFunction } from "./get-distance-to-line-function";
import { geoClip } from './clip/geo-clip';
import { Iteration } from './iteration';
import * as vector2d from 'flo-vector2d';
import { splitAtPrecise } from "../../transformation/split-merge-clone/split-at";
import { fromToPrecise } from "../../transformation/split-merge-clone/from-to";
import { coincident } from "./coincident";
//import { coincident } from '../coincident';
//import { fromToPrecise } from '../from-to';
//import { splitAtPrecise } from '../split-at';

//declare var _bez_debug_: BezDebug; 


// Helper function
function checkIntersectionInRanges(
        Q_: number[][], 
        P_: number[][], 
        qRange: number[], 
        pRange: number[], 
        idx: number,
        δ: number): { newIterations: Iteration[], t1: number } {

    let cidx = idx === 0 ? 1 : 0; // Counter flip-flop index

    // Move intersection toward the origin to prevent floating point issues
    // that are introduced specifically by the getLineEquation function. 
    // This allows us to get a relative error in the final result usually in 
    // the 10 ULPS or less range.

    [P_, Q_] = center(P_, Q_);

    //console.log(P_.toString());
    //console.log(Q_.toString());

    let Q0 = Q_[0];
    let QE = Q_[Q_.length-1]

    // Get the implict line equation for the line defined by the first and 
    // last control point of Q. This equation gives the distance between any 
    // point and the line.
    let dQ = getDistanceToLineFunction([Q0, QE]);

    // Calculate the distance from the control points of Q to the line 
    let dMin = 0;
    let dMax = 0;
    if (Q_.length === 4) {
        // Cubic
        let dQ1 = dQ(Q_[1]);
        let dQ2 = dQ(Q_[2]);

        // Calculate the fat line of Q.
        let C = (dQ1*dQ2 > 0) ? 3/4 : 4/9;
        dMin = C * Math.min(0,dQ1,dQ2);
        dMax = C * Math.max(0,dQ1,dQ2);
    } else if (Q_.length === 3) {
        // Quadratic
        let dQ1 = dQ(Q_[1]);
        dMin = 0.5 * Math.min(0,dQ1);
        dMax = 0.5 * Math.max(0,dQ1);
    } else if (Q_.length === 2) {
        // Line
        dMin = dMax = 0;
    }


    //if (typeof _bez_debug_ !== 'undefined') {
    //    _bez_debug_.generated.elems.beziers.push([P_, Q_]);
    //    _bez_debug_.generated.elems.fatLine.push(
    //        { l: [Q_[0], Q_[Q_.length-1]], minD: dMin, maxD: dMax }
    //    );
    //}

    let {tMin, tMax} = geoClip(P_, dQ, dMin, dMax);

    if (tMin === Number.POSITIVE_INFINITY) {
        // No intersection
        return { newIterations: [], t1: undefined };
    }

    if (tMax - tMin > 0.7) {
        // First try a fatline perpendicular to the line Q0 - Q3

        // Move [Q0, Q3] to the origin
        let vQ = vector2d.fromTo(Q0, QE);
        // Rotate vector by -90 degrees
        let vQr = [-vQ[1], vQ[0]];
        let l = (vector2d.len(vQ) / 2) * 2;
        // Move back to middle of Q0 and Q3
        let vQrm0 = [(Q0[0] + QE[0])/2, (Q0[1] + QE[1])/2];
        let vQrm3 = vector2d.translate(vQr, vQrm0);
    
        let dQ_ = getDistanceToLineFunction([vQrm0, vQrm3]);

        //if (typeof _bez_debug_ !== 'undefined') {
        //    _bez_debug_.generated.elems.beziers.push([P_, Q_]);
        //    _bez_debug_.generated.elems.fatLine.push(
        //        { l: [vQrm0, vQrm3], minD: -l, maxD: +l }
        //    );
        //}

        let {tMin: tMin_, tMax: tMax_} = geoClip(P_, dQ_, -l, +l);

        if (tMin === Number.POSITIVE_INFINITY) {
            // No intersection
            return { newIterations: [], t1: undefined };
        }

        tMax = Math.min(tMax, tMax_);
        tMin = Math.max(tMin, tMin_);
    }


    // The paper calls for a heuristic that if less than 30% will be
    // clipped, rather split the longest curve and find intersections in the
    // two halfs seperately.
    if (tMax - tMin > 0.7) {
        // Some length measure
        let pSpan = pRange[1] - pRange[0];
        let qSpan = qRange[1] - qRange[0];

        let pq = coincident(P_,Q_);
        if (pq !== undefined) {
            return { newIterations: [], t1: undefined };
        }

        // Split the curve in half
        if (pSpan <= qSpan) {
            cidx = idx;
            [P_, Q_] = [Q_, P_];
            [pRange, qRange] = [qRange, pRange];
        }

        // Update t range.
        let span = pRange[1] - pRange[0];
        
        // 1st half
        let tMinA = pRange[0];
        let tMaxA = tMinA + span/2;

        // 2nd half
        let tMinB = tMaxA;
        let tMaxB = pRange[1];

        let [A, B] = splitAtPrecise(P_, 0.5);

        return {  
            newIterations: [{ 
                ps1: A, 
                ps2: Q_, 
                tRange1: [tMinA, tMaxA], 
                tRange2: qRange, 
                idx: cidx 
            }, { 
                ps1: B, 
                ps2: Q_, 
                tRange1: [tMinB, tMaxB], 
                tRange2: qRange, 
                idx: cidx 
            }],
            t1: undefined
        };
    }


    // Update t range.
    let span = pRange[1] - pRange[0];
    let tMin_ = (tMin*span + pRange[0]);
    let tMax_ = (tMax*span + pRange[0]);

    if (Math.abs((tMax - tMin) * span) < δ) {
        // Accurate enough solution found
        let t1 = (((tMax + tMin) * span) / 2) + pRange[0];
        return { newIterations: [], t1 };
    }

    // Clip
    P_ = fromToPrecise(P_)(tMin, tMax);

    // Swap Q and P and iterate.
    return {  
        newIterations: [{ 
            ps1: P_, 
            ps2: Q_, 
            tRange1: [tMin_, tMax_], 
            tRange2: qRange, 
            idx: cidx 
        }],
        t1: undefined
    };
}


export { checkIntersectionInRanges }
