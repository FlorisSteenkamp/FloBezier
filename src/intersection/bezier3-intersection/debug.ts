import { Iteration } from './iteration';


interface Fatline {
    psBase: number[][];
    psMin: number[][];
    psMax: number[][];
}


interface IterationExtras {
    uid?: number;
    F_?: number[][];
    G_?: number[][];
    fatline?: Fatline;
    fatlinePerp?: Fatline;
    hq?: [[number, number], [number, number], [number, number], [number, number]];
    children?: (Iteration & IterationExtras)[];
    foundX?: boolean;
}

//interface IterTree {
//    iteration: Iteration & IterationExtras;
//}

interface __Debug__ {
    /** true if debug info already gathered */
    already: boolean;
    tree: (Iteration & IterationExtras) | undefined;
    currentIter: Iteration & IterationExtras;
    iters: (Iteration & IterationExtras)[];
}


//const __debug__: __Debug__ | undefined = undefined;
const __debug__: __Debug__ | undefined = {
    /** a convenient duplicate of the tree but as a depth-first list */
    iters: [],
    already: false,
    tree: undefined,
    currentIter: undefined
}


export { __Debug__, __debug__, Fatline, IterationExtras }
