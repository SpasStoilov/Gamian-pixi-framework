import { START_APP, DataFromUserMode } from "../root.js";
// EVENTS:
let modeOn = false

/** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                      Handle User Mode
 * -----------------------------------------------------------------
 */
window.addEventListener('keydown', function(event) {
    console.log('The key was pressed.', event.key);
    
    if (event.key === 'm' || event.key === 'M') {
       let nav = document.getElementsByClassName("navbar")[0]
       nav.style.display = "flex" 
       modeOn = true
    }
    else if (event.key === 'Escape') {
      let nav = document.getElementsByClassName("navbar")[0]
      nav.style.display = "none" 
      modeOn && (modeOn = false)
    }
});

/** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                  Handle user interactions
 * -----------------------------------------------------------------
 * 
 * Drawing variables:
 */
let isDrawing = false
let pathId = 0
let startDrawingPoint = []
let animationDataPath = []
/**
 * Event manager
 */
export function OnClick(e){
    /**
     * Handle drawing animation path:
     */
    if (e.target.className == "animation-drawing-stg"){
        const anchor = document.getElementsByClassName("animation-drawing-stg")[0];
        anchor.style.color = "gray"
        //---------------------------------------------------------------^

        // Set Demesions
        const canvas = document.getElementById("animation-drawing-stage");
        canvas.style.display = 'block'
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        //---------------------------------------------------------------^

        // Def Draw hooks
        const startDraw = (event) => {
            isDrawing = true;
            const canvas = document.getElementById("animation-drawing-stage");
            // helps to match position of the drawing with the mouse:
            const rect = canvas.getBoundingClientRect();
            startDrawingPoint = [event.clientX - rect.left, event.clientY-rect.top]
        }
        const onDraw = (event) => {
            if (isDrawing){
                const canvas = document.getElementById("animation-drawing-stage");
                // helps to match position of the drawing with the mouse:
                const rect = canvas.getBoundingClientRect();
                const x = event.clientX  - rect.left;
                const y = event.clientY - rect.top;
                console.log(`Prev Coordinates: (${startDrawingPoint[0]}, ${startDrawingPoint[1]})`);
                console.log(`Current Coordinates: (${x}, ${y})`);
                // JavaScript to draw a path
                console.log(canvas);
                const ctx = canvas.getContext('2d');
        
                // Begin a path
                ctx.beginPath();
        
                // Set path properties (color, line width, etc.)
                ctx.strokeStyle = 'blue';
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
        const destroyDraw = () => {
            // Remove all listeners:
            const canvas = document.getElementById("animation-drawing-stage");
            canvas.removeEventListener('mousedown', startDraw)
            canvas.removeEventListener('mousemove', onDraw)
            canvas.removeEventListener('mouseup', destroyDraw)
            const anchor = document.getElementsByClassName("animation-drawing-stg")[0];
            anchor.style.color = "white"
            canvas.width = 0
            canvas.height = 0
            canvas.style.display = 'none'
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
        }
        //---------------------------------------------------------------^

        // Hook listeners
        canvas.addEventListener('mousedown', startDraw);
        canvas.addEventListener('mousemove', onDraw);
        canvas.addEventListener('mouseup', destroyDraw);
        //---------------------------------------------------------------^
    }
}
//------------------------------------------------------------