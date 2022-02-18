import { getMaxHausdorff } from "./get-max-hausdorff.js";
function hausdorffCompare(a, b) {
    let diff = (getMaxHausdorff(a) - getMaxHausdorff(b));
    if (diff !== 0) {
        return diff;
    }
    diff = a.tS - b.tS;
    if (diff !== 0) {
        return diff;
    }
    return a.tE - b.tE;
}
export { hausdorffCompare };
//# sourceMappingURL=hausdorff-compare.js.map