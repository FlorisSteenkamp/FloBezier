import { XBounds, YBounds } from "../../src/index.js";


function reverseXBoundTs(xBounds: XBounds): XBounds {
    return {
        minX: { ts: xBounds.minX.ts.map(t => 1 - t), box: xBounds.minX.box },
        maxX: { ts: xBounds.maxX.ts.map(t => 1 - t), box: xBounds.maxX.box }
    }
}


function reverseYBoundTs(yBounds: YBounds): YBounds {
    return {
        minY: { ts: yBounds.minY.ts.map(t => 1 - t), box: yBounds.minY.box },
        maxY: { ts: yBounds.maxY.ts.map(t => 1 - t), box: yBounds.maxY.box }
    }
}


export { reverseXBoundTs, reverseYBoundTs }
