import * as React from 'react';
// import type { ClickFor } from '../state/click-for.js';
import { useRef, useEffect } from 'react';
import { toViewBoxStr } from './viewbox/viewbox.js';
import { ButtonGroup } from '../components/simple-button-group.js';
import { SimpleButton } from '../components/simple-button.js';
import { onMouseUp } from './mouse/on-mouse-up.js';
import { onClick } from './mouse/on-click.js';
import { toDrawKeyToText } from './draw/to-draw-key-to-text.js';
import { onMouseMove } from './mouse/on-mouse-move.js';
import { onMouseDown } from './mouse/on-mouse-down.js';
import { drawElements } from './draw/draw-elements.js';
import { BezierDetails } from './bezier-details.js';
import { Header } from './header.js';
import { fitViewbox } from './viewbox/fit-viewbox.js';
import { onZoomOutClicked } from './events/on-zoom-out-clicked.js';
import { onZoomInClicked } from './events/on-zoom-in-clicked.js';
import { onAddBezierClicked } from './events/on-add-bezier-clicked.js';
import { onClearBeziersClicked } from './events/on-clear-beziers-clicked.js';
import { onDeleteSelectedBezier } from './events/on-delete-selected-bezier.js';
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
        fitViewbox(stateControl, refSvg, false);
    }, []); // run only once
    useEffect(function () {
        function onKeyDown(e) {
            // Ignore when typing in an input (e.g. editing control point values).
            const t = e.target;
            if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
                return;
            }
            if (e.key === 'Delete') {
                onDeleteSelectedBezier(stateControl, refSvg);
            }
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);
    // Redraw on viewbox change so viewbox-relative sizes (e.g. control point radii) rescale.
    useEffect(function () {
        drawElements(stateControl, refSvg, stateControl.state.appState.pageState.toDraw);
    }, [pageState.viewbox]);
    function toDrawChanged(key) {
        return (shouldDraw) => {
            upd(pageState.toDraw, { [key]: shouldDraw });
            drawElements(stateControl, refSvg, stateControl.state.appState.pageState.toDraw);
        };
    }
    function onSelectControlPoint(cpIdx) {
        upd(pageState, { selectedControlPointIdx: cpIdx });
        drawElements(stateControl, refSvg, stateControl.state.appState.pageState.toDraw);
    }
    function onControlPointChange(cpIdx, axis, value) {
        const bezIdx = pageState.selectedBezierIdx;
        if (bezIdx === undefined) {
            return;
        }
        const newBeziers = pageState.beziers.map((ps, i) => i !== bezIdx
            ? ps
            : ps.map((c, j) => j !== cpIdx ? c : (axis === 0 ? [value, c[1]] : [c[0], value])));
        upd(pageState, { beziers: newBeziers });
        drawElements(stateControl, refSvg, stateControl.state.appState.pageState.toDraw);
    }
    // function onClickForChanged(clickFor: ClickFor | 'spacer'): void {
    //     if (clickFor === 'spacer') { return; }
    //     upd(pageState, { clickFor });
    // }
    const {} = pageState.deduced;
    return (React.createElement(React.Fragment, null,
        React.createElement(Header, null),
        React.createElement("div", { style: {
                position: 'fixed', top: '52px', left: 0, height: 'calc(100vh - 52px)',
                width: '370px',
                background: '#f7faf7',
                borderRight: '1px solid #cddccd',
                zIndex: 10, boxSizing: 'border-box', padding: '10px',
                overflow: 'hidden', display: 'flex', flexDirection: 'column'
            } },
            React.createElement("label", { style: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#445', cursor: 'pointer', flexShrink: 0, marginBottom: '6px' } },
                React.createElement("input", { type: "checkbox", checked: !!pageState.liveUpdate, onChange: e => upd(pageState, { liveUpdate: e.target.checked }) }),
                "live update while dragging"),
            React.createElement(BezierDetails, { beziers: pageState.beziers, selectedBezierIdx: pageState.selectedBezierIdx, selectedControlPointIdx: pageState.selectedControlPointIdx, onSelectControlPoint: onSelectControlPoint, onControlPointChange: onControlPointChange })),
        React.createElement("div", { style: {
                height: 'calc(100vh - 52px)',
                boxSizing: 'border-box',
                padding: '10px',
                marginLeft: '370px',
                marginTop: '52px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            } },
            React.createElement("div", { style: { textAlign: 'center', flexShrink: 0 } },
                React.createElement(ButtonGroup, { label: 'Draw', styles: { div: { display: 'inline-block', marginTop: '10px' } }, options: Object.fromEntries(Object.keys(toDraw)
                        .filter(key => !!toDrawKeyToText[key])
                        .map(key => [key, { text: toDrawKeyToText[key] }])), value: Object.keys(toDraw).filter(key => toDraw[key]), onChanged: key => toDrawChanged(key)(!toDraw[key]) }),
                React.createElement("br", null),
                React.createElement("div", { style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '10px' } },
                    React.createElement(SimpleButton, { onClick: () => fitViewbox(stateControl, refSvg, true) }, "fit"),
                    React.createElement(SimpleButton, { onClick: () => onZoomInClicked(stateControl) }, "zoom in"),
                    React.createElement(SimpleButton, { onClick: () => onZoomOutClicked(stateControl) }, "zoom out"),
                    React.createElement("div", { style: { display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' } },
                        React.createElement("span", { style: { fontSize: '12px', color: '#556', marginBottom: '3px', userSelect: 'none' } }, "add bezier"),
                        React.createElement("div", { style: { display: 'inline-flex' } },
                            React.createElement(SimpleButton, { onClick: () => onAddBezierClicked(stateControl, refSvg, 1), style: { borderRadius: '4px 0 0 4px' } }, "line"),
                            React.createElement(SimpleButton, { onClick: () => onAddBezierClicked(stateControl, refSvg, 2), style: { borderRadius: 0, borderLeft: 'none' } }, "quadratic"),
                            React.createElement(SimpleButton, { onClick: () => onAddBezierClicked(stateControl, refSvg, 3), style: { borderRadius: '0 4px 4px 0', borderLeft: 'none' } }, "cubic"))),
                    React.createElement(SimpleButton, { onClick: () => { } }, "add special"),
                    React.createElement(SimpleButton, { onClick: () => onClearBeziersClicked(stateControl, refSvg) }, "clear"))),
            React.createElement("span", { id: "x-coord", ref: refX, style: { userSelect: 'none', position: 'fixed', bottom: '13px', left: '380px', zIndex: 1 } }),
            React.createElement("span", { id: "y-coord", ref: refY, style: { userSelect: 'none', position: 'fixed', bottom: '13px', left: '450px', zIndex: 1 } }),
            React.createElement("div", { style: { flex: 1, overflow: 'hidden', minHeight: 0 } },
                React.createElement("div", { style: { position: 'relative', width: '100%', height: '100%' } },
                    React.createElement("svg", { id: "svg", ref: refSvg, xmlns: "http://www.w3.org/2000/svg", version: "1.1", x: "0px", y: "0px", viewBox: toViewBoxStr(pageState.viewbox), style: { userSelect: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }, onMouseDown: onMouseDown(stateControl, refSvg), onMouseUp: onMouseUp(stateControl, refSvg), onMouseMove: onMouseMove(stateControl, refSvg, refX, refY), onClick: onClick(stateControl, refSvg) },
                        React.createElement("g", { transform: `translate(0 ${pageState.viewbox[0][1] + pageState.viewbox[1][1]}) scale(1 -1)` })))))));
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