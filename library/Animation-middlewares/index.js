import {testAnimationDataMiddleware} from "./test.js"
import {shift} from "./shift.js"
import {SinCosProcentOnlyMiddleware} from "./sin-cos-procent-only-middleware.js"
/**
* Set key for your new animator Middleware.
* Use it:
*     this.model.shift(
*        <Name of asset you want to animate>, 
*        <name of the parameter you want to animate>, 
*        <"data" you will use in your animator builder>,
*        <"testBld">,
*        <name of animator that is going to use the build data>,
*     )
*/
export const LibAnimationDataMiddleware = {
    // default:
    shift,
    // new:
    testMid: testAnimationDataMiddleware,
    SinCosProcentMid: SinCosProcentOnlyMiddleware
}