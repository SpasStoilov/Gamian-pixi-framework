import { LibModels } from '../index.js'

/** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                            ! NOTES !
 * ! When you make new animator you must ajusted for all vIn types.
 * ! If you not going to ajusted for all types of vIn make shure to 
 *   use it for the one type you support only.
 * ! When you rewrite the vIn value dont forget the geometry tag.
 * ! The new animator is just a function that return new value for vIn.
 * ! The model function is a function that updates the current value of vIn.
 * ----------------------------------------------------------------
 * 
 * This animator is manages only the "%" geometry of "position" param.
 * @param {DisplayObject} asset 
 * @param {any} vIn 
 * @param {any} animationData 
 * @returns {number}
 */
export function oscillatePositionProcentOnly(asset, vIn, animationData){
    console.log("oscillatePositionProcentOnly >>> Animator:", asset, vIn, animationData);
    /**
     * Simple model function.
    */
    const [newX,newY] = 
        LibModels[animationData.paramName].TEST(
            vIn.y["%"], animationData.data.from[1]
        )
    /**
     * Set new value.
     * Dont forget tags.
     */
    vIn = {x:{"%":newX}, y:{"%":newY}}
    return vIn
}