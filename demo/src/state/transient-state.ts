import type { ToDraw } from "./to-draw";


interface TransientState {
    current: { g: SVGGElement | undefined };
    viewboxStack: number[][][];
    zoomState: Partial<{
            mouseIsDown: boolean;
            prevViewboxXY: number[];
            zoomRect: SVGRectElement;
    }>;
    panState: Partial<{
            mouseIsDown: boolean;
            /** World point under the pointer at pan start, held fixed while dragging. */
            anchor: number[];
    }>;
    dragState: Partial<{
            bezierIdx: number;
            controlPointIdx: number;
            prevViewboxXY: number[];
    }>;
    /** `[bezierIdx, controlPointIdx]` of the control point under the pointer. */
    hoveredControlPoint?: [number, number];
    mouseXY?: number[];
    $svgs: { [T in keyof ToDraw]: SVGElement[][] };
}


export type { TransientState }
