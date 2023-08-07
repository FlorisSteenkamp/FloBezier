import { twoDiff, eMultDouble2, eMult, eAdd, eDiff, eNegativeOf } from "big-float-ts";


// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const emd = eMultDouble2;
const eme = eMult;
const eae = eAdd;
const ede = eDiff;


// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const td = twoDiff;


/**
 * Returns the polynomial whose zero is the t value of maximum absolute 
 * curvature for the given *quadratic* bezier curve.
 * 
 * * **precondition:** the given parabola is not degenerate to a line
 * * **non-exact:** there is floating point roundof during calculation
 * * see e.g. [math.stackexchange](https://math.stackexchange.com/a/2971112)'s
 * answer by [KeithWM](https://math.stackexchange.com/a/2971112/130809)
 * 
 * @param ps an order 2 bezier curve given as an array of control points, 
 * e.g. `[[0,0],[1,1],[2,1]]`
 * 
 * @internal
 */
function getCurvatureExtremaQuadraticPolyE(
        ps: number[][]): number[][] {

    // Find the point of max curvature (of the parabola)

    // calculate t*
    const [[x0,y0],[x1,y1],[x2,y2]] = ps;

    const x10 = td(x1,x0);
    const x21 = td(x2,x1);
    const wx = ede(x21,x10);

    const y10 = td(y1,y0);
    const y21 = td(y2,y1);
    const wy = ede(y21,y10);

    const n = eae(
        ede(
            emd(x0,(ede(wx,[0,-x1]))),
            emd(x1,(ede(x21,[0,-x1])))
        ),
        ede(
            emd(y0,(ede(wy,[0,-y1]))),
            emd(y1,(ede(y21,[0,-y1])))
        )
    );

    const d = eae(eme(wx,wx),eme(wy,wy));

    return [d, eNegativeOf(n)];
}


export { getCurvatureExtremaQuadraticPolyE }
