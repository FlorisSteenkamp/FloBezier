import { orient2d as _orient2d } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const orient2d = _orient2d;


/**
 * Returns `true` if the given bezier curve has all control points collinear,
 * `false` otherwise.
 * 
 * * if you need to know whether a given bezier curve can be converted to an 
 * order 1 bezier curve (a line) such that the same `(x,y)` point is returned
 * for the same `t` value then use e.g. [[isQuadReallyLine]] instead.
 * 
 * * **exact** not susceptible to floating point round-off
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[1,2],[3,4],[5,6],[7,8]]`
 * 
 * @doc mdx
 */
function isCollinear(ps: number[][]): boolean {
    if (ps.length === 4) {
        // Cubic bezier
        return (
            orient2d(ps[0], ps[1], ps[2]) === 0 &&
            orient2d(ps[1], ps[2], ps[3]) === 0 &&
            // The below check is necessary for if ps[1] === ps[2]
            orient2d(ps[0], ps[2], ps[3]) === 0
        );
    }

    if (ps.length === 3) {
        // Quadratic bezier
        return orient2d(ps[0], ps[1], ps[2]) === 0;
    }

    if (ps.length <= 2) {
        // Line (or point)
        return true;
    }


    throw new Error('The given bezier curve must be of order <= 3.');
}


/**
 * Returns `true` if the given bezier curve has all control points the 
 * same `y` value (possibly self-overlapping), `false` otherwise.
 * 
 * @param ps An order 0, 1, 2 or 3 bezier curve.
 * 
 * @doc
 */
function isHorizontal(ps: number[][]) {
    const y = ps[0][1];
    for (let i=1; i<ps.length; i++) {
        if (ps[i][1] !== y) {
            return false;
        }
    }

    return true;
}


/**
 * Returns `true` if the given bezier curve has all control points the 
 * same `x` value (possibly self-overlapping), `false` otherwise.
 * 
 * @param ps An order 0, 1, 2 or 3 bezier curve.
 * 
 * @doc
 */
function isVertical(ps: number[][]) {
    const x = ps[0][0];
    for (let i=1; i<ps.length; i++) {
        if (ps[i][0] !== x) {
            return false;
        }
    }

    return true;
}


export { isCollinear, isHorizontal, isVertical }
