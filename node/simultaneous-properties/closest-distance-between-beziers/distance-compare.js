import { getMaxDistance, getMinDistance } from "./get-min-max-distance.js";
/**
 * @param a
 * @param b
 *
 * @internal
 */
function distanceCompareMaxAsc(a, b) {
    const diff = (getMaxDistance(a) - getMaxDistance(b));
    if (diff !== 0) {
        return diff;
    }
    return a.tS - b.tS;
}
/** @internal */
function distanceCompareMinDesc(a, b) {
    const diff = (getMinDistance(b) - getMinDistance(a));
    if (diff !== 0) {
        return diff;
    }
    return a.tS - b.tS;
}
export { distanceCompareMinDesc, distanceCompareMaxAsc };
//# sourceMappingURL=distance-compare.js.map