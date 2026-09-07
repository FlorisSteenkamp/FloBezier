//import { assocPath } from "./assoc-path.js";
import { assocPath } from "ramda";
import { getObjPath } from "./get-obj-path.js";


function _updObj(
        state: { [key:string]: any }, 
        map: Map<any,string[]>,
        weakMap: WeakMap<any,string[]>) {

    return (v: any, newV: any) => {
        let path = map.get(v);
        if (path === undefined) { // if the value has not been set before
            path = weakMap.get(v);
            if (path === undefined) {
                path = getObjPath(state,v);
            }
        }
        
        const newV_ = { ...v, ...newV };
        const newState = assocPath(path!, newV_, state);

        map.delete(v);
        map.set(newV_,path!);
        weakMap.set(v,path!);

        return { appState: newState.appState, newV_ };
    }
}


export { _updObj }
