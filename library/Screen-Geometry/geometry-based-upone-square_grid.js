import {
    howMuchWindowWidthChange, 
    howMuchWindowHeightChange,
    initialWindowWidth,
    initialWindowHeight
} from "../../root.js"
/**
 * Initial screen change state
 */
let initChangeState = "|W,H>"

export function use_geometry_based_upone_square_grid(axis, gridData, ...args){
    let abstractW = 1
    let abstractH = 1
    let value = gridData.n
    /**
     * Grid:
     * - Preserves geometry of the stage:
     *   innerWidth / totalGridPointsX = innerHeight / totalGridPointsY
     *    =>
     *   innerWidth * totalGridPointsY = innerHeight * totalGridPointsX
     */
    const totalGridPointsX = gridData.sq
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
     * Get values
     * Note: values depend on initChangeState
     */
    if (axis == "x"){
        const dx = window.innerWidth/abstractW
        return dx*value
    }
    if (axis == "y"){
        const dy = window.innerHeight / abstractH
        return dy*value
    }
}