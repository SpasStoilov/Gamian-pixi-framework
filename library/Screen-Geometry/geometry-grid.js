import {use_geometry_based_upone_procent} from "./geometry-based-upone-procent.js"

export function geometry_grid(axis, value, asset){
    /**
     * Convert grid values in % values
     * value ~ {grd:10000, n:10}
     */
    value["%"] = value.n / value.grd
    /**
     * Extract new value
     */
    const newValue = use_geometry_based_upone_procent(axis, value, asset)
    return newValue
}