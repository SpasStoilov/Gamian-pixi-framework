import { ongoingEvent } from "./OngoingEvent.js" 
import { 
    use_geometry_based_upone_procent,
    use_geometry_based_upone_square_grid,
    use_geometry_based_upone_proportional_coordinates,
    scaling_relative_to_screen,
    geometry_grid
} from "../../library/index.js"

// NOTE: it is visible at components (don't delete)

export function evalProp(asset, key, value, treeData){

    let tag = "default"
    /* ----------------------------------------------------------
     *                      Manage tags
     *
     * Check if key is ^^model_tag
     */
    if (key.match(/\^\^/)){
        tag = "^^"
    }
    /*
    * Check if key is fun_tag
    */
    if (key.match(/fun\^/)){
        tag = "fun^"
    }
    /* 
    *  Check if key is !custom_prop_tag
    */
    if (key.startsWith("!")){
        tag = "!"
    }
    /* 
    *  Check if key is function_call_tag
    */
    if (value.constructor.name == "String" && value.startsWith("(")){
        tag = "(*)"
    }
    /*  ----------------------------------------------------------
     *                      Eval Demensions Values
     * 
     * Mange position of asset on the screen
     */
    if (key == "x" || key == "y" || key == "^^x" || key == "^^y"){
        /** ----------------------------------------------------------
         *                      Select Geometry
        */
        const geometryHelper = {
            "%" : use_geometry_based_upone_procent,
            "sq": use_geometry_based_upone_square_grid,
            "px": use_geometry_based_upone_proportional_coordinates,
            "grd": geometry_grid
        }
        //-----
        let geometrySelector = "px"
        //----- 
        if (value.match(/^%/)){
            value = value.match(/(?<=^%).+/)[0]
            geometrySelector = "%"
        }
        if (value.match(/\{\s*sq/)){
            geometrySelector = "sq"
        }
        if (value.match(/\{\s*grd/)){
            geometrySelector = "grd"
        }
        //------
        const geometry = geometryHelper[geometrySelector]
        //------------------------------------------------------------^
        /**
         *               Define args for the geometry
         */
        let assetInitPosition = null
        let v = null
        /**------------------------------------------------------------
         *          Manage key & values based upone geometry and tags
         * 
         * x ~ %0.5
         */
        if (geometrySelector == "%"){
            /**
             * If we have ^^model_tag 
             * we need asset start position and remove "^^" from key.
             */
            if(tag == "^^"){
                key = key.match(/\^\^x/) ? "x" : "y"
                let initX = eval(treeData.assets_params[asset.name].x) || 0
                let initY = eval(treeData.assets_params[asset.name].y) || 0
                assetInitPosition = {x:initX,y:initY}
            }
            v = eval(value)
            v = Number(v)
        }
        /**
         * x ~ 1000
         */
        else if(geometrySelector == "px"){
            v = eval(value)
            v = Number(v)
        }
        /**
         * x ~ {grd:1000, n:500};
         */
        else if(geometrySelector == "grd"){
            eval("v =" + value)
        }
        /**
         * x ~ {sq:1000, n:50}
         * y ~ {sq:1000, n:5}
         */
        else if(geometrySelector == "sq"){
            eval("v =" + value)
        }
         /**
         * fun^
         */
        else if (tag == "fun^"){
            v = eval(`(function funCall(asset)`+ value + ').call(this, asset)')
        }
        /**------------------------------------------------------------
         *                      Calc new axis
         */
        asset[key] = geometry(key, v, tag, asset, assetInitPosition)
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
        asset.scale.set(scaling_relative_to_screen(Number(v)))
        return
    }
    /* ----------------------------------------------------------
     *                      Eval Other Values
     * Eval function()
     * coming - classEmitter
     * ex: 
     *   key = scale
     *   value = () => number
     */
    if (value.constructor.name == "Function"){
        asset[key] = value.call(this)
    }
    /* 
     * Eval !custom_props
     * coming - server
     * ex: 
     *   key = !customProp
     *   value = {logic}
     */
    else if (tag == "!"){
        eval(`(function customProp(asset)`+ value + ').call(this, asset)')
    }
    /* 
     * Eval function_call(*)
     * coming - server
     * ex: 
     *   key = scale.set
     *   value = (1)
     */
    else if (tag == "(*)"){
        eval(`asset.`+ key + value)
    }
    /**
     * Eval = value
     * coming - server
     * ex: 
     *   key = visible
     *   value = object | array | () => any | string | number ...
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