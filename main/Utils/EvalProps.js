import { ongoingEvent } from "./OngoingEvent.js" 
import { getPosition3, getScale } from "./DemensionCalculators.js"
// NOTE: it is visible at components (don't delete)

export function evalProp(asset, key, value, assetReRendered){
    /**            ******** Demensions ********
     * Mange position
     */
    if (key == "x" || key == "y" || key == "model_x" || key == "model_y"){
        let tag = "default"
        let upKey = key
        /**
         * Check if key ++model_
         */
        if (key.match(/model_/)){
            upKey = key.match(/model_x/) ? "x" : "x"
            tag = "++"
        }
        /**
         * Check if value is ++
         */
        if (value.match(/\+\+/)){
            console.log(value);
            value = value.match(/(?<=\+\+).+/)[0]
            tag = "++"
        }

        let v = eval(value)
        console.log(asset.x);
        console.log(upKey);
        console.log(tag);
        asset[upKey] = getPosition3(upKey, Number(v), tag, asset)
        console.log(asset.x);
        return
    }
    /**
     * Mange scale
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
    //--------------------------------------------------------------^

    /**               ******** Others ********
     * Eval function()
     */
    if (value.constructor.name == "Function"){
        asset[key] = value.call(this)
    }
    else if (value.constructor.name == "String" && value.startsWith("(")){
        eval(`asset.`+ key + value)
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