
function assoc(key: string, v: any, o: { [key:string]: any }) {
    const no: { [key:string]: any } = {};
    for (const k in o) {
        no[k] = o[k]
    }

    no[key] = v;
    return no;
}


export { assoc }
