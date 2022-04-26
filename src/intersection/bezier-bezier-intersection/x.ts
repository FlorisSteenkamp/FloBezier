import { RootInterval } from 'flo-poly';


/** 
 * Represents an intersection point between two bezier curves.
 */
interface X {
    /** 
     * The point of intersection calculated from the root interval `ri`.
     * (Provided for convencience - use `box` for guaranteed containment.)
     */
    p: number[];

    /** 
     * The kind of intersection: 
     * * 1 => general curve-curve intersection (non-self-overlapping)
     * * 4 => interface intersection (i.e coinciding endpoints)
     * * 5 => an interval of *exact* curve overlap, i.e. an infinite number of
     * intersections; represented by this intersection (an endpoint of a curve 
     * intersecting another curve) and an additional [[X]] (that will also 
     * be of kind 5) 
     * * 6 => a point (order 0 bezier) intersecting a bezier curve
     */
    kind: 1|4|5|6;

    /** 
     * A small box that is guaranteed to contain the intersection 
     * (given by its top-left and bottom-right corner) calculated from the root
     * interval `ri`.
     */
    box: number[][];

    /**
     * First bezier parameter `t` value of intersection taken as the midpoint of
     * the root interval `ri` guaranteed to contain the intersection. 
     * (Provided for convencience - use `ri` for guaranteed containment.)
     */
    t1: number;

    /** 
     * First bezier root interval guaranteed to contain the correct `t` value in
     * the form `{ tS, tE, multiplicity }`, where `tS` and `tE` are the start and
     * end of the interval with `tE - tS` guaranteed to be less than or equal to
     * `4*Number.EPSILON`
     */
    ri1: RootInterval;

    /**
     * Second bezier parameter `t` value of intersection taken as the midpoint of
     * the root interval `ri` guaranteed to contain the intersection. 
     * (Provided for convencience - use `ri` for guaranteed containment.)
     */
    t2: number;
    
    /** 
     * Second bezier root interval guaranteed to contain the correct `t` value
     * in the form `{ tS, tE, multiplicity }`, where `tS` and `tE` are the start
     * and end of the interval with `tE - tS` guaranteed to be less than or
     * equal to `4*Number.EPSILON`
     */
    ri2: RootInterval;
}


/** @internal */
function getPFromBox(box: number[][]) {
    const tl = box[0];
    const br = box[1];

    return [
        (tl[0] + br[0])/2,
        (tl[1] + br[1])/2,
    ];
}


export { X, getPFromBox }
