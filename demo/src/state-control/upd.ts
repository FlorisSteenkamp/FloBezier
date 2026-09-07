import type { State } from "../state/state.js";
import type { AppState } from "../state/app-state.js";
import { _updObj } from "./upd-obj.js";
import type { NestedObj } from './nested-obj.js';
import { Mutable } from "../utils/mutable.js";


type UpdFunction = <T extends NestedObj>(v: T, newV: Partial<T>) => T;

interface Upd {
    upd: UpdFunction;
    upd$: UpdFunction;
    /** Triggers a react render without writing to localstorage */
    render: () => void;
}


function _upd(
        state: State,
        setState: React.Dispatch<React.SetStateAction<AppState>>) {

    const map: Map<any,string[]> = new Map();
    const weakMap: WeakMap<any,string[]> = new WeakMap();
    const updObj = _updObj(state, map, weakMap);

    /** 
     * @param triggerUpdate If true, then triggers a react and localstorage 
     * update
     */
    function _upd<T extends NestedObj>(triggerUpdate: boolean) {
        return(v: T, newV: Partial<T>) => {

            const { appState, newV_ } = updObj(v,newV);
            (state as Mutable<State>) .appState = appState;

            if (triggerUpdate) {
                setState(appState);
                toLocalStorage(appState);
            }

            return newV_;
        }
    }

    /** 
     * Updates state and triggers react render 
     */
    const upd = _upd(true);
    /** 
     * Updates state and *does not* trigger react render 
     */
    const upd$ = _upd(false);

    /** Re-renders react from current state without writing to localstorage */
    const render = () => setState(state.appState);

    return { upd, upd$, render };
}


function toLocalStorage(appState: AppState) {
    // omit transient (lazy loaded, etc) properties from state
    const appState_: AppState = { 
        ...appState,
        pageState: {
            ...appState.pageState,
            deduced: undefined
        }
    };
    localStorage.setItem(
        'app-state', 
        JSON.stringify(appState_)
    );
}


export { _upd }
export type { Upd, UpdFunction }
