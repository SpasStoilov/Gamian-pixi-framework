import {shift} from "./shift.js"
import {oscillatePositionProcentOnly} from "./oscillate-position-procent-only.js"

/**
* Set key for your new animator builder.
* Use it:
*     this.model.shift(
*        <Name of asset you want to animate>, 
*        <name of the parameter you want to animate>, 
*        <"data" you will use in your animator builder>,
*        <"testBld">,
*        <name of animator that is going to use the build data>,
*     )
*/
export const LibAnimationDataBuilders = {
    shift,
    testBld: oscillatePositionProcentOnly
}