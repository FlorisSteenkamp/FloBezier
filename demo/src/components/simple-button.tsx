import * as React from 'react';
import { useState, useRef, useEffect } from 'react';


interface Props {
    readonly children?: React.ReactNode;
    readonly style?: React.CSSProperties;
    readonly onClick?: () => void;
}


/**
 * A minimal, dependency-free button styled to match the demo's
 * button-group theme, with a hover effect and a brief (100ms) click
 * effect for visual feedback.
 */
function SimpleButton(props: Props) {
    const { children, style, onClick } = props;

    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        return () => {
            if (timeoutRef.current !== undefined) { clearTimeout(timeoutRef.current); }
        };
    }, []);

    function handleClick() {
        setPressed(true);
        if (timeoutRef.current !== undefined) { clearTimeout(timeoutRef.current); }
        timeoutRef.current = setTimeout(() => setPressed(false), 100);
        if (onClick) { onClick(); }
    }

    const background = pressed ? '#3e8e41' : hovered ? '#c3f5c5' : '#dbffdc';

    return (
        <button
            type="button"
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: '7px 18px',
                background,
                border: '1px solid #91be91',
                borderRadius: '4px',
                color: pressed ? 'white' : 'black',
                cursor: 'pointer',
                font: 'inherit',
                transition: 'background .1s ease, color .1s ease',
                ...style,
            }}
        >
            {children}
        </button>
    );
}


export { SimpleButton }
