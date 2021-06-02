import * as React from 'react';

interface Props {
    x: number;
    y: number;
    //id: any;
}


function TextLabel({ x, y }: Props) {
    <text
        x={x}
        y={(y || 0) + 1.5}
        style={{ fontSize: 5 }}
        textAnchor="middle"
        fill="#fff"
    >
        {'id'}
    </text>
}


export { TextLabel }
