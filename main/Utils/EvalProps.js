import { ongoingEvent } from "./OngoingEvent.js" 
// NOTE: it is visible at components (don't delete)

export function evalProp(asset, key, value, assetReRendered){
    /**
     * Value maybe Not a string if it is pass from classEmitter
     */
    if (value.constructor.name != "String"){
        if (value.constructor.name == "Function"){
            asset[key] = value.call(this)
            return
        }
        let propChain = key.split(".")
        let propToSet = asset
        while (true) {
            let currnetProp = propChain.shift()
            if (!propChain.length){
                propToSet[currnetProp] = value
                break
            }
            propToSet = propToSet[currnetProp]
        }
        // asset[key] = value
        return
    }
    /**
     * Eval function()
     */
    if (value.startsWith("(")){
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