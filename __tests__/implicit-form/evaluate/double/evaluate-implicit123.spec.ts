import { describe, expect, it } from '@jest/globals';
import { evalDeCasteljau } from '../../../../src/local-properties-at-t/evaluate/double/eval-de-casteljau.js';
import { evaluateImplicit1 } from '../../../../src/implicit-form/evaluate/double/evaluate-implicit1.js';
import { evaluateImplicit2 } from '../../../../src/implicit-form/evaluate/double/evaluate-implicit2.js';
import { evaluateImplicit3 } from '../../../../src/implicit-form/evaluate/double/evaluate-implicit3.js';
import { getImplicitForm1 } from '../../../../src/implicit-form/double/get-implicit-form1.js';
import { getImplicitForm2 } from '../../../../src/implicit-form/double/get-implicit-form2.js';
import { getImplicitForm3 } from '../../../../src/implicit-form/double/get-implicit-form3.js';
import { getRandomCubic, getRandomLine, getRandomQuad } from '../../../helpers/get-random-bezier.js';


const { abs } = Math;


describe('evaluateImplicit1, evaluateImplicit2, evaluateImplicit3', function() {
    it('should correctly evaluate the implicit form of some cubic bezier curves', 
    function() {
        for (let i=0; i<10; i++) {
            const ps = getRandomLine(i);
            const p = evalDeCasteljau(ps,1/3);
            const imp = getImplicitForm1(ps);
            const r1 = evaluateImplicit1(imp, 1, 1);
            const r2 = evaluateImplicit1(imp, p[0], p[1]);

            // We expect `r1/r2` to be large since `r1` is evaluated at some random
            // point whereas `r2` was evaluated on the curve and should be zero but
            // often is not due to roundoff
            expect(abs(r1/r2)).toBeGreaterThan(2**48);
        }

        for (let i=0; i<10; i++) {
            const ps = getRandomQuad(i);
            const p = evalDeCasteljau(ps,1/3);
            const imp = getImplicitForm2(ps);
            const r1 = evaluateImplicit2(imp, 1, 1);
            const r2 = evaluateImplicit2(imp, p[0], p[1]);

            // We expect `r1/r2` to be large since `r1` is evaluated at some random
            // point whereas `r2` was evaluated on the curve and should be zero but
            // often is not due to roundoff
            expect(abs(r1/r2)).toBeGreaterThan(2**48);
        }

        for (let i=0; i<10; i++) {
            const ps = getRandomCubic(i);
            const p = evalDeCasteljau(ps,1/3);
            const imp = getImplicitForm3(ps);
            const r1 = evaluateImplicit3(imp, 1, 1);
            const r2 = evaluateImplicit3(imp, p[0], p[1]);

            // We expect `r1/r2` to be large since `r1` is evaluated at some random
            // point whereas `r2` was evaluated on the curve and should be zero but
            // often is not due to roundoff
            expect(abs(r1/r2)).toBeGreaterThan(2**46);
        }
    });
});
