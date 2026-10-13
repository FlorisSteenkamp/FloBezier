import { describe, expect, it } from '@jest/globals';
import { eEstimate } from 'big-float-ts';
import { Horner } from 'flo-poly';
import { getAbsCurvatureExtremaPolys } from '../../src/get-curvature-extrema/double/get-abs-curvature-extrema-polys.js';
import { getAbsCurvatureExtremaPolysDd } from '../../src/get-curvature-extrema/double-double/get-abs-curvature-extrema-polys-dd.js';
import { getAbsCurvatureExtremaPolysE } from '../../src/get-curvature-extrema/expansion/get-abs-curvature-extrema-polys-e.js';
import { evaluate1stDerivative } from '../../src/local-properties-at-t/evaluate-1st-derivative/double/evaluate-1st-derivative.js';
import { evaluate2ndDerivative } from '../../src/local-properties-at-t/evaluate-2nd-derivative/double/evaluate-2nd-derivative.js';

const { abs, max } = Math;


describe('the inflection polynomial of getAbsCurvatureExtremaPolys(Dd/E)', function() {
    it("should be the quadratic `x''y' - y''x'`", function() {
        let s = 58;
        const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
        const r = (a: number, b: number) => a + (b - a)*rnd();

        for (let i=0; i<200; i++) {
            const ps = Array.from({ length: 4 }, () => [r(-10,10), r(-10,10)]);
            const polys = [
                getAbsCurvatureExtremaPolys(ps).inflectionPoly,
                getAbsCurvatureExtremaPolysDd(ps).inflectionPoly.map(c => c[0] + c[1]),
                getAbsCurvatureExtremaPolysE(ps).inflectionPoly.map(eEstimate)
            ];
            for (const p of polys) {
                // a quadratic (previously a cubic with an identically zero 
                // leading coefficient)
                expect(p.length).toEqual(3);
                for (const t of [0, 0.3, 0.7, 1]) {
                    const [dx, dy] = evaluate1stDerivative(ps, t);
                    const [ddx, ddy] = evaluate2ndDerivative(ps, t);
                    const expected = ddx*dy - ddy*dx;
                    const scale = max(abs(dx*ddy), abs(dy*ddx), 1);
                    expect(abs(Horner(p, t) - expected)).toBeLessThan(scale*1e-12);
                }
            }
        }
    });
});


describe('the other extrema polynomial of getAbsCurvatureExtremaPolys(Dd/E)', function() {
    it("should be the quintic `(x′′′y′ − x′y′′′)(x′² + y′²) − 3(x′x′′ + y′y′′)(x′′y′ − x′y′′)`", function() {
        let s = 585;
        const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
        const r = (a: number, b: number) => a + (b - a)*rnd();

        for (let i=0; i<200; i++) {
            const ps = Array.from({ length: 4 }, () => [r(-10,10), r(-10,10)]);
            const polys = [
                getAbsCurvatureExtremaPolys(ps).otherExtremaPoly,
                getAbsCurvatureExtremaPolysDd(ps).otherExtremaPoly.map(c => c[0] + c[1]),
                getAbsCurvatureExtremaPolysE(ps).otherExtremaPoly.map(eEstimate)
            ];
            // the 3rd derivative of a cubic is constant
            const [dddx, dddy] = [0,1].map(k => 6*((ps[3][k] - ps[0][k]) + 3*(ps[1][k] - ps[2][k])));
            for (const p of polys) {
                expect(p.length).toEqual(6);
                for (const t of [0, 0.3, 0.7, 1]) {
                    const [dx, dy] = evaluate1stDerivative(ps, t);
                    const [ddx, ddy] = evaluate2ndDerivative(ps, t);
                    const expected = 
                        (dddx*dy - dx*dddy)*(dx*dx + dy*dy) - 
                        3*(dx*ddx + dy*ddy)*(ddx*dy - dx*ddy);
                    const scale = 
                        (abs(dddx*dy) + abs(dx*dddy))*(dx*dx + dy*dy) + 
                        3*(abs(dx*ddx) + abs(dy*ddy))*(abs(ddx*dy) + abs(dx*ddy));
                    // (a wrong coefficient would give an error of the order 
                    // of `scale`; round-off in the double precision reference 
                    // and evaluation is far below `1e-10*scale`)
                    expect(abs(Horner(p, t) - expected)).toBeLessThan(scale*1e-10);
                }
            }
        }
    });

    it('should be calculated exactly in double and double-double precision for small integer inputs', function() {
        let s = 586;
        const rnd = () => { s = (s*1103515245 + 12345) % 2147483648; return s/2147483648; };
        const ri = () => Math.round(rnd()*32 - 16);

        for (let i=0; i<200; i++) {
            const ps = Array.from({ length: 4 }, () => [ri(), ri()]);
            const e = getAbsCurvatureExtremaPolysE(ps);
            const d = getAbsCurvatureExtremaPolys(ps);
            const dd = getAbsCurvatureExtremaPolysDd(ps);
            const exact = [...e.inflectionPoly, ...e.otherExtremaPoly].map(eEstimate);
            const pd = [...d.inflectionPoly, ...d.otherExtremaPoly];
            const pdd = [...dd.inflectionPoly, ...dd.otherExtremaPoly];
            for (let k=0; k<exact.length; k++) {
                expect(pd[k] === exact[k]).toBe(true);
                expect(pdd[k][1] === exact[k] && pdd[k][0] === 0).toBe(true);
            }
        }
    });
});
