import * as React from 'react';
import { useState } from 'react';
import { _upd } from './state-control/upd.js';
import { getInitialState } from './state/get-initial-state.js';
import { defaultTransientState } from './state/default-state.js';
import { Page } from './page/page.js';
import { createRoot } from 'react-dom/client';
function App() {
    const [appState, setAppState] = useState(getInitialState);
    const [state] = useState(() => ({ appState }));
    const [{ upd, upd$ }] = useState(() => _upd(state, setAppState));
    const [stateControl] = useState(() => ({
        state, upd, upd$, transientState: defaultTransientState,
    }));
    const { pageState } = appState;
    return (React.createElement("main", null,
        React.createElement(Page, { stateControl: stateControl, pageState: pageState })));
}
createRoot(document.getElementById('app')).render(React.createElement(App, null));
//# sourceMappingURL=app.js.map