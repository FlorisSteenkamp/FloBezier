
import { expect, assert } from 'chai';
//import { describe } from 'mocha';
import 'mocha';
import { estimate, expansionDiff, qNegativeOf } from 'flo-numerical';
import { toGrid } from '../../helpers/to-grid'
import { 
    //getCoeffsBez3Bez3,
    getCoeffsBez3Bez3InclError as getCoeffsBez3Bez3,
    getCoeffsBez3Bez3DdAnyBitlength as getCoeffsBez3Bez3Dd, 
    getCoeffsBez3Bez3ExactAnyBitlength as getCoeffsBez3Bez3Exact,
} from '../../../src/index';
import { eCompress } from 'big-float-ts';


type Coeff<T> = { 
    coeffs: T[];
    errBound: number[];
}

type CoeffDouble = Coeff<number>;
type CoeffQuad = Coeff<number[]>;
type CoeffExact = number[][];

//const num = 200;
const num = 1;
const maxBitLength = 47;
const maxCoordinate = 128;
const expMax = Math.ceil(Math.log2(maxCoordinate));
const randOnGrid_ = randOnGrid(maxCoordinate, expMax, maxBitLength);

const _bz_3: number[][] = [[0,0],[0,0],[0,0],[0,0]];

const coeffFs = { est: getCoeffsBez3Bez3, exact: getCoeffsBez3Bez3Exact };

const coeffsDdFs = { est: getCoeffsBez3Bez3Dd, exact: getCoeffsBez3Bez3Exact };


describe('intersection coefficients', function() {
    it('it should find intersection coefficients (including error bound) of beziers in double, quad and exact precision', 
	function() {
        let i = 0;
        while (i<num) {
            // get some random beziers
            //let bzs1 = _bz_3.map(p => p.map(randOnGrid_));
            //let bzs2 = _bz_3.map(p => p.map(randOnGrid_));

            // quicks testing specific case
            let bzs1 = psss[0];
            let bzs2 = psss[1];

            //testCoeffs(coeffFs.est, coeffFs.exact, bzs1, bzs2, i);

            testCoeffsQuad(coeffsDdFs.est, coeffsDdFs.exact, bzs1, bzs2, i);
            
            i++;
        }
    });
});


function testCoeffs(
        f: (bz1: number[][], bz2: number[][]) => CoeffDouble,
        fExact: (bz1: number[][], bz2: number[][]) => CoeffExact,
        bz1: number[][],
        bz2: number[][],
        iteration: number): void {

    let est = f(bz1, bz2);
    let exact = fExact(bz1, bz2);

    for (let i=0; i<9; i++) {
        let rEst = est.coeffs[i];
        let rExact = exact[i];
        let errBound = est.errBound[i];

        let errActual = Math.abs(estimate(
            expansionDiff(rExact, [rEst])
        ));

        let errStr = `
        --------
        quad       : false
        indx       : ${i}
        rExact     : ${estimate(rExact)} (est)
        rEst       : ${rEst}
        errActual  : ${errActual}
        errBound   : ${errBound}`;

        assert(errActual <= errBound, errStr);

        if (iteration < 1) { 
            console.log(errStr); 
        }
    }
}



function testCoeffsQuad(
        f: (bz1: number[][], bz2: number[][]) => CoeffQuad,
        fExact: (bz1: number[][], bz2: number[][]) => CoeffExact,
        bz1: number[][],
        bz2: number[][],
        iteration: number): void {

    let est = f(bz1, bz2);
    let exact = fExact(bz1, bz2);

    for (let i=0; i<9; i++) {
        let rEst = est.coeffs[i];
        let rExact = exact[i];
        let errBound = est.errBound[i];

        let errActual = Math.abs(estimate(
            expansionDiff(rExact, rEst)
        ));

        let errStr = `
        --------
        quad       : true
        indx       : ${i}
        rExact     : ${estimateDd(rExact)} (est)
        rEst       : ${estimateDd(rEst)}
        errActual  : ${errActual}
        errBound   : ${errBound}`;

        //assert(errActual <= errBound, errStr);

        if (iteration < 1) { 
            console.log(errStr); 
        }
    }
}


function rand(max: number) { 
    return 2*max * (Math.random() - 0.5); 
}


function randOnGrid(max: number, expMax: number, significantFigures: number) { 
    return () => toGrid(rand(max), expMax, significantFigures);
}


const a = 0;//2**0;
const b = 0;
//const b = 2**0;
const psss = [
    [
        [0.301113231412117+a-a,3],  
        [0.7113197148825421+a-a,3], 
        [0.5721410447654947+a-a,3], 
        [0.3589082997466093+a-a,3], 
    ],
    [
        [0.4618254473553094+a-a,3.1+b-b],  // 3.099999999999909
        [0.029562388526279904+a-a,0],
        [0.2807926522345028+a-a,1],
        [0.7686517004998734+a-a,3]
    ]
];


function estimateDd(x: number[]) {
    if (x.length <= 2) { return x; }

    const v = eCompress(x);
    const vv = v[v.length-1];
    const v2 = v.slice(0,-1);
    const ve = estimate(v2);

    return [ve, vv];
}