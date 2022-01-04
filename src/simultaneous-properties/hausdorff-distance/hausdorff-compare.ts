import { getMaxHausdorff } from "./get-max-hausdorff.js";
import { HausdorffInterval } from "./hausdorff-interval.js";


function hausdorffCompare(a: HausdorffInterval, b: HausdorffInterval) {
    let diff = (getMaxHausdorff(a) - getMaxHausdorff(b));
    if (diff !== 0) { return diff; }
    diff = a.tS - b.tS;
    if (diff !== 0) { return diff; }
    return a.tE - b.tE;
}


export { hausdorffCompare }
