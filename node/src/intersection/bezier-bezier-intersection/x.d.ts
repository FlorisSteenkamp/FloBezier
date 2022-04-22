import { RootIntervalExp, RootInterval } from 'flo-poly';
/**
 * Represents an intersection point between two bezier curves as 'seen' by one
 * of the curves.
 *
 * A full description of an intersection is then represented by a pair of `X`s,
 * as from the point of view of each curve.
 */
interface X {
    /**
     * The root interval guaranteed to contain the correct `t` value in the
     * form `{ tS, tE, multiplicity }`, where `tS` and `tE` are the start and
     * end of the interval with `tE - tS` guaranteed to be less than or equal to
     * `4*Number.EPSILON`
     */
    ri: RootInterval;
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
    kind: 1 | 4 | 5 | 6;
    /** A box that is guaranteed to contain the intersection */
    box: number[][];
    /** The number of times the root has been compensated (if undefined implies 0) */
    compensated?: number;
    /** The root interval if compensated 1 or more times */
    riExp?: RootIntervalExp;
    getPExact?: () => number[][];
}
export { X };
