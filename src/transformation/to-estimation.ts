
import { estimate } from "flo-numerical";


function toEstimation(ps: number[][][]): number[][] {
    return ps.map(p => p.map(c => estimate(c)));
}


export { toEstimation }
