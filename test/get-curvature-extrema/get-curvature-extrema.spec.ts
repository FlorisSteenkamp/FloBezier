
import { expect, assert } from 'chai';
//import { describe } from 'mocha';
import 'mocha';
import { getCurvatureExtrema, curvature } from '../../src/index';
import { rotate, translate } from 'flo-vector2d';
import { performance } from 'perf_hooks';


const eps = Number.EPSILON;


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
            expect(extrema).to.deep.eq({ minima: [], maxima: [0.5], inflections: [] });
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
            expect(extrema).to.deep.eq({ minima: [], maxima: [0.41605839416058393], inflections: [] });
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
                maxima: [0.4160583941605839], 
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
            //console.log('extrema: ', extrema);
            expect(extrema).to.deep.eq({ 
                minima: [], 
                maxima: [0.1561714717143775, 0.8457091576527147], 
                inflections: [0.4937495103040197] 
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
            //console.log('extrema: ', extrema);
            expect(extrema).to.deep.eq({ 
                minima: [], 
                maxima: [0.1491637417271294, 0.8508362582728728],
                inflections: [0.4999999999999998] 
            });
        }
        {
            // cubic with 5 extrema of abs curvature
            // from [MvG](https://math.stackexchange.com/a/1956264/130809)
            const ps = [[0,4],[5,4],[7,0],[5,3]];
            
            const extrema = getCurvatureExtrema(ps);
            //console.log('extrema: ', extrema);
            expect(extrema).to.deep.eq({
                minima: [0.32569954793752887],
                maxima: [
                    0.21061248315673772,
                    0.5083891656903232,
                    0.7339044004159316,
                    0.9196664453338176
                ],
                inflections: [
                    0.6342938142121818,
                    0.8521926722743047
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

            //console.log('extrema: ', extrema);
            expect(extrema).to.deep.eq({
                minima: [
                    0.4999231476896653
                ],
                maxima: [
                    0.3729890092838631, 
                    0.626878156038763
                ],
                inflections: [] 
            });
        }
        /*
        {
            const r = Math.random;

            // this could actually fail sometimes (since 2**32 is just thumb-suck)
            for (let i=0; i<1000; i++) {
                const ps = [[r(),r()],[r(),r()],[r(),r()],[r(),r()]]
                const extrema = getCurvatureExtrema(ps);

                for (let t of extrema) {
                    const _t = t - (eps * 2**32);
                    const t_ = t + (eps * 2**32);

                    assert(
                        (curvature(ps, _t) < curvature(ps, t) && 
                         curvature(ps, t_) < curvature(ps, t)) ||
                        (curvature(ps, _t) > curvature(ps, t) && 
                         curvature(ps, t_) > curvature(ps, t))
                    );
                }
            }
        }
        */
    });
});
