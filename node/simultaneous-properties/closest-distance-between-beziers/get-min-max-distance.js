const { min, max } = Math;
/** @internal */
function getMaxDistance(i) {
    return max(i.dL + i.eL, i.dR + i.eR);
}
/** @internal */
function getMinDistance(i) {
    return min(i.dL - i.eL, i.dR - i.eR);
}
export { getMaxDistance, getMinDistance };
//# sourceMappingURL=get-min-max-distance.js.map