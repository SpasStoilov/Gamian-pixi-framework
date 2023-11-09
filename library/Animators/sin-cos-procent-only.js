import { LibModels } from '../index.js'
/**
 * This animator is manages only the "%" geometry of "position" param.
 * @param {DisplayObject} asset 
 * @param {any} vIn 
 * @param {any} animationData 
 * @returns {number}
 */
export function SinCosProcentOnly(asset, vIn, animationData){
    /**
     * Simple model function.
    */
    const model = animationData.data.model
    const [newX,newY] = 
        LibModels[animationData.paramName][model](
            vIn.x["%"],
            vIn.y["%"],
            animationData.data,
        )
    /**
     * Set new value.
     * Dont forget tags.
     */
    vIn = {x:{"%":newX}, y:{"%":newY}}
    return vIn
}