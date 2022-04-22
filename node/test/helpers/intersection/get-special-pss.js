// gnore file coverage
import { cubicToQuadratic, fromPowerBasis } from '../../../src/index.js';
import { getPssWithInfiniteXs } from './get-pss-with-infinite-xs.js';
getPssWithInfiniteXs();
const ps1A = [[0, 0], [1, 1], [0.25, 0.25]];
const ps1B = [[2, 2], [0.5, 0.5], [0.25, 0.25], [-1, -1]];
const ps2A = [[0, 0], [1, 1], [2, 1], [2, 0]];
const ps2B = [[1, 0], [0.5, 0.5], [0.25, 0.25], [-1, -3]];
// These 2 have 6 to 9 intersections
const ps3A = [
    [0.7704295223367994, 0.3797033285794189],
    [0.11133703242766413, 0.40902818227645277],
    [0.5154501161345357, 0.18033024920613472],
    [0.6245063776175845, 0.6304863768499378]
];
const ps3B = [
    [0.5750085923572528, 0.10720695981170625],
    [0.29108151922671266, 0.3958904988476726],
    [0.9979904669473834, 0.9260786134807975],
    [0.35579970920395576, 0.26687025387773056]
];
// These 2 are loops
const ps4A = [
    [0.7704295223367994, 0.3797033285794189],
    [0.11133703242766413, 0.40902818227645277],
    [0.5154501161345357, 0.18033024920613472],
    [0.7704295223367994, 0.3797033285794189]
];
const ps4B = [
    [0.5750085923572528, 0.10720695981170625],
    [0.29108151922671266, 0.3958904988476726],
    [0.9979904669473834, 0.9260786134807975],
    [0.5750085923572528, 0.10720695981170625]
];
const ps5A = [
    [0.7704295223367994, 0.3797033285794189],
    [0.11133703242766413, 0.40902818227645277],
    [0.5154501161345357, 0.18033024920613472],
    [0.7704295223367994, 0.3797033285794189]
];
const ps5B = [
    [0.5750085923572528, 0.10720695981170625],
    [0.29108151922671266, 0.3958904988476726],
    [0.29108151922671266, 0.3958904988476726],
    [0.5750085923572528, 0.10720695981170625]
];
const ps6A = [[0, 0], [1, 1]];
const ps6B = [[0.2, 0], [0.3, 1]];
// slightly contrived: https://www.desmos.com/calculator/wb5mnnnwso
const ps7A = [
    [0.11815017137396211, 1.1717377096885642],
    [0.3074666240689581, 0.989026736674596],
    [0.5869309482076801, 0.6602611255210178],
    [0.1891066502699914, 1.1001283530160535]
];
const ps7B = [
    [0.8746777130909038, 0.9673159354911505],
    [0.15347129805256543, 0.6527350507429759],
    [0.5219875005727275, 1.349542675428296],
    [0.16611474303687856, 1.0688204031386093]
];
// https://www.desmos.com/calculator/7ts3wxonta
const ps8A = [
    [0.25, 0.50],
    [0.40, 0.25],
    [1.00, 0.25],
    [1.15, 0.50]
];
const ps8B = [
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3]
];
const ps9A = [
    [0.642705866220858, 0.13593466106726027],
    [0.7420054952100585, 0.9349625633939525],
    [0.0978336686497343, 0.9895604900115771],
    [0.6192253208092211, 0.2896175579845348]
];
const ps9B = [
    [0.674040850332787, 0.24250553210222847],
    [0.5868600628547824, 0.030425392034892695],
    [0.8109707079966952, 0.5262277493685232],
    [0.20972484192628826, 0.9987694382022667]
];
const ps10A = [
    [0.04872756036963466, 0.884885706922617],
    [0.7467098617173775, 0.08524099387757644],
    [0.20419485808169213, 0.12251225057230641],
    [0.8183327887177185, 0.11899838611950742]
];
const ps10B = [
    [0.06545506407771029, 0.5862346406292573],
    [0.7296154778933328, 0.2729305517964207],
    [0.22265264760323333, 0.4718837765619526],
    [0.5777930012365502, 0.12881868592443624]
];
const ps11A = [
    [0.35181299492494134, 0.7541643330342822],
    [0.5116955162933792, 0.6361240005202831],
    [0.3287391010950458, 0.7168760604480511],
    [0.8967340021575012, 0.2911063547084609]
];
const ps11B = [
    [0.9630085646972688, 0.8150555401324198],
    [0.3184242805665747, 0.3068791402854103],
    [0.9831187597706403, 0.3061450698839181],
    [0.200552049393238, 0.37027611013525075]
];
const ps12A = [
    [0.9646201687528162, 1.4210854715202004e-14],
    [0.6772878019443311, 2.1316282072803006e-14],
    [0.34565238552668376, 1.4210854715202004e-14],
    [0.43502028382843605, 1.4210854715202004e-14]
];
const ps12B = [
    [0.4954801054242637, 2.1316282072803006e-14],
    [0.7755793433895946, 1.4210854715202004e-14],
    [0.013640682690727601, 0],
    [0.8957075918855395, 1.4210854715202004e-14]
];
// extreme degenerate cases
const ps13A = [[1, 1], [1, 1], [1, 1], [1, 1]];
const ps13B = [[1, 1], [1, 1], [1, 1], [1, 1]];
// algebraically identical (non-overlapping)
const ps14A = [
    [0.3525314928192529, 0.011087603634223342],
    [0.15979973251273805, 0.3048079917978157],
    [0.27864652102852006, 0.4261487125617691],
    [0.4145225866523674, 0.6675139045906917]
];
const ps14B = [
    [0.48251607185424916, 0.7995522627414218],
    [0.5047444997062911, 0.8478015437918174],
    [0.526082308997843, 0.9007385607970946],
    [0.5451658456931909, 0.9597170366214414]
];
// same algebraically non-overlapping and intersecting
const ps15A = [
    [0.352039098739624, 0.7113797664642334],
    [0.32728972285985947, 0.6352303251624107],
    [0.3089480558410287, 0.5756871686317027],
    [0.29582589014898986, 0.530599699333834]
];
const ps15B = [
    [0.29126099578570575, 0.4713679257329204],
    [0.3091148706153035, 0.527262908173725],
    [0.3338281735777855, 0.6198149621486664],
    [0.3527488708496094, 0.7261245250701904]
];
// both curves self overlapping and overlapping
const ps16A = [
    [0.1, 0.1],
    [0.8, 0.8],
    [0.2, 0.2]
];
const ps16B = [
    [1, 1],
    [0.5, 0.5],
    [0.3, 0.3]
];
// some edge case
const [ps17A, ps17B] = [
    [
        [-0.0618729930720292, 0.25948660081485286],
        [0.14044655508496362, -0.12198831531668475],
        [0.6992642883178632, -0.6716557566435597],
        [0.6516996054183011, -0.6201722482169032]
    ],
    [
        [0.5831837701035596, -0.5509239216325739],
        [0.5634196192370382, -0.5313345105214751],
        [0.5391908654519284, -0.507487635005873],
        [0.5100592381058959, -0.47903311598929577]
    ]
].map(ps => ps.map(p => [p[0], p[1] + 1]));
// these two are an explicit cubic and an explicit quadratic
const ps18A = fromPowerBasis([[0, 0, 3, 0], [6, -9, 3, -6]]).map(p => [p[0], p[1] + 6]); //=> [[0,0],[1,1],[2,-1],[3,0]]
const ps18B = cubicToQuadratic([[1, 0], [2, 1], [3, 1], [4, 0]]); //=> 1,0,2.5,1.5,4,0 
// these are two explicit cubics
const ps19A = [[0, 0], [1, 1], [2, -1], [3, 0]];
const ps19B = [[1, 0], [2, 1], [3, -1], [4, 0]];
function getSpecialPss() {
    return [
        ps1A, ps1B,
        ps2A, ps2B,
        ps3A, ps3B,
        ps4A, ps4B,
        ps5A, ps5B,
        ps6A, ps6B,
        ps7A, ps7B,
        ps8A, ps8B,
        ps9A, ps9B,
        ps10A, ps10B,
        ps11A, ps11B,
        ps12A, ps12B,
        ps13A, ps13B,
        ps14A, ps14B,
        ps15A, ps15B,
        ps16A, ps16B,
        ps17A, ps17B,
        ps18A, ps18B,
        ps19A, ps19B,
        ...getPssWithInfiniteXs(),
    ];
}
export { getSpecialPss };
//# sourceMappingURL=get-special-pss.js.map