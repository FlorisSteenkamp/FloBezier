import type { ImplicitForm2Coeffs } from "../../implicit-form/implicit-form-types";
import { allRoots } from 'flo-poly';
import { getImplicitCoeffsBez2Bez2 } from "./get-coefficients/double/get-implicit-coeffs-bez2-bez2.js";import { getImplicitCoeffsBez2Bez2 } from "./get-coefficients/double/get-implicit-coeffs-bez2-bez2.js
import { evaluateImplicit2 } from '../../implicit-form/evaluate/double/evaluate-implicit2';


// not limited to bezier curves, e.g. can include ellipses, etc.
function implicitFormIntersection22(
    cs1: ImplicitForm2Coeffs<number>,
    cs2: ImplicitForm2Coeffs<number>,
    maxAbsXY = 2*30): number[][] {

    const [coeffsX, coeffsY] = getImplicitCoeffsBez2Bez2(cs1, cs2);

    const risX = allRoots(coeffsX, -maxAbsXY, maxAbsXY);
    const risY = allRoots(coeffsY, -maxAbsXY, maxAbsXY);

    console.log('coeffsX', coeffsX);
    console.log('coeffsY', coeffsY);
    const ps: number[][] = [];

    for (let i=0; i<risX.length; i++) {
        const x = risX[i];
        let min = Number.POSITIVE_INFINITY;
        let minJ: number;
        for (let j=0; j<risY.length; j++) {
            const y = risY[j];
            const h = evaluateImplicit2(cs1, x, y);
            if (h < min) {
                min = h;
                minJ = j;
            }
        }
        ps.push([x, risY[minJ]]);
    }

    return ps;
}


export { implicitFormIntersection22 }

