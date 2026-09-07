import type { ToDraw } from './to-draw.js';
import type { DeducedState } from './deduced-state.js';
// import { ClickFor } from './click-for.js';


interface PageState {
    /** Won't be save to localstorage */
    readonly deduced: DeducedState | undefined;
    readonly showDelay: number;
    // readonly clickFor: ClickFor;
    readonly viewbox: number[][];
    readonly toDraw: ToDraw;
    readonly beziers: (number[][])[];
    /** Index into `beziers` of the currently selected bezier, if any. */
    readonly selectedBezierIdx: number | undefined;
    /** Index of the selected control point within the selected bezier, if any. */
    readonly selectedControlPointIdx: number | undefined;
    /** When `true`, the side panel refreshes live while dragging. */
    readonly liveUpdate: boolean;
    /**
     * Pending "add special" flow, if any. For arcs, `clicks` accumulates the
     * picked center/start/end points until all three are provided.
     */
    readonly addSpecial?: {
        kind: 'arcFromQuads' | 'arcFromCubics';
        clicks: number[][];
    } | undefined;
}



export type { PageState }
