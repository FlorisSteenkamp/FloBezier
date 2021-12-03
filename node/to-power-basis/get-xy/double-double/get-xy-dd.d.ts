/**
 * Returns the power basis representation of a line, quadratic or cubic bezier.
 *
 * * **non-exact:** if certain preconditions are met (see below) it returns the
 * exact result, else round-off may have occured during intermediate calculation.
 * * returns the power basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 *
 * * **bitlength:** If the coordinates of the control points are bit-aligned then:
 *  * max bitlength increase = 4 (for cubics)
 * (due to 'multiplication' by 9 (3x 6x 3x)
 *  * max bitlength increase = 2 (for quadratics)
 * (due to 'multiplication' by 4 (1x 2x 1x)
 *  * max bitlength increase = 1 (for lines)
 * (due to 'multiplication' by 4 (1x 1x)
 *
 * @param ps an order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
declare function getXY3Dd(ps: number[][]): [
    [
        number[],
        number[],
        number[],
        number
    ],
    [
        number[],
        number[],
        number[],
        number
    ]
];
/**
 * only quadratic monomial coefficient has an error, the others are exact
 * @param ps
 */
declare function getXY2Dd(ps: number[][]): [
    [
        number[],
        number[],
        number
    ],
    [
        number[],
        number[],
        number
    ]
];
/**
 * * exact for any bitlength
 * @param ps linear bezier curve
 */
declare function getXY1Dd(ps: number[][]): [[number[], number], [number[], number]];
export { getXY1Dd, getXY2Dd, getXY3Dd };