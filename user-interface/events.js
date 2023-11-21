import { START_APP, DataFromUserMode } from "../root.js";

let modeOn = false
let isDragging = false
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
export function OnClick(e){
    /**
     * Handle drawing animation path:
     */
    if (e.target.className == "animation-drawing-stg"){
        const anchor = document.getElementsByClassName("animation-drawing-stg")[0];
        anchor.style.color = "gray"
        //---------------------------------------------------------------^

        // Set Demesions of the drawing stage
        const canvas = document.getElementById("animation-drawing-stage");
        canvas.style.display = 'block'
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        //---------------------------------------------------------------^
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
            // console.log(`Prev Coordinates: (${startDrawingPoint[0]}, ${startDrawingPoint[1]})`);
            // console.log(`Current Coordinates: (${x}, ${y})`);
            // JavaScript to draw a path
            console.log(canvas);
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
        const anchor = document.getElementsByClassName("animation-drawing-stg")[0];
        anchor.style.color = "white"
        // Remove current game stage
        document.body.removeChild(
            document.getElementById("game-world")
        )
        // Pass the animation data
        DataFromUserMode.animations.paths[`path-${pathId}`] = JSON.parse(JSON.stringify(animationDataPath))
        // Inc the path Id
        pathId++
        // Reset game stage
        START_APP()
        //
        animationDataPath = []
        isDrawing = false
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
        modeMenu.style.borderTop = '25px solid #CCCCCC'
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
        modeMenu.style.borderTop = '25px solid #e5e8ed'
        isDragging = false
    }
}