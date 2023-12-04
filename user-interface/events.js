import { START_APP, DataFromUserMode, APP } from "../root.js";
import {drawingPath} from "./library.js"
import { parse_SVG_FILE } from "./Utils/SVG/parseSvg.js"
import * as act from "./interior.js"

let modeOn = false
let isDragging = false
let svgClicked = false
let drawingClicked = false
/** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                      Handle User Mode Menu
 * -----------------------------------------------------------------
 */
window.addEventListener('keydown', function(event) {
    console.log('The key was pressed.', event.key);
    
    if (event.key.toLocaleLowerCase() == 'm'){
        let modeMenu = document.getElementsByClassName("mode-menu")[0]
        modeMenu.style.display = "flex"
        modeOn = true
        // Call the function to retrieve points when the SVG content is loaded
    }
    else if (event.key == 'Escape') {
        let modeMenu = document.getElementsByClassName("mode-menu")[0]
        modeMenu.style.display = "none" 
        removeEvents = []
        modeOn && (modeOn = false)
    }
});

/** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *             Handle user interactions with the mode Menu
 * -----------------------------------------------------------------
 * 
 */
export async function OnClick(e){
    console.log(e.target.className);
    /**
     * Handle Reset App:
     */
    if (e.target.className == "reset-app-button"){
        // Remove view
        document.body.removeChild(
            document.getElementById("game-world")
        )
        //Destroy app
        APP.destroy({ children: true, texture: true, baseTexture: true });
        START_APP()
    }
    /**
     * Handle drawing animation path:
     */
    if (e.target.className == "ul-hand-drawings"){
        drawingClicked = drawingClicked ? false : true
        e.target.style.color = drawingClicked ? "gray" : "black"
        const typeDisplay = drawingClicked ? "block" : "none"
        //---------------------------------------------------------------^

        // Set Demesions of the drawing stage
        const canvas = document.getElementById("animation-drawing-stage");
        canvas.style.display = typeDisplay
        canvas.width = typeDisplay ? window.innerWidth : 0
        canvas.height = typeDisplay ? window.innerHeight : 0
        //---------------------------------------------------------------^
    }
    /**
     * Handle svg animation path:
     */
    if (e.target.className == "ul-svg-drawings"){
        svgClicked = svgClicked ? false : true
        e.target.style.color = svgClicked ? "gray" : "black"
        const typeDisplay = svgClicked ? "block" : "none"
        const listItems = e.target.getElementsByTagName('li');
        // Loop through each <li> and set its display to block
        for (let i = 0; i < listItems.length; i++) {
          listItems[i].style.display = typeDisplay;
        }
    }
}

/** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                  Handle user Animation Canvas drawings
 * -----------------------------------------------------------------
 * 
 */
let isDrawing = false
let pathId = 0
let startDrawingPoint = []
let animationDataPath = []
const drawingsPathToAdd = {}

export function startDraw(event){
    if(event.target.id == "animation-drawing-stage"){
        const canvas = event.target
        isDrawing = true;
        // helps to match position of the drawing with the mouse:
        const rect = canvas.getBoundingClientRect();
        startDrawingPoint = [event.clientX - rect.left, event.clientY-rect.top]
    }
}
export function onDraw(event){
    if(event.target.id == "animation-drawing-stage"){
        const canvas = event.target
        if (isDrawing){
            // helps to match position of the drawing with the mouse:
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX  - rect.left;
            const y = event.clientY - rect.top;
            const ctx = canvas.getContext('2d');
            // Begin a path
            ctx.beginPath();
            // Set path properties (color, line width, etc.)
            ctx.strokeStyle = '#00fa9a';
            ctx.lineWidth = 3;
            // Move the starting point of the path to coordinates
            ctx.moveTo(startDrawingPoint[0], startDrawingPoint[1]);
            // Draw a line from the starting point to coordinates (200, 100)
            ctx.lineTo(x, y);
            // Draw the path
            ctx.stroke();
            // Push path Data
            animationDataPath.push(startDrawingPoint)
            animationDataPath.push([x, y])
            // Set new starting point
            startDrawingPoint = [x, y]
        }
    }
}
export function destroyDraw(event){
    if(event.target.id == "animation-drawing-stage"){
        const canvas = event.target
        canvas.width = 0
        canvas.height = 0
        canvas.style.display = 'none'
        // 
        const anchor = document.getElementsByClassName("ul-hand-drawings")[0];
        anchor.style.color = "black"
        // Push new path drawing in ul:
        let component = drawingPath(`path-${pathId}` ,`path-${pathId}`)
        act.insertTo(".ul-hand-drawings", [component])
        // Pass the animation data
        drawingsPathToAdd[`path-${pathId}`] = JSON.parse(JSON.stringify(animationDataPath))
        // Inc the path Id
        pathId++
        animationDataPath = []
        isDrawing = false
        drawingClicked = false
        startDrawingPoint = []
        //
        //console.log("DataFromUserMode >>>", DataFromUserMode);
    }
}

/** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                  Handle user mode-menu dragging
 * -----------------------------------------------------------------
 * 
 */
export function onStarDragModeMenu(event){
    if (event.target.className == "mode-menu"){
        const modeMenu = event.target
        isDragging = true;
        modeMenu.style.borderTop = '25px solid #F7B538'
    }
}
export function onDragModeMenu(event){
    if (event.target.className == "mode-menu"){
        const modeMenu = event.target
        if (isDragging){
            modeMenu.style.left = event.clientX - 25 + 'px';
            modeMenu.style.top = event.clientY - 15 + 'px';
        }
    }
}
export function onDestroyDragModeMenu(event){
    if (event.target.className == "mode-menu"){
        const modeMenu = event.target
        modeMenu.style.borderTop = '25px solid #2E2E2E'
        isDragging = false
    }
}


/** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                        Handle SVG files
 * -----------------------------------------------------------------
 * Function to retrieve points from the embedded SVG
 */
export function getSvgCoordinates(e){
    if (!e.target.style.backgroundColor){
        // Set on styles:
        e.target.style.backgroundColor = "gray"
        e.target.style.color = "white"
        // Get the object element
        const fileName = e.target.textContent
        let svgObject = document.getElementById(fileName);
        svgObject.onload = parse_SVG_FILE(svgObject)
    }
    else {
        const fileName = e.target.textContent
        // Set off styles:
        e.target.style.backgroundColor = ""
        e.target.style.color = "gray"
        delete DataFromUserMode.animationsSVG[fileName]
    }
}
/** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                        Handle drawings
 * -----------------------------------------------------------------
 * Function to retrieve points from drawings
 */
export function getDrawingCoordinates(e){
    if (!e.target.style.backgroundColor){
        // Set on styles:
        e.target.style.backgroundColor = "gray"
        e.target.style.color = "white"
        // Get the object element
        const fileName = e.target.textContent
        DataFromUserMode.animationsDrawings[fileName] = {}
        DataFromUserMode.animationsDrawings[fileName].path = drawingsPathToAdd[fileName]
        DataFromUserMode.animationsDrawings[fileName].viewBox = {width:window.innerWidth, height: window.innerHeight}
        console.log("animationsDrawings >>> Add:", DataFromUserMode.animationsDrawings);
    }
    else {
        const fileName = e.target.textContent
        // Set off styles:
        e.target.style.backgroundColor = ""
        e.target.style.color = "gray"
        delete DataFromUserMode.animationsDrawings[fileName]
        console.log("animationsDrawings >>> Delete :", DataFromUserMode.animationsDrawings);
    }
}