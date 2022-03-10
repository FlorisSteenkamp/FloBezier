import { expect, use } from 'chai';
import { bezierBezierIntersection, cubicToQuadratic, quadraticToCubic } from '../../../src/index.js';
import { getPssWithInfiniteXs } from '../../helpers/intersection/get-pss-with-infinite-xs.js';
import { swapIntersections } from '../../helpers/intersection/swap-intersections.js';
import { areIntersectionsOrdered } from '../../helpers/intersection/are-intersections-ordered.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { nearlyAnyOrder } from '../../helpers/chai-extend-nearly-any-order.js';

use(nearlyAnyOrder);
use(nearly);
const eps = Number.EPSILON;


describe('bezierBezierIntersection', function() {
    // TODO - finish edge case tests

    ////////////////////////////////////////////////////////////////
    // Order 0/0
    ////////////////////////////////////////////////////////////////
    it('it should find intersections between two points',
    function() {
        {
            const ps1 = [[1.021,1]];
            const ps2 = [[1.021,1]];
            const xs = bezierBezierIntersection(ps1, ps2);
            expect(xs).to.eql([
                [
                    { 
                        ri: { tS: 0, tE: 1, multiplicity: Infinity },
                        kind: 6,  //=> a point (order 0 bezier) intersecting another bezier
                        box: [[1.021,1],[1.021,1]] 
                    },
                    { 
                        ri: { tS: 0, tE: 1, multiplicity: Infinity },
                        kind: 6,  //=> a point (order 0 bezier) intersecting another bezier
                        box: [[1.021,1],[1.021,1]] 
                    }
                ] 
            ]);

            expect(xs).to.eql(swapIntersections(bezierBezierIntersection(ps2, ps1)));
        }

        {
            const ps1 = [[1.021,1+eps]];
            const ps2 = [[1.021,1]];
            const xs = bezierBezierIntersection(ps1, ps2);
            expect(xs).to.eql([]);
            expect(xs).to.eql(swapIntersections(bezierBezierIntersection(ps2, ps1)));
        }
    });


    ////////////////////////////////////////////////////////////////
    // Order 0/1 and 1/0
    ////////////////////////////////////////////////////////////////
    it('it should find intersections between a point and a line',
    function() {
        {
            const ps1 = [[2,2]];
            const ps2 = [[1,1],[3,3]];
            const xs = bezierBezierIntersection(ps1, ps2);
            expect(xs).to.eql([
                [
                    { 
                        ri: { tS: 0, tE: 1, multiplicity: Infinity },
                        kind: 6,
                        box: [[2,2],[2,2]]
                    },
                    { 
                        ri: { tS: 0.4999999999999998, tE: 0.5000000000000002, multiplicity: 1 },
                        kind: 6,
                        box: [[2,2],[2,2]]
                    }
                ] 
            ]);
            expect(xs).to.eql(swapIntersections(bezierBezierIntersection(ps2, ps1)));
        }

        {
            const ps1 = [[2,2 + 2*eps]];
            const ps2 = [[1,1],[3,3]];
            const xs = bezierBezierIntersection(ps1, ps2);
            expect(xs).to.eql([]);
            expect(xs).to.eql(swapIntersections(bezierBezierIntersection(ps2, ps1)));
        }
    });

    ////////////////////////////////////////////////////////////////
    // Order 0/2 and 2/0
    ////////////////////////////////////////////////////////////////
    it('it should find intersections between a point and a quadratic bezier curve',
    function() {
        {
            const ps1 = [[1,0.5]];
            const ps2 = [[0,0],[1,1],[2,0]];
            const xs = bezierBezierIntersection(ps1, ps2);
            expect(xs).to.eql([
                [
                    {
                        ri: { tS: 0, tE: 1, multiplicity: Infinity },
                        kind: 6,
                        box: [[1,0.5],[1,0.5]] 
                    },
                    { 
                        ri: { tS: 0.5, tE: 0.5, multiplicity: 1 },
                        kind: 6,
                        box: [[1,0.5],[1,0.5]] 
                    }
                ]
            ]);
            expect(xs).to.eql(swapIntersections(bezierBezierIntersection(ps2, ps1)));
        }

        {
            const ps1 = [[1,0.5]];
            const ps2 = [[0,0],[1,1],[2,2**-60]];
            const xs = bezierBezierIntersection(ps1, ps2);
            expect(xs).to.eql([]);
            expect(xs).to.eql(swapIntersections(bezierBezierIntersection(ps2, ps1)));
        }
    });

    ////////////////////////////////////////////////////////////////
    // Order 0/3 and 3/0
    ////////////////////////////////////////////////////////////////
    it('it should find intersections between a point and a cubic bezier curve',
    function() {
        {
            const ps1 = [[1.5,0.75]];
            const ps2 = [[0,0],[1,1],[2,1],[3,0]];  //=> disguised qudratic
            // cubicToQuadratic(ps2);  //=> [[0,0],[1.5,1.5],[3,0]]
            const xs = bezierBezierIntersection(ps1, ps2);
            expect(xs).to.eql([
                [
                    {
                        ri: { tS: 0, tE: 1, multiplicity: Infinity },
                        kind: 6,
                        box: [[1.5,0.75],[1.5,0.75]] 
                    },
                    { 
                        ri: { tS: 0.5, tE: 0.5, multiplicity: 1 },
                        kind: 6,
                        box: [[1.5,0.75],[1.5,0.75]] 
                    }
                ]
            ]);
            expect(xs).to.eql(swapIntersections(bezierBezierIntersection(ps2, ps1)));
        }

        {
            const ps1 = [[1.5,0.75]];
            const ps2 = [[0,0],[1,1],[2,1],[3,2**-60]];  //=> almost disguised qudratic
            const xs = bezierBezierIntersection(ps1, ps2);
            expect(xs).to.eql([]);
            expect(xs).to.eql(swapIntersections(bezierBezierIntersection(ps2, ps1)));
        }
    });

    ////////////////////////////////////////////////////////////////
    // Order 1/1
    ////////////////////////////////////////////////////////////////
    it('it should find the intersection between two overlapping lines',
    function() {
        {
            const ps1 = [[1,1],[2,2]];
            const ps2 = [[1,1],[3,3]];
            const xs = bezierBezierIntersection(ps1, ps2);
            // `undefined` signifies an infinite number of intersections
            expect(xs).to.be.undefined;
        }

        {
            const ps1 = [[1,1],[2,2]];
            const ps2 = [[3,3],[4,4]];
            const xs = bezierBezierIntersection(ps1, ps2);
            // `undefined` signifies an infinite number of intersections
            expect(xs).to.eql([]);
        }
    });

    ////////////////////////////////////////////////////////////////
    // Order 1/2 and 2/1
    ////////////////////////////////////////////////////////////////

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
    it('it should find intersections between two cubic bezier curves',
    function() {
        {
            // https://www.desmos.com/calculator/jgh9mnb9he
            const ps1A = [[-2.2355817696,1.1],[1,1],[2,1],[3,0]];
            const ps2 = [[2.1,3.47],[7.77,3.33],[-13.3,7.001],[6.31,-9.999]];
            const xs = bezierBezierIntersection(ps1A, ps2);
            expect(xs).to.be.nearly(2**4, [
                [
                    { 
                        ri: { 
                            tS: 1.7912871375609524e-12,
                            tE: 1.7915091821658774e-12,
                            multiplicity: 1 
                        },
                        box: [
                            [-2.235581769582615,1.0999999999994616],
                            [-2.235581769582608,1.0999999999994639]
                        ],
                        kind: 1
                    },
                    {
                        ri: {
                            tS: 0.661985479297476,
                            tE: 0.6619854792974762,
                            multiplicity: 1
                        },
                        box: [
                            [-2.235581769582615,1.0999999999994616],
                            [-2.235581769582608,1.0999999999994639]
                        ],
                        kind: 1
                    }
                ]
            ]);
            expect(xs).to.eql(swapIntersections(bezierBezierIntersection(ps2, ps1A)));

            const ps1B = [[-2.2355817695,1.1],[1,1],[2,1],[3,0]];
            expect(bezierBezierIntersection(ps1B, ps2)).to.eql([]);

            // https://www.desmos.com/calculator/sxcirjbjpr
            const ps1C = [[-2.2355817696,1.1],[1,1],[2,1],[3,4]];
            const xsC1 = bezierBezierIntersection(ps1C, ps2);
            expect(xsC1).to.be.nearly(2**4, [
                [
                    {
                        ri: { 
                            tS: 1.7912871375623377e-12,
                            tE: 1.7915091821672628e-12,
                            multiplicity: 1
                        },
                        box: [
                            [-2.235581769582615,1.0999999999994616],
                            [-2.235581769582608,1.0999999999994639]
                        ],
                        kind: 1
                    },
                    {
                        ri: {
                            tS: 0.6619854792974761,
                            tE: 0.6619854792974763,
                            multiplicity: 1
                        },
                        box: [
                            [-2.235581769582615,1.0999999999994616],
                            [-2.235581769582608,1.0999999999994639]
                        ],
                        kind: 1
                    }
                ],
                [
                    {
                        ri: {
                            tS: 0.9382826538202589,
                            tE: 0.9382826538202591,
                            multiplicity: 1
                        },
                        box: [
                            [2.8143224135797613,3.4781434202638417],
                            [2.8143224135797715,3.4781434202638515]
                        ],
                        kind: 1
                    },
                    {
                        ri: {
                            tS: 0.056172565234172266,
                            tE: 0.05617256523417249,
                            multiplicity: 1
                        },
                        box: [
                            [2.8143224135797613,3.4781434202638417],
                            [2.8143224135797715,3.4781434202638515]
                        ],
                        kind: 1
                    }
                ],
                [
                    {
                        ri: {
                            tS: 0.9582539356878587,
                            tE: 0.9582539356878589,
                            multiplicity: 1
                        },
                        box: [
                            [2.8745991633907635,3.63975904454619],
                            [2.8745991633907892,3.63975904454621]
                        ],
                        kind: 1
                    },
                    {
                        ri: {
                            tS: 0.19375978546061032,
                            tE: 0.19375978546061054,
                            multiplicity: 1
                        },
                        box: [
                            [2.8745991633907635,3.63975904454619],
                            [2.8745991633907892,3.63975904454621]
                        ],
                        kind: 1
                    }
                ]                
            ]);

            expect(areIntersectionsOrdered(xsC1)).to.be.true;
            const xsC2 = swapIntersections(bezierBezierIntersection(ps2, ps1C));
            expect(areIntersectionsOrdered(xsC2)).to.be.true;
            expect(xsC1).to.be.nearlyAnyOrder(2**4, xsC2);
        }

        {
            const ps1 = [[-2.2355817695,1.1],[1,1],[2,1],[3,0]];
            const ps2 = [[2.1,3.47],[7.77,3.33],[-13.3,7.001],[6.31,-9.999]];
            const xs = bezierBezierIntersection(ps1, ps2);
            expect(xs).to.be.nearly(2**4, []);
            expect(xs).to.eql(swapIntersections(bezierBezierIntersection(ps2, ps1)));
        }
    });




    it('it should find intersection between two lines', 
    function() {
        const ps1 = [[1,1],[2,2]];
        const ps2 = [[0,1.5],[1.5,0.2]];
        const ts = bezierBezierIntersection(ps1, ps2);
        console.log(ts);
        //assert(r < 0);
    });

    it('it should find intersection between a line and a quadratic', 
	function() {
        const ps1 = [[1,1],[2,2]];
        const ps2 = [[0,1.5],[1.5,0.2], ];
        const ts = bezierBezierIntersection(ps1, ps2);
        console.log(ts);
        //assert(r < 0);
    });
});
