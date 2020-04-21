import { RootInterval } from 'flo-poly/node/roots/multi-with-err-bound/root-interval';
import { RootIntervalExp } from 'flo-poly';
/**
 * Representation of one side of an intersection.
 */
interface X {
    /** The root interval if compensated zero times (not compensated) */
    ri: RootInterval;
    /** The number of times the root has been compensated (if undefined implies 0) */
    compensated?: number;
    /** The root interval if compensated 1 or more times */
    riExp?: RootIntervalExp;
    getPsExact?: () => number[][][];
    /**
     * The kind of critical point:
     * * 0 => extreme, e.g. topmost point
     * * 1 => general (non-self) intersection
     * * 2 => self intersection
     * * 3 => cusp
     * * 4 => interface intersection
     * * 5 => exact overlap with other bezier endpoints
     */
    kind: 0 | 1 | 2 | 3 | 4 | 5;
    /** A box that is guaranteed to contain the intersection */
    box: number[][];
}
export { X };
