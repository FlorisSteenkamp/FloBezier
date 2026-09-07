import type { PageState } from "./page-state.js";


/**
 * The App state
 */
interface AppState {
    readonly version: number;
    readonly pageState: PageState;
}


export type { AppState }
