
/** @internal */
function bSign(v: bigint): bigint {
    return v > 0n ? 1n : v < 0n ? -1n : 0n;
}


export { bSign }
