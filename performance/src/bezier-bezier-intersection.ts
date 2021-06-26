(globalThis as any as { __debug__: Partial<__Debug__> | undefined}).__debug__ = { already: false, uid: 0, maxItersCount: 0 };


import type { __Debug__ } from '../../src/intersection/bezier3-intersection/debug';
import { doPaper } from './-paper';
//import { performance } from 'perf_hooks';
//import * as paper from 'paper';
import { allRoots as _allRoots } from './roots/all-roots';
import { settings } from './settings';
import { ctx } from './draw-stuff';
import { getPss } from './get-pss/get-pss';
import { native } from './native/-native';
import { geo } from './geo/-geo';
import { naive } from './naive/-naive';
import { X } from '../../src/index';


function test(hot: boolean) {
    ctx.clearRect(0, 0, 2*640, 2*384);

    // pre-load
    //const { pss, curves } = getPss([[1,1]]);  // linear-linear only
    //const { pss, curves } = getPss([[2,2]]);  // quad-quad only
    //const { pss, curves } = getPss([[3,3]]);  // cubic-cubic only
    //const { pss, curves } = getPss([[1,1],[1,2],[1,3], [2,1],[2,2],[2,3], [3,1],[3,2],[3,3]]);  // a mix of all order (1,2 and 3) combinations
    const { pss, curves } = getPss([[3,3]]);  // cubic-cubic only
    //const { pss, curves } = getPss([[2,3],[3,2]]);  // a mix of quad-cubic and cubic-quad
    //const { pss, curves } = getPss([[1,3],[3,1]]);  // a mix
    //const { pss, curves } = getPss([[3,3],[2,3],[3,2],[2,2]]);  // a mix

    const { showNaive, showNative, showPaper, showGeo } = settings;
    
    let xss: X[][][] = [];

    if (showNative) { xss = native(pss); }
    if (showGeo)    { geo    (pss, xss);  }
    if (showNaive)  { naive  (pss, xss);  }
    if (showPaper)  { doPaper(curves, xss); }
}


test(false);
//test(true);
