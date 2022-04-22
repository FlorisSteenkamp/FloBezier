import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { squares } from 'squares-rng';
import { rotate, translate } from 'flo-vector2d';
import { getCurvatureExtrema, curvature, Extrema } from '../../src/index.js';
import { createCubicThatsReallyQuad } from '../helpers/create-cubic-thats-really-quad.js';
import { nearly } from '../helpers/chai-extend-nearly.js';

use(nearly);

const eps = Number.EPSILON;
const abs = Math.abs;
const r = (n: number) => squares(n) / 0xffff_ffff;


function isExtremaLikelyCorrect(
        ps: number[][], 
        extrema: Extrema): boolean {

    let result = true;

    for (let t of extrema.maxima) {
        const _t = t - (eps * 2**40);
        const t_ = t + (eps * 2**40);
        const c = abs(curvature(ps, t));
        const _c = abs(curvature(ps, _t));
        const c_ = abs(curvature(ps, t_));

        result = result && (_c <= c && c_ <= c);
    }

    for (let t of extrema.minima) {
        const _t = t - (eps * 2**40);
        const t_ = t + (eps * 2**40);
        const c = abs(curvature(ps, t));
        const _c = abs(curvature(ps, _t));
        const c_ = abs(curvature(ps, t_));

        result = result && (_c >= c && c_ >= c);
    }

    return result;
}


describe('getCurvatureExtrema', function() {
    it('it should find the curvature extrema (or rather lack thereof) of some lines', 
	function() {
        {
            // line
            const ps = [[1,1],[2,2]];
            const extrema = getCurvatureExtrema(ps);
            expect(extrema).to.deep.eq({ minima: [], maxima: [], inflections: [] });
        }
        {
            // quadratic disguised as line
            const ps = [[1,1],[2,2],[3,3]];
            const extrema = getCurvatureExtrema(ps);
            expect(extrema).to.deep.eq({ minima: [], maxima: [], inflections: [] });
        }
        {
            // cubic disguised as line
            const ps = [[1,1],[2,3],[3,5],[4,7]];
            const extrema = getCurvatureExtrema(ps);
            expect(extrema).to.deep.eq({ minima: [], maxima: [], inflections: [] });
        }
    });
    it('it should find the curvature extrema of some quadratic bezier curves', 
	function() {
        {
            // simple quadratic
            const ps = [[1,10],[6,0],[11,10]];
            const extrema = getCurvatureExtrema(ps);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(extrema).to.be.nearly(2**2, { minima: [], maxima: [0.5], inflections: [] });
        }
        {
            // simple quadratic
            const ps = [[1,10],[6,20],[11,10]];
            const extrema = getCurvatureExtrema(ps);
            expect(extrema).to.deep.eq({ minima: [], maxima: [0.5], inflections: [] });
        }
        {
            // simple quadratic (rotated)
            const rotate_ = rotate(Math.sin(0.1), Math.cos(0.1));
            const ps = [[1,10],[6,20],[11,10]].map(rotate_);
            const extrema = getCurvatureExtrema(ps);
            expect(extrema).to.deep.eq({ minima: [], maxima: [0.49999999999999994], inflections: [] });
        }
        {
            // simple quadratic
            const ps = [[1,10],[6,3],[15,7]];
            const extrema = getCurvatureExtrema(ps);
            expect(extrema).to.deep.eq({ minima: [], maxima: [0.416058394160584], inflections: [] });
        }
        {
            // simple quadratic (rotated)
            const rotate_ = rotate(Math.sin(0.1), Math.cos(0.1));
            const ps = [[1,10],[6,3],[15,7]].map(rotate_);
            const extrema = getCurvatureExtrema(ps);
            expect(extrema).to.deep.eq({ 
                minima: [], 
                maxima: [0.41605839416058393], 
                inflections: [] 
            });
        }
        {
            // simple quadratic (rotated & translated)
            const rotate_ = rotate(Math.sin(0.1), Math.cos(0.1));
            const translate_ = translate([0.1,0.1]);
            const ps = [[1,10],[6,3],[15,7]].map(rotate_).map(translate_);
            const extrema = getCurvatureExtrema(ps);
            expect(extrema).to.deep.eq({ 
                minima: [], 
                maxima: [0.4160583941605838],
                inflections: [] 
            });
        }
        {
            // simple quadratic - extrema outside [0,1], 
            // i.e. t > 1
            const ps = [
                [0.09666999880974417, 10.149875069427084],
                [2.3662118959769143, 7.563530239942269],
                [5.096849645623605, 6.792286128000749]
            ];

            const extrema = getCurvatureExtrema(ps);
            expect(extrema).to.deep.eq({ minima: [], maxima: [], inflections: [] });
        }
        {
            // simple quadratic - extrema outside [0,1], 
            // i.e. t < 0
            const rotate_ = rotate(Math.sin(0.1), Math.cos(0.1));
            const ps = [
                [6.390987011226919, 6.420107866876444],
                [9.948376652185129, 6.023271701181824],
                [14.22622856264259, 8.462530406648602]
            ].map(rotate_);
            
            const extrema = getCurvatureExtrema(ps);

            expect(extrema).to.deep.eq({ 
                minima: [], 
                maxima: [], 
                inflections: [] 
            });  // [-0.16788321167883336],  // <= if t < 0 was not eliminated
        }
    });
    it('it should find the curvature extrema of quadratic bezier curves disguised as cubics', 
	function() {
        {
            for (let i=0; i<10; i++) {
                const s = 0;
                const { quad, cubic } = createCubicThatsReallyQuad(i+s);

                const extrema = getCurvatureExtrema(cubic);
                
                assert(isExtremaLikelyCorrect(quad, extrema));
                assert(isExtremaLikelyCorrect(cubic, extrema));

                assert(extrema.minima.length === 0);
                assert(extrema.maxima.length <= 1);
            }
        }
    });
    it('it should find the curvature extrema of some cubic bezier curves', 
	function() {
        {
            const rotate_ = rotate(Math.sin(0.1), Math.cos(0.1));
            const translate_ = translate([3,2]);
            // simple cubic
            const ps = [
                [0.34,0.3124], 
                [104.213, 101.435],
                [188.2312, -112.453], 
                [323.321, -21.1211]
            ].map(translate_).map(rotate_);

            const extrema = getCurvatureExtrema(ps);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(extrema).to.be.nearly(2**4, { 
                minima: [], 
                maxima: [0.15617147171437748, 0.8457091576527154], 
                inflections: [0.49374951030401965] 
            });
        }
        {
            const rotate_ = rotate(Math.sin(0.1), Math.cos(0.1));
            const translate_ = translate([3,2]);
            // simple cubic
            const ps = [
                [0,0], 
                [100, 100],
                [200, -100], 
                [300, 0]
            ].map(translate_).map(rotate_);

            const extrema = getCurvatureExtrema(ps);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(extrema).to.be.nearly(2**4, { 
                minima: [], 
                maxima: [0.14916374172712923, 0.8508362582728751],
                inflections: [0.4999999999999999] 
            });
        }
        {
            // cubic with 5 extrema of abs curvature
            // from [MvG](https://math.stackexchange.com/a/1956264/130809)
            const ps = [[0,4],[5,4],[7,0],[5,3]];
            
            const extrema = getCurvatureExtrema(ps);
            expect(extrema).to.deep.eq({
                minima: [0.3256995479375282],
                maxima: [
                    0.21061248315673686,
                    0.5083891656903233,
                    0.7339044004159357,
                    0.9196664453338146
                ],
                inflections: [
                    0.6342938142121816,
                    0.8521926722743046
                ] 
            });
        }
        /*
        {
            // speed test
            let timeStart = performance.now();
            const r = Math.random;
            for (let i=0; i<500_000; i++) {
                const ps = [[r(),r()],[r(),r()],[r(),r()],[r(),r()]]
                const a = getCurvatureExtrema(ps);
            }
            let timing = performance.now() - timeStart;
            console.log('milli-seconds: ' + timing.toFixed(3));
        }
        */
        {
            const rotate_ = rotate(Math.sin(0.1), Math.cos(0.1));
            const translate_ = translate([3,2]);
            // some cubic
            const ps = [
                [84.65573822721517, 26.049909034426545],
                [29.84641596840816, 89.15280005369262],
                [67.85273579310198, 0.48137049662502207],
                [48.29771328599395, 84.1873964808053]
            ].map(translate_).map(rotate_);

            const extrema = getCurvatureExtrema(ps);
            //console.log('extrema: ', extrema);  // => 0.3729890092838631, 0.4999231476896653, 0.626878156038763

            for (let t of extrema.minima) {
                const _t = t - (eps * 2**32);
                const t_ = t + (eps * 2**32);

                assert(
                    curvature(ps, _t) > curvature(ps, t) && 
                    curvature(ps, t_) > curvature(ps, t)
                );
            }
            for (let t of extrema.maxima) {
                const _t = t - (eps * 2**32);
                const t_ = t + (eps * 2**32);

                assert(
                    (curvature(ps, _t) < curvature(ps, t) && 
                     curvature(ps, t_) < curvature(ps, t))
                );
            }

            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(extrema).to.be.nearly(2**6,{
                minima: [
                    0.4999231476889932
                ],
                maxima: [
                    0.3729890092839494, 
                    0.6268781560395129
                ],
                inflections: [] 
            });
        }
        {
            // these could potentially fail sometimes (since 2**40 is somewhat thumb-suck)
            for (let i=0; i<1000; i++) {
                const s = i+0;
                const ps = [[r(s),r(s+1)],[r(s+2),r(s+3)],[r(s+4),r(s+5)],[r(s+6),r(s+7)]];
                const extrema = getCurvatureExtrema(ps);

                for (let t of extrema.maxima) {
                    const _t = t - (eps * 2**40);
                    const t_ = t + (eps * 2**40);

                    assert(
                        abs(curvature(ps, _t)) <= abs(curvature(ps, t)) && 
                        abs(curvature(ps, t_)) <= abs(curvature(ps, t)) 
                    );
                }

                for (let t of extrema.minima) {
                    const _t = t - (eps * 2**40);
                    const t_ = t + (eps * 2**40);

                    assert(
                        abs(curvature(ps, _t)) >= abs(curvature(ps, t)) && 
                        abs(curvature(ps, t_)) >= abs(curvature(ps, t))
                    );
                }
            }
        }
    });
});
