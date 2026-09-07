import { splitByDeviationFromStraighLine_Quad } from "./split-by-deviation-from-straigh-line-quad";
import { splitByDeviationFromStraighLine_Cubic } from "./split-by-deviation-from-straight-line-cubic";


function splitByDeviationFromStraighLine(
        ps: number[][], 
        maxD: number): number[] {

    if (ps.length < 3) {
        return [0, 1];
    }

    if (ps.length === 3) {
        return splitByDeviationFromStraighLine_Quad(ps, maxD);
    }

    if (ps.length === 4) {
        return splitByDeviationFromStraighLine_Cubic(ps, maxD);
    }

    throw new Error(`splitByDeviationFromStraighLine: bezier order must be 0,1,2 or 3; found ${ps.length - 1}`);
}


export { splitByDeviationFromStraighLine }