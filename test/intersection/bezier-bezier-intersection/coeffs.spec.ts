
import { expect, assert } from 'chai';
//import { describe } from 'mocha';
import 'mocha';
import { estimate, expansionDiff, qNegativeOf } from 'flo-numerical';
import { toGrid } from '../../helpers/to-grid'
import { 
    getCoeffs3x3, getCoeffs3x3Quad, getCoeffs3x3Exact_,
    getCoeffs3x2, getCoeffs3x2Quad, getCoeffs3x2Exact_, 
    getCoeffs3x1, getCoeffs3x1Quad, getCoeffs3x1Exact_,
    getCoeffs2x3, getCoeffs2x3Quad, getCoeffs2x3Exact_,
    getCoeffs2x2, getCoeffs2x2Quad, getCoeffs2x2Exact_, 
    getCoeffs2x1, getCoeffs2x1Quad, getCoeffs2x1Exact_,
    getCoeffs1x3, getCoeffs1x3Quad, getCoeffs1x3Exact_,
    getCoeffs1x2, getCoeffs1x2Quad, getCoeffs1x2Exact_, 
    getCoeffs1x1, getCoeffs1x1Quad, getCoeffs1x1Exact_
} from '../../../src/index';


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

const coeffFs = [,
    [,
        { est: getCoeffs1x1, exact: getCoeffs1x1Exact_ },    
        { est: getCoeffs1x2, exact: getCoeffs1x2Exact_ }, 
        { est: getCoeffs1x3, exact: getCoeffs1x3Exact_ }
    ], [,
        { est: getCoeffs2x1, exact: getCoeffs2x1Exact_ },
        { est: getCoeffs2x2, exact: getCoeffs2x2Exact_ }, 
        { est: getCoeffs2x3, exact: getCoeffs2x3Exact_ }
    ], [,
        { est: getCoeffs3x1, exact: getCoeffs3x1Exact_ },
        { est: getCoeffs3x2, exact: getCoeffs3x2Exact_ }, 
        { est: getCoeffs3x3, exact: getCoeffs3x3Exact_ }
    ]
];


const implFormQuadFs = [,
    [,
        { est: getCoeffs1x1Quad, exact: getCoeffs1x1Exact_ },    
        { est: getCoeffs1x2Quad, exact: getCoeffs1x2Exact_ }, 
        { est: getCoeffs1x3Quad, exact: getCoeffs1x3Exact_ }
    ], [,
        { est: getCoeffs2x1Quad, exact: getCoeffs2x1Exact_ },
        { est: getCoeffs2x2Quad, exact: getCoeffs2x2Exact_ }, 
        { est: getCoeffs2x3Quad, exact: getCoeffs2x3Exact_ }
    ], [,
        { est: getCoeffs3x1Quad, exact: getCoeffs3x1Exact_ },
        { est: getCoeffs3x2Quad, exact: getCoeffs3x2Exact_ }, 
        { est: getCoeffs3x3Quad, exact: getCoeffs3x3Exact_ }
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
            
            for (let j=1; j<=3; j++) {
                for (let k=1; k<=3; k++) {
                    let f = coeffFs[j][k];
                    testCoeffs(j,k, f.est, f.exact, bzs1[j], bzs2[k], i);
                }
            }

            for (let j=1; j<=3; j++) {
                for (let k=1; k<=3; k++) {
                    let f = implFormQuadFs[j][k];
                    testCoeffsQuad(j,k, f.est, f.exact, bzs1[j], bzs2[k], i);
                }
            }

            i++;
        }
    });
});


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

        let errActual = Math.abs(estimate(
            expansionDiff(rExact, [rEst])
        ));

        let errStr = `
        --------
        quad       : false
        bez-orders : ${j}x${k}
        indx       : ${i}
        rExact     : ${estimate(rExact)} (est)
        rEst       : ${rEst}
        errActual  : ${errActual}
        errBound   : ${errBound}`;

        assert(errActual <= errBound, errStr);

        if (iteration < 1) { console.log(errStr); }
    }
}



function testCoeffsQuad(
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

        let errActual = Math.abs(estimate(
            expansionDiff(rExact, rEst)
        ));

        let errStr = `
        --------
        quad       : true
        bez-orders : ${j}x${k}
        indx       : ${i}
        rExact     : ${estimate(rExact)} (est)
        rEst       : ${estimate(rEst)}
        errActual  : ${errActual}
        errBound   : ${errBound}`;

        assert(errActual <= errBound, errStr);

        if (iteration < 1) { console.log(errStr); }
    }
}


function rand(max: number) { 
    return 2*max * (Math.random() - 0.5); 
}


function randOnGrid(max: number, expMax: number, significantFigures: number) { 
    return () => toGrid(rand(max), expMax, significantFigures);
}
