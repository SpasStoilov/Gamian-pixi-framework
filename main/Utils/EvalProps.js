import { 
    LibGeometry,
    LibScalers,
    LibAnimators
} from "../../library/index.js"

/**
 * 
 * @param {*} asset 
 * @param {*} key 
 * @param {*} value 
 * @param {*} upV 
 * @param {*} toV 
 */
export function evalProp(
    asset, key, value, animationData=null
){

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
    * Options:
    * ---------------------------------------------------------------
    * KEY |    VALUE 
    *  x  ~  {"%":0.5}
    *  y  ~  {"%":0.5}
    *  x  ~  {px:1000}
    *  x  ~  {grd:1000, n:0.5}
    *  y  ~  {grd:1000, n:0.5}
    *  x  ~  {sqr:1000, n:0.5}
    * scale ~ { x:{srts:0.005}, y:{srts:0.005} }
    * scale ~ { x:{"%":0.005}, y:{"%":0.005} }                             
    * position ~ { x:{"%":0.5}, y:{"%":0.5} }
    * position ~ { x:{grd:1000, n:0.5}, y:{sqr:1000, n:0.5} }
    */ 
    if (key == "position" || key == "scale" || key == "x" || key == "y"){
        let v = null
        eval("v =" + value)
        // console.log("scale - old >>", asset.name, v);
        /**
         * Updates value and its state in the tree if we have animation
         */
        v = updateStateOfParam.call(
            this, key, asset, v, animationData
        )
        // console.log("scale - new >>", asset.name, v);

        if (key == "x" || key == "y"){
            /**
             * Select geometry
             */
            let geometrySelector = Object.keys(v)[0]
            /**
             * Set Position based upone geometry
             */
            const geometry = LibGeometry[geometrySelector]
            let newV = geometry.call(this, key, v, asset)
            asset[key] = newV
        }
        else {
            for (let [propName, propValue] of Object.entries(v)){
                if (key == "position"){
                    /**
                     * Select geometry
                     */
                    let geometrySelector = Object.keys(propValue)[0]
                    /**
                     * Set Position based upone geometry
                     */
                    const geometry = LibGeometry[geometrySelector]
                    let newV = geometry.call(this, propName, propValue, asset)
                    asset[propName] = newV
                }
                else if (key == "scale"){
                    /**
                    * Select scaler
                    */
                    let scalerSelector = Object.keys(propValue)[0]
                    /**
                     * Set Position based upone geometry
                     */
                    const scaler = LibScalers[scalerSelector]
                    let newV = scaler.call(this, propName, v, asset)
                    asset.scale[propName] = newV
                }
            }
        }
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
        * coming - server
        * ex: 
        *   propKey = any
        *   value = [arg1, arg2, ...]
        */
        if (typeOfProp == 'function'){
            let v = null
            eval(`v =`+ value)
            obj[propKey](...v)
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

/**
 * 
 * @param {string} key - paramName
 * @param {DisplayObject} asset 
 * @param {any} v - current param value
 * @param {string} selector - type of the param value
 * @param {any} animationData - animation data for the param value
 * @returns 
 */
function updateStateOfParam(key, asset, v, animationData){
    /**
     * Manage Animation
     */
    if (animationData != null){
        /**
         * Animate the parameter
         * this - emitterCalss
         */
        v = LibAnimators[animationData.animatorName].call(this, asset, v, animationData)
        /**
         * Refresh the state of the parameter value with new value.
         */
        this.tree.assets_params[asset.name][key] = JSON.stringify(v)
    }
    return v
}

function managePropChain(key, asset){
    //console.log("managePropChain >>>",asset.name, key);
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
    //console.log("managePropChain >>>",propToSet, currnetProp, type);
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