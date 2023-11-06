import { 
    use_geometry_based_upone_procent,
    use_geometry_based_upone_square_grid,
    use_geometry_based_upone_proportional_coordinates,
    geometry_grid,
    scaling_relative_to_screen,
    procent_of_screen,
} from "../../library/index.js"

export function evalProp(asset, key, value, upV=null, toV=null){
    //console.log("evalProp >>>",asset.name, key, value);

    let tag = "default"
    /* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *                       Manage tags
     *---------------------------------------------------------------
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
        let v = null
        const geometryHelper = {
            "%" : use_geometry_based_upone_procent,
            "sqr": use_geometry_based_upone_square_grid,
            "px": use_geometry_based_upone_proportional_coordinates,
            "grd": geometry_grid
        }
        
        let geometrySelector = "px"
        
        /* 
        * Procent:
        * x ~ %0.5
        */ 
        if (value.match(/%/)){
            geometrySelector = "%"
            value = value.replaceAll("%", "")
            eval("v =" + value)
            if (!toV || v <= toV){
                v = upV ? v + upV : v
                this.tree.assets_params[asset.name][key] = `%${v}`
            }
        }
        /**
         *          
         * {sqr:10000, n:10}
         */
        else if (value.match(/\{\s*sqr/)){
            geometrySelector = "sqr"
            eval("v =" + value)
            if (!toV || v.sqr <= toV.sqr){
                v = upV ? {sqr: v.sqr + upV.sqr, n: v.n + upV.n} : v
                this.tree.assets_params[asset.name][key] = JSON.stringify(v)
            }

        }
        /**                             
         * x ~ {grd:1000, n:500}  
         */
        else if (value.match(/\{\s*grd/)){
            geometrySelector = "grd"
            eval("v =" + value)
            if (!toV || v.grd <= toV.grd){
                v = upV ? {sqr: v.grd + upV.grd, n: v.n + upV.n} : v
                this.tree.assets_params[asset.name][key] = JSON.stringify(v)
            }
        }
        /**
         * x ~ 1000
         */
        else {
            eval("v =" + value)
            if (!toV || v <= toV){
                v = upV ? v + upV : v
                this.tree.assets_params[asset.name][key] = JSON.stringify(v)
            }
        }
        const geometry = geometryHelper[geometrySelector]

        asset[key] = geometry(key, v)
    }
    /**
     * Mange scale of the asset on the screen
     */
    else if (key == "scale"){

        let v = null

        const scalerHelper = {
            "srts" : scaling_relative_to_screen,
            "%": procent_of_screen
        }

        let scalerSelector = "srts"
        /**
         * scalerSelector = "%"
         * scale ~ {x:%0.005, y:%0.005}
         */
        if (value.match(/%/)){
            scalerSelector = "%"
            value = value.replaceAll("%", "")
            eval("v =" + value)
            if (!toV || v <= toV){
                v = upV ? {x: v.x + upV.x, y: v.y + upV.y} : v
                this.tree.assets_params[asset.name][key] = `{x:%${v.x}, y:%${v.y}}`
            }
            // if (!toV || v <= toV){
            //     v = upV ? {x: v.x + upV.x, y: v.y + upV.y} : v
            //     this.tree.assets_params[asset.name][key] = `{x:%${v.x}, y:%${v.y}}`
            // }
        }
        /**
         * scalerSelector = srts
         * scale ~ {x:1, y:1}
         */
        else{
            eval("v =" + value)
            v = upV ? {x: v.x + upV.x, y: v.y + upV.y} : v
            this.tree.assets_params[asset.name][key] = JSON.stringify(v)
        }

        const scaler = scalerHelper[scalerSelector]
        
        const [newX, newY] = scaler(v, "x")
        asset.scale.x = newX
        asset.scale.y = newY
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