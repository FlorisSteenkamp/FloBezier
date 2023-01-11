
/**
 * A representation of a cubic bezier curve by endpoint angles and 'speeds'
 * 
 * * see for example [A CONSTRUCTIVE FRAMEWORK FOR MINIMAL ENERGY PLANAR CURVES by Michael J. Johnson & Hakim S. Johnson](https://www.sciencedirect.com/science/article/abs/pii/S0096300315015490)
 */
interface AnglesAndSpeeds {
    /** initial tangent angle in radians (angle at t === 0) */
    α: number;
    /** terminal tangent angle in radians (angle at t === 1) */
    β: number;
    /** inital speed (speed at t === 0) */
    s0: number;
    /** terminal speed (speed at t === 1) */
    s1: number;
    /** the distance between the curve endpoints (cannot be 0) */
    L: number;
    /** the global curve rotation */
    rot: number;
    /** the global curve position offset (point at at t === 0) */
    p: number[];
}


export { AnglesAndSpeeds }
