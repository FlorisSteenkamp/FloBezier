/**
 * Returns the hybrid quadratic version of the given cubic bezier. For a
 * definition of hybrid quadratic bezier curves please see this paper:
 * http://scholarsarchive.byu.edu/cgi/viewcontent.cgi?article=2206&context=etd
 *
 * * returns an array of three quadratic bezier points where the
 * middle point is a 'hybrid' point represented as a line (itself represented
 * by two points (a linear bezier curve)) that can be evaluated at a different
 * `t` value (call it `th`). If evaluated at the same t value the result is the
 * same as evaluating the original cubic bezier at `t`.
 *
 * * the length of the linear bezier curve mentioned above is a measure of how
 * closely the cubic can be represented as a quadratic bezier curve.
 *
 * @param ps a cubic bezier curve.
 *
 * @doc mdx
 */
declare function toHybridQuadratic(ps: number[][]): [
    [
        number,
        number
    ],
    [
        [
            number,
            number
        ],
        [
            number,
            number
        ]
    ],
    [
        number,
        number
    ]
];
export { toHybridQuadratic };
