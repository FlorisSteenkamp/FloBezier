import { getMaxDistance, getMinDistance } from "./get-min-max-distance.js";
import { DistanceInterval } from "./distance-interval.js";


/**
 * @param a 
 * @param b 
 * 
 * @internal
 */
function distanceCompareMaxAsc(
        a: DistanceInterval,
        b: DistanceInterval) {

    const diff = (getMaxDistance(a) - getMaxDistance(b));
    if (diff !== 0) {
        return diff;
    }

    return a.tS - b.tS;
}


/** @internal */
function distanceCompareMinDesc(
        a: DistanceInterval,
        b: DistanceInterval) {

    const diff = (getMinDistance(b) - getMinDistance(a));
    if (diff !== 0) {
        return diff;
    }

    return a.tS - b.tS;
}


export { distanceCompareMinDesc, distanceCompareMaxAsc }
