import { createEmptyGeneratedSvgs } from './create-empty-generated-svgs.js';
const defaultTransientState = {
    current: {
        g: undefined,
    },
    viewboxStack: [],
    zoomState: {},
    panState: {},
    dragState: {},
    $svgs: createEmptyGeneratedSvgs()
};
const defaultToDraw = {
    bezier: true,
    controlPoints: true,
    controlLines: false,
    quadraticToPolyline: false,
    polyQuads: false,
    inflections: true,
    curvatureMaxima: true,
    curvature: false,
    normal: false,
    tangent: false,
    hausdorff: true,
    boundingHull: false,
    intersection: false,
    looseBoundingBox: false,
    tightBoundingBox: false,
    x: true
};
const defaultDeduced = {
    pathStrs: ['']
};
const defaultPageState = {
    deduced: defaultDeduced,
    showDelay: 2000,
    // clickFor: 'bezier',
    toDraw: defaultToDraw,
    viewbox: [[24.860265266092, 65.99430660827147], [34.074105411552644, 75.69828244697705]],
    beziers: [
        [[30.174858987761528, 74.15571802599008], [30.363765611888045, 69.37064912796238], [28.577043091229378, 73.46331326613084], [27.075623774479535, 74.0222499535684]],
        [[27.99651969386099, 73.71709089595808], [28.477084079542905, 71.40614003272994], [30.35008477782185, 71.13907024154476], [28.484089008139282, 74.83078560027373]]
    ],
    selectedBezierIdx: 0,
    selectedControlPointIdx: 0,
    liveUpdate: true
};
const defaultAppState = {
    version: 1,
    pageState: defaultPageState
};
export { defaultAppState, defaultPageState, defaultTransientState, defaultDeduced };
//# sourceMappingURL=default-state.js.map