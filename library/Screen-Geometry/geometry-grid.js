import {use_geometry_based_upone_procent} from "./geometry-based-upone-procent.js"

export function geometry_grid(axis, gridData, tag=null, asset=null, assetInitPosition=null){
    /**
     * Convert grid values in % values
     * x ~ {grd:10000, n:10}
     * ^^x ~ {grd:10000, n:1}
     */
    let value = gridData.n / gridData.grd
    /**
     * Extract new value
     */
    const newValue = use_geometry_based_upone_procent(axis, value)
    return newValue
}