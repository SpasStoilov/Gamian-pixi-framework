import {use_geometry_based_upone_procent} from "./geometry-based-upone-procent.js"
import {use_geometry_based_upone_square_grid} from "./geometry-based-upone-square_grid.js"
import {use_geometry_based_upone_proportional_coordinates} from "./geometry-based-upone-proportional-coordinates.js"
import {geometry_grid} from "./geometry-grid.js"
import {test_geometry} from "./test.js"

export const LibGeometry = {
    "%" : use_geometry_based_upone_procent,
    "sqr": use_geometry_based_upone_square_grid,
    "px": use_geometry_based_upone_proportional_coordinates,
    "grd": geometry_grid,
    "tst": test_geometry
}