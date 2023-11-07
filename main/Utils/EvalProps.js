import { 
    use_geometry_based_upone_procent,
    use_geometry_based_upone_square_grid,
    use_geometry_based_upone_proportional_coordinates,
    geometry_grid,
    scaling_relative_to_screen,
    procent_of_screen,
} from "../../library/index.js"


/**
 * 
 * @param {*} asset 
 * @param {*} key 
 * @param {*} value 
 * @param {*} upV 
 * @param {*} toV 
 */
export function evalProp(asset, key, value, upV=null, toV=null, sign=null){
    //console.log("evalProp >>>",asset.name, key, value);

    let tag = "default"
    /* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *                         Manage tags
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
     * Mange axis of asset on the screen
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
        /**
         * x ~ 1000
         */
        let geometrySelector = "px"
        /* 
        * Procent:
        * x ~ %0.5
        */ 
        if (value.match(/%/)){
            geometrySelector = "%"
            value = value.replaceAll("%", "")
        }
        /**
         *          
         * {sqr:10000, n:10}
         */
        else if (value.match(/\{\s*sqr/)){
            geometrySelector = "sqr"
        }
        /**                             
         * x ~ {grd:1000, n:500}  
         */
        else if (value.match(/\{\s*grd/)){
            geometrySelector = "grd"
        }
       
        eval("v =" + value)
        /**
         * Manage Animations
         */
        v = updateStateOfParam.call(this, key, asset, v, geometrySelector, toV, upV, sign)
        const geometry = geometryHelper[geometrySelector]
        asset[key] = geometry(key, v)
    }
    /* Mange position of asset on the screen
     * position ~ {x: value, y: value}
     * value = 1010 | %0.5 | {sqr:10000, n:10} | {grd:1000, n:500}
     */
    else if (key == "position"){
        let v = null
        const geometryHelper = {
            "%" : use_geometry_based_upone_procent,
            "sqr": use_geometry_based_upone_square_grid,
            "px": use_geometry_based_upone_proportional_coordinates,
            "grd": geometry_grid
        }
        /**
         *  position ~ {x:1000, y:2352}
         */
        let geometrySelector = "px"
        
        /* 
        * Procent:
        * position ~ {x: %0.5, y: %0.5}
        */ 
        if (value.match(/%/)){
            geometrySelector = "%"
            value = value.replaceAll("%", "")
        }
        /**
         *          
         * position ~ {x: {sqr:10000, n:10}, x: {sqr:10000, n:10} }
         */
        else if (value.match(/\{\s*sqr/)){
            geometrySelector = "sqr"
        }
        /**                             
         * position ~ {x: {grd:10000, n:10}, x: {grd:10000, n:10} }  
         */
        else if (value.match(/\{\s*grd/)){
            geometrySelector = "grd"
        }
        eval("v =" + value)
        /**
         * Manage Animations
         */
        v = updateStateOfParam.call(this, key, asset, v, geometrySelector, toV, upV, sign)
       
        for (let [propName, propValue] of Object.entries(v)){
            const geometry = geometryHelper[geometrySelector]
            asset[propName] = geometry(propName, propValue)
        }
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
        /**
         * scalerSelector = srts
         * scale ~ {x:1, y:1}
         */
        let scalerSelector = "srts"
        /**
         * scalerSelector = "%"
         * scale ~ {x:%0.005, y:%0.005}
         */
        if (value.match(/%/)){
            scalerSelector = "%"
            value = value.replaceAll("%", "")
        }
    
        eval("v =" + value)
        /**
         * Manage Animations
         */
        v = updateStateOfParam.call(this, key, asset, v, scalerSelector, toV, upV, sign)

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

function updateStateOfParam(key, asset, v, selector, toV, upV, sign){
    function recursiveValueChager(vIn, to, up, s, i=0){
        console.log("comming >>", vIn, to, up, s);
        /**
         * Manage Animation
         */
        if (to != null && up != null){
            if (vIn.constructor.name == "Number"){
                if ((s == "-" && vIn > to) || (s == "+" && vIn < to)){
                    vIn = vIn + up
                }
                else {
                    vIn = to
                }
            }
            else {
                /** 
                 * vIn  = {grd:10000, n:10}
                 * to = [1,2]
                 * up = [1,2]
                 * s  = [+,-]
                 * ---------------------------------------------------
                 * vIn  = { x: {grd:10000, n:10}, y: {grd:10000, n:10} } 
                 * to = [ [1,2], [1,2] ] 
                 * up = [ [1,2], [1,2] ]
                 * s  = [ [+,+], [+,-] ]
                 */
                for (let [key, value] of Object.entries(vIn)){
                    let newV = recursiveValueChager.call(this, value, to[i], up[i], s[i])
                    vIn[key] = newV
                    i+=1
                }
            }
        }
        console.log("out >>", vIn);
        return vIn
    }
    /**
     * Manage Animation
     */
    if (toV != null && upV != null){
        /**
         * Update value of param
         * */  
        // if (v.constructor.name == "Number"){
        //     if ((sign == "-" && v > toV) || (sign == "+" && v < toV)){
        //         v = v + upV
        //     }
        //     else{
        //         v = toV
        //     }
        // }
        // else {
        //     /**
        //      * { key_0: value_0, key_1: value_1 }
        //      * key = sqr / grd / x
        //      */
        //     const [value_0, value_1] = Object.values(v)
        //     const [key_0, key_1] = Object.keys(v)

        //     if ((sign[0] == "-" && value_0 > toV[0]) || (sign[0] == "+" && value_0 < toV[0])){
        //         v = {[key_0]: value_0 + upV[0], [key_1]: v[key_1]}
        //     }
        //     else{
        //         v = {[key_0]: toV[0], [key_1]: v[key_1]}
        //     }
        //     // n / y
        //     if ((sign[1] == "-" && value_1 > toV[1]) || (sign[1] == "+" && value_1 < toV[1])){
        //         v = {[key_0]: v[key_0], [key_1]: value_1 + upV[1]}
        //     }
        //     else{
        //         v = {[key_0]: v[key_0], [key_1]: toV[1]}
        //     }
        // }
        v = recursiveValueChager.call(this, v, toV, upV, sign)
        /**
         * Change state of param
         */
        // x & y
        if (selector == "%" && key == "x" || key == "y"){
            this.tree.assets_params[asset.name][key] = `%${v}`
        }
        else if (selector == "grd" || selector == "sqr" ||  selector == "px" && key == "x" || key == "y"){
            this.tree.assets_params[asset.name][key] = JSON.stringify(v)
        }
        // position
        else if (selector == "%" && key == "position"){
            this.tree.assets_params[asset.name][key] = `{x:%${v.x}, y:%${v.y}}`
        }
        else if (selector == "grd" || selector == "sqr" ||  selector == "px" && key == "position"){
            this.tree.assets_params[asset.name][key] = JSON.stringify(v)
        }
        // scale
        else if (selector == "%" && key == "scale"){
            this.tree.assets_params[asset.name][key] = `{x:%${v.x}, y:%${v.y}}`
        }
        else if (selector == "srts" && key == "scale"){
            this.tree.assets_params[asset.name][key] = JSON.stringify(v)
        }

    }
    return v
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