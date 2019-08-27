import { IDrawElemFunctions } from './draw-elem/draw-elem';
import { FatLine } from './fat-line';
declare type DebugElemType = 'beziers' | 'intersection' | 'looseBoundingBox' | 'tightBoundingBox' | 'extreme' | 'boundingHull' | 'fatLine';
declare type GeneratedElemTypes = {
    [T in DebugElemType]: any;
};
interface GeneratedElems extends GeneratedElemTypes {
    beziers: number[][][][];
    intersection: number[][];
    looseBoundingBox: number[][][];
    tightBoundingBox: number[][][];
    extreme: {
        p: number[];
        t: number;
    }[];
    boundingHull: number[][][];
    fatLine: FatLine[];
}
interface IGenerated {
    elems: GeneratedElems;
}
interface IDebugFunctions {
    drawElem: IDrawElemFunctions;
}
declare class BezDebug implements BezDebug {
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
export { DebugElemType, GeneratedElemTypes, GeneratedElems, IGenerated, IDebugFunctions, BezDebug };
