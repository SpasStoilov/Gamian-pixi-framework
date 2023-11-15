import { LibModels } from '../index.js'
import{
   currentWindowHeight,
   currentWindowWidth,
   prevWindowWidth,
   prevWindowHeight
}from "../../root.js"

const assetsDistanceChange = {}

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

   const values = vIn ? vIn : animationData.data.initValues

   for (let [axis, propData] of Object.entries(values)){
      let value = propData["%"]

      const difW = Math.abs(animationData.data[axis].W - currentWindowWidth)
      const difH = Math.abs(animationData.data[axis].H - currentWindowHeight)
      const widthChangeMore = difW >= difH ? true : false

      if(!assetsDistanceChange[asset.name]){
         assetsDistanceChange[asset.name] = {x:0, y:0}
      }
      if (widthChangeMore){
         assetsDistanceChange[asset.name][axis] = 
            value + animationData.data[axis].w*(1-animationData.data[axis].W/currentWindowWidth)
            animationData.data[axis].W = currentWindowWidth
      }
      else if (!widthChangeMore){
         assetsDistanceChange[asset.name][axis] = 
            value + animationData.data[axis].h*(1-animationData.data[axis].H/currentWindowHeight)
            animationData.data[axis].H = currentWindowHeight
      }
   }

   return animationData.data.initValues

   // return {
   //    x:{"%": assetsDistanceChange[asset.name].x},
   //    y:{"%": assetsDistanceChange[asset.name].y}
   // }

   // let dx = 0
   // if (currentWindowWidth > prevWindowWidth){
   //    dx = 0.01
   // }
   // else if (currentWindowWidth < prevWindowWidth){
   //    dx = -0.01
   // }

   // return  {
   //    x:{"%": values.x["%"] + dx},
   //    y:{"%": values.y["%"]}
   // }

   // const acountForZero = value["%"] ? 1:0
   // if (axis == "x"){
   //     return (value["%"]*(currentWindowWidth - asset.width) + (acountForZero*asset.width/2))
   //     //return  window.innerWidth*(value["%"] + assetsDistanceChange[asset.name][axis])
   // }
   // else if (axis == "y"){
   //     return (value["%"]*(currentWindowHeight - asset.height) + (acountForZero*asset.height/2))
   //     //return window.innerHeight*(value["%"] + assetsDistanceChange[asset.name][axis])
   // }
} 