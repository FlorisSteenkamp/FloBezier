import { expect, use } from 'chai';
import { bezierBezierIntersection, cubicToQuadratic, evaluateExact, generateSelfIntersecting, X } from '../../../src/index.js';
import { getPssWithInfiniteXs } from '../../helpers/intersection/get-pss-with-infinite-xs.js';
import { swapIntersections } from '../../helpers/intersection/swap-intersections.js';
import { areIntersectionsOrdered } from '../../helpers/intersection/are-intersections-ordered.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { fromTo3 } from '../../../src/transformation/split/from-to/from-to-3.js';
import { eEstimate } from 'big-float-ts';

use(nearly);
const { EPSILON: eps, POSITIVE_INFINITY: inf } = Number;


describe('bezierBezierIntersection', function() {
    ////////////////////////////////////////////////////////////////
    // Order 0/0
    ////////////////////////////////////////////////////////////////

    it('it should find intersections between two points',
    function() {
        // coinciding points
        {
            const psA = [[1.021,1]];
            const psB = [[1.021,1]];
            const xs = bezierBezierIntersection(psA, psB);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xs).to.be.nearly(2**4, [
                { 
                    p: [1.021,1], kind: 6, box: [[1.021,1],[1.021,1]],
                    t1: 0.5, ri1: { tS: 0.5, tE: 0.5, multiplicity: 1 },
                    t2: 0.5, ri2: { tS: 0.5, tE: 0.5, multiplicity: 1 }
                },
            ]);

            testXs(psA,psB);
        }

        // non-coinciding points
        {
            const psA = [[1.021,1+eps]];
            const psB = [[1.021,1]];
            const xs = bezierBezierIntersection(psA, psB);
            expect(xs).to.eql([]);
            testXs(psA,psB);
        }
    });


    ////////////////////////////////////////////////////////////////
    // Order 0/1 and 1/0
    ////////////////////////////////////////////////////////////////
    it('it should find intersections between a point and a line',
    function() {
        // point exactly on line
        {
            const psA = [[2,2]];
            const psB = [[1,1],[3,3]];
            const xs = bezierBezierIntersection(psA, psB);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xs).to.be.nearly(2**4, [
                { 
                    p: [2,2], kind: 6, box: [[2,2],[2,2]],
                    t1: 0.5, ri1: { tS: 0.5, tE: 0.5, multiplicity: 1 },
                    t2: 0.5, ri2: { tS: 0.5, tE: 0.5, multiplicity: 1 },
                }
            ]);
            testXs(psA,psB);
        }

        // point not exactly on line
        {
            const psA = [[2,2 + 2*eps]];
            const psB = [[1,1],[3,3]];
            const xs = bezierBezierIntersection(psA, psB);
            expect(xs).to.eql([]);
            testXs(psA,psB);
        }
    });

    ////////////////////////////////////////////////////////////////
    // Order 0/2 and 2/0
    ////////////////////////////////////////////////////////////////
    it('it should find intersections between a point and a quadratic bezier curve',
    function() {
        // point is exactly on curve
        {
            const psA = [[1,0.5]];
            const psB = [[0,0],[1,1],[2,0]];
            const xs = bezierBezierIntersection(psA, psB);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xs).to.be.nearly(2**4, [
                {
                    p: [1,0.5],
                    kind: 6,
                    box: [[1,0.5],[1,0.5]],
                    t1: 0.5, ri1: { tS: 0.5, tE: 0.5, multiplicity: 1 },
                    t2: 0.5, ri2: { tS: 0.5, tE: 0.5, multiplicity: 1 }
                }
            ]);
            testXs(psA,psB);
        }

        // point is not exactly on curve
        {
            const psA = [[1,0.5]];
            const psB = [[0,0],[1,1],[2,2**-60]];
            const xs = bezierBezierIntersection(psA, psB);
            expect(xs).to.eql([]);
            testXs(psA,psB);
        }
    });

    ////////////////////////////////////////////////////////////////
    // Order 0/3 and 3/0
    ////////////////////////////////////////////////////////////////
    it('it should find intersections between a point and a cubic bezier curve',
    function() {
        {
            const psA = [[1.5,0.75]];
            const psB = [[0,0],[1,1],[2,1],[3,0]];  //=> disguised qudratic
            // cubicToQuadratic(ps2);  //=> [[0,0],[1.5,1.5],[3,0]]
            const xs = bezierBezierIntersection(psA, psB);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(omitPT(xs)).to.be.nearly(2**4, [
                {
                    kind: 6,
                    box: [[1.5,0.75],[1.5,0.75]],
                    ri1: { tS: 0.5, tE: 0.5, multiplicity: 1 },
                    ri2: { tS: 0.5, tE: 0.5, multiplicity: 1 },
                }
            ]);
            testXs(psA,psB);
        }

        {
            const psA = [[1.5,0.75]];
            const psB = [[0,0],[1,1],[2,1],[3,2**-60]];  //=> almost disguised qudratic
            const xs = bezierBezierIntersection(psA, psB);
            expect(xs).to.eql([]);
            testXs(psA,psB);
        }
    });

    ////////////////////////////////////////////////////////////////
    // Order 1/1
    ////////////////////////////////////////////////////////////////
    it('it should find intersections between two generic intersecting lines', 
    function() {
        const psA = [[1,1],[2,2]];
        const psB = [[0,1.5],[1.5,1]];
        const xs = bezierBezierIntersection(psA, psB);
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(omitPT(xs)).to.be.nearly(2**4, [
            { 
                box: [[1.125,1.125],[1.125,1.125]],
                kind: 1,
                ri1: { tS: 0.125, tE: 0.125, multiplicity: 1 },
                ri2: { tS: 0.75, tE: 0.75, multiplicity: 1 }
            }
        ]);
        testXs(psA,psB);
    });

    it('it should find the intersection between two overlapping lines',
    function() {
        {
            const psA = [[1,1],[2,2]];
            const psB = [[1,1],[3,3]];
            const xs = bezierBezierIntersection(psA, psB);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(omitPT(xs)).to.be.nearly(2**4, [
                {
                    kind: 5, box: [[1,1], [1,1]],
                    ri1: { tS: 0, tE: 0, multiplicity: 1 }, 
                    ri2: { tS: 0, tE: 0, multiplicity: 1 }
                },
                {
                    kind: 5, box: [[2,2], [2,2]],
                    ri1: { tS: 1, tE: 1, multiplicity: 1 }, 
                    ri2: { tS: 0.5, tE: 0.5, multiplicity: 1 }, 
                }
            ]);
            testXs(psA,psB);
        }

        {
            const psA = [[1,1],[2,2]];
            const psB = [[3,3],[4,4]];
            const xs = bezierBezierIntersection(psA, psB);
            expect(xs).to.eql([]);
            testXs(psA,psB);
        }

        {
            const ps1 = [[1,1],[2,2]];
            const ps2 = [[1,1],[2,2]];
            const xs = bezierBezierIntersection(ps1, ps2);
            expect(omitPT(xs)).to.eql([
                {
                    kind: 5, box: [[1,1],[1,1]],
                    ri1: { tS: 0, tE: 0, multiplicity: 1 },
                    ri2: { tS: 0, tE: 0, multiplicity: 1 }
                },
                {
                    kind: 5, box: [[2,2],[2,2]],
                    ri1: { tS: 1, tE: 1, multiplicity: 1 },
                    ri2: { tS: 1, tE: 1, multiplicity: 1 }
                }
            ]);
        }
    });

    ////////////////////////////////////////////////////////////////
    // Order 1/2 and 2/1
    ////////////////////////////////////////////////////////////////
    it('it should find the intersections between a line and a quadratic bezier curve', 
	function() {
        const psA = [[1,1],[2,2]];
        const psB = [[0,1.5],[1.5,0.2],[2,3]];
        const xs = bezierBezierIntersection(psA, psB);
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(omitPT(xs)).to.be.nearly(2**4, [
            { 
                box: [[1.175773472693792,1.175773472693792],[1.1757734726937932,1.1757734726937932]],
                kind: 1,
                ri1: { tS: 0.1757734726937926, tE: 0.17577347269379281, multiplicity: 1 },
                ri2: { tS: 0.4635510011070456, tE: 0.46355100110704583, multiplicity: 1 },
            },
            { 
                box: [[1.500889349297748,1.500889349297748],[1.5008893492977502,1.5008893492977502]], 
                kind: 1,
                ri1: { tS: 0.500889349297749, tE: 0.5008893492977492, multiplicity: 1 },
                ri2: { tS: 0.6344882145792289, tE: 0.6344882145792291, multiplicity: 1 }
            }
        ]);
        testXs(psA,psB);
    });
    it('it should find the intersection between an overlapping line and quadratic bezier curve',
    function() {
        {
            const psA = [[1,1],[2,2]];
            const psB = [[0,0],[3,3],[0.5,0.5]];
            const xs = bezierBezierIntersection(psA, psB);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(omitPT(xs)).to.be.nearly(2**4, [
                { 
                    kind: 5,
                    box: [[1,1],[1,1]],
                    ri1: { tS: 0, tE: 0, multiplicity: 1 },
                    ri2: { tS: 0.20530387392964167, tE: 0.2053038739296419, multiplicity: 1 }
                },
                { 
                    kind: 5,
                    box: [[1,1],[1,1]],
                    ri1: { tS: 0, tE: 0, multiplicity: 1 },
                    ri2: { tS: 0.885605216979449, tE: 0.8856052169794493, multiplicity: 1 }
                }
            ]);
            testXs(psA,psB);
        }
    });
    ////////////////////////////////////////////////////////////////
    // Order 1/3 and 3/1
    ////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////
    // Order 2/2
    ////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////
    // Order 2/3 and 3/2
    ////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////
    // Order 3/3
    ////////////////////////////////////////////////////////////////
    it('it should find intersections between two generic cubic bezier curves',
    function() {
        {
            // https://www.desmos.com/calculator/5l0qqsyp1a
            const psA1 = [[-2.2355817696,1.1],[1,1],[2,1],[3,0]];
            const psB = [[2.1,3.47],[7.77,3.33],[-13.3,7.001],[6.31,-9.999]];
            const xsA1 = bezierBezierIntersection(psA1, psB);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(omitPT(xsA1)).to.be.nearly(2**4, [
                { 
                    box: [[-2.235581769582615,1.0999999999994616],[-2.235581769582608,1.0999999999994639]],
                    kind: 1,
                    ri1: { tS: 1.7912871375609524e-12, tE: 1.7915091821658774e-12, multiplicity: 1 },
                    ri2: { tS: 0.661985479297476, tE: 0.6619854792974762, multiplicity: 1 },
                }
            ]);
            testXs(psA1,psB);

            // https://www.desmos.com/calculator/pjdhbdt60d
            const psA2 = [[-2.2355817695,1.1],[1,1],[2,1],[3,0]];
            expect(bezierBezierIntersection(psA2, psB)).to.eql([]);
            testXs(psA2,psB);

            // https://www.desmos.com/calculator/imobftrknc
            const psA3 = [[-2.2355817696,1.1],[1,1],[2,1],[3,4]];
            const xsA3 = bezierBezierIntersection(psA3, psB);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(omitPT(xsA3)).to.be.nearly(2**4, [
                {
                    box: [[-2.235581769582615,1.0999999999994616], [-2.235581769582608,1.0999999999994639]],
                    kind: 1,
                    ri1: { tS: 1.7912871375623377e-12, tE: 1.7915091821672628e-12, multiplicity: 1 },
                    ri2: { tS: 0.6619854792974761, tE: 0.6619854792974763, multiplicity: 1 }
                },
                {
                    box: [[2.8143224135797613,3.4781434202638417], [2.8143224135797715,3.4781434202638515]],
                    kind: 1,
                    ri1: { tS: 0.9382826538202589, tE: 0.9382826538202591, multiplicity: 1 },
                    ri2: { tS: 0.056172565234172266, tE: 0.05617256523417249, multiplicity: 1 }
                },
                {
                    box: [[2.8745991633907635,3.63975904454619], [2.8745991633907892,3.63975904454621]],
                    kind: 1,
                    ri1: { tS: 0.9582539356878587, tE: 0.9582539356878589, multiplicity: 1 },
                    ri2: { tS: 0.19375978546061032, tE: 0.19375978546061054, multiplicity: 1 },
                }
            ]);
            testXs(psA3,psB);
        }

        {
            const psA = [[-2.2355817695,1.1],[1,1],[2,1],[3,0]];
            const psB = [[2.1,3.47],[7.77,3.33],[-13.3,7.001],[6.31,-9.999]];
            const xs = bezierBezierIntersection(psA, psB);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xs).to.be.nearly(2**4, []);
            testXs(psA,psB);
        }
    });

    it('it should find intersections between two cubic bezier curves with overlapping self-intersections',
    function() {
        // both bezier curves are algebraically identical and overlap at self-intersections
        {
            const t1 = 0.25;
            const t2 = 0.75;
            const ps = generateSelfIntersecting([0,0],[3,3],[3,-3], [t1,t2]);
            //=> [[0,0],[3,3],[-3,3],[4.153846153846153,0]]
            //bezierSelfIntersection(ps);  //=> [0.25, 0.75]  (estimated)

            const psA = fromTo3(ps,0.25,0.5);
            const psB = fromTo3(ps,0.5,1);
            // areIntersectionsInfinte(ps,psA);  //=> true
            // areIntersectionsInfinte(ps,psB);  //=> true
            // areIntersectionsInfinte(psA,psB);  //=> true

            const p1e = evaluateExact(ps,t1);
            const p1 = p1e.map(eEstimate);  //=> [0.9086538461538461, 1.6875]
            // isPointOnBezierExtension(ps,p1e);  //=> true
            // isPointOnBezierExtension(ps,[[p1[0]],[p1[1]]]);  //=> true

            const p2e = evaluateExact(ps,t2);
            const p2 = p2e.map(eEstimate);  //=> [0.9086538461538459, 1.6875]
            // isPointOnBezierExtension(ps,p2e);  //=> true
            // isPointOnBezierExtension(ps,[[p2[0]],[p2[1]]]);  //=> true

            const xs = bezierBezierIntersection(psA, psB);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(omitPT(xs)).to.be.nearly([2**4], [
                { 
                    kind: 1,
                    box: [[1.6874999999999976,0.9086538461538453],[1.687500000000002,0.908653846153847]],
                    ri1: { tS: 0, tE: 0, multiplicity: 1 },
                    ri2: { tS: 0.5, tE: 0.5, multiplicity: 1 }
                },
                { 
                    kind: 4,
                    box: [[2.25,0.5192307692307692],[2.25,0.5192307692307692]],
                    ri1: { tS: 1, tE: 1, multiplicity: 1 },
                    ri2: { tS: 0, tE: 0, multiplicity: 1 },
                }
            ]);
            testXs(psA,psB);
        }
    });

    it('it should find intersections between two cubic bezier curves, one explicit and one a quadratic in disguise',
    function() {
        const psA = [[0,0],[1,1],[2,-1],[3,0]];
        const psB = [[1,0],[2,1],[3,1],[4,0]];
        const xs = bezierBezierIntersection(psA, psB);
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(omitPT(xs)).to.be.nearly(2**4, [
            { 
                box: [[1.1674491911085336,0.15810278057423355],[1.167449191108536,0.15810278057423438]],
                kind: 1,
                ri1: { tS: 0.3891497303695116, tE: 0.38914973036951184, multiplicity: 1 },
                ri2: { tS: 0.055816397036178175, tE: 0.0558163970361784, multiplicity: 1 },
            }
        ]);

        // testXs(psA,psB);
    });
});


function omitPT(xs: X[]): Omit<X, 'p' | 't1' | 't2'>[] {
    return xs.map(x => {
        const { p, t1, t2, ...rest } = x;
        return rest;
    });
}


/**
 * Tests whether the given bezier curve pair intersections are ordered and that
 * the same results are returned when they are swapped.
 * 
 * @param psA 
 * @param psB 
 */
function testXs(
        psA: number[][],
        psB: number[][]) { 

    const xs  = bezierBezierIntersection(psA, psB);
    const xsR = bezierBezierIntersection(psB, psA);
    const xsR_ = swapIntersections(xsR).sort((a,b) => a.t1 - b.t1);

    const ordered = areIntersectionsOrdered(xs);
    const orderedR = areIntersectionsOrdered(xsR);
    expect(ordered).to.be.true;
    expect(orderedR).to.be.true;

    expect(xs).to.be.nearly(2**16, xsR_);
}
