
import { getCoeffsCubicQuad, getCoeffsQuadraticQuad, getCoeffsLinearQuad } from './quad/get-coeffs-quad';
import { allRootsCertified, mid } from 'flo-poly';
import { evalDeCasteljau } from '../../local-properties-at-t/t-to-xy/eval-de-casteljau';


/**
 * * **precondition** max bit-aligned bitlength === 47
 * * returned parameter values are guaranteed accurate to within 4 ulps
 * 
 * @param circle 
 * @param ps 
 * 
 * @doc
 */
function circleBezierIntersectionPrecise(
        circle: { center: number[], radius: number}, 
        ps: number[][]) {

    let poly: number[][];
    if (ps.length === 4) {
        poly = getCoeffsCubicQuad(circle, ps);
    } else if (ps.length === 3) {
        poly = getCoeffsQuadraticQuad(circle, ps);
    } else if (ps.length === 2) {
        poly = getCoeffsLinearQuad(circle, ps);
    }

    let ts = allRootsCertified(poly, 0, 1);

    return ts.map(t => {
        return {
            //t: t.tM,
            t: mid(t),
            //p: evalDeCasteljau(ps, t.tM)
            p: evalDeCasteljau(ps, mid(t))
        }
    });
}


export { circleBezierIntersectionPrecise }
    