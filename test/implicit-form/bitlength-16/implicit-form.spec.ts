
// Tests input length 45-bit aligned 
// * double, 
// * double-double and
// * exact 
// versions.

import { expect, assert } from 'chai';
//import { describe } from 'mocha';
import 'mocha';
import { 
    getImplicitForm1_bitlength16_double as getImplicitForm1, 
    getImplicitForm2_bitlength16_double as getImplicitForm2, 
    getImplicitForm3_bitlength16_double as getImplicitForm3,     

    //getImplicitForm1_bitlength16_doubleDouble as getImplicitForm1Quad_,
    //getImplicitForm2_bitlength16_doubleDouble as getImplicitForm2Quad, 
    //getImplicitForm3_bitlength16_doubleDouble as getImplicitForm3Quad, 

    //getImplicitForm1_bitlength16_exact as getImplicitForm1Exact_, 
    //getImplicitForm2_bitlength16_exact as getImplicitForm2Exact, 
    //getImplicitForm3_bitlength16_exact as getImplicitForm3Exact,

    getImplicitForm1_bitlength45_exact as getImplicitForm1Exact_, 
    getImplicitForm2_bitlength45_exact as getImplicitForm2Exact, 
    getImplicitForm3_bitlength45_exact as getImplicitForm3Exact,
} from '../../../src/index';
import { estimate, expansionDiff } from 'flo-numerical';
import { toGrid } from '../../helpers/to-grid'
import { γ, γγ } from '../../../src/error-analysis/error-analysis';


const γ1 = γ(1);
const γγ3 = γγ(3);


type Coeffs<T> = {
    vₓₓₓ ?: T; vₓₓᵧ ?: T; vₓᵧᵧ ?: T; vᵧᵧᵧ ?: T;
    vₓₓ  ?: T; vₓᵧ  ?: T; vᵧᵧ  ?: T;
    vₓ   ?: T; vᵧ   ?: T;
    v    ?: T;
}


type CoeffErrs<T> = {
    vₓₓₓ_ ?: T; vₓₓᵧ_ ?: T; vₓᵧᵧ_ ?: T; vᵧᵧᵧ_ ?: T;
    vₓₓ_  ?: T; vₓᵧ_  ?: T; vᵧᵧ_  ?: T;
    vₓ_   ?: T; vᵧ_   ?: T;
    v_    ?: T;
}


type CoeffKeys<T> = keyof Coeffs<T>;
type CoeffErrKeys<T> = keyof CoeffErrs<T>;


type ImplicitForm<T> = { 
    coeffs: Coeffs<T>,
    errorBound?: { 
        vₓₓₓ_?: number; vₓₓᵧ_?: number; vₓᵧᵧ_?: number; vᵧᵧᵧ_?: number;
        vₓₓ_ ?: number; vₓᵧ_ ?: number; vᵧᵧ_ ?: number;
        vₓ_  ?: number; vᵧ_  ?: number;
        v_   ?: number;
    }
}

type ImplicitFormDouble = ImplicitForm<number>;
type ImplicitFormQuad = ImplicitForm<number[]>;
type ImplicitFormExact = Coeffs<number[]>;


const num = 200;
const maxBitLength = 16;
const maxCoordinate = 128;
const expMax = Math.ceil(Math.log2(maxCoordinate));
const randOnGrid_ = randOnGrid(maxCoordinate, expMax, maxBitLength);

const _bz_3: number[][] = [[0,0],[0,0],[0,0],[0,0]];
const _bz_2: number[][] = [[0,0],[0,0],[0,0]];
const _bz_1: number[][] = [[0,0],[0,0]];

const implFormFs = [,
    { est: getImplicitForm1, exact: getImplicitForm1Exact },
    { est: getImplicitForm2, exact: getImplicitForm2Exact },
    { est: getImplicitForm3, exact: getImplicitForm3Exact },
];


/*
function getImplicitForm1Quad(ps: number[][]) {
    let { vₓ, vᵧ, v } = getImplicitForm1Quad_(ps).coeffs;
    return {
        coeffs: { vₓ: [0,vₓ], vᵧ: [0,vᵧ], v },
        errorBound: { }
    }
}
*/

function getImplicitForm1Exact(ps: number[][]) {
    let { vₓ, vᵧ, v } = getImplicitForm1Exact_(ps);
    return { vₓ: [vₓ], vᵧ: [vᵧ], v };
}

/*
const implFormQuadFs = [,
    { est: getImplicitForm1Quad, exact: getImplicitForm1Exact },
    { est: getImplicitForm2Quad, exact: getImplicitForm2Exact },
    { est: getImplicitForm3Quad, exact: getImplicitForm3Exact },
];
*/

describe('implicit form', function() {
    it('it should find the implicit form (including error bound) of some beziers in double precision', 
	function() {
        let i = 0;
        while (i<num) {
            // get some random beziers
            let bzs = [,
                _bz_1.map(p => p.map(randOnGrid_)),
                _bz_2.map(p => p.map(randOnGrid_)),
                _bz_3.map(p => p.map(randOnGrid_))
            ];
            
            for (let j=1; j<=3; j++) {
                let f = implFormFs[j];
                testImplictForm(false, f.est, f.exact, bzs[j], i);
            }

            i++;
        }
    });

    /*
    it('it should find the implicit form (including error bound) of some beziers in double-double precision', 
	function() {
        let i = 0;
        while (i<num) {
            // get some random beziers
            let bzs = [,
                _bz_1.map(p => p.map(randOnGrid_)),
                _bz_2.map(p => p.map(randOnGrid_)),
                _bz_3.map(p => p.map(randOnGrid_))
            ];
            
            for (let j=1; j<=3; j++) {
                let f = implFormQuadFs[j];
                testImplictForm(true, f.est, f.exact, bzs[j], i);
            }

            i++;
        }
    });
    */
});


function testImplictForm(
        isQuad: boolean,
        f: (bz: number[][]) => ImplicitFormDouble | ImplicitFormQuad,
        fExact: (bz: number[][]) => ImplicitFormExact,
        bz: number[][],
        iteration: number): void {

    let implEst = f(bz);
    let implExact = fExact(bz);

    for (let key_ in implEst.coeffs) {
        let key = key_ as CoeffKeys<number | number[]>;
        let rEst = isQuad 
            ? implEst.coeffs[key] as number[]
            : [implEst.coeffs[key]] as number[];
        let rExact = implExact[key];
        let err = implEst.errorBound[key + '_' as CoeffErrKeys<number>];
        let errBound = isQuad
            ? γγ3*(err || 0)
            : γ1 *(err || 0);

        let errActual = Math.abs(estimate(
            expansionDiff(rExact, rEst)
        ));

        let errStr = `
        --------
        quad      : ${isQuad}
        key       : ${key}
        rExact    : ${estimate(rExact)} (est)
        rEst      : ${estimate(rEst)}
        errActual : ${errActual}
        errBound  : ${errBound}`;

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
