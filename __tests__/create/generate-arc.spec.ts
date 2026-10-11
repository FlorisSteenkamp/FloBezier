import { describe, expect, it } from '@jest/globals';
import { generateArcFromCubics } from '../../src/create/generate-arc-from-cubics.js';
import { generateArcFromQuads } from '../../src/create/generate-arc-from-quads.js';
import { evaluate } from '../../src/local-properties-at-t/evaluate/double/evaluate.js';

const { abs, hypot, atan2, PI: π, cos, sin } = Math;


const fs: [string, typeof generateArcFromCubics, number, number][] = [
    // name, function, number of pieces in a full circle, max relative radial error
    ['generateArcFromCubics', generateArcFromCubics, 4, 3e-4],
    ['generateArcFromQuads', generateArcFromQuads, 8, 2e-2]
];


for (const [name, generateArc, nFull, maxRadialErr] of fs) {
    describe(name, function() {
        it('should return no pieces if `p1` is the circle center', function() {
            expect(generateArc([1,2], [1,2], [5,5])).toEqual([]);
        });

        it('should return a closed full circle if `p2` lies on the ray from `c` through `p1` (or is `c`)', function() {
            for (const p2 of [[7,2], [1,2]]) {
                const pss = generateArc([1,2], [3,2], p2);
                expect(pss.length).toEqual(nFull);
                expect(pss[0][0]).toEqual([3,2]);
                expect(pss[pss.length-1][pss[0].length-1]).toEqual([3,2]);
            }
        });

        it('should return a half circle if `p2` lies on the opposite ray', function() {
            const pss = generateArc([1,2], [3,2], [-7,2]);
            expect(pss.length).toEqual(nFull/2);
            const pE = pss[pss.length-1][pss[0].length-1];
            expect(abs(pE[0] - -1)).toBeLessThan(1e-12);
            expect(abs(pE[1] - 2)).toBeLessThan(1e-12);
        });

        it('should return a contiguous arc from `p1` to the ray from `c` through `p2` that approximates the circle',
        function() {
            let s = 151;
            const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
            const r = (a: number, b: number) => a + (b - a)*rnd();

            for (let i=0; i<500; i++) {
                const c = [r(-100,100), r(-100,100)];
                const rad = r(0.01, 50);
                const a = r(0, 2*π);
                const b = r(1e-6, 2*π - 1e-6);  // the arc's angle
                const p1 = [c[0] + rad*cos(a), c[1] + rad*sin(a)];
                const d = r(0.1, 100);
                const p2 = [c[0] + d*cos(a + b), c[1] + d*sin(a + b)];

                const pss = generateArc(c, p1, p2);

                // the number of pieces
                expect(pss.length).toEqual(Math.ceil(b/(2*π/nFull) - 1e-9));

                // starts exactly at `p1`
                expect(pss[0][0]).toEqual(p1);

                // pieces are contiguous
                for (let j=1; j<pss.length; j++) {
                    const pE = pss[j-1][pss[j-1].length-1];
                    const pS = pss[j][0];
                    expect(hypot(pE[0] - pS[0], pE[1] - pS[1])).toBeLessThan(rad*1e-12);
                }

                // ends on the ray from `c` through `p2` (where the last 
                // (approximating) piece intersects the ray, so its distance
                // from `c` is only as accurate as the approximation)
                const ps = pss[pss.length-1];
                const pE = ps[ps.length-1];
                expect(abs(hypot(pE[0] - c[0], pE[1] - c[1]) - rad)).toBeLessThan(rad*maxRadialErr);
                const angleErr = abs(((atan2(pE[1] - c[1], pE[0] - c[0]) - (a + b)) % (2*π) + 3*π) % (2*π) - π);
                expect(angleErr).toBeLessThan(1e-9);

                // approximates the circle
                for (const ps of pss) {
                    for (let k=0; k<=8; k++) {
                        const p = evaluate(ps, k/8);
                        expect(abs(hypot(p[0] - c[0], p[1] - c[1]) - rad)).toBeLessThan(rad*maxRadialErr);
                    }
                }
            }
        });
    });
}
