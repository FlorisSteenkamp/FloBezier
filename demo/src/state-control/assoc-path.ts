import { assoc } from "./assoc.js";


function assocPath(
        path: string[], 
        v: any,
        o: { [key:string]: any }) {

    const k = path[0];
    if (path.length > 1) {
        const nextO = (o[k] !== undefined) ? o[k] : {};
        v = assocPath(path.slice(1), v, nextO);
    }
    
    return assoc(k, v, o);
}


export { assocPath }
