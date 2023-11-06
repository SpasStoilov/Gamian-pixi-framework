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
                // position
                tree.setContext(assetName) 
                /**
                 * Eval the prop with the correct context
                 */
                evalProp.call(
                    tree.props, // emitter context
                    tree.assets_register[assetName], // asset
                    paramName,  // parameter to update
                    tree.assets_params[assetName][paramName], // current value
                    animeData.value, // update value
                    animeData.toValue
                )
            }
        }
        for (let [assetName, paramName] of animationsToDelete){
            delete this.animations[assetName][paramName]
        }
    }
    /**
     * Register animation data of asset
     */
    shift(
        assetName,
        param,
        value,
        toValue
    ){
        if (!this.animations[assetName]){
            this.animations[assetName] = {}
        }
        this.animations[assetName][param] = {
            value, 
            toValue
        }
    }
}