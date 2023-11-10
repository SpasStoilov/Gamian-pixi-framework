import { LibModels } from '../index.js'
/** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                            ! NOTES !
 * ! When you make new animator you must ajusted for all vIn types.
 * ! If you not going to ajusted for all types of vIn make shure to 
 *   use it for the one type you support only.
 * ! When you rewrite the vIn value dont forget the geometry tag.
 * ! The new animator is just a function that return new value for vIn.
 * ! The model function is a function that updates the current value of vIn.
 * Format of the values:
    * ---------------------------------------------------------------
    * KEY |    VALUE 
    *  x  ~  {tag:0.5}
    *  y  ~  {tag:0.5}
    *  x  ~  {tag:1000}
    *  x  ~  {tag:1000, n:0.5}
    * scale ~ { x:{tag:0.005}, y:{tag:0.005} }                          
    * position ~ { x:{tag:0.5}, y:{tag:0.5} }
    * position ~ { x:{tag:1000, n:0.5}, y:{tag:1000, n:0.5} }
 * ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                        
 *                           TEST Animator
 *  --------------------------------------------------------------
 * 
 * @param {DisplayObject} asset
 * @param {any} vIn  - current value of the property that we are going to animate
 * @param {any} animationData - data pass in the model.shift(...)
 * 
*/
export function testAnimator(asset, vIn, animationData){
   console.log("testAnimator >>>", asset, vIn, animationData);
   // TEST you animator here......................
   return vIn
} 