
function drawCross1(ctx: CanvasRenderingContext2D,
    strokeStyle: string | undefined,
    fillStyle: string | undefined) {

    return (p: number[]) => {
        const [x,y] = p;

        if (strokeStyle) { ctx.strokeStyle = strokeStyle; }
        if (fillStyle) { ctx.fillStyle = fillStyle; }

        const s = 10;

        ctx.lineWidth = 0.7;
        ctx.beginPath(); 
        ctx.moveTo(x-s, y); 
        ctx.lineTo(x+s, y); 
        ctx.stroke();

        ctx.beginPath(); 
        ctx.moveTo(x, y-s); 
        ctx.lineTo(x, y+s);
        ctx.stroke();

        if (strokeStyle) {
            //ctx.stroke();
        }
        if (fillStyle) {
            //ctx.fill();
        }
    }
}


export { drawCross1 }
