import { IDrawElemFunctions } from './draw-elem/draw-elem';
declare type DebugElemType = 'testPoint';
declare type GeneratedElemTypes = {
    [T in DebugElemType]: any;
};
interface GeneratedElems extends GeneratedElemTypes {
    testPoint: number[];
}
interface IGenerated {
    elems: GeneratedElems;
}
interface IDebugFunctions {
    drawElem: IDrawElemFunctions;
}
declare class PolyDebug {
    g: SVGGElement;
    generated: IGenerated;
    fs: IDebugFunctions;
    /**
     * @param config - configuration settings.
     * @param fs - some useful functions.
     * @private
     */
    constructor(g: SVGGElement);
}
export { DebugElemType, GeneratedElemTypes, GeneratedElems, IGenerated, IDebugFunctions, PolyDebug };
