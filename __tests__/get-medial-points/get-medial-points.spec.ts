import { test, describe, expect, it } from '@jest/globals';
import { getMedialPoints } from '../../src/get-medial-points/get-medial-points.js';
import { closestPointOnBezier } from '../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/closest-point-on-bezier.js';

const { max, hypot } = Math;


test('`getMedialPoint`', function() {
    const inps = [
        {
            name: 'baseline parabola-ish',
            p: [0, 0],
            v: [1, 0.35],
            ps: [[2, -1], [4, 3], [7, 0]]
        },
        {
            name: 'vertical-ish ray',
            p: [1, -0.5],
            v: [0.1, 1],
            ps: [[-1, 2], [2, 5], [5, 1.2]]
        },
        {
            name: 'near-flat curve',
            p: [0.5, 0.25],
            v: [1, 0],
            ps: [[1.5, 0.1], [3.2, 0.35], [6.5, 0.2]]
        },
        {
            name: 'cubic bezier',
            p: [0.5, 0.25],
            v: [1, 0.1],
            ps: [[1.5, 0.1], [-3.2, 0.35], [4.5, 0.2], [6.5, 0.2]]
        }
    ];

    for (const inp of inps) {
        const { name, p, v, ps } = inp;
        const { ts, ss, qs } = getMedialPoints(p, v, ps);

        const rows = ts.map((t,idx) => {
            const s = ss[idx];
            const q = qs[idx];

            // Closest point on the bezier from q, with its parameter and distance.
            const dQToCurve = closestPointOnBezier(ps, q, false)?.d;
            // Distance from q back to the ray origin point p.
            const dQToP = hypot(q[0] - p[0], q[1] - p[1]);
            // Distance from q to the closest point found on the curve.

            return {
                t,
                s,
                q,
                dQToP,
                dQToCurve,
                equidistanceErr: Math.abs(dQToP - dQToCurve)
            };
        });


        const maxEquidistanceErr = max(...rows.map(row => row.equidistanceErr));

        console.log({
            experiment: name,
            input: { p, v, ps },
            ts,
            ss,
            qs,
            maxEquidistanceErr
        });
    }
});
