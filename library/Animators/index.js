import {testAnimator} from './test.js'
import {shift} from "./shift.js"
import {SinCosProcentOnly} from "./sin-cos-procent-only.js"
import {incrementBindPosition} from "./Increment-animators/increment-bind-position.js"
import {drawingAnimator} from "./animate-drawing.js"
/**
* Set key for your new animator.
* Use it:
*     this.model.shift(
*        <Name of asset you want to animate>, 
*        <name of the parameter you want to animate>, 
*        <"data" you will use in your animator builder>,
*        <name of the parser that builds your "data">,
*        <"test">,
*     )
*/
export const LibAnimators = {
    //default:
    shift,
    //new:
    incBindAnimator: incrementBindPosition,
    testAnimator: testAnimator,
    SinCosProcent: SinCosProcentOnly,
    DrawingAnimator: drawingAnimator

}