import { allRootsCertified, RootInterval } from "flo-poly";
import { tFromXY } from "../../../src/intersection/t-from-xy";
import { getCoeffsBezBez }  from './get-coefficients/get-coeffs-bez-bez';


// TODO - docs
function bezierBezierIntersectionBoundless(
        ps1: number[][], 
        ps2: number[][]): RootInterval[] {
   
    let _coeffs = getCoeffsBezBez(ps1,ps2);
    if (_coeffs === undefined) { 
        // infinite number of intersections (or maybe not!)
        // TODO
        //console.log('use endpoint Xs')
        return undefined; 
    }

    let { coeffs, errBound, getPExact } = _coeffs;

    const rs = allRootsCertified(coeffs, 0, 1, errBound, getPExact, true);

    if (rs === undefined) {
        // TODO - finish (endpoint intersections)
        console.log(tFromXY(ps1, ps2[0]));
        console.log(tFromXY(ps1, ps2[3]));
    }

    return rs;
}


export { bezierBezierIntersectionBoundless }
