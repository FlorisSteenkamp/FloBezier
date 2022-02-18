let jj = 0;


/**
 * @internal
 */
function inspect<T>(t: T, max?: number | undefined) {
    if (max === undefined || jj++ < 20) { 
        console.log(t); 
    }

    return t;
}


export { inspect }
