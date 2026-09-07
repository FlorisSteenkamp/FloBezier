
const { abs } = Math;


function drawRect(g: SVGGElement, rect: number[][]) {
    const XMLNS = 'http://www.w3.org/2000/svg';

    const [[x0,y0],[x1,y1]] = rect;
    const x = x0 < x1 ? x0 : x1;
    const y = y0 < y1 ? y0 : y1;
    const width = abs(x0-x1);
    const height = abs(y0-y1);

    const $rect = document.createElementNS(XMLNS, 'rect');
    $rect.setAttributeNS(null, "x", x.toString());
    $rect.setAttributeNS(null, "y", y.toString());
    $rect.setAttributeNS(null, "width",  width.toString());
    $rect.setAttributeNS(null, "height", height.toString());
    $rect.setAttributeNS(null, "class", 'zoomrect');

    g.appendChild($rect);

    return $rect;
}


export { drawRect }
