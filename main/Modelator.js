import { tree } from "../root.js"
import { evalProp } from "./Utils/EvalProps.js"
import {LibAnimationDataMiddleware} from "../library/index.js"
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
                    animeData // animation data
                )
                const newValue = tree.assets_params[assetName][paramName]
                /**
                 * We stop animation if current value is the same as new one!
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
     * Function register animation data.
     * @param {String} assetName 
     * @param {String} param 
     * @param {any} data
     * @param {string} animationDataBuilder - default -> "shift"
     * @param {string} animatorName - default -> "shift"
     */
    shift(
        assetName,
        param,
        data,
        animationMiddleware = "shift",
        animatorName = "shift"
    ){
        let animeData = LibAnimationDataMiddleware[animationMiddleware](
            assetName,
            param,
            data,
            animatorName
        )
        /**
         * Register animation with data
         */
        if (!this.animations[assetName]){
            this.animations[assetName] = {}
        }
        this.animations[assetName][param] = animeData
    }
}