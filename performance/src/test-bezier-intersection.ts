import { type __Debug__ } from '../../src/intersection/bezier-bezier-intersection-fast/debug.js';
import { DUMMY } from './setup-global.js';
import { doPaper } from './-paper.js';
import { allRoots as _allRoots } from './roots/all-roots.js';
import { settings } from './settings.js';
import { ctx } from './draw-stuff.js';
import { getPss } from './get-pss/get-pss.js';
import { native } from './native/-native.js';
import { geo } from './geo/-geo.js';
import { naive } from './naive/-naive.js';
import { X } from '../../src/index.js';

const _DUMMY = DUMMY;  // There must be a better way?
 
function test() {
    ctx.clearRect(0, 0, 2*640, 2*384);

    // pre-load
    //const { pss, curves } = getPss([[1,1]]);  // linear-linear only
    //const { pss, curves } = getPss([[2,2]]);  // quad-quad only
    //const { pss, curves } = getPss([[3,3]]);  // cubic-cubic only
    //const { pss, curves } = getPss([[1,1],[1,2],[1,3], [2,1],[2,2],[2,3], [3,1],[3,2],[3,3]]);  // a mix of all order (1,2 and 3) combinations
    const { pss, curves } = getPss([[3,3]]);  // cubic-cubic only
    //const { pss, curves } = getPss([[2,3],[3,2]]);  // a mix of quad-cubic and cubic-quad
    //const { pss, curves } = getPss([[1,3],[3,1]]);
    //const { pss, curves } = getPss([[3,3],[2,3],[3,2],[2,2]]);

    const { showNaive, showNative, showPaper, showGeo } = settings;
    
    let xss: X[][] = [];

    if (showNative) { xss = native(pss); }
    if (showGeo)    { geo    (pss, xss);  }
    if (showNaive)  { naive  (pss, xss);  }
    if (showPaper)  { doPaper(curves, xss); }
}


test();
