/**
 * A pair of closest points (one on each of two bezier curves) and the
 * distance between them, see [[closestPointsBetweenBeziers]].
 */
interface PointsWithDistance {
    readonly pA: {
        p: number[];
        t: number;
    };
    readonly pB: {
        p: number[];
        t: number;
    };
    readonly d: number;
}
export type { PointsWithDistance };
