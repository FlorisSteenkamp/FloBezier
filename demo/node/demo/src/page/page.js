import * as React from 'react';
import { useRef, useEffect } from 'react';
import { Checkbox } from '../components/simple-checkbox.js';
import { toViewBoxStr } from './viewbox.js';
import { ButtonGroup } from '../components/simple-button-group.js';
import { onMouseUp } from './on-mouse-up.js';
import { onClick } from './on-click.js';
import { toDrawKeyToText } from './to-draw-key-to-text.js';
import { onMouseMove } from './on-mouse-move.js';
import { onMouseDown } from './on-mouse-down.js';
import { drawElements } from './draw-elements.js';
import { loadDeduced } from './lazy-load-deduced.js';
function Page(props) {
    // Props
    const { stateControl, pageState } = props;
    const { upd } = stateControl;
    const { toDraw } = pageState;
    // Hooks
    const refSvg = useRef(null);
    const refX = useRef(null);
    const refY = useRef(null);
    useEffect(function () {
        loadDeduced(stateControl, refSvg, false);
    }, []); // run only once
    function toDrawChanged(key) {
        return (shouldDraw) => {
            upd(pageState.toDraw, { [key]: shouldDraw });
            drawElements(stateControl, refSvg, stateControl.state.appState.pageState.toDraw);
        };
    }
    function onClickForChanged(clickFor) {
        if (clickFor === 'spacer') {
            return;
        }
        upd(pageState, { clickFor });
    }
    const {} = pageState.deduced;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: {
                height: '100vh',
                boxSizing: 'border-box',
                padding: '10px',
                maxWidth: '1059px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            } },
            React.createElement("div", { style: { textAlign: 'center', flexShrink: 0 } },
                React.createElement("div", { style: { display: 'inline-block', textAlign: 'left' } }, Object
                    .keys(toDraw)
                    .filter(key => !!toDrawKeyToText[key])
                    .map(_key => {
                    const key = _key;
                    return (React.createElement(Checkbox, { key: key, checked: toDraw[key], styles: toDrawCheckboxStyles, text: toDrawKeyToText[key], onChanged: toDrawChanged(key) }));
                })),
                React.createElement("br", null),
                React.createElement(ButtonGroup, { label: 'Click', styles: { div: { display: 'inline-block', marginTop: '10px' } }, options: {
                        bezier: { text: 'bezier' },
                        looseBoundingBox: { text: 'lbb' },
                        tightBoundingBox: { text: 'tbb' },
                        boundingHull: { text: 'bh' },
                        x: { text: 'X' },
                    }, value: pageState.clickFor, onChanged: onClickForChanged }),
                React.createElement("div", { style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '10px' } })),
            React.createElement("span", { id: "x-coord", ref: refX, style: { userSelect: 'none', position: 'fixed', bottom: '13px', left: '10px', zIndex: 1 } }),
            React.createElement("span", { id: "y-coord", ref: refY, style: { userSelect: 'none', position: 'fixed', bottom: '13px', left: '80px', zIndex: 1 } }),
            React.createElement("div", { style: { flex: 1, overflow: 'auto', minHeight: 0 } },
                React.createElement("div", { style: { position: 'relative', width: '1024px', height: '1024px' } },
                    React.createElement("svg", { id: "svg", ref: refSvg, xmlns: "http://www.w3.org/2000/svg", version: "1.1", x: "0px", y: "0px", viewBox: toViewBoxStr(pageState.viewbox), style: { userSelect: 'none', position: 'absolute', top: 0, left: 0, width: '1024px', height: '1024px' }, onMouseDown: onMouseDown(stateControl, refSvg), onMouseUp: onMouseUp(stateControl, refSvg), onMouseMove: onMouseMove(stateControl, refSvg, refX, refY), onClick: onClick(stateControl, refSvg) },
                        React.createElement("g", null)))))));
}
const toDrawCheckboxStyles = {
    div: {
        display: 'inline-block',
        marginBottom: '5px',
        fontWeight: 400,
        width: '160px',
        textAlign: 'left',
        userSelect: 'none',
        WebkitUserSelect: 'none',
    }
};
export { Page };
//# sourceMappingURL=page.js.map