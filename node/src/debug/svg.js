"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("./debug");
function showOrHideElems() {
    let toDraw = _bez_debug_.config.toDraw;
    for (let key in debug_1.ElemType) {
        showOrHide_GENERAL(debug_1.ElemType[key], toDraw[key]);
    }
}
/**
 * Show or hide SVG Mat elements of any type according to the current debug
 * config.
 *
 * This function works for general elements but does not perform full compile
 * time type checking.
 */
function showOrHide_GENERAL(elemType, 
    //toDraw: { [index: string]: boolean } ) {
    toDraw) {
    let elems = _bez_debug_.generated.elems[elemType];
    for (let elem of elems) {
        //let f = (_bez_debug_.fs.elemType[elemType] as Function);
        //let shouldDraw = f(elem.data);
        showOrHide(elem.$svg, 
        //toDraw[shouldDraw]
        //toDraw[elemType]
        toDraw);
    }
}
function showOrHide($svgs, show) {
    for (let key in $svgs) {
        let $svg = $svgs[key];
        showOrHideSvgElem($svgs[key], show);
    }
}
function showOrHideSvgElem($svg, show) {
    if (!$svg) {
        return;
    }
    if (show) {
        $svg.removeClass('invisible');
    }
    else {
        if (!$svg.hasClass('invisible')) {
            $svg.addClass('invisible');
        }
    }
}
function deleteAllSvgs() {
    let svg = _bez_debug_.generated.elems;
    for (let key in debug_1.ElemType) {
        let elemType = debug_1.ElemType[key];
        let elems = _bez_debug_.generated.elems[elemType];
        for (let elem of elems) {
            let $svgs = elem.$svg;
            if (!$svgs) {
                continue;
            }
            deleteSvgs($svgs);
        }
    }
}
function deleteSvgs($svgs) {
    for (let key in $svgs) {
        if (!$svgs[key]) {
            continue;
        }
        $svgs[key].remove();
        delete $svgs[key];
    }
}
/**
 *  SVG debug functions.
 */
let svgDebugFunctions = {
    showOrHideSvgElem,
    showOrHide,
    showOrHideElems,
    deleteAllSvgs,
    deleteSvgs
};
exports.svgDebugFunctions = svgDebugFunctions;

//# sourceMappingURL=svg.js.map
