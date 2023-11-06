import {
    howMuchWindowWidthChange, 
    howMuchWindowHeightChange,
    initialWindowWidth,
    initialWindowHeight
} from "../../root.js"
import {use_geometry_based_upone_procent} from "./geometry-based-upone-procent.js"
/**
 * Initial screen change state
 */
let initChangeState = "|W,H>"

export function use_geometry_based_upone_square_grid(
    axis, gridData, tag, asset, assetInitPosition
){
    let abstractW = 1
    let abstractH = 1
    /**
     * Grid:
     * - Preserves geometry of the stage in squers:
     *   innerWidth / totalGridPointsX = innerHeight / totalGridPointsY
     *    =>
     *   innerWidth * totalGridPointsY = innerHeight * totalGridPointsX
     */
    const totalGridPointsX = gridData.sqr
    const totalGridPointsY = initialWindowHeight * totalGridPointsX / initialWindowWidth
    let AmountWindowWidthChange = Math.abs(howMuchWindowWidthChange) 
    let AmountWindowHeightChange = Math.abs(howMuchWindowHeightChange)
    /**
     * If .innerWidth has changed more we must correct the y axis
     * in order to be proportional to x
     */
    if (
        initChangeState == "|W,H>" && AmountWindowWidthChange > AmountWindowHeightChange
    ){
        initChangeState = "|W>"
    }
    /**
     * If .innerHeight has changed more we must correct the x axis
     * in order to be proportional to y
     */
    if (
        initChangeState == "|W,H>" && AmountWindowHeightChange > AmountWindowWidthChange
    ){
        initChangeState = "|H>"
    }
    /**
     * Execute states
     */
    if (initChangeState == "|W>"){
        abstractW = totalGridPointsX
        // Make y proportional
        abstractH = window.innerHeight * totalGridPointsX / window.innerWidth
    }
    else if (initChangeState == "|H>"){
        abstractH = totalGridPointsY
        // Make x proportional
        abstractW = window.innerWidth * totalGridPointsY / window.innerHeight
    }
    else if (initChangeState == "|W,H>"){
        // We define init grid to be with sized:   
        abstractW = totalGridPointsX
        abstractH = totalGridPointsY
    }
    /**
     * Convert grid values in % values
     * x ~ {sqr:1000, n:500};
     * ^^x ~ {sqr:1000, n:5};
     */
    let value = null
    if (axis == "x"){
        value = gridData.n / abstractW
       
    }
    if (axis == "y"){
        value = gridData.n / abstractH
    }
    if (tag == "^^"){
        assetInitPosition[axis] = assetInitPosition[axis].n / assetInitPosition[axis].sqr
    }
    /**
     * Extract new value
     */
    const newValue = use_geometry_based_upone_procent(
        axis, value, tag, asset, assetInitPosition
    )
    //return newValue
}