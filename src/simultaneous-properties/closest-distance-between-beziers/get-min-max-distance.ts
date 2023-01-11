import { DistanceInterval } from "./distance-interval";

const { min, max } = Math;


/** @internal */
function getMaxDistance(i: DistanceInterval) {
    return max(i.dL + i.eL, i.dR + i.eR);
}


/** @internal */
function getMinDistance(i: DistanceInterval) {
    return min(i.dL - i.eL, i.dR - i.eR);
}


export { getMaxDistance, getMinDistance }