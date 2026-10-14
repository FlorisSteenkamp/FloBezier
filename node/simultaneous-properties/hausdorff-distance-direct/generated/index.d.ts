import { maF_B3 } from './maF_B3.js';
import { maN_B2 } from './maN_B2.js';
import { maN_B3 } from './maN_B3.js';
declare const resI: {
    [key: string]: (ax: number[], ay: number[], bx: number[], by: number[]) => number[];
};
declare const resMAEI: {
    [key: string]: (ax: number[], ay: number[], bx: number[], by: number[]) => number[];
};
declare const maiG: {
    [key: string]: (v: number[], bx: number[], by: number[]) => number[][];
};
export { resI, resMAEI, maiG, maF_B3, maN_B3, maN_B2 };
