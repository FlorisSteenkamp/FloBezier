import { HausdorffInterval } from "./hausdorff-interval";


/** @internal */
function getMaxHausdorff(i: HausdorffInterval) {
    return Math.max(i.hL + i.hEL, i.hR + i.hER);
}


export { getMaxHausdorff }