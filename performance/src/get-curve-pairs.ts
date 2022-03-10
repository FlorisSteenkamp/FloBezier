import { fromTo3 } from '../../src/transformation/split/from-to/from-to-3.js';
import { 
    bezierSelfIntersection, fromPowerBasis, getHodograph, 
    getXY, toString, cubicToQuadratic
} from '../../src/index.js';
import { generateSelfIntersecting } from '../../src/create/generate-self-intersecting.js';
import { areIntersectionsInfinte } from './are-intersections-infinite.js';


// a bit contrived (next 2)
const ps1 = [[0.11815017137396211, 1.1717377096885642],
            [0.3074666240689581, 0.989026736674596],
            [0.5869309482076801, 0.6602611255210178],
            [0.1891066502699914, 1.1001283530160535]];
    
const ps2 = [[0.8746777130909038, 0.9673159354911505],
            [0.15347129805256543, 0.6527350507429759],
            [0.5219875005727275, 1.349542675428296],
            [0.16611474303687856, 1.0688204031386093]];

// quite simple (next 2)
const ps3 = [
                [0.1, 0.6],
                [0.25, 0.7],
                [0.3, 0.7],
                [0.6, 0.9]
            ];
    
const ps4 = [
                [0.1, 0.7],
                [0.2, 0.7],
                [0.3, 0.65],
                [0.5, 0.6 ]
            ];

const ps5 = [
                [0.1, 0.6],
                [1.25, 0.7],
                [1.3, 0.7],
                [0.6, 0.9]
            ];
    
// maxed (next 2)
//const ps6 = [
//                [0.9, 0.5],
//                [1.2, 1.5],
//                [1.3, 0.35],
//                [1.5, 1.1 ]
//            ];

//const ps7 = [
//                [0.17624514767395283,1.186242310391826],
//                [0.07309181244194463,0.5072421714457391],
//                [0.8209570354202782,1.0582385496681184],
//                [0.8143367230567549,1.312701410901326]
//            ];


const ps6 = [
    [1.4, 0],
    [1.7, 1],
    [1.8, -0.15],
    [2.0, 0.6 ]
];

const ps7 = [
    [0.25, 0.50],
    [0.20, 0.25],
    [0.90, 0.45],
    //[1.00, 0.25],
    [0.75, 0.50]
];

//const ps7 = [
//    [0.25, 0.50],
//    [0.40, 0.25],
//    [1.00, 0.25],
//    [1.15, 0.50]
//];

//const ps7 = [
//    [0, 0],
//    [1, 1],
//    [2, 2],
//    [3, 3]
//];


// TODO - check this one with ps9
//const ps8 = [
//    [0.2,0.65],
//    [0.8,0.32],
//    [0.2,0.85],
//    [0.2,0.6]
//];

const ps8 = [
    [0.16,0.65],
    [0.86,0.32],
    [0.24,0.85],
    [0.27,0.6]
];

const ps9 = [
    [0.4,0.5],
    [0.6,0.9],
    [0.6,0.2],
    [0.8,0.4]
];


const psa = [
    [0.642705866220858,0.13593466106726027],
    [0.7420054952100585,0.9349625633939525],
    [0.0978336686497343,0.9895604900115771],
    [0.6192253208092211,0.2896175579845348]
];

const psb = [
    [0.674040850332787,0.24250553210222847],
    [0.5868600628547824,0.030425392034892695],
    [0.8109707079966952,0.5262277493685232],
    [0.20972484192628826,0.9987694382022667]
];


const psc = [
    [0.04872756036963466,0.884885706922617],
    [0.7467098617173775,0.08524099387757644],
    [0.20419485808169213,0.12251225057230641],
    [0.8183327887177185,0.11899838611950742]
];


const psd = [
    [0.06545506407771029,0.5862346406292573],
    [0.7296154778933328,0.2729305517964207],
    [0.22265264760323333,0.4718837765619526],
    [0.5777930012365502,0.12881868592443624]
];


const pse = [
    [0.35181299492494134,0.7541643330342822],
    [0.5116955162933792,0.6361240005202831],
    [0.3287391010950458,0.7168760604480511],
    [0.8967340021575012,0.2911063547084609]
];


const psf = [
    [0.9630085646972688,0.8150555401324198],
    [0.3184242805665747,0.3068791402854103],
    [0.9831187597706403,0.3061450698839181],
    [0.200552049393238,0.37027611013525075]
];


const psg = [
    [0.9646201687528162,1.4210854715202004e-14],
    [0.6772878019443311,2.1316282072803006e-14],
    [0.34565238552668376,1.4210854715202004e-14],
    [0.43502028382843605,1.4210854715202004e-14]
];

const psh = [
    [0.4954801054242637,2.1316282072803006e-14],
    [0.7755793433895946,1.4210854715202004e-14],
    [0.013640682690727601,0],
    [0.8957075918855395,1.4210854715202004e-14]
];


// TODO - test extreme cases like below too!
const psi = [
    [1,1],
    [1,1],
    [1,1],
    [1,1]
];

const psj = [
    [1,1],
    [1,1],
    [1,1],
    [1,1]
];

const psk = [
    [1,1],
    [2,2],
    [3,3],
    [1,1]
];

const psl = [
    [1.2,1.1],
    [1.0,1.0],
    [2.1,1.2],
    [3,3.1]
];

const psm = [
    [1,1],
    [2,1],
    [3,1],
    [4,1]
];

const psn = [
    [1,0],
    [2,5],
    [3,5],
    [3,0]
];


const pso = [
    [0.3043977399776452,0.2555279096961556],[0.49982469689667397,0.8611107929302406],[0.20054275581031789,0.8436618116052941],[0.9382758236576407,0.45044831400519314]
]
const psp = [
    [0.9069436655223129,0.7124519824396671],[0.3351787382277678,0.5038390622192992],[0.880507374352149,0.7331119599957674],[0.40556886656604973,0.48109837218232343]
]


//const s = 0.0000000000000000001;
const s = 0;
const psq = [
    [0.25,0+s],
    [0.21,0+s],
    [0.22,0+s],
    [0.23,0+s]
]
const psr = [
    [0.0,0+s],
    [0.5,0+s],
    [0.7,1+s],
    [0.9,2+s]
]


// TODO - also test case below and case with loop with 2 t values

const pst = [
    [0.00,0+s],
    [0.25,0+s],
    [0.50,0+s],
    [1.00,0+s]
]
const psu = [
    [1.0,0+s],
    [1.5,0+s],
    [1.7,1+s],
    [1.9,2+s]
]


//const psss = [
//    [[0.016170300840670393,0],[0.564795606369259,0],[0.7522306620037398,7.105427357601002e-15],[0.9733333266106499,1.4210854715202004e-14]],
//    [[0.08720363399366704,0],[0.18780498830295045,0],[0.35029650523182454,0],[0.3821498446920515,0]],
//
//    [[0.08720363399366704,0],[0.18780498830295045,0],[0.35029650523182454,0],[0.3821498446920515,0]],
//    [[0.8048287550370219,7.105427357601002e-15],[0.41511035434842825,7.105427357601002e-15],[0.8687162651732976,1.4210854715202004e-14],[0.40296511328340046,0]],
//
//    [[0.5663311117378242,0],[0.1684455443425037,0],[0.6318378264729745,0],[0.27173362304205995,0]],
//    [[0.5729647792678563,0],[0.5820943179732936,0],[0.579991119834574,1.4210854715202004e-14],[0.29518194867237213,7.105427357601002e-15]]
//];


//const psss = [
//    [[0.9428113111714183,0],[0.5793713397442843,0],[0.1720536465376128,0],[0.3561130790397513,0]],
//    [[0.08256080625731244,0],[0.0720568292506627,0],[0.44103030537951327,0],[0.27907566791434846,0]]
//];

//const psss = [
//    [
//        [0.1,0],
//        [0.0,0],
//        [0.4,0],
//        [0.7,0]
//    ],
//    [
//        [0.9,1],
//        [0.4,1],
//        [0.3,1],
//        [0.2,0]
//    ]
//];


//const m = 2**47;
//const psss = [
//    [
//        [0.6,1],
//        //[0.6,0.99999999999999],
//        //[0.6,0.9],
//        [0.5,0],
//        [0.4,2],
//        [0.2,1]
//    ],
//    [
//        [0.40,1],
//        [0.40,1],
//        [0.48,1],
//        [0.67,1]
//    ],
//    [
//        [0.6428541079308374,0.47979262017486235],[0.3568167114164993,0.11479177927147077],[0.4855704579764648,0.7522377528915882],[0.6763579929127914,0.17228105742425015]],
//        [[0.9822561118238795,0.19360719947127336],[0.7281946467984213,0.2148673222309725],[0.17189474469785182,0.5540502773782308],[0.6757397712980193,0.35425478015364575]
//    ],
//];

// TODO - handle case where bezier degenerates to a point

const a = 0;//2**0;
const b = 0;
//const b = 2**0;

/*
const psss: number[][][] = [
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
    ],

    //[
    //    [0.301113231412117,3],  // bl47- 
    //    [0.7113197148825421,3], // bl47-  
    //    [0.5721410447654947,3], // bl47-
    //    [0.3589082997466093,3], // bl47- 
    //],
    //[
    //    [0.4618254473553179,3.1],  // bl53 !!!!
    //    [0.029562388526279904,0],
    //    [0.2807926522345028,1],
    //    [0.7686517004998734,3]
    //],

    //[
    //    [0.301113231412117,3],
    //    [0.7113197148825421,3],
    //    [0.5721410447654947,3],
    //    [0.3589082997466093,3],
    //],
    //[
    //    [0.5618254473553179,3],
    //    [0.029562388526279904,0],
    //    [0.2807926522345028,1],
    //    [0.7686517004998734,3]
    //]
];
*/

//const psss: number[][][] = [];

/*
const psss: number[][][] = [
    [
        [0.3105964718894427,0.1427163503693032],
        [0.23650267666757144,0.17271915385350464],
        [0.3102300656314504,0.39960629647634993],
        [0.5317786387810797,0.8233777782378391]
    ],
    [ // this is really a quad
        [0.19829218194939946,0.34774513655815453],
        [0.2546133860873675,0.1625427261370913],
        [0.46014598266348117,0.151365700186479],
        [0.8148899716777405,0.3142140587063176]
    ],
    //[
    //    [0.19829218194939946,0.34774513655815453],
    //    [0.2827739881563515,0.0699415209265597],
    //    [0.8148899716777405,0.3142140587063176]
    //]    
];
*/

/*
below causes multiplicity 3 roots ?? - yep, it is correct
const psss: number[][][] = [
    [
        [0.3105964718894427,0.1427163503693032],
        [0.23650267666757144,0.17271915385350464],
        [0.3102300656314504,0.39960629647634993],
        [0.5317786387810797,0.8233777782378391]
    ],
    [ // this is really a quad
        [0.00, 0.00],
        [0.25, 0.25],
        [0.75, 0.75],
        [1.00, 1.00]
    ],
];
*/

/*
const psss: number[][][] = [
    [
        [0.8105964718894427,0.1427163503693032],
        [0.23650267666757144,0.17271915385350464],
        [0.3102300656314504,0.39960629647634993],
        [0.5317786387810797,0.8233777782378391]
    ],
    [ // this is really a quad
        [0.00, 0.00],
        [0.25, 0.25],
        [0.75, 0.75],
        [1.00, 1.00]
    ],
];
*/

//console.log(toString(cubicToQuadratic(psss[1])));
//[
//    [0.19829218194939946,0.34774513655815453],
//    [0.2827739881563515,0.0699415209265597],
//    [0.8148899716777405,0.3142140587063176]
//]


/*
const psss: number[][][] = [
    [
        [0.8105964718894427,0.1427163503693032],
        [0.23650267666757144,0.17271915385350464],
        [0.3102300656314504,0.39960629647634993],
        [0.5317786387810797,0.8233777782378391]
    ],
    [ // this is really a quad
        [0.00, 0.00],
        [0.75, 0.75],
        [0.25, 0.25],
        [1.00, 1.00]
    ],
];
*/

/*
const psss: number[][][] = [
    [
        [0.8105964718894427,0.1427163503693032],
        [0.23650267666757144,0.17271915385350464],
        [0.3102300656314504,0.39960629647634993],
        [0.5317786387810797,0.8233777782378391]
    ],
    //[ // this is really a quad
    //    [0.00, 0.00],
    //    //[0.75, 0.75],
    //    //[0.25, 0.25],
    //    [1.125, 1.125],
    //    [1.00, 1.00]
    //],
    //[ // this is really a line
    //    [0.0, 0.0],
    //    //[0.25, 0.25],
    //    [0.5, 0.5],
    //    [1.0, 1.0]
    //],
    //  [[0,0],[0.3333333333333333,0.3333333333333333],[0.6666666666666666,0.6666666666666666],[1,1]]
    //[ // this is really a line
    //    [0.0, 0.0],
    //    //[0.25, 0.25],
    //    [1.5, 1.5],
    //    [3.0, 3.0]
    //],
    [
        // can be converted exactly to quad
        [0,0],
        [2,1],
        [2,1],
        //[3,1e-61]
        //[3,1e-213]  // underflow
        [3,2.2],
        //[3,2**-708]
        //[3,2**-1074]
        //[3,0]
    ]
        
];
*/


/*
const psss: number[][][] = [
    [
        [0.8105964718894427,0.1427163503693032],
        [0.23650267666757144,0.17271915385350464],
        [0.3102300656314504,0.39960629647634993],
        [0.5317786387810797,0.8233777782378391]
    ],
    [ // this is really a quad
        [0.19829218194939946,0.34774513655815453],
        [0.2546133860873675,0.1625427261370913],
        [0.46014598266348117,0.151365700186479],
        //[0.2827739881563515, 0.0699415209265597],
        [0.8148899716777405,0.3142140587063176]
    ],
    //[ // this is really a line
    //    [0.0, 0.0],
    //    //[0.25, 0.25],
    //    [0.5, 0.5],
    //    [1.0, 1.0]
    //],
];
*/

//console.log('bb', bezierBezierIntersection(
//    [
//        [0,0], [], [], []
//    ], 
//    [
//        [], [], [], []
//    ]
//));

/*
const psss: number[][][] = [];

psss.push(
    [
        [1,1],
        [0.23650267666757144,0.17271915385350464],
        [0.3102300656314504,0.39960629647634993],
        [0.5317786387810797,0.8233777782378391]
    ], 
    [
        [1,1], 
        [1,1], 
        [1,1], 
        [1,1]
    ]
);
*/

const pssA: number[][][] = [
    // same k family (non-overlapping)
    [
        [0.3525314928192529,0.011087603634223342],
        [0.15979973251273805,0.3048079917978157],
        [0.27864652102852006,0.4261487125617691],
        [0.4145225866523674,0.6675139045906917]
    ],
    [
        [0.48251607185424916,0.7995522627414218],
        [0.5047444997062911,0.8478015437918174],
        [0.526082308997843,0.9007385607970946],
        [0.5451658456931909,0.9597170366214414]
    ]
];

/*
{
    let qq = 0;
    const r = randOnGrid(maxCoordinateX, expMax, maxBitLength);

    while (true && qq++ < 1000_000) {
        const bz = [
            [r(),r()],
            [r(),r()],
            [r(),r()],
            [r(),r()]
        ]

        const bz1 = from0ToT(bz, 0.75);
        const bz2 = fromTTo1(bz, 0.875);

        //console.log(bz);
        //console.log(bz1);
        //console.log(bz2);
        //throw 'a'

        //console.log(areBeziersInSameKFamily(ps1,ps2));
        if (areBeziersInSameKFamily(bz1,bz2)) {
            psss.push(bz1, bz2);
            console.log('same')

            console.log(toString(bz1));
            console.log(toString(bz2));

            break;
        }
    }
}
*/


/*
for (let i=0; i<psss.length; i++) {
    const pss = psss[i];
    const _ps = toHybridQuadratic(pss);
    const ps_ = [_ps[0], _ps[1][0], _ps[2]];
    psss[i] = ps_;
    console.log(psss[i])
}
*/


//let pss: number[][][] = [ps5,ps6];
//let pss: number[][][] = [ps6,ps7];
//let pss: number[][][] = [ps8,ps9];
//let pss: number[][][] = [psa,psb];
//let pss: number[][][] = [psc,psd];
//let pss: number[][][] = [pse,psf];
//let pss: number[][][] = [psg,psh];
//let pss: number[][][] = stretch([psg,psh]);  // TODO - fix this (the case where weird point is clipped) - already fixed probably
//let pss: number[][][] = [psk,psl];
//let pss: number[][][] = [psm,psn];
//let pss: number[][][] = [psp,pso];
//let pss: number[][][] = [psq,psr];
//let pss: number[][][] = [pst,psu];


//console.log(toString(toCubic(psss[1])))
//console.log(isCubicReallyQuad(psss[1]));
//console.log(isQuadReallyLine(cubicToQuadratic(psss[1])));
//console.log(cubicToQuadratic(psss[1]));
//console.log(isQuadReallyLine(psss[2]));



/**
 * Returns a random number in the range ∈ [-1,+1] that is rounded to the 
 * nearest double. (This function has some minor flaws.)
 * 
 * Note that `Math.Random` only returns double precision numbers in [0,1] that
 * is divisible by `Number.EPSILON` and will thus *never* return e.g. 0.6805435168794467.
 * 
 * This function is not optimized.
 */
function getFullyRandomDoubleFromNegativeToPositive1() {

    function getRandomDoubleFrom0To1() {
        const r = Math.random();
        let s = Math.random();
        if (s >= r) {
            while (s > r) {
                s /= 2;
            }
            return s;
        }
        while ((s*2) < r) {
            s *= 2;
        }
        return s;
    }
    
    return getRandomDoubleFrom0To1() * (Math.random() < 0.5 ? -1 : +1);
}


/**
 * Returns a 'random' number in [-1,1] that uses `Math.random` internally so 
 * that the returned result is always divisible by `Number.EPSILON`.
 */
function getRandomDoubleFromNegativeToPositive1() {
    return Math.random() * (Math.random() < 0.5 ? -1 : +1);
}

/**
 * Returns a 'random' number in [0,1] that uses `Math.random` internally so 
 * that the returned result is always divisible by `Number.EPSILON`.
 */
 function getRandomDoubleFrom0To1() {
    return Math.random();
}


/**
 * 
 * @param order 0 is a point, 1 is a line, 2 is a quadratic bezier curve, ...
 * @param f the function used to generate the random control points - defaults
 * to `getRandomDoubleFromNegativeToPositive1`
 */
function getRandomBezier(
        order: 0|1|2|3,
        f = getFullyRandomDoubleFromNegativeToPositive1) {

    const ps: number[][] = [];
    for (let i=0; i<order+1; i++) { 
        ps.push([f(),f()]);
    }

    return ps;
}


/**
 * Returns a random bezier curve pair that is:
 * * cubic-cubic + identical algebraically + non-overlapping
 * 
 * The control point coordinates are random and ∈ [-1,+1].
 */
function get33SameAlgebraicallyNonOverlapping(
        shouldIntersect: boolean) {

    let i = 0;
    while (i++ < 1000) {
        const _ps = getRandomBezier(
            3,
            //() => getRandomDoubleFromNegativeToPositive1() + 2**16 - 2**16
            () => getRandomDoubleFrom0To1()
        );

        let t1i = Math.random() + 2**30 - 2**30;
        let t2i = Math.random() + 2**30 - 2**30;
        [t1i,t2i] = t1i < t2i ? [t1i,t2i] : [t2i,t1i];

        const ps = (shouldIntersect
            ? generateSelfIntersecting(_ps[0], _ps[1], _ps[2], [t1i,t2i])
            : _ps).map(p => p.map(c => c + 2**30 - 2**30));

        let t1 = Math.random() + 2**45 - 2**45;
        let t2 = Math.random() + 2**45 - 2**45;

        [t1,t2] = t1 < t2 ? [t1,t2] : [t2,t1];
       

        const ps1 = fromTo3(ps,0,t1).ps;
        const ps2 = fromTo3(ps,t2,1).ps;

        if (areIntersectionsInfinte(ps1,ps2)) {
            return [ps1,ps2];
        }
    }

    // failed to find any exact pairs
}


function getCCSameAlgebraicallyOverlapping(
        shouldIntersect: boolean/*,
        goodHodo: boolean*/) {

    let i = 0;
    while (i++ < 100) {
        const _ps = getRandomBezier(
            3,
            //() => getRandomDoubleFromNegativeToPositive1() + 2**16 - 2**16
            () => getRandomDoubleFrom0To1()
        );

        let t1i = Math.random() + 2**30 - 2**30;
        let t2i = Math.random() + 2**30 - 2**30;

        const ps = (shouldIntersect
            ? generateSelfIntersecting(_ps[0], _ps[1], _ps[2], [t1i,t2i])
            : _ps).map(p => p.map(c => c + 2**30 - 2**30));

        let t1 = Math.random() + 2**45 - 2**45;
        let t2 = Math.random() + 2**45 - 2**45;

        const ps1 = ps;
        const ps2 = fromTo3(ps,0-t1,1+t2).ps;

        if (areIntersectionsInfinte(ps1,ps2)) {
            //if (!goodHodo) {
                return [ps1,ps2];
            //}
            //const hodo1 = getHodograph(ps1);
            //const hodo2 = getHodograph(ps2);
            ////console.log(toString(hodo1));
            //if (allPsIn01(hodo1) && allPsIn01(hodo2)) {
            //    return [ps1,ps2];
            //}
        }
    }

    // failed to find any exact pairs
}


function allPsIn01(ps: number[][]) {
    for (const p of ps) {
        if (p[0] < 0 || p[1] > 1 || p[1] < 0 || p[1] > 1) {
            return false;
        }
    }

    return true;
}


const psCCSameAlgebraicallyNonOverlapping: number[][][] = [
    // cubic-cubic + identical algebraically + non-overlapping
    [
        [0.3525314928192529,0.011087603634223342],
        [0.15979973251273805,0.3048079917978157],
        [0.27864652102852006,0.4261487125617691],
        [0.4145225866523674,0.6675139045906917]
    ],
    [
        [0.48251607185424916,0.7995522627414218],
        [0.5047444997062911,0.8478015437918174],
        [0.526082308997843,0.9007385607970946],
        [0.5451658456931909,0.9597170366214414]
    ]
];

const psCCSameAlgebraicallyNonOverlappingIntersecting: number[][][] = [
    [
        [0.352039098739624,0.7113797664642334],
        [0.32728972285985947,0.6352303251624107],
        [0.3089480558410287,0.5756871686317027],
        [0.29582589014898986,0.530599699333834]
    ],
    [
        [0.29126099578570575,0.4713679257329204],
        [0.3091148706153035,0.527262908173725],
        [0.3338281735777855,0.6198149621486664],
        [0.3527488708496094,0.7261245250701904]
    ]
];


const psQQBothSelfOverlappingAndOverlapping: number[][][] = [
    [
        [0.1,0.1],
        [0.8,0.8],
        [0.2,0.2]
    ],
    [
        [1,1],
        [0.5,0.5],
        [0.3,0.3]
    ]
];


const psEdgeCase1 = [
    [
        [-0.0618729930720292,0.25948660081485286],
        [0.14044655508496362,-0.12198831531668475],
        [0.6992642883178632,-0.6716557566435597],
        [0.6516996054183011,-0.6201722482169032]
    ],
    [
        [0.5831837701035596,-0.5509239216325739],
        [0.5634196192370382,-0.5313345105214751],
        [0.5391908654519284,-0.507487635005873],
        [0.5100592381058959,-0.47903311598929577]
    ]
].map(ps => ps.map(p => [p[0], p[1]+1]));

//const b1 = psEdgeCase1[0];
//const b2 = psEdgeCase1[1];


/**
 * Returns a random cubic bezier curve such that `a2*b3 === a3*b2` exactly 
 * where the power basis representation of the bezier curve is given by 
 * `x === a3*t^3 + a2*t^2 + a1*t + a0` and `y === b3*t^3 + b2*t^2 + b1*t + b0`.
 */
function get3A2B3EqA3B2() {
    let i = 0;
    while (i++ < 1000) {
        const ps = getRandomBezier(
            3,
            () => getRandomDoubleFrom0To1() + 2**11 - 2**11
        );
    
        const [[a3,a2,a1,a0],[b3,b2,b1,b0]] = getXY(ps);
        const a3_ = a2*b3/b2;

        if (a2*b3 === a3_*b2) {
            const ps_ = fromPowerBasis([[a3_,a2,a1,a0],[b3,b2,b1,b0]]);
            const [[_a3,_a2,_a1,_a0_],[_b3,_b2,_b1,_b0_]] = getXY(ps_);
            if (_a2*_b3 === _a3*_b2) {
                console.log(i);
                return ps_;
            }
        }
    }

    // failed
}


export { 
    psEdgeCase1,
    psCCSameAlgebraicallyNonOverlapping, 
    psCCSameAlgebraicallyNonOverlappingIntersecting,
    psQQBothSelfOverlappingAndOverlapping,
    getCCSameAlgebraicallyOverlapping,
    get33SameAlgebraicallyNonOverlapping,
    get3A2B3EqA3B2
}
