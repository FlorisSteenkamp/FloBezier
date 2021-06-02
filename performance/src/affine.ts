import { settings } from './settings';

const { squashFactor, transY } = settings;


function unsquashp(p: number[]): number[] {
    //return [p[0], p[1] * squashFactor];
    return [p[0], p[1] * 1];
}

function squashp(p: number[]): number[] {
    return [p[0], p[1] / squashFactor];  // squashFactor is a power of 2
}

function squash(v: number): number {
    return v / squashFactor;  // squashFactor is a power of 2
}

function trans(v: number): number {
    return v + transY;
}

function untrans(v: number): number {
    return v - transY;
}

function untransp(p: number[]): number[] {
    return [p[0], untrans(p[1])];
}


export { unsquashp, trans, untrans, untransp, squashp, squash }
