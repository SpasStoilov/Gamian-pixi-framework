import { LibModels } from '../index.js'
/**
 * 
 * @param {DisplayObject} asset 
 * @param {any} vIn 
 * @param {any} animationData 
 * @param {number} i - default -> 0
 * @returns {number}
 */
export function shift(asset, vIn, animationData, i=0){
    let paramName = animationData.paramName
    let from = animationData.from
    let upV = animationData.upV
    let toV = animationData.toV
    let sign = animationData.sign
    let model = animationData.model
    //console.log("comming >>", paramName, vIn, from, upV, toV, sign, model);

    /* 
    * Options:
    * ------------------------------------------------------
    * KEY |                     vIn                        |
    *  x  ~  {"%":0.5}
    *  y  ~  {"%":0.5}
    *  x  ~  {px:0.5}
    *  x  ~  {grd:1000, n:0.5}
    *  y  ~  {grd:1000, n:0.5}
    *  x  ~  {sqr:1000, n:0.5}
    * ------------------------------------------------------
    * position ~ { x:{"%":0.5}, y:{"%":0.5} }
    * position ~ { x:{grd:1000, n:0.5}, y:{sqr:1000, n:0.5} }
    */ 
    if (vIn.constructor.name == "Object") {
       /** 
        * When we pass -> from, upV, toV, sign, model in shift function,
        * every {} there must be [].
        * And element of [] must be the values of {} ({k1:v1, k2:v2} -> [v1, v2])
        * ex: 
        *   {"%":0.5} -> [0.5]
        *   {grd:1000, n:0.5} -> [1000, 0.5]
        *   { x:{grd:1000, n:0.5}, y:{sqr:1000, n:0.5}} 
        *     -> [ [1000, 0.5], [1000, 0.5] ]
        */
        for (let [key, value] of Object.entries(vIn)){
            let reducedAnimationData = {
                paramName, 
                from: from[i], 
                upV: upV[i], 
                toV: toV[i], 
                sign: sign[i], 
                model: model[i]
            }
            let newV = shift.call(
                this, asset, value, reducedAnimationData
            )
            vIn[key] = newV
            i+=1
        }
    }
    else {
        //console.log(paramName, vIn, from, upV, toV, sign);
        /**
         * Execute a modelator function
         * this - classEmitter
         */
        vIn = LibModels[paramName][model].call(this, vIn, from, upV, toV, sign)
    }
    //console.log("out >>", vIn);
    return vIn
}