export function geometry_grid(axis, gridData, ...args){
    console.log("gridData", gridData);
    const totalGridPoints = gridData.grd
    const coordinatePpoint = gridData.n
    const ScreenAxis = axis == "x" ? window.innerWidth: window.innerHeight

    const dl = ScreenAxis/totalGridPoints
    return dl*coordinatePpoint
}