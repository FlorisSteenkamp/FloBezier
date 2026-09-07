import type { State } from '../state/state.js';
import type { Upd, UpdFunction } from './upd.js';
import type { TransientState } from '../state/transient-state.js';


interface StateControl {
    /**
     * State that:
     * * is not stored to localstorage
     * * does not update react components
     */
    transientState: TransientState;
    /** 
     * State that: 
     * * is stored to local storage
     * * updates react components
     */
    state: State;
    /** Updates state and triggers react render */
    upd: UpdFunction;
    /** Updates state and *does not*  triggers react render */
    upd$: UpdFunction;
    /** Triggers a react render without writing to localstorage */
    render: () => void;
}


export type { StateControl }
