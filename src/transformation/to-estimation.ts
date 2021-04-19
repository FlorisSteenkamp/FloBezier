import { eEstimate } from "big-float-ts";

const estimate = eEstimate;


function toEstimation(ps: number[][][]): number[][] {
    return ps.map(p => p.map(c => estimate(c)));
}


export { toEstimation }
