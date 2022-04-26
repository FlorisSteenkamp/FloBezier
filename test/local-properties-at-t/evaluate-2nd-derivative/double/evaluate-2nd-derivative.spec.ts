import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { 
    evalDeCasteljau, evaluate2ndDerivative, tangent, 
    evaluate2ndDerivativeAt0, evaluate2ndDerivativeAt1, 
    tangentAt0, tangentAt1, 
    evaluate2ndDerivativeAt0Exact, evaluate2ndDerivativeAt1Exact, 
    tangentAt0Exact, tangentAt1Exact
} from '../../../../src/index.js';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';

use(nearly);


describe('evaluate2ndDerivative', function() {
	it('it should correctly evaluate the first and second derivative of the power basis representation of some bezier curves',
	function() {
        {
            // Cubic bezier curve
            const ps = getRandomCubic(0);
            const t = 1/8;  // some `t`
            const δt = 2**-20;  // some delta used in forward differences            

            const dxyEst = dxyByForwardDifferences(ps,t,δt);
            const dxy = tangent(ps,t);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(dxy).to.be.nearly(2**34, dxyEst);

            const ddxyEst = ddxyByForwardDifferences(ps,t,δt);
            const ddxy = evaluate2ndDerivative(ps,t);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(ddxy).to.be.nearly(2**42,ddxyEst);

            {
                // Cubic bezier curve - at `t === 0`
                const ps = getRandomCubic(0);
                const δt = 2**-20;  // some delta used in forward differences            

                const dxyEst = dxyByForwardDifferences(ps,0,δt);
                const dxy = tangentAt0(ps);
                // @ts-ignore - otherwise TypeScript gives an error on nearly
                expect(dxy).to.be.nearly(2**36, dxyEst);

                const ddxyEst = ddxyByForwardDifferences(ps,0,δt);
                const ddxy = evaluate2ndDerivativeAt0(ps);
                // @ts-ignore - otherwise TypeScript gives an error on nearly
                expect(ddxy).to.be.nearly(2**42,ddxyEst);
            }
            {
                // Cubic bezier curve - at `t === 1`
                const ps = getRandomCubic(0);
                const δt = 2**-20;  // some delta used in forward differences            

                const dxyEst = dxyByForwardDifferences(ps,1,δt);
                const dxy = tangentAt1(ps);
                // @ts-ignore - otherwise TypeScript gives an error on nearly
                expect(dxy).to.be.nearly(2**34, dxyEst);

                const ddxyEst = ddxyByForwardDifferences(ps,1,δt);
                const ddxy = evaluate2ndDerivativeAt1(ps);
                // @ts-ignore - otherwise TypeScript gives an error on nearly
                expect(ddxy).to.be.nearly(2**42,ddxyEst);
            }
        }
		{
			// Quadratic bezier curve
            const ps = getRandomQuad(10);
            const t = 1/8;  // some `t`
            const δt = 2**-20;  // some delta used in forward differences            

            const dxyEst = dxyByForwardDifferences(ps,t,δt);
            const dxy = tangent(ps,t);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(dxy).to.be.nearly(2**34, dxyEst);

            const ddxyEst = ddxyByForwardDifferences(ps,t,δt);
            const ddxy = evaluate2ndDerivative(ps,t);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(ddxy).to.be.nearly(2**42,ddxyEst);
            {
                // Quadratic bezier curve - at `t === 0`
                const ps = getRandomQuad(10);
                const δt = 2**-20;  // some delta used in forward differences            

                const dxyEst = dxyByForwardDifferences(ps,0,δt);
                const dxy = tangentAt0(ps);
                // @ts-ignore - otherwise TypeScript gives an error on nearly
                expect(dxy).to.be.nearly(2**34, dxyEst);

                const ddxyEst = ddxyByForwardDifferences(ps,0,δt);
                const ddxy = evaluate2ndDerivativeAt0(ps);
                // @ts-ignore - otherwise TypeScript gives an error on nearly
                expect(ddxy).to.be.nearly(2**42,ddxyEst);
            }
            {
                // Quadratic bezier curve - at `t === 1`
                const ps = getRandomQuad(10);
                const δt = 2**-20;  // some delta used in forward differences            

                const dxyEst = dxyByForwardDifferences(ps,1,δt);
                const dxy = tangentAt1(ps);
                // @ts-ignore - otherwise TypeScript gives an error on nearly
                expect(dxy).to.be.nearly(2**34, dxyEst);

                const ddxyEst = ddxyByForwardDifferences(ps,1,δt);
                const ddxy = evaluate2ndDerivativeAt1(ps);
                // @ts-ignore - otherwise TypeScript gives an error on nearly
                expect(ddxy).to.be.nearly(2**44,ddxyEst);
            }
		}
		{
			// Line
            const ps = getRandomLine(20);
            const t = 1/8;  // some `t`
            const δt = 2**-20;  // some delta used in forward differences            

            const dxyEst = dxyByForwardDifferences(ps,t,δt);
            const dxy = tangent(ps,t);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(dxy).to.be.nearly(2**20, dxyEst);

            const ddxy = evaluate2ndDerivative(ps,t);
            expect(ddxy).to.eql([0,0]);

            {
                // Line - at `t === 0`
                const ps = getRandomLine(20);
                const δt = 2**-20;  // some delta used in forward differences            

                const dxyEst = dxyByForwardDifferences(ps,0,δt);
                const dxy = tangentAt0(ps);
                // @ts-ignore - otherwise TypeScript gives an error on nearly
                expect(dxy).to.be.nearly(2**34, dxyEst);

                const ddxy = evaluate2ndDerivativeAt0(ps);
                expect(ddxy).to.eql([0,0]);
            }
            {
                // Line - at `t === 1`
                const ps = getRandomLine(20);
                const δt = 2**-20;  // some delta used in forward differences            

                const dxyEst = dxyByForwardDifferences(ps,1,δt);
                const dxy = tangentAt1(ps);
                // @ts-ignore - otherwise TypeScript gives an error on nearly
                expect(dxy).to.be.nearly(2**34, dxyEst);

                const ddxy = evaluate2ndDerivativeAt1(ps);
                expect(ddxy).to.eql([0,0]);
            }
		}
        {
			// Point
            const ps = getRandomPoint(30);
            const t = 1/8;  // some `t`

            const dxy = tangent(ps,t);
            expect(dxy).to.eql([0,0]);

            const ddxy = evaluate2ndDerivative(ps,t);
            expect(ddxy).to.eql([0,0]);
            {
                // Point - at `t === 0`
                const ps = getRandomPoint(30);

                const dxy = tangentAt0(ps);
                expect(dxy).to.eql([0,0]);

                const ddxy = evaluate2ndDerivativeAt0(ps);
                expect(ddxy).to.eql([0,0]);
            }
            {
                // Point - at `t === 1`
                const ps = getRandomPoint(30);

                const dxy = tangentAt1(ps);
                expect(dxy).to.eql([0,0]);

                const ddxy = evaluate2ndDerivativeAt1(ps);
                expect(ddxy).to.eql([0,0]);
            }
		}

        {
            const p = [1,1];
            const bez4 = [p,p,p,p,p];
            expect(() => evaluate2ndDerivativeAt0(bez4)).to.throw();
            expect(() => evaluate2ndDerivativeAt1(bez4)).to.throw();
            expect(() => evaluate2ndDerivativeAt0Exact(bez4)).to.throw();
            expect(() => evaluate2ndDerivativeAt1Exact(bez4)).to.throw();

            expect(() => tangentAt0(bez4)).to.throw();
            expect(() => tangentAt1(bez4)).to.throw();
            expect(() => tangentAt0Exact(bez4)).to.throw();
            expect(() => tangentAt1Exact(bez4)).to.throw();

            const p1 = [[1,1]];
            expect(tangentAt0Exact(p1)).to.eql([[0],[0]]);
            expect(tangentAt1Exact(p1)).to.eql([[0],[0]]);
        }
	});
});



function dxyByForwardDifferences(
        ps: number[][],
        t: number,
        δt: number) {

    const evalX = (t: number) => evalDeCasteljau(ps,t)[0];
    const evalY = (t: number) => evalDeCasteljau(ps,t)[1];

    const fdsX = forwardDifferences(evalX, t, δt);
    const fdsY = forwardDifferences(evalY, t, δt);

    return [
        fdsX[0] / δt,
        fdsY[0] / δt
    ];
}


function ddxyByForwardDifferences(
        ps: number[][],
        t: number,
        δt = 2**-10) {

    const dxByFds = (t: number) => dxyByForwardDifferences(ps,t,δt)[0];
    const dyByFds = (t: number) => dxyByForwardDifferences(ps,t,δt)[1];

    const fdsdX = forwardDifferences(dxByFds, t, δt);
    const fdsdY = forwardDifferences(dyByFds, t, δt);

    return [
        fdsdX[0] / δt,
        fdsdY[0] / δt
    ];
}

/** 
 * Returns the first 4 forward differences of the given function.
 * 
 * @param f the function to be used
 * @param T the initial evaluation point
 * @param δt the evaluation point step size
 */
function forwardDifferences(
        f: (t: number) => number,
        T: number, 
        δt: number) {

    return [1,2,3,4].map(t => 
        f(T + t*δt) - f(T + (t-1)*δt)
    );
}