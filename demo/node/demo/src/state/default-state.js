import { createEmptyGeneratedSvgs } from './create-empty-generated-svgs.js';
const defaultTransientState = {
    current: {
        g: undefined,
    },
    viewboxStack: [],
    zoomState: {},
    $svgs: createEmptyGeneratedSvgs()
};
const defaultToDraw = {
    bezier: true,
    inflections: false,
    boundingHull: false,
    intersection: false,
    looseBoundingBox: false,
    tightBoundingBox: false,
    x: false
};
const defaultDeduced = {
    pathStrs: ['']
};
const defaultPageState = {
    deduced: defaultDeduced,
    showDelay: 2000,
    clickFor: 'bezier',
    toDraw: defaultToDraw,
    viewbox: [[0, 0], [100, 100]],
    beziers: [[[0, 0], [1, 1], [2, 1], [3, 1]]]
};
const defaultAppState = {
    version: 1,
    pageState: defaultPageState
};
export { defaultAppState, defaultPageState, defaultTransientState, defaultDeduced };
//# sourceMappingURL=default-state.js.map