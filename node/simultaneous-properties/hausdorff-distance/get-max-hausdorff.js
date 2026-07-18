const { max } = Math;
/** @internal */
function getMaxHausdorff(i) {
    return max(i.hL + i.hEL, i.hR + i.hER);
}
export { getMaxHausdorff };
//# sourceMappingURL=get-max-hausdorff.js.map