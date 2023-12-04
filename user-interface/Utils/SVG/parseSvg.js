import { DataFromUserMode } from "../../../root.js";

export function parse_SVG_FILE(svgObject) {
    // Check if the #Document is available (loaded)
    if (svgObject.contentDocument) {
        // Access the SVG content
        const svgDoc = svgObject.contentDocument;
        // Set the svg obejct
        DataFromUserMode.animationsSVG[svgObject.id] = {}
        // Parse elements
        parseSvgEl(svgObject, svgDoc, 'svg')
        parsePolylineEl(svgObject, svgDoc, 'svg > polyline')
        parseLineEl(svgObject, svgDoc, 'svg > line')
        parsePolygonEl(svgObject, svgDoc, 'svg > polygon')
        parseEllipseEl(svgObject, svgDoc, 'svg > ellipse')
        parseTextEl(svgObject, svgDoc, 'svg > text')
        parseRectEl(svgObject, svgDoc, 'svg > rect')
        parseGridEl(svgObject, svgDoc, 'svg > g')
    } else {
        console.log('SVG content not loaded yet');
    }
    console.log("parse_SVG_FILE >>> DataFromUserMode:", DataFromUserMode);
}
function parseSvgEl(svgObject, svgDoc, selector, save=true){
    let DATA = {}
    const svg = svgDoc.querySelector(selector);
    if (svg) {
        const [_0, _1, ...screenSize] = svg.getAttribute('viewBox').split(" ").map(el => +el)
        DATA = { width:screenSize[0], height: screenSize[1] }
    } else {
        console.log('<Svg> element not found in SVG');
    }
    if(!save){
        return DATA
    }
    DataFromUserMode.animationsSVG[svgObject.id].viewBox = DATA
}
function parsePolylineEl(svgObject, svgDoc, selector, save=true){
    let DATA = {}
    const polylines = svgDoc.querySelectorAll(selector);
    let count = 0
    for (let polyline of polylines){
        if (polyline) {
            const pointsAttribute = polyline.getAttribute('points');
            const id = polyline.getAttribute('id') || `polyline-${count}`;
            // Prepear string data:
            let splitData = pointsAttribute.split(" ")
            let filterData = splitData.filter(el => el)
            // Get coordinates data:
            const coordinates = []
            for (let stringData of filterData){
                let [x, y] = stringData.split(",")
                coordinates.push(
                    [Number(x), Number(y)]
                )
            }
            // Save data from svg file
            DATA[id] = coordinates
        } else {
            console.log('<Polyline> element not found in SVG');
        }
        count++;
    }

    if(!save){
        return DATA
    }
    DataFromUserMode.animationsSVG[svgObject.id].polylines = DATA
}
function parseLineEl(svgObject, svgDoc, selector, save=true){
    let DATA = {}
    const lines = svgDoc.querySelectorAll(selector);
    let count = 0
    for (let line of lines){
        // <line id="straightLine" class="st1" x1="311.5" y1="66.5" x2="560.5" y2="162.5"/>
        if (line) {
            const x1 = line.getAttribute('x1');
            const y1 = line.getAttribute('y1');
            const x2 = line.getAttribute('x2');
            const y2 = line.getAttribute('y2');
            const id = line.getAttribute('id') || `line-${count}`;
            // Get coordinates data:
            const coordinates = [
                [Number(x1), Number(y1)],
                [Number(x2), Number(y2)]
            ]
            // Save data from svg file
            DATA[id] = coordinates
        } else {
            console.log('<line> element not found in SVG');
        }
        count++;
    }

    if(!save){
        return DATA
    }
    DataFromUserMode.animationsSVG[svgObject.id].lines = DATA
}
function parsePolygonEl(svgObject, svgDoc, selector, save=true){
    // <polygon id="star" class="st1" points="267.33,515.52 253.72"/>
    let DATA = {}
    const polygons = svgDoc.querySelectorAll(selector);
    let count = 0
    for (let polygon of polygons){
        if (polygon) {
            const pointsAttribute = polygon.getAttribute('points');
            const id = polygon.getAttribute('id') || `polygon-${count}`;
            // Prepear string data:
            let splitData = pointsAttribute.split(" ")
            let filterData = splitData.filter(el => el)
            // Get coordinates data:
            const coordinates = []
            for (let stringData of filterData){
                let [x, y] = stringData.split(",")
                coordinates.push(
                    [Number(x), Number(y)]
                )
            }
            // Save data from svg file
            DATA[id] = coordinates
        } else {
            console.log('<Polygon> element not found in SVG');
        }
        count++;
    }

    if(!save){
        return DATA
    }
    DataFromUserMode.animationsSVG[svgObject.id].polygons = DATA

}
function parseEllipseEl(svgObject, svgDoc, selector, save=true){
    let DATA = {}
    const ellipses = svgDoc.querySelectorAll(selector);
    let count = 0
    for (let ellipse of ellipses){
        // <ellipse id="elipse" class="st1" cx="374" cy="256.5" rx="82.5" ry="71"/>
        if (ellipse) {
            const id = ellipse.getAttribute('id') || `ellipse-${count}`;
            const cx = Number(ellipse.getAttribute('cx')) || 0;
            const cy = Number(ellipse.getAttribute('cy'))|| 0;
            const rx = Number(ellipse.getAttribute('rx')) || 0;
            const ry = Number(ellipse.getAttribute('ry')) || 0;
            
            // Save data from svg file
            const data = {
                x: cx,
                y: cy,
                rx,
                ry
            }
            if(!save){
                return data
            }
            DATA[id] = data
        } else {
            console.log('<ellipse> element not found in SVG');
        }
        count++;
    }
    if(!save){
        return DATA
    }
    DataFromUserMode.animationsSVG[svgObject.id].ellipses = DATA
}
function parseTextEl(svgObject, svgDoc, selector, save=true){
    let DATA = {}
    const texts = svgDoc.querySelectorAll(selector);
    let count = 0
    for (let text of texts){
        // <text id="e-text" transform="matrix(a b c d e f)" class="st2 st3">e</text>
        // a = 1 (no scaling along the x-axis)
        // b = 0 (no skewing or rotation for x)
        // c = 0 (no skewing or rotation for y)
        // d = 1 (no scaling along the y-axis)
        // e = 696.582 (horizontal coordinate)
        // f = 306.7422 (vertical coordinate)
        if (text) {
            const id = text.getAttribute('id') || `text-${count}`;
            const textContent = text.textContent;
            const matrixString = text.getAttribute('transform');
            let elements = matrixString.match(/(?<=\().+(?=\))/gm)
            if (elements != null){
                elements = elements[0].split(" ")
            }
            // Save data from svg file
            const data = {
                textContent,
                "scaleX"   : Number(elements[0]) != undefined ?  Number(elements[0]): 1, 
                "rotationX": Number(elements[1]) != undefined ?  Number(elements[1]): 0, 
                "rotationY": Number(elements[2]) != undefined ?  Number(elements[2]): 0, 
                "scaleY"   : Number(elements[3]) != undefined ?  Number(elements[3]): 1, 
                "x"        : Number(elements[4]) != undefined ?  Number(elements[4]): 0, 
                "y"        : Number(elements[5]) != undefined ?  Number(elements[5]): 0
            }
          
            DATA[id] = data
        } else {
            console.log('<text> element not found in SVG');
        }
        count++;
    }
    if(!save){
        return DATA
    }
    DataFromUserMode.animationsSVG[svgObject.id].texts = DATA
}
function parseRectEl(svgObject, svgDoc, selector, save=true){
    let DATA = {}
    const rectangles = svgDoc.querySelectorAll(selector);
    let count = 0
    for (let rectangle of rectangles){
        // <rect id="grid-frame" x="452" y="376" class="st4" width="397" height="319"/>
        if (rectangle) {
            const id = rectangle.getAttribute('id') || `rect-${count}`;
            const x = Number(rectangle.getAttribute('x')) || 0;
            const y = Number(rectangle.getAttribute('y'))|| 0;
            const width = Number(rectangle.getAttribute('width')) || 0;
            const height = Number(rectangle.getAttribute('height')) || 0;
            const data = {
                x,
                y,
                width,
                height
            }
            DATA[id] = data
        } else {
            console.log('<rect> element not found in SVG');
        }
        count++;
    }

    if(!save){
        return DATA
    }
    DataFromUserMode.animationsSVG[svgObject.id].rectangles = DATA

}
function parseGridEl(svgObject, svgDoc, selector, save=true){
    let DATA = {}
    const grids = svgDoc.querySelectorAll(selector);
    let count = 0
    for (let grid of grids){
        if (grid) {
            const gridType = getGridType(grid)
            const id = grid.getAttribute('id') || `grid-${count}`;
            if (gridType == "rect"){
                // <g id="small-grid">
                //     <rect id="grid-frame" x="452" y="376" class="st4" width="397" height="319"/>
                //     <line id="liney5" class="st4" x1="452" y1="641.83" x2="849" y2="641.83"/>
                //     <line id="liney4" class="st4" x1="452" y1="588.67" x2="849" y2="588.67"/>
                //     <line id="liney3" class="st4" x1="452" y1="535.5" x2="849" y2="535.5"/>
                //     <line id="liney2" class="st4" x1="452" y1="482.33" x2="849" y2="482.33"/>
                //     <line id="liney1" class="st4" x1="452" y1="429.17" x2="849" y2="429.17"/>
                //     <line id="linex5" class="st4" x1="782.83" y1="376" x2="782.83" y2="695"/>
                //     <line id="linex4" class="st4" x1="716.67" y1="376" x2="716.67" y2="695"/>
                //     <line id="linex3" class="st4" x1="650.5" y1="376" x2="650.5" y2="695"/>
                //     <line id="linex2" class="st4" x1="584.33" y1="376" x2="584.33" y2="695"/>
                //     <line id="linex1" class="st4" x1="518.17" y1="376" x2="518.17" y2="695"/>
                // </g>
                DATA[id] = {
                    frame: parseRectEl(null, grid, 'rect', false),
                    lines: parseLineEl(null, grid, 'line', false)
                }
            }
            else if (gridType == "ellipse"){
                // <g id="polar-grid">
                //     <g>
                //         <ellipse class="st4" cx="1148.5" cy="827" rx="224" ry="196.5"/>
                //         <ellipse class="st4" cx="1148.5" cy="827" rx="186.67" ry="163.75"/>
                //         <ellipse class="st4" cx="1148.5" cy="827" rx="149.33" ry="131"/>
                //         <ellipse class="st4" cx="1148.5" cy="827" rx="112" ry="98.25"/>
                //         <ellipse class="st4" cx="1148.5" cy="827" rx="74.67" ry="65.5"/>
                //         <ellipse class="st4" cx="1148.5" cy="827" rx="37.33" ry="32.75"/>
                //     </g>
                //     <g>
                //         <line class="st4" x1="1148.5" y1="827" x2="1148.5" y2="630.5"/>
                //         <line class="st4" x1="1148.5" y1="827" x2="1361.54" y2="766.28"/>
                //         <line class="st4" x1="1148.5" y1="827" x2="1280.16" y2="985.97"/>
                //         <line class="st4" x1="1148.5" y1="827" x2="1016.84" y2="985.97"/>
                //         <line class="st4" x1="1148.5" y1="827" x2="935.46" y2="766.28"/>
                //     </g>
                // </g>
                DATA[id] = {
                    ellipses: parseEllipseEl(null, grid, 'ellipse', false),
                    lines: parseLineEl(null, grid, 'line', false)
                }
            }
            else if (gridType == "path"){
                // TODO..
                continue
            }
        } else {
            console.log('<grid> element not found in SVG');
        }
        count++;
    }
    if(!save){
        return DATA
    }
    DataFromUserMode.animationsSVG[svgObject.id].grids = DATA
}


/** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                              HELPERS
 * -------------------------------------------------------------------------
 * @param {HTMLHtmlElement} grid 
 * @returns {string}
 */
function getGridType(grid){
    if (grid.querySelector("rect")){
        return "rect"
    }
    if (grid.querySelector("ellipse")){
        return "ellipse"
    }
    if (grid.querySelector("path")){
        return "path"
    }
}