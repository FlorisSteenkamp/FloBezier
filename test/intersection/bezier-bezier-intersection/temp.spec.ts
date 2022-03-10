// TODO - temporary - remove

import { expect, use } from 'chai';
import { 
    bezierBezierIntersection, cubicToQuadratic, evaluateExact, generateSelfIntersecting, 
    getEndpointIntersections, getImplicitForm3, getTransformedTs, getXY, 
    getXYExact, 
    isPointOnBezierExtension, quadraticToCubic, reduceOrderIfPossible 
} from '../../../src/index.js';
import { getPssWithInfiniteXs } from '../../helpers/intersection/get-pss-with-infinite-xs.js';
import { swapIntersections } from '../../helpers/intersection/swap-intersections.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { nearlyAnyOrder } from '../../helpers/chai-extend-nearly-any-order.js';
import { fromTo3 } from '../../../src/transformation/split/from-to/from-to-3.js';
import { allRootsCertified, allRootsCertifiedSimplified, changeVariablesTranslateX, mid, refineK1 } from 'flo-poly';
import { areIntersectionsInfinte } from '../../helpers/intersection/are-intersections-infinite.js';
import { ddDivDd, ddDiffDd, ddMultDd, ddMultDouble1, ddNegativeOf } from 'double-double';
import { eEstimate, twoProduct } from 'big-float-ts';
import { getLinearTransformation } from '../../../src/transformation/get-transformed-ts.js';

use(nearlyAnyOrder);
use(nearly);
const eps = Number.EPSILON;

const tp = twoProduct;
const inf = Number.POSITIVE_INFINITY;


describe('bezierBezierIntersection', function() {
    it('should',
    function() {
        /*
        {
            const ps1 = [[1,1],[2,2]];
            const ps2 = [[1,1],[2,2]];
            // const xs = bezierBezierIntersection(ps1, ps2);
            // expect(xs.length).to.eql(1);
        }

        {
            const ps1 = [[1,1],[2,2]];
            const ps2 = [[3,3],[4,4]];
            const xs = bezierBezierIntersection(ps1, ps2);
            // `undefined` signifies an infinite number of intersections
            expect(xs).to.eql([]);
        }
        */
    });
});


