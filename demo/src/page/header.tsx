import * as React from 'react';

const GITHUB_URL = 'https://github.com/FlorisSteenkamp/FloBezier';
const NPM_URL = 'https://www.npmjs.com/package/flo-bezier3';

function Header() {
    return (
        <header
            style={{
                position: 'fixed', top: 0, left: 0, right: 0,
                height: '52px', zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                padding: '0 16px',
                boxSizing: 'border-box',
                borderBottom: '1px solid #cddccd',
                background: 'linear-gradient(180deg, #f7faf7 0%, #eef5ee 100%)'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{
                    fontSize: '22px', fontWeight: 800, letterSpacing: '-0.01em',
                    color: '#1e7a34', fontFamily: 'ui-monospace, Menlo, Consolas, monospace'
                }}>
                    flo-bezier-3
                </span>
                <span style={{ fontSize: '16px', color: '#2f4a34', fontWeight: 600, marginLeft: '14px' }}>
                    <em style={{ fontWeight: 800, fontStyle: 'italic', color: '#2b8a3e' }}>The</em> bezier curve library
                </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '12.5px', color: '#6a7a6a', fontStyle: 'italic' }}>
                    Ultra-fast, stupid-accurate, numerically-bulletproof.
                </span>
                <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontSize: '13px', color: '#1e7a34', textDecoration: 'none',
                        border: '1px solid #91be91', borderRadius: '6px',
                        padding: '5px 10px', background: '#dbffdc', whiteSpace: 'nowrap'
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    GitHub
                </a>
                <a
                    href={NPM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontSize: '13px', color: '#a30f0f', textDecoration: 'none',
                        border: '1px solid #e0a3a3', borderRadius: '6px',
                        padding: '5px 10px', background: '#ffe6e6', whiteSpace: 'nowrap'
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path d="M0 0v16h16V0H0zm13 13h-2V5H8v8H3V3h10v10z"/>
                    </svg>
                    npm
                </a>
            </div>
        </header>
    );
}

export { Header }
