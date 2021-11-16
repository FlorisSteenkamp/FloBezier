////////////////////////////////////////
// Tests any bitlength:
// * double, 
// * double-double and
// * exact 
// versions.
////////////////////////////////////////

import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { 
    getImplicitForm1,
    getImplicitForm2, 
    getImplicitForm3,

    getImplicitForm1DdWithRunningError,
    getImplicitForm2DdWithRunningError,
    getImplicitForm3DdWithRunningError,

    getImplicitForm1Exact, 
    getImplicitForm2Exact, 
    getImplicitForm3Exact,
    getImplicitForm1ErrorCounters,
    getImplicitForm2ErrorCounters,
    getImplicitForm3ErrorCounters,
} from '../../src/index.js';
import { eEstimate, eDiff } from 'big-float-ts';
import { γ, γγ } from '../../src/error-analysis/error-analysis.js';
import { toGrid } from '../helpers/to-grid.js'
// import { toGrid } from '../../src/index.js';
import { eCompress } from 'big-float-ts';


const γ1 = γ(1);
const γγ3 = γγ(3);


function getImplicitForm1InclError(ps: number[][]): ImplicitFormDouble {
    const coeffs = getImplicitForm1(ps);
    const { vₓ, vᵧ, v } = coeffs;
    const { vₓ_, vᵧ_, v_ } = getImplicitForm1ErrorCounters(ps);
    const errorBound = {
        vₓ_: /*γ1**/vₓ_*vₓ,
        vᵧ_: /*γ1**/vᵧ_*vᵧ,
        v_ : /*γ1**/v_ *v
    }

    return {
        coeffs,
        errorBound
    }
}


function getImplicitForm2InclError(ps: number[][]): ImplicitFormDouble {
    const coeffs = getImplicitForm2(ps);
    const { vₓₓ,  vₓᵧ,  vᵧᵧ,  vₓ,  vᵧ,  v } = coeffs;
    const { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ } = getImplicitForm2ErrorCounters(ps);
    const errorBound = {
        vₓₓ_: /*γ1**/vₓₓ_*vₓₓ, 
        vₓᵧ_: /*γ1**/vₓᵧ_*vₓᵧ, 
        vᵧᵧ_: /*γ1**/vᵧᵧ_*vᵧᵧ,
        vₓ_: /*γ1**/vₓ_*vₓ,
        vᵧ_: /*γ1**/vᵧ_*vᵧ,
        v_ : /*γ1**/v_ *v
    }

    return {
        coeffs,
        errorBound
    }
}


function getImplicitForm3InclError(ps: number[][]): ImplicitFormDouble {
    const coeffs = getImplicitForm3(ps);
    const { vₓₓₓ,  vₓₓᵧ,  vₓᵧᵧ,  vᵧᵧᵧ,  vₓₓ,  vₓᵧ,  vᵧᵧ,  vₓ,  vᵧ,  v } = coeffs;
    const { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ } = getImplicitForm3ErrorCounters(ps);
    const errorBound = {
        vₓₓₓ_: /*γ1**/vₓₓₓ_*vₓₓₓ,
        vₓₓᵧ_: /*γ1**/vₓₓᵧ_*vₓₓᵧ,
        vₓᵧᵧ_: /*γ1**/vₓᵧᵧ_*vₓᵧᵧ,
        vᵧᵧᵧ_: /*γ1**/vᵧᵧᵧ_*vᵧᵧᵧ,
        vₓₓ_: /*γ1**/vₓₓ_*vₓₓ, 
        vₓᵧ_: /*γ1**/vₓᵧ_*vₓᵧ, 
        vᵧᵧ_: /*γ1**/vᵧᵧ_*vᵧᵧ,
        vₓ_: /*γ1**/vₓ_*vₓ,
        vᵧ_: /*γ1**/vᵧ_*vᵧ,
        v_ : /*γ1**/v_ *v
    }

    return {
        coeffs,
        errorBound
    }
}


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
type ImplicitFormDd = ImplicitForm<number[]>;
type ImplicitFormExact = Coeffs<number[]>;


//const num = 200;
const num = 0;
const maxBitLength = 45;
const maxCoordinate = 128;
const expMax = Math.ceil(Math.log2(maxCoordinate));
const randOnGrid_ = randOnGrid(maxCoordinate, expMax, maxBitLength);

const _bz_3: number[][] = [[0,0],[0,0],[0,0],[0,0]];
const _bz_2: number[][] = [[0,0],[0,0],[0,0]];
const _bz_1: number[][] = [[0,0],[0,0]];

const implFormFs = [,
    { est: getImplicitForm1InclError, exact: getImplicitForm1Exact },
    { est: getImplicitForm2InclError, exact: getImplicitForm2Exact },
    { est: getImplicitForm3InclError, exact: getImplicitForm3Exact },
];


// function getImplicitForm1Dd(ps: number[][]) {
    //let { vₓ, vᵧ, v } = getImplicitForm1Dd_(ps).coeffs;
    //return {
    //    coeffs: { vₓ: [0,vₓ], vᵧ: [0,vᵧ], v },
    //    errorBound: { }
    //}

    // return getImplicitForm1Dd_(ps);
// }

// function getImplicitForm1Exact(ps: number[][]) {
    //let { vₓ, vᵧ, v } = getImplicitForm1Exact_(ps);
    //return { vₓ: [vₓ], vᵧ: [vᵧ], v };
    // return getImplicitForm1Exact_(ps);
// }

const implFormDdFs = [,
    { est: getImplicitForm1DdWithRunningError, exact: getImplicitForm1Exact },
    { est: getImplicitForm2DdWithRunningError, exact: getImplicitForm2Exact },
    { est: getImplicitForm3DdWithRunningError, exact: getImplicitForm3Exact },
];

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
                testImplictForm(false, f.est, f.exact, bzs[j]);
            }

            i++;
        }
    });

    it('it should find the implicit form (including error bound) of some beziers in double-double precision', 
	function() {
        let i = 0;
        while (i<num) {
            // get some random beziers
            let bzs = [,
                _bz_1.map(p => p.map(randOnGrid_)),  // linear
                _bz_2.map(p => p.map(randOnGrid_)),  // quadratic
                _bz_3.map(p => p.map(randOnGrid_))   // cubic
            ];

            for (let j=1; j<=3; j++) {
                let f = implFormDdFs[j];
                testImplictForm(true, f.est, f.exact, bzs[j]);
            }

            i++;
        }
    });


    it('it should find the implicit form (including error bound) of some specific beziers in double-double precision', 
	function() {
        //let bzs = [psss[0]];
        let bzs = psss;

        for (let i=0; i<bzs.length; i++) {
            const bz = bzs[i];
            let f = implFormDdFs[bz.length-1];
            testImplictForm(true, f.est, f.exact, bz);
        }
    });
});


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
]


let qq = 0;

function testImplictForm(
        isDd: boolean,
        f: (bz: number[][]) => ImplicitFormDouble | ImplicitFormDd,
        fExact: (bz: number[][]) => ImplicitFormExact,
        bz: number[][]): void {

    let implEst = f(bz);
    let implExact = fExact(bz);

    for (let key_ in implEst.coeffs) {
        let key = key_ as CoeffKeys<number | number[]>;
        let rEst = isDd 
            ? implEst.coeffs[key] as number[]
            : [implEst.coeffs[key]] as number[];
        let rExact = implExact[key];
        let err = implEst.errorBound[key + '_' as CoeffErrKeys<number>];
        let errBound = isDd
            ? γγ3*(err || 0)
            : γ1 *(err || 0);

        let errActual = Math.abs(eEstimate(
            eDiff(rExact, rEst)
        ));


        let errStr: string;

        //if (errActual > errBound) {
            //const implEstStr = '';
            //const implExactStr = '';
            //let implErrsStr = '';
            //for (const k in implEst.coeffs) {
            //    implErrsStr += 
            //        // @ts-ignore
            //        `coeffs: ${k} : ${eEstimate((implEst as ImplicitFormDd).coeffs[k]) - eEstimate(implExact[k])}\n`
            //    implErrsStr += 
            //    // @ts-ignore
            //        `errorBound: ${k} : ${(implEst as ImplicitFormDd).errorBound[k + '_'] * γγ3}\n`
            //}

            errStr = `
            --------
            dd        : ${isDd}
            key       : ${key}
            rExact    : ${estimateDd(rExact)} (est)
            rEst      : ${estimateDd(rEst)}
            errActual : ${errActual}
            errBound  : ${errBound}
            `;
        //}

        assert(errActual <= errBound, errStr);

        //if (iteration < 1) { console.log(errStr); }
        //console.log(errStr);
    }
}

function estimateDd(x: number[]) {
    if (x.length <= 2) { return x; }

    const v = eCompress(x);
    const vv = v[v.length-1];
    const v2 = v.slice(0,-1);
    const ve = eEstimate(v2);

    return [ve, vv];
}

function rand(max: number) { 
    return 2*max * (Math.random() - 0.5); 
}


function randOnGrid(max: number, expMax: number, significantFigures: number) { 
    return () => toGrid(rand(max), expMax, significantFigures);
}



//implEst   : ${implEstStr}
//implExact : ${implExactStr}
//implErrs  : ${implErrsStr}