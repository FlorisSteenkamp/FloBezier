import { IterationExtras } from "../../../src/intersection/bezier3-intersection/debug";
import { Iteration } from "../../../src/intersection/bezier3-intersection/iteration";
import { drawIterToCanvas } from './draw-iter-to-canvas';


/*
if (typeof __debug__ !== 'undefined' && showGeoIters) {
    const tree = __debug__.tree;
    //console.log(tree)
    const div = document.getElementById('root-div') as HTMLDivElement;
    div.className = getClassName((tree.children || []).length, 0, 1);
    //const canvas = createCanvas(div);
    const canvas: HTMLCanvasElement = undefined;
    const sq = createBlackSquare(div);
    drawTree(div, __debug__.tree);
    drawIterToCanvas(canvas, __debug__.tree)
} 
*/

function getClassName(
    childCount: number,
    siblingCount: number,
    childNum: number) {

const containerClass = childCount === 0 
    ? ''
    : `container container${childCount}`;
    
const itemClass = `item item${siblingCount}${childNum}`;

return `${containerClass} ${itemClass}`;
}


function drawTree(
        div: HTMLDivElement,
        iter: Iteration & IterationExtras) {

    const childs = iter.children || [];

    for (let i=0; i<childs.length; i++) {
        const child = childs[i]
        //const div_ = createDiv(div, (child.children || []).length);
        const div_ = createIterDiv(div, (child.children || []).length, childs.length-1, i+1);
        
        //const canvas = createCanvas(div_);
        const canvas: HTMLCanvasElement = undefined;
        const sq = createBlackSquare(div_);
        drawIterToCanvas(canvas, child)
        drawTree(div_, child);
    }
}


function createBlackSquare(pdiv: HTMLDivElement): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'black-square';
    pdiv.appendChild(div);

    return div;
}

function createCanvas(pdiv: HTMLDivElement): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 38;
    //canvas.width = 6;
    //canvas.height = 4;
    canvas.className = 'some-canvas';
    pdiv.appendChild(canvas);

    return canvas;
}

function createIterDiv(
        parentDiv: HTMLDivElement,
        childCount: number,
        siblingCount: number,
        childNum: number) {

    const div = document.createElement('div');
    //div.className = 'item container container' + childCount + childNum;
    div.className = getClassName(childCount, siblingCount, childNum);
    div.id = 'div' + ++divNum;
    //div.innerHTML = 'AA'

    parentDiv.appendChild(div);

    return div;
}


let divNum = 0;