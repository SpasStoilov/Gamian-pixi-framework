// let canvasIsOn = false
// let ctx = null

// window.addEventListener('keydown', function(event) {
//     console.log('The key was pressed.', event.key);

//     if (event.key === 'm' || event.key === 'M') {
//        let canvas = document.createElement("canvas")
//        canvas.id = "animation-drawing-stage"
//        document.body.appendChild(canvas)
//        ctx = canvas
//        canvasIsOn = true
//     }
//     else if (event.key === 'Escape') {
//       canvasIsOn && document.body.removeChild(ctx)
//       canvasIsOn && (canvasIsOn = false)
//       canvasIsOn && (ctx = null)
//     }
// });

// window.addEventListener('mousemove', function(event) {
//    if (canvasIsOn){
//       const x = event.clientX;
//       const y = event.clientY;
//       console.log(`Coordinates: (${x}, ${y})`);
//    }
//  });
