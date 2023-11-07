import { tree } from "../root.js"
import { evalProp } from "./Utils/EvalProps.js"
/**
 * Manages Animations
 */
export class Modelator{
    TIME = 0
    animations = {}
    currentAnimationsState = {}

    constructor(){}

    /**
     * Execute all animation
     */
    animate(){
        const animationsToDelete = []
        for (let [assetName, animations] of Object.entries(this.animations)){
            for (let [paramName, animeData] of Object.entries(animations)){
                //
                tree.setContext(assetName)
                /**
                 * Eval the prop with the correct context
                 */
                evalProp.call(
                    tree.props, // emitter context
                    tree.assets_register[assetName], // asset
                    paramName,  // parameter to update
                    tree.assets_params[assetName][paramName], // current value
                    animeData.upV, // update value
                    animeData.toV, // max value to reach
                    animeData.sign, // animation direction
                )
                const newValue = tree.assets_params[assetName][paramName]
                /**
                 * Check when to stop animation
                 */
                if (
                    animeData.currentValue == newValue
                ){
                    animationsToDelete.push([assetName, paramName])
                    continue
                }
                /**
                 * Update current value of animation
                 */
                animeData.currentValue = newValue

            }
        }
        /**
         * Delete animation we do not need
         */
        for (let [assetName, paramName] of animationsToDelete){
            delete this.animations[assetName][paramName]
        }
    }
    /**
     * 
     * @param {String} assetName 
     * @param {String} param 
     * @param {object} data - {from: number | array, steps: number | array, to: number | array }
     */
    shift(
        assetName,
        param,
        data
    ){
        let {from, steps, to} = data

        let upV = null
        let sign = null
        /**
         * Calculate update value
         * NOTE: By default we assume that user will pass values in desire units, 
         * so we do not bother to check what units are and that is why values 
         * are pass in array with no units.
         */
        if(from.constructor.name == "Array"){
            /**
             * Calc with how much to update animation
             */
            let var1 = (to[0] - from[0]) / steps[0] || 1
            let var2 = (to[1] - from[1]) / steps[1] || 1
            upV = [var1, var2]
            /**
             * Get sign of animation
            */
            sign = []
            //
            if (var1 < 0){
                sign.push("-")
            }
            else {
                sign.push("+")
            }
            if (var2 < 0){
                sign.push("-")
            }
            else{
                sign.push("+")
            }
        }
        else {
            /**
             * Calc with how much to update animation
             */
            upV = (to - from) / steps || 1
            /**
             * Get sign of animation
             */
            if (upV < 0){
                sign = "-"
            }
            else {
                sign = "+"
            }
        }
        /**
         * Register animation
         */
        if (!this.animations[assetName]){
            this.animations[assetName] = {}
        }
        this.animations[assetName][param] = {
            upV, 
            toV: to,
            sign
        }
    }
}