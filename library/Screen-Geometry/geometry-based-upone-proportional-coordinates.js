import {
    initialWindowWidth,
    initialWindowHeight,
} from "../../root.js"
import {use_geometry_based_upone_procent} from "./geometry-based-upone-procent.js"

export function use_geometry_based_upone_proportional_coordinates(
    axis, value, tag=null, asset=null, assetInitPosition=null
){
    /**
     * Convert pixel values in % values
     * x ~ 1000
     * ^^x ~ 10
     */
    if (axis == "x"){
        value = value / initialWindowWidth
    }
    else if (axis == "y"){
        value = value / initialWindowHeight
    }
    /**
     * Extract new value
     */
    const newValue = use_geometry_based_upone_procent(axis, value)

    return newValue
}