import { allRoots } from "flo-poly";
import { getCoeffsCubic, getCeoffsQuadratic, getCeoffsLine } from "./get-coeffs";
import { evalDeCasteljau } from "../../../local-properties-at-t/t-to-xy/eval-de-casteljau";


function circleBezierIntersection(
        circle: { center: number[], radius: number}, 
        ps: number[][]) {

    let poly: number[];
    if (ps.length === 4) {
        poly = getCoeffsCubic(circle, ps);
    } else if (ps.length === 3) {
        poly = getCeoffsQuadratic(circle, ps);
    } else if (ps.length === 2) {
        poly = getCeoffsLine(circle, ps);
    }

    let ts = allRoots(poly, 0, 1);
    return ts.map(t => {
        return {
            t,
            p: evalDeCasteljau(ps, t)
        }
    });
}





export { circleBezierIntersection }
    