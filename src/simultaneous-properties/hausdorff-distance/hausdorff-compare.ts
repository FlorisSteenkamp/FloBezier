import { getMaxHausdorff } from "./get-max-hausdorff.js";
import { HausdorffInterval } from "./hausdorff-interval.js";


/**
 * @param a 
 * @param b 
 * 
 * @internal
 */
function hausdorffCompare(
        a: HausdorffInterval,
        b: HausdorffInterval) {

    const diff = (getMaxHausdorff(a) - getMaxHausdorff(b));
    if (diff !== 0) { return diff; }
    //diff = a.tS - b.tS;
    //if (diff !== 0) { return diff; }
    //return a.tE - b.tE;
    return a.tS - b.tS;
}


export { hausdorffCompare }
