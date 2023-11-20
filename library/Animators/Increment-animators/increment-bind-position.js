import { LibModels } from '../../index.js'
import{
   currentWindowHeight,
   currentWindowWidth,
   prevWindowWidth,
   prevWindowHeight
}from "../../../root.js"

const assetsDistanceChange = {}

/** 
 * @param {DisplayObject} asset
 * @param {any} vIn  - current value of the property that we are going to animate
 * @param {any} animationData - data pass in the model.shift(...)
 * 
*/
export function incrementBindPosition(asset, vIn, animationData){
   console.log("incrementBindPosition-animator >>>", asset, vIn, animationData);

   // TEST you animator here......................

   const values = vIn ? vIn : animationData.data.initValues

   for (let [axis, propData] of Object.entries(values)){
      let value = propData.bind

      const difW = Math.abs(animationData.data[axis].W - currentWindowWidth)
      const difH = Math.abs(animationData.data[axis].H - currentWindowHeight)
      const widthChangeMore = difW >= difH ? true : false

      if(!assetsDistanceChange[asset.name]){
         assetsDistanceChange[asset.name] = {x:0, y:0}
      }
      if (widthChangeMore){
         // NOTE: this is model function, move it out to models!
         assetsDistanceChange[asset.name][axis] = 
            value + animationData.data[axis].w*(1-animationData.data[axis].W/currentWindowWidth)
            animationData.data[axis].W = currentWindowWidth
      }
      else if (!widthChangeMore){
         // NOTE: this is model function, move it out to models!
         assetsDistanceChange[asset.name][axis] = 
            value + animationData.data[axis].h*(1-animationData.data[axis].H/currentWindowHeight)
            animationData.data[axis].H = currentWindowHeight
      }
   }

   return {
      x:{bind: assetsDistanceChange[asset.name].x},
      y:{bind: assetsDistanceChange[asset.name].y}
   }
} 