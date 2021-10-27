import { RootIntervalExp, RootInterval } from 'flo-poly';


/** 
 * Represents one side of an intersection.
 */
interface X {
    // TODO
    /** The root interval if compensated zero times (not compensated) */
    ri: RootInterval;
    /** 
     * The kind of critical point: 
     * * 1 => general curve-curve intersection (non-self-overlapping)
     * * 2 => self intersection, a.k.a. ordinary double point, a.k.a crunode
     * * 3 => cusp
     * * 4 => interface intersection (i.e coinciding endpoints)
     * * 5 => an interval of *exact* curve overlap, i.e. an infinite number of
     * intersections; represented by this intersection (an endpoint of a curve 
     * intersecting another curve) and an additional [[X]] (that will also 
     * be of kind 5) 
     * * 6 => a point (order 0 bezier) intersecting another bezier
     * TODO
     * * 0 => extreme, e.g. topmost point
     */
    kind: 0|1|2|3|4|5|6;
    /** A box that is guaranteed to contain the intersection */
    box: number[][];

    // TODO - move maybe to boolean operations only
    /** The number of times the root has been compensated (if undefined implies 0) */
    compensated?: number;
    /** The root interval if compensated 1 or more times */
    riExp?: RootIntervalExp;
    getPExact?: () => number[][];
}


export { X }
