////////////////////////////////////////////////////
// Tests double, double-double and exact versions.
////////////////////////////////////////////////////

import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { 
    getImplicitForm1, getImplicitForm2,  getImplicitForm3,
    getImplicitForm1DdWithRunningError, getImplicitForm2DdWithRunningError, getImplicitForm3DdWithRunningError,
    getImplicitForm1Dd, getImplicitForm2Dd, getImplicitForm3Dd,
    getImplicitForm1Exact, getImplicitForm2Exact, getImplicitForm3Exact,
    getImplicitForm1ErrorCounters, getImplicitForm2ErrorCounters, getImplicitForm3ErrorCounters,
} from '../../src/index.js';
import { eEstimate, eDiff } from 'big-float-ts';
import { γ, γγ } from '../../src/error-analysis/error-analysis.js';
import { eCompress } from 'big-float-ts';
import { randomOnGrid } from '../helpers/random-on-grid.js';

const γ1 = γ(1);
const γγ3 = γγ(3);


function getImplicitForm1Error(ps: number[][]): ImplicitFormDouble {
    const coeffs = getImplicitForm1(ps);
    const { vₓ_, vᵧ_, v_ } = getImplicitForm1ErrorCounters(ps);
    const errorBound = {
        vₓ_: 1*vₓ_,
        vᵧ_: 1*vᵧ_,
        v_ : 3*v_
    }

    return {
        coeffs,
        errorBound
    }
}


function getImplicitForm2Error(ps: number[][]): ImplicitFormDouble {
    const coeffs = getImplicitForm2(ps);
    const { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ } = getImplicitForm2ErrorCounters(ps);
    const errorBound = {
        vₓₓ_: 5* vₓₓ_,
        vₓᵧ_: 5* vₓᵧ_,
        vᵧᵧ_: 5* vᵧᵧ_,
        vₓ_ : 8* vₓ_,
        vᵧ_ : 8* vᵧ_,
        v_  : 19*v_
    }

    return {
        coeffs,
        errorBound
    }
}


function getImplicitForm3Error(ps: number[][]): ImplicitFormDouble {
    const coeffs = getImplicitForm3(ps);
    const { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ } = getImplicitForm3ErrorCounters(ps);
    const errorBound = {
        vₓₓₓ_: 11*vₓₓₓ_,
        vₓₓᵧ_: 12*vₓₓᵧ_,
        vₓᵧᵧ_: 12*vₓᵧᵧ_,
        vᵧᵧᵧ_: 11*vᵧᵧᵧ_,
        vₓₓ_ : 19*vₓₓ_,
        vₓᵧ_ : 18*vₓᵧ_,
        vᵧᵧ_ : 19*vᵧᵧ_,
        vₓ_  : 22*vₓ_,
        vᵧ_  : 22*vᵧ_,
        v_   : 24*v_
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


const num = 100;
const maxBitLength = 53;
const maxCoordinate = 128;
const randOnGrid_ = randomOnGrid(maxCoordinate, maxBitLength);

const _bz_3: number[][] = [[0,0],[0,0],[0,0],[0,0]];
const _bz_2: number[][] = [[0,0],[0,0],[0,0]];
const _bz_1: number[][] = [[0,0],[0,0]];

const implFormFs = [,
    getImplicitForm1Error,
    getImplicitForm2Error,
    getImplicitForm3Error,
];

const implFormDdFs = [,
    getImplicitForm1DdWithRunningError,
    getImplicitForm2DdWithRunningError,
    getImplicitForm3DdWithRunningError,
];

const implFormDdFsExclErr = [,
    getImplicitForm1Dd,
    getImplicitForm2Dd,
    getImplicitForm3Dd,
];

const implFormExactFs = [,
    getImplicitForm1Exact!,
    getImplicitForm2Exact!,
    getImplicitForm3Exact!,
];


describe('implicit form', function() {
    it('it should find the implicit form (including error bound) of some beziers in double precision', 
	function() {
        let i = 0;
        let j = 0;
        while (i < num) {
            // get some random beziers
            let bzs = [,
                _bz_1.map(p => p.map(() => randOnGrid_(j++))),
                _bz_2.map(p => p.map(() => randOnGrid_(j++))),
                _bz_3.map(p => p.map(() => randOnGrid_(j++)))
            ];
            
            for (let j=1; j<=3; j++) {
                const fD = implFormFs[j]!;
                const fExact = implFormExactFs[j]!;
                testImplictForm(false, fD, fExact, bzs[j]!);
            }

            i++;
        }
    });
    it('it should find the implicit form (including error bound) of some beziers in double-double precision', 
	function() {
        let i = 0;
        let j = 0;
        while (i < num) {
            // get some random beziers
            let bzs = [,
                _bz_1.map(p => p.map(() => randOnGrid_(j++))),  // linear
                _bz_2.map(p => p.map(() => randOnGrid_(j++))),  // quadratic
                _bz_3.map(p => p.map(() => randOnGrid_(j++)))   // cubic
            ];

            for (let j=1; j<=3; j++) {
                const fDd = implFormDdFs[j]!;
                const fExact = implFormExactFs[j]!;
                const fDdExclErr = implFormDdFsExclErr[j];
                testImplictForm(true, fDd, fExact, bzs[j]!, fDdExclErr);
            }

            i++;
        }
    });
    it('it should find the implicit form (including error bound) of some specific beziers in double-double precision', 
	function() {
        const a = 2**0;
        const b = 2**0;
        const bzs: number[][][] = [];
        const bz1 = [
            [0.301113231412117+a-a,3],  
            [0.7113197148825421+a-a,3], 
            [0.5721410447654947+a-a,3], 
            [0.3589082997466093+a-a,3], 
        ];
        
        const bz2 = [
            [0.4618254473553094+a-a,3.1+b-b],  // 3.099999999999909
            [0.029562388526279904+a-a,0],
            [0.2807926522345028+a-a,1],
            [0.7686517004998734+a-a,3]
        ];

        bzs.push(
            bz1,
            bz2
        );

        for (let i=0; i<bzs.length; i++) {
            const bz = bzs[i];
            const fDd = implFormDdFs[bz.length-1]!;
            const fExact = implFormExactFs[bz.length-1]!;
            testImplictForm(true, fDd, fExact, bz);
        }


        {
            const ps = [[1,1],[1,1]];
            const r = getImplicitForm1Exact(ps);
            expect(r).to.be.undefined;
        }

        {
            const ps = [[1,1],[2,2],[3,3]];
            const r = getImplicitForm2Exact(ps);
            expect(r).to.eql({ vₓ: [-0,-2], vᵧ: [0,2], v: [0] });
        }

        {
            const ps = [[1,1],[2,2],[3,3]];
            const r = getImplicitForm2Exact(ps);
            expect(r).to.eql({ vₓ: [-0,-2], vᵧ: [0,2], v: [0] });
        }

        {
            const ps = [[1,1],[3,3]];
            const r = getImplicitForm1Exact(ps);
            expect(r).to.eql({ vₓ: [-0,-2], vᵧ: [0,2], v: [0] });
        }

        {
            const ps = [[1,1],[2,2],[3,3],[4,4]];
            const r = getImplicitForm3Exact(ps);
            expect(r).to.eql({ vₓ: [-3], vᵧ: [3], v: [0] });
        }

        {
            const ps = [[1,1],[1,1],[1,1],[1,1]];
            const r = getImplicitForm3Exact(ps);
            expect(r).to.be.undefined;
        }

        {
            const ps = [[0,0],[1,1],[2,1],[3,0]];
            const r = getImplicitForm3Exact(ps);
            expect(r).to.eql({ vₓₓ: [-9], vₓᵧ: [-0], vᵧᵧ: [-0], vₓ: [27], vᵧ: [-27], v: [-0] });
        }
    });
});


function testImplictForm(
        isDd: boolean,
        f: (bz: number[][]) => ImplicitFormDouble | ImplicitFormDd | undefined,
        fExact: (bz: number[][]) => ImplicitFormExact | undefined,
        bz: number[][],
        fExclErr?: (bz: number[][]) => Coeffs<number[]>): void {

    const implEst = f(bz)!;
    const implExact = fExact(bz)!;
    const implExclErr = fExclErr === undefined ? undefined : fExclErr(bz);

    for (const key_ in implEst.coeffs) {
        const key = key_ as CoeffKeys<number | number[]>;
        const rEst = isDd 
            ? implEst.coeffs[key] as number[]
            : [implEst.coeffs[key]] as number[];
        const rExact = implExact[key]!;
        const err = implEst.errorBound![key + '_' as CoeffErrKeys<number>];
        const errBound = isDd
            ? γγ3*(err || 0)
            : γ1 *(err || 0);

        const errActual = Math.abs(eEstimate(
            eDiff(rExact, rEst)
        ));

        const errStr = `
            --------
            dd        : ${isDd}
            key       : ${key}
            rExact    : ${estimateDd(rExact)} (est)
            rEst      : ${estimateDd(rEst)}
            errActual : ${errActual}
            errBound  : ${errBound}
            `;

        assert(errActual <= errBound, errStr);

        if (implExclErr !== undefined) {
            expect(rEst).to.eql(implExclErr[key]);
        }
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
