interface ISvgDebugFunctions {
    showOrHideElems: () => void;
    showOrHide: ($svgs: {
        [index: string]: any;
    }, show: boolean) => void;
    showOrHideSvgElem: ($elem: any, show: boolean) => void;
    deleteAllSvgs: () => void;
    deleteSvgs: ($svgs: {
        [index: string]: any;
    }) => void;
}
/**
 *  SVG debug functions.
 */
declare let svgDebugFunctions: {
    showOrHideSvgElem: ($svg: any, show: boolean) => void;
    showOrHide: ($svgs: {
        [index: string]: any;
    }, show: boolean) => void;
    showOrHideElems: () => void;
    deleteAllSvgs: () => void;
    deleteSvgs: ($svgs: {
        [index: string]: any;
    }) => void;
};
export { ISvgDebugFunctions, svgDebugFunctions };
