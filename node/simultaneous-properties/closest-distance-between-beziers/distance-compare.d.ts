import { DistanceInterval } from "./distance-interval.js";
/**
 * @param a
 * @param b
 *
 * @internal
 */
declare function distanceCompareMaxAsc(a: DistanceInterval, b: DistanceInterval): number;
/** @internal */
declare function distanceCompareMinDesc(a: DistanceInterval, b: DistanceInterval): number;
export { distanceCompareMinDesc, distanceCompareMaxAsc };
