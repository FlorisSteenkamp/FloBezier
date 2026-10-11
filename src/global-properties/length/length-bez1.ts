import { distanceBetween } from "flo-vector2d";

const { abs } = Math;


/**
 * Returns the curve length of the given line within the specified parameter
 * interval.
 * 
 * @param interval the paramter interval over which the length is 
 * to be calculated (often `[0,1]`)
 * @param ps a linear bezier curve given by an ordered array of its control
 * points, e.g. `[[0,0],[1,1]]`
 * 
 * @internal
 */
 function lengthBez1(
        interval: number[],
        ps: number[][]): number {

    const [t1,t2] = interval;

    // Note: do *not* calculate the two endpoints of the interval and then the
    // distance between them since that results in catastrophic cancellation
    // for short intervals - the speed is constant so simply scale the length.
    return abs(t2 - t1)*distanceBetween(ps[0], ps[1]);
}


export { lengthBez1 }
