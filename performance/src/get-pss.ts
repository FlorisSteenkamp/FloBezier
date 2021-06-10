import { drawBezier } from './draw/draw-bezier';
import { toGrid } from '../../test/helpers/to-grid';
import { trans, untransp, unsquashp, squashp, squash } from '../src/affine';
import { settings } from './settings';

const { tc, num, maxCoordinateX, maxCoordinateY, expMax, maxBitLength } = settings;

declare const paper: any;

function randOnGrid(max: number, expMax: number, maxBitLength: number) { 
    return () => toGrid(max * Math.random(), expMax, maxBitLength);
}


function getRandInt(n: number): number {
    return Math.floor(Math.random() * n);
}


function drawBeziers(ctx: CanvasRenderingContext2D) {
    return (ps1: number[][], ps2: number[][]) => {
        const drawBezier1 = drawBezier(ctx, '#f00', undefined, 0.5);
        const drawBezier2 = drawBezier(ctx, '#0f0', undefined, 0.5);

        drawBezier1(ps1, true, false);
        drawBezier2(ps2, true, false);
    }
}


const randOnGridX_ = randOnGrid(maxCoordinateX, expMax, maxBitLength);
const randOnGridY_ = randOnGrid(maxCoordinateY, expMax, maxBitLength);


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


const s = 0;
const psq = [
    [1.25,0+s],
    [1.21,0+s],
    [1.22,0+s],
    [1.23,0+s]
]
const psr = [
    [1.0,0+s],
    [1.5,0+s],
    [1.7,1+s],
    [1.9,2+s]
]



//[[0.016170300840670393,0],[0.564795606369259,0],[0.7522306620037398,7.105427357601002e-15],[0.9733333266106499,1.4210854715202004e-14]]
//[[0.08720363399366704,0],[0.18780498830295045,0],[0.35029650523182454,0],[0.3821498446920515,0]]

//[[0.08720363399366704,0],[0.18780498830295045,0],[0.35029650523182454,0],[0.3821498446920515,0]]
//[[0.8048287550370219,7.105427357601002e-15],[0.41511035434842825,7.105427357601002e-15],[0.8687162651732976,1.4210854715202004e-14],[0.40296511328340046,0]]

//[[0.5663311117378242,0],[0.1684455443425037,0],[0.6318378264729745,0],[0.27173362304205995,0]]
//[[0.5729647792678563,0],[0.5820943179732936,0],[0.579991119834574,1.4210854715202004e-14],[0.29518194867237213,7.105427357601002e-15]]



function stretch(pss: number[][][]): number[][][] {
    const factor = 2**43;

    return pss.map(ps => ps.map(p => [p[0], factor*p[1]]))
}


function getPss(order: 0|1|2|3) {
    const rx = () => randOnGridX_();
    const ry = () => trans(randOnGridY_());

    //let pss: number[][][] = [ps5,ps6];
    //let pss: number[][][] = [ps6,ps7];
    //let pss: number[][][] = [ps8,ps9];
    //let pss: number[][][] = [psa,psb];
    //let pss: number[][][] = [psc,psd];
    //let pss: number[][][] = [pse,psf];
    //let pss: number[][][] = [psg,psh];
    //let pss: number[][][] = stretch([psg,psh]);  // TODO - fix this (the case where weird point is clipped)
    //let pss: number[][][] = [psk,psl];
    //let pss: number[][][] = [psm,psn];
    //let pss: number[][][] = [psp,pso];
    let pss: number[][][] = [psq,psr];
    //let pss: number[][][] = [];
    
    let i = pss.length;
    for (; i<num+1; i++) {
        let order_ = order !== 0
            ? order
            : getRandInt(3) + 1;

        const ps: number[][] = [];
        for (let j=0; j<order_+1; j++) {
            ps.push([rx(),ry()]);
        }
        pss.push(ps);
    }

    //drawBeziers(ctx, pss[0], pss[1]);

    return { pss, curves: getCurvesFromPss(pss) };
}


function getCurvesFromPss(pss: number[][][]) {
    let curves: any[] = [];

    for (let i=0; i<num+1; i++) {
        const ps = pss[i];

        let curve: any;
        if (ps.length === 2) {
            curve = new paper.Curve(
                new paper.Point(ps[0][0], ps[0][1]),
                new paper.Point(ps[1][0], ps[1][1])
            );
        }
        if (ps.length === 3) {
            // not working??
            curve = new paper.Curve(
                new paper.Point(ps[0][0], ps[0][1]),
                new paper.Point(ps[1][0] - ps[0][0], ps[1][1] - ps[0][1]),
                new paper.Point(ps[2][0], ps[2][1])
            );
        }
        if (ps.length === 4) {
            curve = new paper.Curve(
                new paper.Point(ps[0][0], ps[0][1]),
                new paper.Point(ps[1][0] - ps[0][0], ps[1][1] - ps[0][1]),
                new paper.Point(ps[2][0] - ps[3][0], ps[2][1] - ps[3][1]),
                new paper.Point(ps[3][0], ps[3][1])
            );
        }
        
        curves.push(curve);
    }

    return curves;
}


export { getPss, drawBeziers }