import { ongoingEvent } from "./OngoingEvent.js" 
import { getPosition3, getScale } from "./DemensionCalculators.js"
// NOTE: it is visible at components (don't delete)

export function evalProp(asset, key, value, treeData){

    let tag = "default"

    /*************** Manage tags ********************
     *
     * Check if key is ^^model_tag
     */
    if (key.match(/\^\^/)){
        tag = "^^"
    }
    /* 
    *  Check if key is !custom_prop_tag
    */
    if (key.startsWith("!")){
        console.log("DOOOONT BELONG TO ASSET!!!!", key);
        tag = "!"
    }
    /**************** Demensions ********************
     * 
     * Mange position of asset on the screen
     */
    if (key == "x" || key == "y" || key == "^^x" || key == "^^y"){
        let assetInitPosition = null
        /**
         * If we have ^^model_tag we need asset start position and remove ^^ from key.
         */
        if(tag == "^^"){
            key = key.match(/\^\^x/) ? "x" : "y"
            let initX = eval(treeData.assets_params[asset.name].x) || 0
            let initY = eval(treeData.assets_params[asset.name].y) || 0
            assetInitPosition = {x:initX,y:initY}
        }

        let v = eval(value)
        asset[key] = getPosition3(key, Number(v), tag, asset, assetInitPosition)
        return
    }
    /**
     * Mange scale of the asset on the screen
     */
    if (key == "scale" || key == "scale.set"){
        if (key == "scale.set"){
            /**
             * Drop brackets
             */
            value = value.match(/(?<=\().*(?=\))/)[0]
        }
        let v = eval(value)
        asset.scale.set(getScale(Number(v)))
        return
    }
    /******************* Others ***********************
    /* 
     * Eval function()
     */
    if (value.constructor.name == "Function"){
        asset[key] = value.call(this)
    }
    else if (value.constructor.name == "String" && value.startsWith("(")){
        if (tag == "!"){
            eval(`(function customProp(asset)`+ value + ').call(this, asset)')
        }
        else{
            eval(`asset.`+ key + value)
        }
    }
    /**
     * Eval = value
     */
    else {
        let propChain = key.split(".")
        let propToSet = asset
        while (true) {
            let currnetProp = propChain.shift()
            if (!propChain.length){
                propToSet[currnetProp] = eval(value)
                break
            }
            propToSet = propToSet[currnetProp]
        }
    }
    return
}

export function evalArgs(args){
    // If not existing:
    if (!args){
        return args
    }
    // Type Options:
    const argsIsObject = args.match(/\{/)
    const argsIsArray = args.match(/\[/)
    const argsIsAnyOther= !argsIsObject && !argsIsArray && true

    // Check:
    if (argsIsObject || argsIsArray){
        return eval(args)
    }
    if (argsIsAnyOther){
        return args
    }
}