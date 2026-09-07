import * as React from 'react';
import type { StateControl } from '../state-control/state-control.js';
import type { ToDraw } from '../state/to-draw.js';
import type { PageState } from '../state/page-state.js';
// import type { ClickFor } from '../state/click-for.js';
import { useRef, useEffect } from 'react';
import { toViewBoxStr } from './viewbox/viewbox.js';
import { ButtonGroup } from '../components/simple-button-group.js';
import { SimpleSelect } from '../components/simple-select.js';
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


interface Props {
    stateControl: StateControl;
    pageState: PageState;
}


function Page(props: Props) {
    // Props
    const { stateControl, pageState } = props;
    const { upd } = stateControl;
    const { toDraw } = pageState;

    // Hooks
    const refSvg = useRef<SVGSVGElement>(null);
    const refX = useRef<HTMLSpanElement>(null);
    const refY = useRef<HTMLSpanElement>(null);
    useEffect(function() {
        fitViewbox(stateControl, refSvg, false)
    }, []); // run only once

    useEffect(function() {
        function onKeyDown(e: KeyboardEvent) {
            // Ignore when typing in an input (e.g. editing control point values).
            const t = e.target as HTMLElement | null;
            if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
                return;
            }
            if (e.key === 'Delete') { onDeleteSelectedBezier(stateControl, refSvg); }
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    // Redraw on viewbox change so viewbox-relative sizes (e.g. control point radii) rescale.
    useEffect(function() {
        drawElements(stateControl, refSvg, stateControl.state.appState.pageState.toDraw);
    }, [pageState.viewbox]);



    function toDrawChanged(key: keyof ToDraw) {
        return (shouldDraw: boolean) => {
            upd(pageState.toDraw, { [key]: shouldDraw });
            drawElements(stateControl, refSvg, stateControl.state.appState.pageState.toDraw)
        }
    }

    function onSelectControlPoint(cpIdx: number) {
        upd(pageState, { selectedControlPointIdx: cpIdx });
        drawElements(stateControl, refSvg, stateControl.state.appState.pageState.toDraw);
    }

    function onControlPointChange(cpIdx: number, axis: 0 | 1, value: number) {
        const bezIdx = pageState.selectedBezierIdx;
        if (bezIdx === undefined) { return; }
        const newBeziers = pageState.beziers.map((ps, i) =>
            i !== bezIdx
                ? ps
                : ps.map((c, j) => j !== cpIdx ? c : (axis === 0 ? [value, c[1]] : [c[0], value]))
        );
        upd(pageState, { beziers: newBeziers });
        drawElements(stateControl, refSvg, stateControl.state.appState.pageState.toDraw);
    }

    // function onClickForChanged(clickFor: ClickFor | 'spacer'): void {
    //     if (clickFor === 'spacer') { return; }
    //     upd(pageState, { clickFor });
    // }

    const { } = pageState.deduced!;


    return (<>
        <Header />
        <div
            style={{
                position: 'fixed', top: '52px', left: 0, height: 'calc(100vh - 52px)',
                width: '370px',
                background: '#f7faf7',
                borderRight: '1px solid #cddccd',
                zIndex: 10, boxSizing: 'border-box', padding: '10px',
                overflow: 'hidden', display: 'flex', flexDirection: 'column'
            }}
        >
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#445', cursor: 'pointer', flexShrink: 0, marginBottom: '6px' }}>
                <input
                    type="checkbox"
                    checked={!!pageState.liveUpdate}
                    onChange={e => upd(pageState, { liveUpdate: e.target.checked })}
                />
                live update while dragging
            </label>
            <BezierDetails
                beziers={pageState.beziers}
                selectedBezierIdx={pageState.selectedBezierIdx}
                selectedControlPointIdx={pageState.selectedControlPointIdx}
                onSelectControlPoint={onSelectControlPoint}
                onControlPointChange={onControlPointChange}
            />
        </div>
        <div
            style={{
                height: 'calc(100vh - 52px)',
                boxSizing: 'border-box',
                padding: '10px',
                marginLeft: '370px',
                marginTop: '52px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}
        >
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <ButtonGroup<keyof ToDraw & string>
                    label='Draw'
                    styles={{ div: { display: 'inline-block', marginTop: '10px' } }}
                    options={Object.fromEntries(
                        (Object.keys(toDraw) as (keyof ToDraw)[])
                            .filter(key => !!toDrawKeyToText[key])
                            .map(key => [key, { text: toDrawKeyToText[key] as string }])
                    )}
                    value={(Object.keys(toDraw) as (keyof ToDraw)[]).filter(key => toDraw[key])}
                    onChanged={key => toDrawChanged(key)(!toDraw[key])}
                />
                <br/>
                {/* <ButtonGroup<ClickFor | 'spacer'>
                    label='Click'
                    styles={{ div: { display: 'inline-block', marginTop: '10px' } }}
                    options={{
                        bezier: { text: 'bezier' },
                        looseBoundingBox: { text: 'lbb' },
                        tightBoundingBox: { text: 'tbb' },
                        boundingHull: { text: 'bh' },
                        x: { text: 'X' },
                    }}
                    value={pageState.clickFor}
                    onChanged={onClickForChanged}
                /> */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '10px' }}>
                    <SimpleButton onClick={() => fitViewbox(stateControl, refSvg, true)}>
                        fit
                    </SimpleButton>
                    <SimpleButton onClick={() => onZoomInClicked(stateControl)}>
                        zoom in
                    </SimpleButton>
                    <SimpleButton onClick={() => onZoomOutClicked(stateControl)}>
                        zoom out
                    </SimpleButton>
                    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '12px', color: '#556', marginBottom: '3px', userSelect: 'none' }}>
                            add bezier
                        </span>
                        <div style={{ display: 'inline-flex' }}>
                            <SimpleButton
                                onClick={() => onAddBezierClicked(stateControl, refSvg, 1)}
                                style={{ borderRadius: '4px 0 0 4px' }}
                            >
                                line
                            </SimpleButton>
                            <SimpleButton
                                onClick={() => onAddBezierClicked(stateControl, refSvg, 2)}
                                style={{ borderRadius: 0, borderLeft: 'none' }}
                            >
                                quadratic
                            </SimpleButton>
                            <SimpleButton
                                onClick={() => onAddBezierClicked(stateControl, refSvg, 3)}
                                style={{ borderRadius: '0 4px 4px 0', borderLeft: 'none' }}
                            >
                                cubic
                            </SimpleButton>
                        </div>
                    </div>
                    <SimpleButton onClick={() => {/* stub: add special */}}>
                        add special
                    </SimpleButton>
                    <SimpleButton onClick={() => onClearBeziersClicked(stateControl, refSvg)}>
                        clear
                    </SimpleButton>
                </div>
            </div>
            <span id="x-coord" ref={refX} style={{ userSelect: 'none', position: 'fixed', bottom: '13px', left: '380px', zIndex: 1 }} />
            <span id="y-coord" ref={refY} style={{ userSelect: 'none', position: 'fixed', bottom: '13px', left: '450px', zIndex: 1 }} />
            <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <svg 
                        id="svg" 
                        ref={refSvg}
                        xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px"
                        viewBox={toViewBoxStr(pageState.viewbox)}
                        style={{ userSelect: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        onMouseDown={onMouseDown(stateControl, refSvg)}
                        onMouseUp={onMouseUp(stateControl, refSvg)}
                        onMouseMove={onMouseMove(stateControl, refSvg, refX, refY)}
                        onClick={onClick(stateControl, refSvg)}
                    >
                        <g transform={`translate(0 ${pageState.viewbox[0][1] + pageState.viewbox[1][1]}) scale(1 -1)`} />
                    </svg>
                </div>
            </div>
        </div>
    </>);
}


const toDrawCheckboxStyles = { 
    div: {
        display: 'inline-block', 
        marginBottom: '5px', 
        fontWeight: 400,
        width: '160px',
        textAlign: 'left' as const,
        userSelect: 'none' as const,
        WebkitUserSelect: 'none' as const,
    }
}


export { Page }
