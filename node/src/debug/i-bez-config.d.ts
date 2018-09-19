import { IBezConfigDraw } from './i-bez-config-draw';
interface IBezConfig {
    /** A string of the form "x0 y0 x1 y1 x2 y2 x3 y3" => [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] */
    beziers: number[][][];
    zoomsToDraw: number[];
    toDraw: IBezConfigDraw;
    drawBez1: boolean;
    drawBez2: boolean;
    configOpen: boolean;
}
export { IBezConfig };
