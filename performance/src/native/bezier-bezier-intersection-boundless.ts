import { eEstimate } from "big-float-ts";
import { allRootsCertified, differentiate, RootInterval, toCasStr } from "flo-poly";
import { isCubicReallyQuad, isQuadReallyLine, toQuadraticFromCubic } from "../../../src";
import { getCoeffs }  from './get-coeffs';


function bezierBezierIntersectionBoundless(
        ps1: number[][], 
        ps2: number[][]): RootInterval[] {
   
    if (ps1.length === 4 && isCubicReallyQuad(ps1)) {
        ps1 = toQuadraticFromCubic(ps1)
    }
    if (ps1.length === 3 && isQuadReallyLine(ps1)) {
        ps1 = [ps1[0], ps1[2]];
    }
    // TODO
    //if (ps1.length === 2 && isLineReallyPoint(ps1)) {
    //    ps1 = [ps1[0]];
    //}

    if (ps2.length === 4 && isCubicReallyQuad(ps2)) {
        ps2 = toQuadraticFromCubic(ps2)
    }
    if (ps2.length === 3 && isQuadReallyLine(ps2)) {
        ps2 = [ps2[0], ps2[2]];
    }
    // TODO
    //if (ps2.length === 2 && isLineReallyPoint(ps2)) {
    //    ps2 = [ps2[0]];
    //}

    let _coeffs = getCoeffs(ps1,ps2);
    if (_coeffs === undefined) { 
        // infinite number of intersections (or maybe not!)
        return undefined; 
    }

    let { coeffs, errBound, getPExact } = _coeffs;

    const rs = allRootsCertified(coeffs, 0, 1, errBound, getPExact);

    //console.log(rs.map(r => r.tS));
    //console.log(rs.map(r => r.multiplicity));
    //console.log(rs.map(r => `${r.tS} | ${r.tE} => ${r.tE - r.tS} ` ));

    return rs;
}


//const ps = [
//    [0.4618254473553179,3.1],
//    [0.029562388526279904,0],
//    [0.2807926522345028,1],
//    [0.7686517004998734,3]
//]

export { bezierBezierIntersectionBoundless }


// -3.1994381124136018*x^9 + 38.08363430582642*x^8 - 179.90097590258208*x^7 + 
// 428.6613433466517*x^6 - 542.1599363726383*x^5 + 349.48483516902826*x^4 - 
// 93.76584286994452*x^3 + 2.8262365602455914*x^2 - 0.029963520303561357*x + 
// 0.0001073961301202917


// 0.010909612950350225 <- 2**50 error bound
// 0.01090967000183587 -> 0.010909670001836092 <- 2**0 error bound
// 0.01090967008633885 <= correct


// big_float_ts_1.eEstimate(src_1.evaluate_anyBitlength_exact(ps, 0.01090967008633885)[1])