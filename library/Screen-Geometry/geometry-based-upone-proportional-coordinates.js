import {
    initialWindowWidth,
    initialWindowHeight,
    currentWindowWidth,
    currentWindowHeight
} from "../../root.js"


export function use_geometry_based_upone_proportional_coordinates(axis, value, ...args){
    const initialXratio = value / initialWindowWidth
    const initialYration = value / initialWindowHeight

    if (axis == "x"){
        const newX = initialXratio * currentWindowWidth
        return newX
    }
    if (axis == "y"){
        const newY = initialYration * currentWindowHeight
        return newY
    }
}