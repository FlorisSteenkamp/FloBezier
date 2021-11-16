import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { eEstimate, eDiff } from 'big-float-ts';
import { toGrid } from '../../helpers/to-grid.js'
import { 
    /* these were to test the older 47-bit versions
    getCoeffsBez3Bez3, 
    getCoeffsBez3Bez2, 
    getCoeffsBez3Bez1, 
    getCoeffsBez2Bez3, 
    getCoeffsBez2Bez2, 
    getCoeffsBez2Bez1, 
    getCoeffsBez1Bez3, 
    getCoeffsBez1Bez2, 
    getCoeffsBez1Bez1, 
    */
    getCoeffsBez3Bez3Dd, getCoeffsBez3Bez3Exact,
    getCoeffsBez3Bez2Dd, getCoeffsBez3Bez2Exact, 
    getCoeffsBez3Bez1Dd, getCoeffsBez3Bez1Exact,
    getCoeffsBez2Bez3Dd, getCoeffsBez2Bez3Exact,
    getCoeffsBez2Bez2Dd, getCoeffsBez2Bez2Exact, 
    getCoeffsBez2Bez1Dd, getCoeffsBez2Bez1Exact,
    getCoeffsBez1Bez3Dd, getCoeffsBez1Bez3Exact,
    getCoeffsBez1Bez2Dd, getCoeffsBez1Bez2Exact, 
    getCoeffsBez1Bez1Dd, getCoeffsBez1Bez1Exact
} from '../../../src/index.js';


type Coeff<T> = { 
    coeffs: T[];
    errBound: number[];
}

type CoeffDouble = Coeff<number>;
type CoeffQuad = Coeff<number[]>;
type CoeffExact = number[][];


const num = 200;
const maxBitLength = 46;
const maxCoordinate = 128;
const expMax = Math.ceil(Math.log2(maxCoordinate));
const randOnGrid_ = randOnGrid(maxCoordinate, expMax, maxBitLength);

const _bz_3: number[][] = [[0,0],[0,0],[0,0],[0,0]];
const _bz_2: number[][] = [[0,0],[0,0],[0,0]];
const _bz_1: number[][] = [[0,0],[0,0]];


/* these were to test the older 47-bit versions
const coeffFs = [,
    [,
        { est: getCoeffsBez1Bez1, exact: getCoeffsBez1Bez1Exact },    
        { est: getCoeffsBez1Bez2, exact: getCoeffsBez1Bez2Exact }, 
        { est: getCoeffsBez1Bez3, exact: getCoeffsBez1Bez3Exact }
    ], [,
        { est: getCoeffsBez2Bez1, exact: getCoeffsBez2Bez1Exact },
        { est: getCoeffsBez2Bez2, exact: getCoeffsBez2Bez2Exact }, 
        { est: getCoeffsBez2Bez3, exact: getCoeffsBez2Bez3Exact }
    ], [,
        { est: getCoeffsBez3Bez1, exact: getCoeffsBez3Bez1Exact },
        { est: getCoeffsBez3Bez2, exact: getCoeffsBez3Bez2Exact }, 
        { est: getCoeffsBez3Bez3, exact: getCoeffsBez3Bez3Exact }
    ]
];
*/


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
    it('it should find intersection coefficients (including error bound) of beziers in double, quad and exact precision', 
	function() {
        let i = 0;
        while (i<num) {
            // get some random beziers
            let bzs1 = [,
                _bz_1.map(p => p.map(randOnGrid_)),
                _bz_2.map(p => p.map(randOnGrid_)),
                _bz_3.map(p => p.map(randOnGrid_))
            ];

            let bzs2 = [,
                _bz_1.map(p => p.map(randOnGrid_)),
                _bz_2.map(p => p.map(randOnGrid_)),
                _bz_3.map(p => p.map(randOnGrid_))
            ];
            
            /* these were to test the older 47-bit versions
            for (let j=1; j<=3; j++) {
                for (let k=1; k<=3; k++) {
                    let f = coeffFs[j][k];
                    testCoeffs(j,k, f.est, f.exact, bzs1[j], bzs2[k], i);
                }
            }
            */
            
            for (let j=1; j<=3; j++) {
                for (let k=1; k<=3; k++) {
                    let f = implFormDdFs[j][k];
                    testCoeffsDd(j,k, f.est, f.exact, bzs1[j], bzs2[k], i);
                }
            }

            i++;
        }
    });
});


/* these were to test the older 47-bit versions
function testCoeffs(
        j: number, k: number,
        f: (bz1: number[][], bz2: number[][]) => CoeffDouble,
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

        let errActual = Math.abs(eEstimate(
            eDiff(rExact, [rEst])
        ));

        let errStr = `
        --------
        quad       : false
        bez-orders : ${j}x${k}
        indx       : ${i}
        rExact     : ${eEstimate(rExact)} (est)
        rEst       : ${rEst}
        errActual  : ${errActual}
        errBound   : ${errBound}`;

        assert(errActual <= errBound, errStr);

        if (iteration < 1) { 
            //console.log(errStr); 
        }
    }
}
*/


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

        let errActual = Math.abs(eEstimate(
            eDiff(rExact, rEst)
        ));

        let errStr = `
        --------
        quad       : true
        bez-orders : ${j}x${k}
        indx       : ${i}
        rExact     : ${eEstimate(rExact)} (est)
        rEst       : ${eEstimate(rEst)}
        errActual  : ${errActual}
        errBound   : ${errBound}`;

        assert(errActual <= errBound, errStr);

        if (iteration < 1) { 
            //console.log(errStr); 
        }
    }
}


function rand(max: number) { 
    return 2*max * (Math.random() - 0.5); 
}


function randOnGrid(max: number, expMax: number, significantFigures: number) { 
    return () => toGrid(rand(max), expMax, significantFigures);
}
