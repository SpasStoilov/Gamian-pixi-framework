import { LibModels } from '../index.js'

/**
 * 
 * @param {DisplayObject} asset 
 * @param {any} vIn 
 * @param {any} animationData 
 * @returns {number}
 */
export function oscillatePositionProcentOnly(asset, vIn, animationData){
    console.log("oscillatePositionProcentOnly >>> Animator:", asset, vIn, animationData);
    // simple model function:
    const newY = vIn.y + 0.001
    const newX = newY**3
    vIn = {x:newX, y:newY}
    console.log("oscillatePositionProcentOnly >>>  vIn = {x:newX, y:newY}:", newX, newY);
    return vIn
}