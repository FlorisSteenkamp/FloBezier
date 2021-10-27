import type { ImplicitForm1Coeffs } from "../../implicit-form/implicit-form-types";
import { allRoots } from 'flo-poly';
import { getImplicitCoeffsBez1Bez1 } from "./get-coefficients/double/get-implicit-coeffs-bez1-bez1";
import { evaluateImplicit1 } from '../../implicit-form/evaluate/double/evaluate-implicit1';


// not limited to bezier curves, e.g. can include ellipses, etc.
function implicitFormIntersection11(
    cs1: ImplicitForm1Coeffs<number>,
    cs2: ImplicitForm1Coeffs<number>,
    maxAbsXY = 2*30): number[] {

    const [coeffsX, coeffsY] = getImplicitCoeffsBez1Bez1(cs1, cs2);

    const risX = allRoots(coeffsX, -maxAbsXY, maxAbsXY);
    const risY = allRoots(coeffsY, -maxAbsXY, maxAbsXY);

    const ps: number[] = [];

    for (let i=0; i<risX.length; i++) {
        const x = risX[i];
        let min = Number.POSITIVE_INFINITY;
        let minJ: number;
        for (let j=0; j<risY.length; j++) {
            const y = risY[j];
            const h = evaluateImplicit1(cs1, x, y);
            if (h < min) {
                min = h;
                minJ = j;
            }
        }
        ps.push(x, risY[minJ]);
    }

    return ps;
}


export { implicitFormIntersection11 }

