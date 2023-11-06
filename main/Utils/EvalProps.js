import { ongoingEvent } from "./OngoingEvent.js" 
// NOTE: it is visible at components (don't delete it!)
import { 
    use_geometry_based_upone_procent,
    use_geometry_based_upone_square_grid,
    use_geometry_based_upone_proportional_coordinates,
    geometry_grid,
    scaling_relative_to_screen,
    procent_of_screen,
} from "../../library/index.js"

export function evalProp(asset, key, value, treeData){
    //console.log("evalProp >>>",asset.name, key, value);
    
                                                  //----- Default tag
    let tag = "default"
    /* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *                       Manage tags
     *---------------------------------------------------------------
     * Check if key is ^^model_tag
     */
    if (key.match(/\^\^/)){
        tag = "^^"
        key = key.replaceAll("^", "")
    }
    /* 
    *  Check if key is !custom_prop_tag
    */
    if (key.startsWith("!")){
        tag = "!"
        key = key.replaceAll("!", "")
    }
    /*  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *         Eval Demensions & Values that can be animated
     * ---------------------------------------------------------------
     * Mange position of asset on the screen
     * x ~ number
     * y ~ number
     */
    if (key == "x" || key == "y"){
                                               //-----Select Geometry
        const geometryHelper = {
            "%" : use_geometry_based_upone_procent,
            "sqr": use_geometry_based_upone_square_grid,
            "px": use_geometry_based_upone_proportional_coordinates,
            "grd": geometry_grid
        }
                                               //----- Default Geometry
        let geometrySelector = "px"
                                                                //----- 
        if (value.match(/%/)){
            geometrySelector = "%"
        }
        if (value.match(/\{\s*sqr/)){
            geometrySelector = "sqr"
        }
        if (value.match(/\{\s*grd/)){
            geometrySelector = "grd"
        }
                                                                //-----
        const geometry = geometryHelper[geometrySelector]
       
                                    //----- Define args for the geometry
        
        let assetInitPosition = null
        let v = null
       
                   //----- Manage key & values based upone geometry and tags
        /* 
        * Procent:
        * x ~ %0.5
        */
        if (geometrySelector == "%"){
            /**
             * If we have ^^model_tag 
             * we need asset start position and remove "^^" from key.
             */
            if(tag == "^^"){
                let rawX = treeData.assets_params[asset.name].x.replaceAll("%", "")
                let rawY = treeData.assets_params[asset.name].y.replaceAll("%", "")
                let initX = eval(rawX) || 0
                let initY = eval(rawY) || 0
                assetInitPosition = {x:initX,y:initY}
            }
            value = value.replaceAll("%", "")
            v = eval(value)
            v = Number(v)
        }
        /**
         *                     Grids                    Pixels
         * x ~ {grd:1000, n:500} | {sqr:10000, n:10} | x ~ 1000
         */
        else if(
            geometrySelector == "grd" || 
            geometrySelector == "sqr" || 
            geometrySelector == "px"
        ){
            eval("v =" + value)
            /**
             * If we have ^^model_tag 
             * we need asset start position and remove "^^" from key.
             * ^^x ~ {amount:0.01, time:100};
             */
            if(tag == "^^"){
                let initX = null
                let initY = null
                eval("initX =" + treeData.assets_params[asset.name].x)
                eval("initY =" + treeData.assets_params[asset.name].y)
                assetInitPosition = {x:initX, y:initY}
            }
        }
        
                                                   //----- Calculate new axis
        geometry(key, v, tag, asset, assetInitPosition)
    }
    /**
     * Mange scale of the asset on the screen
     * scale ~ {x:number, y:number}
     * ^^scale ~ {x:number, y:number, time:number};
     */
    else if (key == "scale"){
                                                 //----- Select Scaler
        const scalerHelper = {
            "default" : scaling_relative_to_screen,
            "%": procent_of_screen
        }
                                                 //----- Default Scaler
        let scalerSelector = "default"
                                                                //----- 
        if (value.match(/%/)){
            scalerSelector = "%"
        }
                                                                //-----
        const scaler = scalerHelper[scalerSelector]
        
                                      //----- Define args for the scalers
        
        let v = null
        let initScale = null
                          //------ Manage key & values based upone scaler
        /**
         * scale ~ {x:1, y:1}
         */
        if (scalerSelector == "default"){
            eval("v =" + value)
            eval("initScale =" + treeData.assets_params[asset.name].scale)
        }
        /**
         * scale ~ {x:%0.005, y:%0.005}
         */
        else if (scalerSelector == "%"){
            value = value.replaceAll("%", "")
            eval("v =" + value)
        }
                                                //----- Calculate new scale
        scaler("x", v, tag, asset, initScale)
    }
    /* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *            Eval Static Props that can not be animated
     * ---------------------------------------------------------------
     *  
     *   key = any
     *   value = object | array | () => any | string | number ...
     */
    else {
        let [obj, propKey, typeOfProp] = managePropChain(key, asset)
        /* 
        * Eval !custom_props
        * coming - server
        * ex: 
        *   propKey = any
        *   value = [arg1, arg2, ...]
        */
        if (typeOfProp == 'function'){
            eval(`obj.`+ propKey + "(...value)")
            return
        }
        /* 
        * Eval !custom_props
        * coming - server
        * ex: 
        *   propKey = !customProp
        *   value = {logic}
        */
        else if (tag == "!"){
            eval(`(function customProp(asset)`+ value + ').call(this, asset)')
        }
        /* Eval function()
        * coming - classEmitter
        * ex: 
        *   propKey = scale
        *   value = () => number
        */
        else if (typeof value == "function"){
            obj[propKey] = value.call(this)
        }
        /**
        * coming - server
        * ex: 
        *   propKey = any
        *   value = any 
        */
        else{
            obj[propKey] = eval(value)
        }

    }
}

function managePropChain(key, asset){
    let currnetProp = null
    let propChain = key.split(".")
    let propToSet = asset
    while (true) {
        currnetProp = propChain.shift()
        if (!propChain.length){
            break
        }
        propToSet = propToSet[currnetProp]
    }
    let type = typeof propToSet[currnetProp]
    return [propToSet, currnetProp, type]
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