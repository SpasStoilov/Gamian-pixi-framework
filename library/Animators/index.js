import {shift} from "./shift.js"
import {oscillatePositionProcentOnly} from "./oscillate-position-procent-only.js"

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
    shift,
    test: oscillatePositionProcentOnly
}