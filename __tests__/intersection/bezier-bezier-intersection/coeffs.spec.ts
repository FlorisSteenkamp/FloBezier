import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { eEstimate, eDiff } from 'big-float-ts';
import { randomCenteredAt0v2 } from '../../helpers/random-on-grid.js';
import { getCoeffsBez3Bez3Dd } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez3-bez3-dd.js';
import { getCoeffsBez3Bez3Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez3-bez3-exact.js';
import { getCoeffsBez3Bez2Dd } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez3-bez2-dd.js';
import { getCoeffsBez3Bez2Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez3-bez2-exact.js';
import { getCoeffsBez3Bez1Dd } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez3-bez1-dd.js';
import { getCoeffsBez3Bez1Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez3-bez1-exact.js';
import { getCoeffsBez2Bez3Dd } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez2-bez3-dd.js';
import { getCoeffsBez2Bez3Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez2-bez3-exact.js';
import { getCoeffsBez2Bez2Dd } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez2-bez2-dd.js';
import { getCoeffsBez2Bez2Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez2-bez2-exact.js';
import { getCoeffsBez2Bez1Dd } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez2-bez1-dd.js';
import { getCoeffsBez2Bez1Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez2-bez1-exact.js';
import { getCoeffsBez1Bez3Dd } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez1-bez3-dd.js';
import { getCoeffsBez1Bez3Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez1-bez3-exact.js';
import { getCoeffsBez1Bez2Dd } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez1-bez2-dd.js';
import { getCoeffsBez1Bez2Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez1-bez2-exact.js';
import { getCoeffsBez1Bez1Dd } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez1-bez1-dd.js';
import { getCoeffsBez1Bez1Exact } from '../../../src/intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez1-bez1-exact.js';

const { abs } = Math;


type Coeff<T> = {
    coeffs: T[];
    errBound: number[];
}

type CoeffDouble = Coeff<number>;
type CoeffQuad = Coeff<number[]>;
type CoeffExact = number[][];


const numTests = 100;       // the number of random tests to perform
const maxCoordinate = 128;  // just some max coordinate


function r(n: number) {
    return randomCenteredAt0v2(maxCoordinate, n);
}


const _bz_3: number[][] = [[0,0],[0,0],[0,0],[0,0]];  // dummy cubic
const _bz_2: number[][] = [[0,0],[0,0],[0,0]];        // dummy quadratic
const _bz_1: number[][] = [[0,0],[0,0]];              // dummy line


const implFormDdFs = [,
    [,
        { est: getCoeffsBez1Bez1Dd, exact: getCoeffsBez1Bez1Exact },    
        { est: getCoeffsBez1Bez2Dd, exact: getCoeffsBez1Bez2Exact }, 
        { est: getCoeffsBez1Bez3Dd, exact: getCoeffsBez1Bez3Exact }
    ], [,
        { est: getCoeffsBez2Bez1Dd, exact: getCoeffsBez2Bez1Exact },
        { est: getCoeffsBez2Bez2Dd, exact: getCoeffsBez2Bez2Exact }, 
        { est: getCoeffsBez2Bez3Dd, exact: getCoeffsBez2Bez3Exact }
    ], [,
        { est: getCoeffsBez3Bez1Dd, exact: getCoeffsBez3Bez1Exact },
        { est: getCoeffsBez3Bez2Dd, exact: getCoeffsBez3Bez2Exact }, 
        { est: getCoeffsBez3Bez3Dd, exact: getCoeffsBez3Bez3Exact }
    ]
];


describe('intersection coefficients', function() {
    it('it should find valid polynomial intersection coefficients (including error bound) of beziers in double-double precision (and for Shewchuk expansions)', 
	function() {
        let i = 0;
        while (i++ < numTests) {
            let j = 5;
            // get some random beziers
            let bzs1 = [,
                _bz_1.map(p => p.map(() => r(j++))),
                _bz_2.map(p => p.map(() => r(j++))),
                _bz_3.map(p => p.map(() => r(j++)))
            ];

            let bzs2 = [,
                _bz_1.map(p => p.map(() => r(j++))),
                _bz_2.map(p => p.map(() => r(j++))),
                _bz_3.map(p => p.map(() => r(j++)))
            ];

            for (let j=1; j<=3; j++) {
                for (let k=1; k<=3; k++) {
                    let f = implFormDdFs[j]![k]!;
                    testCoeffsDd(j,k, f.est, f.exact, bzs1[j]!, bzs2[k]!, i);
                }
            }
        }
    });
});


function testCoeffsDd(
        j: number, k: number,
        f: (bz1: number[][], bz2: number[][]) => CoeffQuad,
        fExact: (bz1: number[][], bz2: number[][]) => CoeffExact,
        bz1: number[][],
        bz2: number[][],
        iteration: number): void {

    let est = f(bz1, bz2);
    let exact = fExact(bz1, bz2);

    for (let i=0; i<j*k; i++) {
        let rEst = est.coeffs[i];
        let rExact = exact[i];
        let errBound = est.errBound[i];

        let errActual = abs(eEstimate(
            eDiff(rExact, rEst)
        ));

        let errStr = `
        --------
        bez-orders : ${j}x${k}
        indx       : ${i}
        rExact     : ${eEstimate(rExact)} (est)
        rEst       : ${eEstimate(rEst)}
        errActual  : ${errActual}
        errBound   : ${errBound}`;

        assert(errActual <= errBound, errStr);
    }
}
