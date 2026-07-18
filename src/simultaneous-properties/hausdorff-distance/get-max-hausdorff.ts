import type { HausdorffInterval } from "./hausdorff-interval.js";

const { max } = Math;


/** @internal */
function getMaxHausdorff(
        i: HausdorffInterval) {

    return max(i.hL + i.hEL, i.hR + i.hER);
}


export { getMaxHausdorff }