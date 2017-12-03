const B = FloBezier3;
const V = FloVector2d;
//const G = FloGrahamScan;
let { translate, rotate } = FloBezier3;

let m = 1e0;
let myy1 = 1e-12;
let myy2 = 1.1e-12;
let mm = 1e-3;
let mmm = 7e-6;
let ma = 1e-4;
let mb = 1e-4;
let mc = 0;
let md = 3.5414;
let me = 1e-7;
let mf = 0;
let mz = 1e-1;


let beziers = [
    [[1,1],[5,1],[5,2],[4,2]], //0
    [[2,2],[1,3],[3,3],[4,1]], //1

    [[50,213],[18,121],[140,56 ],[216,63 ]], //2
    [[50,94 ],[90,30 ],[236,154],[220,220]], //3

    [[0,-0.5],[0.25,3],[0.5,-3],[0.75,0.5]], //4

    [[0,0],[0,2],[2*m,0],[2*m,2]], //5
    [[0,2],[0,0],[2*m,2],[2*m,0]], //6

    [[0,0*myy1],[1,1*myy1],[2,2*myy1],[3,3*myy1]], //7
    [[0,3*myy2],[1,2*myy2],[2,1*myy2],[3,0*myy2]], //8

    [[0-mm+mmm,3],[1-mm/3+mmm,2],[2+mm/3+mmm,1],[3+mm+mmm,0]], //9
    [[0,3],[1,2],[2,1],[3,0]],                                 //10

    [[0,0],[0,-3],[2,-3],[2,0]],                    //11
    [[0+ma,0],[0+ma,-3-mb],[2-ma,-3-mb],[2-ma,0]], //12

    [[0,0],[0,6],[2,10],[2,0]],                                //13
    [[0+me-mf,10+md],[0+me,0+md],[2+me,0+md],[2+me+mf,10+md]], //14

    [[2,2],[1,3],[3,3],[4,1]], //15
    [[2,2],[1,3],[3,3],[4,1.01]], //16

    [[0,0],[1,-2],[3,-2],[5,-1]],    //17
    [[2,-6],[1.5,-3.5],[3,-1],[4,0]], //18

    [[0,0],[-2,-2],[6,-2],[4,0]], //19
    [[1,-2],[3,-2],[3,2],[1,2]],  //20

    [[0,0-mz],[2,-2-mz],[4,-2-mz],[6,0-mz]], //21
    [[0,0],[2,-3],[4,-3],[6,0]],  //22

    [[50,213],[18,121],[140,56 ],[216,63 ]], //23
    //[[50,213],[18,121],[140,56 ],[216,63 ]], //24
]

let s1 = Snap("#svg1");
let svg1 = document.getElementById("svg1")

const GREEN  = "#bada55";
const PURPLE = "#ba55da";
const BLUE = "#0000da";
const BLACK  = "#000";

function zoom(s, minX, minY, width, height) {
    boxStart = 0;
    boxSize = 5;
    border = 0.0005;
    let vbStr = '' + minX + ',' +  minY + ',' + width + ',' + height;
    s.attr({viewBox:vbStr});
}

function frame(s) {
    s.rect(boxStart,boxStart,boxSize,boxSize).attr({
        fill: "none",
        stroke: "black",
        strokeWidth: '1%'
    });
}


function calcZoom(pss) {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    for (let i=0; i<pss.length; i++) {
        let ps = pss[i];
        for (let j=0; j<ps.length; j++) {
            let p = ps[j];
            if (p[0] < min) { min = p[0]; }
            if (p[1] < min) { min = p[1]; }
            if (p[0] > max) { max = p[0]; }
            if (p[1] > max) { max = p[1]; }
        }
    }
    min = min-Math.abs(min)/10;
    max = max+Math.abs(max)/10;
    return {min,max};
}

function line(s, ps, strokeWidthPct, color) {
    let [[x0,y0],[x1,y1]] = ps;

    if (strokeWidthPct === undefined) { strokeWidthPct = 0.01; }
    if (color === undefined) { color = GREEN; }

    let pathStr = 'M' + x0 + ',' + y0 + ' L' + x1 + ',' + y1;
    s.path(pathStr).attr({
        fill: "none",
        stroke: color,
        strokeWidth: '' + strokeWidthPct
    });    
}


function drawB3sAndZoom(s, ps1, ps2, strokeWidthPct, color) {
    let [[x10,y10], [x11,y11], [x12,y12], [x13,y13]] = ps1;
    let [[x20,y20], [x21,y21], [x22,y22], [x23,y23]] = ps2;

    let minX = Math.min(x10,x11,x12,x13, x20,x21,x22,x23);
    let minY = Math.min(y10,y11,y12,y13, y20,y21,y22,y23);
    let maxX = Math.max(x10,x11,x12,x13, x20,x21,x22,x23);
    let maxY = Math.max(y10,y11,y12,y13, y20,y21,y22,y23);

    let box = [minX, minY, maxX-minX, maxY-minY];
    zoom(s, ...box);

    if (strokeWidthPct === undefined) { strokeWidthPct = 0.01; }
    if (color === undefined) { color = GREEN; }

    strokeWidthPct = Math.max(maxX-minX,maxY-minY)/2048;
    //strokeWidthPct = Math.max(maxX-minX,maxY-minY)/4096;
    //strokeWidthPct = Math.max(maxX-minX,maxY-minY)/16384;
    //console.log(strokeWidthPct)

    drawB3(s, ps2, strokeWidthPct, PURPLE);
    drawB3(s, ps1, strokeWidthPct, GREEN);
}
    

function drawB3(s, ps, strokeWidthPct, color) {
    let [p0,p1,p2,p3] = ps;
    let [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;

    if (strokeWidthPct === undefined) { strokeWidthPct = 0.004; }
    if (color === undefined) { color = GREEN; }

    let pathStr = 'M' + x0 + ',' + y0 + ' C' + x1 + ',' + y1 + ',' + x2 + ',' + y2 + ',' + x3 + ',' + y3;
    s.path(pathStr).attr({
        fill: "none",
        stroke: color,
        strokeWidth: '' + strokeWidthPct// + '%'
    });    

    dot(s, x0, y0, 0.03, color);
    dot(s, x1, y1, 0.03, color);
    dot(s, x2, y2, 0.03, color);
    dot(s, x3, y3, 0.03, color);
}


function drawPolyLine(s, ps, strokeWidthPct, color) {
    if (strokeWidthPct === undefined) { strokeWidthPct = 0.1; }
    if (color === undefined) { color = GREEN; }

    let pathStr = 'M' + ps[0][0] + ',' + ps[0][1];
    for (let i=1; i<ps.length; i++) {
        let p = ps[i];
        let x = p[0];
        let y = p[1];
        pathStr += ' L' + x + ',' + y;
    }
    s.path(pathStr).attr({
        fill: "none",
        stroke: color,
        strokeWidth: '' + strokeWidthPct
    });    
    //console.log(pathStr)

   // dot(s, x0, y0, 0.03, color);
}


function drawHybridQuadratic(s, hq, n, t2, ta) {
    let ps = [];
    for (let j=0; j<5+1; j++) {
        let tt = j/5;
        for (let i=0; i<n+1; i++) {
            let t = i/n;
            //let p = B.evaluateHybrid(hq, t, tt);
            let p = B.evaluateHybridQuadratic(hq, t, tt);
            //console.log(p,hq,t,tt)
            ps.push(p);
        }
        drawPolyLine(s, ps);
    }
    if (ta !== undefined) {
        let p1 = B.evaluateHybridQuadratic(hq, ta, 0);
        let p2 = B.evaluateHybridQuadratic(hq, ta, 1);
        line(s, [p1,p2], undefined, BLACK);
    }
    //console.log(ps)
}


var pt = svg1.createSVGPoint();  // Created once for document
svg1.addEventListener("mousedown", mousedown, false);
svg1.addEventListener("mousemove", mousemove, false);
svg1.addEventListener("mouseup",   mouseup,   false);
let cx;
let cy;
let dragPoint; 
let dragStart;
let dragBez;
let newDragBez;

let bzs = [beziers[0], beziers[1]];
//let bz1 = bzs[0];
//let bz2 = bzs[1];

function closeEnough(p1,p2,d) {
    return V.distanceBetween(p1,p2) < d;
}

function mousedown(evt) {
    pt.x = evt.clientX;
    pt.y = evt.clientY;

    // The cursor point, translated into svg coordinates
    ({x: cx, y: cy} = pt.matrixTransform(svg1.getScreenCTM().inverse()));
    let v = [cx,cy];

    dragPoint = undefined;

    let bestD = Number.POSITIVE_INFINITY;
    for (let i=0; i<4; i++) {
        let p = bzs[0][i];
        let d = V.distanceBetween(p,v);
        if (d < bestD) {
            bestD = d;
            dragPoint = [0,i];
        }
    }
    for (let i=0; i<4; i++) {
        let p = bzs[1][i];
        let d = V.distanceBetween(p,v);
        if (d < bestD) {
            bestD = d;
            dragPoint = [1,i];
        }
    }    

    let bez = bzs[dragPoint[0]];
    let bzp = bez[dragPoint[1]];
    if (!closeEnough(bzp,v,0.1)) {
        dragPoint = undefined;
    } else {
        dragStart = v;
        dragBez = bez;
    }

    //console.log(dragPoint);
}


function mousemove(evt) {
    pt.x = evt.clientX;
    pt.y = evt.clientY;

    // The cursor point, translated into svg coordinates
    ({x: cx, y: cy} = pt.matrixTransform(svg1.getScreenCTM().inverse()));
    let v = [cx,cy];

    if (dragPoint) {
        let diff = V.translate(v,[-dragStart[0],-dragStart[1]]);

        let [i, pi] = dragPoint;
        let bez = bzs[i];
        let p = bez[pi];

        let newBez = B.clone(bez);
        newBez[pi] = V.translate(diff, p);
        newDragBez = newBez;

        while (svg1.lastChild) { svg1.removeChild(svg1.lastChild); }

        testIntersection(newBez, bzs[i === 0 ? 1 : 0]);
    }
}

function mouseup(evt) {
    if (dragPoint) {
        let [i, pi] = dragPoint;
        bzs[i] = newDragBez;
        dragPoint = undefined;
    }
}


function dot(s, x, y, radius, color) {
    s.circle(x, y, radius).attr({
        fill: "none",
        stroke: color,
        strokeWidth: 0.02,
    });   
}


function drawB2(s, ps, strokeWidthPct, color) {
    let [p0,p1,p2] = ps;
    let [[x0,y0], [x1,y1], [x2,y2]] = ps;

    if (strokeWidthPct === undefined) { strokeWidthPct = 0.01; }
    if (color === undefined) { color = GREEN; }

    let pathStr = 'M' + x0 + ',' + y0 + ' Q' + x1 + ',' + y1 + ',' + x2 + ',' + y2;
    s.path(pathStr).attr({
        fill: "none",
        stroke: color,
        //strokeWidth: '' + strokeWidthPct + '%'
        strokeWidth: '' + strokeWidthPct// + '%'
    });    

    dot(s, x0, y0, 0.03, color);
    dot(s, x1, y1, 0.03, color);
    dot(s, x2, y2, 0.03, color);
}


function drawDots(s, ps, r) {
    for (let p of ps) {
        dot(s, p[0], p[1], r, BLACK);
    }
}


function dst(a,b) {
    let [x1,y1] = a;
    let [x2,y2] = b;
    let x = x2-x1;
    let y = y2-y1;
    return Math.sqrt(x**2 + y**2);
}

// Canonical example
//let bz1 = beziers[4];
//let bz2 = translate([0.3,-0.07805])(rotate(1,0,beziers[4]));
//let bz2 = translate([0.3,-0.078049465025])(rotate(1,0,beziers[4]));
//let bz2 = translate([0.3,-0.08])(rotate(1,0,beziers[4]));
//let bz2 = translate([0.3,-0.4])(rotate(1,0,beziers[4]));
//------------------

let z;

function testCoincident() {
    let bz1 = beziers[0];
    const a = 5e-8;
    const b = 5e-8;
    let bz2 = B.translate([a,b], bz1);
    bz2 = B.fromTo(bz2)(0.2,0.7);
    bz1 = B.fromTo(bz1)(0.3,1);

    drawB3sAndZoom(s1, bz1, bz2);
    let Rs = B.coincident(bz1,bz2,undefined); 
    let pRange;
    let qRange;
    if (Rs) { 
        ({ p: pRange, q: qRange } = Rs); 
    }
    
    console.log(pRange);
    console.log(qRange);
}


//console.log(B.totalCurvature(beziers[0],[0,1]));

function testIntersection(bz1, bz2) {
    drawB3sAndZoom(s1, bz1, bz2);
    
    console.log(B.getBoundingBoxTight(bz1));

    //console.log('=====================================');
    let ts = FloBezier3.bezier3Intersection(bz1, bz2);
    //console.log('=====================================');
    let i = 0;
    for (let t of ts) {
        let [x1,y1] = FloBezier3.evaluate(bz2, t[0]);
        let [x2,y2] = FloBezier3.evaluate(bz1, t[1]);
    
        //console.log(t);
        //console.log(x1, y1);
        //console.log(x2, y2);
        s1.circle(x1, y1, 0.008);
        s1.circle(x2, y2, 0.008);
        let dst12 = dst([x1, y1],[x2, y2]);
        //console.log(dst12);
        //console.log('----');
        i++;
    }
    //console.log('=====================================');
    //console.log(ts.length);
    //console.log('=====================================');
}

testIntersection(bzs[0], bzs[1]);
//testCoincident();
//testGrahamScan();



