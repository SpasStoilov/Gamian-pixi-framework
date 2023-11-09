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
     * value ~ {px: 1000}
     */
    if (axis == "x"){
        value["%"] = value["px"] / initialWindowWidth
    }
    else if (axis == "y"){
        value["%"] = value["px"] / initialWindowHeight
    }
    /**
     * Extract new value
     */
    const newValue = use_geometry_based_upone_procent(axis, value)

    return newValue
}